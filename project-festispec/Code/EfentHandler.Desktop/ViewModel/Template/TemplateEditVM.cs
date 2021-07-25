using EfentHandler.Domain.Model;
using EfentHandler.Domain.Repository;
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
    public class TemplateEditVM : ViewModelBase
    {
        private TemplateListVM _templateListVM;

        protected SurveyRepository _surveyRepository = new SurveyRepository();

        public SurveyVM SelectedTemplate { get; set; }

        public ObservableCollection<QuestionVM> Questions { get; set; }
        public QuestionVM SelectedQuestion { get; set; }
        public string QuestionsCount { get { return "Vragen (" + Questions.Count + " in totaal)"; } }

        public List<QuestionVM> QuestionToDelete { get; set; }

        public ObservableCollection<QuestionTypeVM> QuestionTypes { get; set; }
        public QuestionTypeVM SelectedQuestionType { get; set; }

        public ICommand AddQuestionCommand { get; set; }
        public ICommand DeleteQuestionCommand { get; set; }

        public ICommand AddMultiplechoiceAnswerCommand { get; set; }
        public ICommand AddQuestionChoiceCommand { get; set; }

        public ICommand SaveTemplateCommand { get; set; }

        public TemplateEditVM() { }

        public TemplateEditVM(TemplateListVM templateListVM)
        {
            _templateListVM = templateListVM;
            SelectedTemplate = templateListVM.SelectedTemplate;

            // Commands
            AddQuestionCommand = new RelayCommand(AddQuestion);
            DeleteQuestionCommand = new RelayCommand(DeleteQuestion);
            AddMultiplechoiceAnswerCommand = new RelayCommand(AddMultiplechoiceAnswer);
            AddQuestionChoiceCommand = new RelayCommand(AddQuestionChoice);
            SaveTemplateCommand = new RelayCommand<string>(SaveTemplate);

            // Collections
            Questions = new ObservableCollection<QuestionVM>();
            QuestionToDelete = new List<QuestionVM>();

            foreach (survey_question survey_question in SelectedTemplate.SurveyQuestion)
            {
                QuestionVM newQuestion = null;

                if (survey_question.question.QuestionTypeId == 2)
                    newQuestion = new QuestionVM(survey_question.question);

                if (survey_question.question.QuestionTypeId == 1)
                    newQuestion = new QuestionScaleVM(survey_question.question);

                if (survey_question.question.QuestionTypeId == 3)
                    newQuestion = new QuestionImagesVM(survey_question.question);

                if (survey_question.question.QuestionTypeId == 6)
                    newQuestion = new QuestionCountVM(survey_question.question);

                if (survey_question.question.QuestionTypeId == 8)
                    newQuestion = new QuestionEstimateVM(survey_question.question);

                if (survey_question.question.QuestionTypeId == 4)
                    newQuestion = new QuestionDistanceVM(survey_question.question);

                if (survey_question.question.QuestionTypeId == 9)
                    newQuestion = new Question5MinutesVM(survey_question.question);

                if (survey_question.question.QuestionTypeId == 7)
                    newQuestion = new QuestionMultiplechoiceVM(survey_question.question);

                if (survey_question.question.QuestionTypeId == 5)
                    newQuestion = new QuestionDrawVM(survey_question.question);

                Questions.Add(newQuestion);
            }

            QuestionTypes = templateListVM.QuestionTypes;
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
                newQuestion = new QuestionVM() { QuestionTypeId = SelectedQuestionType.Id};

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

            Questions.Add(newQuestion);
            RaisePropertyChanged("QuestionsCount");
        }

        protected void DeleteQuestion()
        {
            Questions.Remove(SelectedQuestion);
            RaisePropertyChanged("QuestionsCount");
        }

        protected void AddMultiplechoiceAnswer()
        {
            MultiplechoiceAnswerVM multiplechoiceAnswerVM = new MultiplechoiceAnswerVM();
            SelectedQuestion.MultiplechoiceAnswerAdd(multiplechoiceAnswerVM);
        }

        protected void AddQuestionChoice()
        {
            QuestionChoiceVM questionChoiceVM = new QuestionChoiceVM();
            SelectedQuestion.QuestionChoiceAdd(questionChoiceVM);
        }

        private void SaveTemplate(string buttonCommand)
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_surveyRepository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (_surveyRepository.ValidateTemplate(SelectedTemplate.ToModel(), new List<question>(Questions.Select(d => d.ToModel()))))
            {
                //_surveyRepository.UpdateTemplate(SelectedTemplate.ToModel(), new List<question> (Questions.ToList().Select(q => q.ToModel())));
                _surveyRepository.UpdateTemplate(SelectedTemplate.ToModel(), new List<question>(Questions.ToList().Select(q => q.ToModel())));
                MessageBox.Show("De wijzigingen zijn succesvol opgeslagen", "Gelukt");
                _templateListVM.Templates = new ObservableCollection<SurveyVM>(_surveyRepository.GetAllTemplates().Select(s => new SurveyVM(s)));
                if (Int32.Parse(buttonCommand) == 1)
                    MessengerInstance.Send(new NotificationMessage("OpenTemplateList"));
            }
            else
            {
                MessageBox.Show("De wijzigingen zijn niet succesvol opgeslagen", "Waarschuwing", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
