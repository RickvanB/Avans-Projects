using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace EfentHandler.Desktop.ViewModel
{
    public class SurveyAddVM : TemplateAddVM
    {
        public AssignmentEditVM _assignmentEditVM { get; set; }

        public ObservableCollection<SurveyVM> Templates { get; set; }
        public SurveyVM SelectedTemplateLoad { get; set; }

        public ICommand AddChildSurveyCommand { get; set; }
        public ICommand RemoveChildSurveyCommand { get; set; }
        public ICommand LoadTemplateCommand { get; set; }
        public ICommand SaveSurveyCommand { get; set; }

        public ObservableCollection<InspectorVM> Inspectors { get; set; }
        public ObservableCollection<SurveyVM> ChildSurveys { get; set; }
        public SurveyVM SelectedChildSurvey { get; set; }

        public SurveyAddVM() { }

        public SurveyAddVM(AssignmentEditVM assignmentEditVM, TemplateListVM templateListVM)
        {
            _assignmentEditVM = assignmentEditVM;
            Survey = new SurveyVM() { IsTemplate = false, AssignmentId = assignmentEditVM.Assignment.AssignmentId };

            // Commands
            AddQuestionCommand = new RelayCommand(AddQuestion);
            DeleteQuestionCommand = new RelayCommand(DeleteQuestion);
            AddMultiplechoiceAnswerCommand = new RelayCommand(AddMultiplechoiceAnswer);
            AddQuestionChoiceCommand = new RelayCommand(AddQuestionChoice);
            LoadTemplateCommand = new RelayCommand(LoadTemplate);
            RemoveChildSurveyCommand = new RelayCommand(RemoveChildSurvey);
            AddChildSurveyCommand = new RelayCommand(AddChildSurvey);
            SaveSurveyCommand = new RelayCommand(SaveSurvey);

            // Collections
            Questions = new ObservableCollection<QuestionVM>();
            QuestionTypes = new ObservableCollection<QuestionTypeVM>(_surveyRepository.GetQuestionTypes().Select(type => new QuestionTypeVM(type)));
            Templates = new ObservableCollection<SurveyVM>(templateListVM.Templates);

            Inspectors = new ObservableCollection<InspectorVM>(_assignmentEditVM.Inspectors.Where(i => i.HasSchedule));
            ChildSurveys = new ObservableCollection<SurveyVM>();
        }

        private void LoadTemplate()
        {
            if (SelectedTemplateLoad == null)
                return;

            foreach (survey_question item in SelectedTemplateLoad.SurveyQuestion)
            {
                QuestionVM newQuestion = null;

                if (item.question.QuestionTypeId == 2)
                    newQuestion = new QuestionVM();

                if (item.question.QuestionTypeId == 1)
                    newQuestion = new QuestionScaleVM();

                if (item.question.QuestionTypeId == 3)
                    newQuestion = new QuestionImagesVM();

                if (item.question.QuestionTypeId == 6)
                    newQuestion = new QuestionCountVM();

                if (item.question.QuestionTypeId == 8)
                    newQuestion = new QuestionEstimateVM();

                if (item.question.QuestionTypeId == 4)
                    newQuestion = new QuestionDistanceVM();

                if (item.question.QuestionTypeId == 9)
                    newQuestion = new Question5MinutesVM();

                if (item.question.QuestionTypeId == 7)
                    newQuestion = new QuestionMultiplechoiceVM();

                if (item.question.QuestionTypeId == 5)
                    newQuestion = new QuestionDrawVM();

                if (item.question.multiplechoiceanswer.Count != 0)
                    foreach (multiplechoiceanswer multiplechoiceanswer in item.question.multiplechoiceanswer)
                        newQuestion.MultiplechoiceAnswerAdd(new MultiplechoiceAnswerVM() { Answer = multiplechoiceanswer.Answer });

                if (item.question.question_choice.Count != 0)
                    foreach (question_choice question_choice in item.question.question_choice)
                        newQuestion.QuestionChoiceAdd(new QuestionChoiceVM() { Name = question_choice.Name });

                newQuestion.Name = item.question.Question1;
                newQuestion.Image = item.question.Image;
                newQuestion.QuestionTypeId = item.question.QuestionTypeId;

                survey_question surveyQuestion = new survey_question();
                surveyQuestion.question = newQuestion.ToModel();
                surveyQuestion.survey = Survey.ToModel();

                newQuestion.SurveyQuestion.Add(surveyQuestion);
                Survey.SurveyQuestion.Add(surveyQuestion);
                Questions.Add(newQuestion);
            }

            if (Survey.Name == null || Survey.Name == "")
                Survey.Name = SelectedTemplateLoad.Name;

            RaisePropertyChanged("QuestionsCount");
            MessageBox.Show("Template succesvol ingeladen");
        }

        private void AddChildSurvey()
        {
            ChildSurveys.Add(new SurveyVM() { Inspectors = Inspectors, AssignmentId = _assignmentEditVM.Assignment.AssignmentId, ConfirmedByInspector = false });
        }

        private void RemoveChildSurvey()
        {
            ChildSurveys.Remove(SelectedChildSurvey);
        }

        private void SaveSurvey()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_surveyRepository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            Questions.ToList().ForEach(q => q.HandleBeforeAdding());

            if (_surveyRepository.ValidateSurvey(Survey.ToModel(), new List<question>(Questions.Select(d => d.ToModel())), new List<survey>(ChildSurveys.Select(cs => cs.ToModel()))))
            {
                _surveyRepository.AddSurvey(Survey.ToModel(), new List<survey>(ChildSurveys.ToList().Select(cs => cs.ToModel())));
                MessageBox.Show("De wijzigingen zijn succesvol opgeslagen", "Gelukt");
                _assignmentEditVM.Assignment.Surveys.Add(Survey.ToModel());
                MessengerInstance.Send(new NotificationMessage("OpenAssignmentEdit"));
            }
            else
            {
                MessageBox.Show("De wijzigingen zijn niet succesvol opgeslagen", "Waarschuwing", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
