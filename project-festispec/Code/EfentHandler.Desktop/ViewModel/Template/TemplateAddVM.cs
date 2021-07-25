using EfentHandler.Domain.Model;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;
using Microsoft.Win32;
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
    public class TemplateAddVM : ViewModelBase
    {
        protected SurveyRepository _surveyRepository = new SurveyRepository();
        private TemplateListVM _templateListVM;

        public SurveyVM Survey { get; set; }

        public ObservableCollection<QuestionVM> Questions { get; set; }
        public QuestionVM SelectedQuestion { get; set; }
        public string QuestionsCount { get { return "Vragen (" + Questions.Count + " in totaal)"; } }

        public ObservableCollection<QuestionTypeVM> QuestionTypes { get; set; }
        public QuestionTypeVM SelectedQuestionType { get; set; }

        public ICommand AddQuestionCommand { get; set; }
        public ICommand DeleteQuestionCommand { get; set; }

        public ICommand AddMultiplechoiceAnswerCommand { get; set; }
        public ICommand AddQuestionChoiceCommand { get; set; }

        public ICommand SaveTemplateCommand { get; set; }

        public TemplateAddVM() { }

        public TemplateAddVM(TemplateListVM templateListVM)
        {
            _templateListVM = templateListVM;
            Survey = new SurveyVM() { IsTemplate = true };

            // Commands
            AddQuestionCommand = new RelayCommand(AddQuestion);
            DeleteQuestionCommand = new RelayCommand(DeleteQuestion);
            AddMultiplechoiceAnswerCommand = new RelayCommand(AddMultiplechoiceAnswer);
            AddQuestionChoiceCommand = new RelayCommand(AddQuestionChoice);
            SaveTemplateCommand = new RelayCommand(SaveTemplate);

            // Collections
            Questions = new ObservableCollection<QuestionVM>();
            QuestionTypes = new ObservableCollection<QuestionTypeVM>(_surveyRepository.GetQuestionTypes().Select(type => new QuestionTypeVM(type)));
        }

        protected void AddQuestion()
        {
            if (SelectedQuestionType == null)
            {
                MessageBox.Show("Selecteer eerst het type vraag dat u wilt toevoegen");
                return;
            }

            QuestionVM newQuestion = null;

            if (SelectedQuestionType.Name == "Open vraag")
                newQuestion = new QuestionVM() { QuestionTypeId = SelectedQuestionType.Id };

            if (SelectedQuestionType.Name == "Schaal")
                newQuestion = new QuestionScaleVM() { QuestionTypeId = SelectedQuestionType.Id };

            if (SelectedQuestionType.Name == "Afbeeldingen")
                newQuestion = new QuestionImagesVM() { QuestionTypeId = SelectedQuestionType.Id };

            if (SelectedQuestionType.Name == "Tellen")
                newQuestion = new QuestionCountVM() { QuestionTypeId = SelectedQuestionType.Id };

            if (SelectedQuestionType.Name == "Tijdschatting")
                newQuestion = new QuestionEstimateVM() { QuestionTypeId = SelectedQuestionType.Id };

            if (SelectedQuestionType.Name == "Afstand meten")
                newQuestion = new QuestionDistanceVM() { QuestionTypeId = SelectedQuestionType.Id };

            if (SelectedQuestionType.Name == "5 minuten")
                newQuestion = new Question5MinutesVM() { QuestionTypeId = SelectedQuestionType.Id };

            if (SelectedQuestionType.Name == "Meerkeuze")
                newQuestion = new QuestionMultiplechoiceVM() { QuestionTypeId = SelectedQuestionType.Id };

            if (SelectedQuestionType.Name == "Tekenen")
                newQuestion = new QuestionDrawVM() { QuestionTypeId = SelectedQuestionType.Id };

            survey_question surveyQuestion = new survey_question();
            surveyQuestion.question = newQuestion.ToModel();
            surveyQuestion.survey = Survey.ToModel();

            newQuestion.SurveyQuestion.Add(surveyQuestion);
            Survey.SurveyQuestion.Add(surveyQuestion);
            Questions.Add(newQuestion);
            RaisePropertyChanged("QuestionsCount");
        }

        protected void DeleteQuestion()
        {
            SelectedQuestion.SurveyQuestion.ToList().ForEach(sq => Survey.SurveyQuestion.Remove(sq));
            Questions.Remove(SelectedQuestion);
            RaisePropertyChanged("QuestionsCount");
        }

        protected void AddMultiplechoiceAnswer()
        {
            MultiplechoiceAnswerVM multiplechoiceAnswerVM = new MultiplechoiceAnswerVM();
            multiplechoiceAnswerVM.Question = SelectedQuestion.ToModel();
            SelectedQuestion.MultiplechoiceAnswerAdd(multiplechoiceAnswerVM);
        }

        protected void AddQuestionChoice()
        {
            QuestionChoiceVM questionChoiceVM = new QuestionChoiceVM();
            questionChoiceVM.Question = SelectedQuestion.ToModel();
            SelectedQuestion.QuestionChoiceAdd(questionChoiceVM);
        }

        private void SaveTemplate()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_surveyRepository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (_surveyRepository.ValidateTemplate(Survey.ToModel(), new List<question>(Questions.Select(d => d.ToModel()))))
            {
                _surveyRepository.AddTemplate(Survey.ToModel());
                MessageBox.Show("De wijzigingen zijn succesvol opgeslagen", "Gelukt");
                _templateListVM.Templates = new ObservableCollection<SurveyVM>(_surveyRepository.GetAllTemplates().Select(s => new SurveyVM(s)));
                MessengerInstance.Send(new NotificationMessage("OpenTemplateList")); 
            }
            else
            {
                MessageBox.Show("De wijzigingen zijn niet succesvol opgeslagen", "Waarschuwing", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
