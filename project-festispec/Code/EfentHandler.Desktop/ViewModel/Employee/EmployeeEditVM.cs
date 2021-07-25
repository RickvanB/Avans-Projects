using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;

namespace EfentHandler.Desktop.ViewModel
{
    public class EmployeeEditVM : ViewModelBase
    {
        private EmployeeListVM _employeeList;

        public EmployeeVM Employee { get; set; }
        public ObservableCollection<UserTypeVM> UserTypes { get; set; }
        public ICommand SaveCommand { get; set; }

        public EmployeeEditVM() { }

        public EmployeeEditVM(EmployeeListVM employeeListVM, ObservableCollection<UserTypeVM> userTypes)
        {
            _employeeList = employeeListVM;
            Employee = employeeListVM.SelectedEmployee;

            UserTypes = userTypes;
            SaveCommand = new RelayCommand<string>(Save);
        }

        private void Save(string buttonCommand)
        {
            UserRepository repository = new UserRepository();

            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !repository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            var errors = repository.ValidateEmployee(Employee.ToModel());
            if (errors == null)
            {
                repository.EditEmployee(Employee.ToModel(), Employee.PasswordNew);

                Employee.Changed();
                MessageBox.Show("De wijzigingen zijn succesvol opgeslagen", "Gelukt");
                _employeeList.EmployeeList = new ObservableCollection<EmployeeVM>(repository.GetAllEmployees().Select(s => new EmployeeVM(s)));
                if (Int32.Parse(buttonCommand) == 1)
                    MessengerInstance.Send(new NotificationMessage("OpenEmployeeList"));
            }
            else
            {
                MessageBox.Show("Er zijn een aantal fouten gevonden: " + Environment.NewLine + " - " + string.Join(Environment.NewLine + " - ", errors.Where(x => x != null)), "Invoer niet opgeslagen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}