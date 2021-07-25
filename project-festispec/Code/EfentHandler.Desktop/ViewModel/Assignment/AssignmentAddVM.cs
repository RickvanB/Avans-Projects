using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using EfentHandler.Domain.Model;
using EfentHandler.Domain.Geodan;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;
using System.Configuration;

namespace EfentHandler.Desktop.ViewModel
{
    public class AssignmentAddVM : ViewModelBase
    {
        private AssignmentListVM _assignmentList;
        private GeodanAPI _geodanAPI;

        public AssignmentVM Assignment { get; set; }

        public ObservableCollection<EmployeeVM> Employees { get; set; }
        public ObservableCollection<ClientVM> Clients { get; set; }
        public ObservableCollection<SurveyVM> Surveys { get; set; }
        public ObservableCollection<UserAssignmentVM> UserAssignments { get; set; }
        public SurveyVM SelectedSurvey { get; set; }

        public ICommand SurveyAddCommand { get; set; }
        public ICommand SurveyEditCommand { get; set; }
        public ICommand SaveCommand { get; set; }

        public AssignmentAddVM() { }

        public AssignmentAddVM(AssignmentListVM assignmentList)
        {
            _assignmentList = assignmentList;
            Assignment = new AssignmentVM();
            Assignment.StartDate = Assignment.EndDate = DateTime.Now;
            Assignment.StatusId = 1;
            SurveyAddCommand = new RelayCommand(AddSurvey);
            SurveyEditCommand = new RelayCommand(EditSurvey);

            SaveCommand = new RelayCommand(Save);
            LoadSurveys();
        }

        public void LoadSurveys()
        {
            UserRepository userRepository = new UserRepository();
            ClientRepository clientRepository = new ClientRepository();
            AssignmentRepository assignmentRepository = new AssignmentRepository();
            SurveyRepository surveyRepository = new SurveyRepository();
            Employees = new ObservableCollection<EmployeeVM>(userRepository.GetAllEmployees().Select(e => new EmployeeVM(e)));
            Surveys = new ObservableCollection<SurveyVM>(surveyRepository.GetSurveyByAssignment(Assignment.AssignmentId).Select(s => new SurveyVM(s)));
            Clients = new ObservableCollection<ClientVM>(clientRepository.GetAllClients().Select(c => new ClientVM(c)));

            EmployeeVM me = Employees.Where(e => e.UserId == Int32.Parse(ConfigurationManager.AppSettings["UserId"])).First();
            me.SetIsAssignedFirst = true;
            me.ChangeIsAssigned();
        }

        private void UpdateAssignedEmployees()
        {
            foreach (var employee in Employees)
            {
                if (employee.AssignedChanged)
                {
                    if (employee.IsAssigned)
                    {
                        AssignEmployee(employee);
                    }
                    else
                    {
                        UnAssignEmployee(employee);
                    }
                    employee.ChangeIsAssigned();
                }
            }
        }

        private void AssignEmployee(EmployeeVM employee)
        {
            AssignmentRepository assignmentRepository = new AssignmentRepository();
            var newua = new user_assignment();
            newua.AssignmentId = Assignment.AssignmentId;
            newua.UserId = employee.ToModel().UserId;
            assignmentRepository.AddUserAssignment(newua);
        }

        private void UnAssignEmployee(EmployeeVM employee)
        {
            AssignmentRepository assignmentRepository = new AssignmentRepository();
            assignmentRepository.RemoveUserAssignment(employee.ToModel().UserId, Assignment.AssignmentId);
        }

        private void AddSurvey()
        {
            MessengerInstance.Send(new NotificationMessage("OpenSurveyAdd"));
        }

        private void EditSurvey()
        {
            MessengerInstance.Send(new NotificationMessage("OpenSurveyEdit"));
        }

        private void Save()
        {
            AssignmentRepository repository = new AssignmentRepository();

            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !repository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            var errors = repository.ValidateAssignment(Assignment.ToModel());
            if (errors == null)
            {
                // GEODAN
                _geodanAPI = new GeodanAPI();
                var coordinates = _geodanAPI.GetGeoCoordinatesFromAddress((int)Assignment.HouseNumber, Assignment.ZipCode);

                if (coordinates == null || coordinates.Length == 0)
                {
                    MessageBox.Show("Het opgegeven adres is niet geldig, probeer het opnieuw", "Waarschuwing", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                Assignment.Lat = coordinates[0];
                Assignment.Long = coordinates[1];

                repository.AddAssignment(Assignment.ToModel());

                _assignmentList.AssignmentList.Add(Assignment);
                UpdateAssignedEmployees();
                MessageBox.Show("De wijzigingen zijn succesvol opgeslagen", "Gelukt");
                MessengerInstance.Send(new NotificationMessage("OpenAssignmentList"));
            }
            else
            {
                MessageBox.Show("Er zijn een aantal fouten gevonden: " + Environment.NewLine + " - " + string.Join(Environment.NewLine + " - ", errors.Where(x => x != null)), "Invoer niet opgeslagen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}