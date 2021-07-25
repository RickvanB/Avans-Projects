using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using EfentHandler.Domain.Geodan;
using EfentHandler.Domain.Model;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Ioc;
using GalaSoft.MvvmLight.Messaging;

namespace EfentHandler.Desktop.ViewModel
{
    public class AssignmentEditVM : ViewModelBase
    {
        private SurveyRepository _surveyRepository = new SurveyRepository();
        private GeodanAPI _geodanAPI;

        public ReportGenerator ReportGenerator { get; set; }

        public AssignmentListVM AssignmentListVM;
        public InspectorListVM InspectorListVM;

        public AssignmentVM Assignment { get; set; }
        public ObservableCollection<EmployeeVM> Employees { get; set; }
        public ObservableCollection<InspectorVM> Inspectors { get; set; }
        public ObservableCollection<ClientVM> Clients { get; set; }

        public ObservableCollection<StatusVM> Statusses { get; set; }

        public ObservableCollection<SurveyVM> Surveys { get; set; }
        public ObservableCollection<UserAssignmentVM> UserAssignments { get; set; }
        public SurveyVM SelectedSurvey { get; set; }
        public bool DateChangeable { get; set; }
        public bool ShowEmployees { get; set; } = true;

        public InspectorVM Inspector { get; set; }
        public ICommand SurveyAddCommand { get; set; }
        public ICommand SurveyEditCommand { get; set; }
        public ICommand SurveyAnswersCommand { get; set; }
        public ICommand SurveyRemoveCommand { get; set; }
        public ICommand ReportCommand { get; set; }
        public ICommand SaveCommand { get; set; }

        public AssignmentEditVM()
        {
            _geodanAPI = new GeodanAPI();

            SurveyAddCommand = new RelayCommand(AddSurvey);
            SurveyEditCommand = new RelayCommand(EditSurvey);
            SurveyAnswersCommand = new RelayCommand(SurveyAnswers);
            SurveyRemoveCommand = new RelayCommand(SurveyRemove);
            ReportCommand = new RelayCommand(Report);
            SaveCommand = new RelayCommand<string>(Save);
        }

        public void Refresh()
        {
            ReportGenerator.CustomerName = Assignment.ClientName;
            ReportGenerator.EfentName = Assignment.Description;

            Statusses = AssignmentListVM.Statusses;

            Inspectors = new ObservableCollection<InspectorVM>();
            foreach (InspectorVM inspector in InspectorListVM.InspectorList)
                foreach (availability availability in inspector.Availability)
                    if (availability.Date >= Assignment.StartDate && availability.Date <= Assignment.EndDate)
                    {
                        if (inspector.Schedule.Where(s => s.AssignmentId == Assignment.AssignmentId).Count() == 1)
                        {
                            inspector.HasSchedule = true;
                            inspector.CurrentSchedule = inspector.Schedule.Where(s => s.AssignmentId == Assignment.AssignmentId).First();
                        }

                        Inspectors.Add(inspector);
                        break;
                    }

            Surveys = new ObservableCollection<SurveyVM>(Assignment.Surveys.Where(s => s.ParentSurvey == null).Select(s => new SurveyVM(s)));

            foreach (InspectorVM inspector in Inspectors)
            {
                if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_surveyRepository.CheckConnection())
                {
                    inspector.TravelDistance = "Geen internet";
                    return;
                }

                inspector.TravelDistance = _geodanAPI.CalculateTravelTimeAndDistance(new double[2] { inspector.Long, inspector.Lat }, new double[2] { Assignment.Long, Assignment.Lat }, "min-km")[1];
            }
                

            UserAssignments = new ObservableCollection<UserAssignmentVM>();
            foreach (EmployeeVM employee in Employees)
                foreach (user_assignment userAssignment in employee.Assigments)
                    UserAssignments.Add(new UserAssignmentVM(userAssignment));

            InsertIsAssigned();

            DateChangeable = Inspectors.Where(i => i.HasSchedule).Count() == 0 ? true : false;
            ShowEmployees = UserAssignments.Where(ua => ua.AssignmentId == Assignment.AssignmentId).Select(ua => ua.UserId).FirstOrDefault() != Int32.Parse(ConfigurationManager.AppSettings["UserId"]) ? false : true;
        }

        private void InsertIsAssigned()
        {
            foreach (var employee in Employees)
            {
                foreach (var userAssignment in UserAssignments)
                {
                    if (employee.ToModel().UserId == userAssignment.UserId && userAssignment.AssignmentId == Assignment.AssignmentId)
                    {
                        employee.SetIsAssignedFirst = true;
                        break;
                    }
                }
            }
        }

        private void UpdateInspectorsSchedule()
        {
            foreach (var inspector in Inspectors)
            {
                if (inspector.ScheduleChanged)
                {
                    if (inspector.HasSchedule)
                    {
                        AddInspSchedule(inspector);
                    }
                    else
                    {
                        DeleteInspSchedule(inspector);
                    }

                    inspector.ChangeSchedule();
                }

            }
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

        private void AddInspSchedule(InspectorVM inspector)
        {
            ScheduleRepository scheduleRepository = new ScheduleRepository();
            var newschedule = new schedule();
            newschedule.AssignmentId = Assignment.AssignmentId;
            newschedule.Confirmed = 0;
            newschedule.Inspector = inspector.ToModel().UserId;

            if (scheduleRepository.AddSchedule(newschedule))
                inspector.CurrentSchedule = newschedule;
        }

        private void AssignEmployee(EmployeeVM employee)
        {
            AssignmentRepository assignmentRepository = new AssignmentRepository();
            var newua = new user_assignment();
            newua.AssignmentId = Assignment.AssignmentId;
            newua.UserId = employee.ToModel().UserId;
            assignmentRepository.AddUserAssignment(newua);
        }

        private void DeleteInspSchedule(InspectorVM inspector)
        {
            ScheduleRepository scheduleRepository = new ScheduleRepository();
            scheduleRepository.RemoveSchedule(inspector.ToModel().UserId, Assignment.AssignmentId);
        }

        private void UnAssignEmployee(EmployeeVM employee)
        {
            AssignmentRepository assignmentRepository = new AssignmentRepository();
            assignmentRepository.RemoveUserAssignment(employee.ToModel().UserId, Assignment.AssignmentId);
        }

        private void AddSurvey()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_surveyRepository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            MessengerInstance.Send(new NotificationMessage("OpenSurveyAdd"));
        }

        private void EditSurvey()
        {
            MessengerInstance.Send(new NotificationMessage("OpenSurveyEdit"));
        }

        private void SurveyAnswers()
        {
            MessengerInstance.Send(new NotificationMessage("OpenSurveyAnswer"));
        }

        private void SurveyRemove()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_surveyRepository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (_surveyRepository.RemoveSurvey(SelectedSurvey.ToModel()))
            {
                Surveys.Remove(SelectedSurvey);
                RaisePropertyChanged("Surveys");
                MessageBox.Show("De vragenlijst is succesvol verwijderd", "Succesvol verwijderd");
            }
            else
            {
                MessageBox.Show("De vragenlijst is niet verwijderd. Herlaad de pagina en probeer het opnieuw.", "Niet verwijderd", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void Report()
        {
            if (Employees.Where(e => e.UserId == Int32.Parse(ConfigurationManager.AppSettings["UserId"])).Select(e => e.IsAssigned).First() == false)
            {
                MessageBox.Show("U heeft geen rechten om de rapportage te bekijken", "Geen rechten!");
                return;
            }

            List<List<SurveyQuestionVM>> questionsCollection = new List<List<SurveyQuestionVM>>();
            List<SurveyQuestionVM> question;

            foreach (survey survey in Assignment.Surveys.Where(s => s.ParentSurvey == null))
            {
                foreach (survey_question survey_question in survey.survey_question)
                {
                    question = new List<SurveyQuestionVM>();

                    foreach (survey childSurvey in survey.survey1)
                    {
                        survey_question newSurveyQuestion = childSurvey.survey_question.Where(sq => sq.QuestionId == survey_question.QuestionId).First();
                        SurveyQuestionVM newSurveyQuestionVM = new SurveyQuestionVM(newSurveyQuestion);
                        QuestionVM newQuestion = null;

                        if (newSurveyQuestion.question.QuestionTypeId == 2)
                            newQuestion = new QuestionVM(survey_question.question);

                        if (newSurveyQuestion.question.QuestionTypeId == 1)
                            newQuestion = new QuestionScaleVM(survey_question.question);

                        if (newSurveyQuestion.question.QuestionTypeId == 3)
                            newQuestion = new QuestionImagesVM(survey_question.question);

                        if (newSurveyQuestion.question.QuestionTypeId == 6)
                            newQuestion = new QuestionCountVM(survey_question.question);

                        if (newSurveyQuestion.question.QuestionTypeId == 8)
                            newQuestion = new QuestionEstimateVM(survey_question.question);

                        if (newSurveyQuestion.question.QuestionTypeId == 4)
                            newQuestion = new QuestionDistanceVM(survey_question.question);

                        if (newSurveyQuestion.question.QuestionTypeId == 9)
                            newQuestion = new Question5MinutesVM(survey_question.question);

                        if (newSurveyQuestion.question.QuestionTypeId == 7)
                            newQuestion = new QuestionMultiplechoiceVM(survey_question.question);

                        if (newSurveyQuestion.question.QuestionTypeId == 5)
                            newQuestion = new QuestionDrawVM(survey_question.question);

                        newSurveyQuestionVM.Question = newQuestion;

                        if (newSurveyQuestion.answer.Count != 0)
                        {
                            if (newSurveyQuestion.question.QuestionTypeId == 3 || newSurveyQuestion.question.QuestionTypeId == 5)
                            {
                                if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 0 && _surveyRepository.CheckConnection())
                                    question.Add(newSurveyQuestionVM);
                            }
                            else
                            {
                                question.Add(newSurveyQuestionVM);
                            }
                        }                        
                    }

                    if (question.Count != 0)
                        questionsCollection.Add(question);
                }
            }

            if (questionsCollection.Count == 0)
            {
                MessageBox.Show("Voor deze opdracht kan geen rapportage gegenereerd worden, omdat geen enkele vraag is beantwoord", "Waarschuwing", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            else
            {
                ReportGenerator.GenerateReport(questionsCollection);
                MessengerInstance.Send(new NotificationMessage("OpenReport"));
            }
        }

        private void Save(string buttonCommand)
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_surveyRepository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }
            
            AssignmentRepository repository = new AssignmentRepository();   

            var errors = repository.ValidateAssignment(Assignment.ToModel());
            if (errors == null)
            {
                // GEODAN
                var coordinates = _geodanAPI.GetGeoCoordinatesFromAddress((int)Assignment.HouseNumber, Assignment.ZipCode);

                if (coordinates == null || coordinates.Length == 0)
                {
                    MessageBox.Show("Het opgegeven adres is niet geldig, probeer het opnieuw", "Waarschuwing", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                Assignment.Lat = coordinates[0];
                Assignment.Long = coordinates[1];

                // set the date back if inspectors were added
                bool datesBack = false;
                if (DateChangeable)
                {
                    if (Inspectors.Where(i => i.HasSchedule).Count() != 0)
                    {
                        Assignment.SetDatesBack();
                        datesBack = true;
                    }
                } 

                UpdateAssignedEmployees();
                UpdateInspectorsSchedule();
                repository.EditAssignment(Assignment.ToModel());

                Assignment.Changed();
                if (datesBack)
                {
                    MessageBox.Show("De wijzigingen zijn succesvol opgeslagen" + Environment.NewLine + "Let op! Start- of einddatum zijn niet gewijzigd, omdat inspecteurs zijn gekoppeld", "Gelukt");
                }
                else
                {
                    MessageBox.Show("De wijzigingen zijn succesvol opgeslagen", "Gelukt");
                }
                AssignmentListVM.AssignmentList = new ObservableCollection<AssignmentVM>(repository.GetAllAssignments().Select(s => new AssignmentVM(s)));
                if (Int32.Parse(buttonCommand) == 1)
                    MessengerInstance.Send(new NotificationMessage("OpenAssignmentList"));
            }
            else
            {
                MessageBox.Show("Er zijn een aantal fouten gevonden: " + Environment.NewLine + " - " + string.Join(Environment.NewLine + " - ", errors.Where(x => x != null)), "Invoer niet opgeslagen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        public void SaveAdvice()
        {
            AssignmentRepository repository = new AssignmentRepository();

            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !repository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            repository.SaveAdvice(Assignment.ToModel());
            MessageBox.Show("De wijzigingen zijn succesvol opgeslagen", "Gelukt");
        }
    }
}