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
    public class SurveyEditVM : TemplateEditVM
    {
        public AssignmentEditVM _assignmentEditVM { get; set; }

        public SurveyVM SelectedSurvey { get; set; }

        public ObservableCollection<SurveyVM> Templates { get; set; }
        public SurveyVM SelectedTemplateLoad { get; set; }

        public ICommand AddChildSurveyCommand { get; set; }
        public ICommand RemoveChildSurveyCommand { get; set; }
        public ICommand LoadTemplateCommand { get; set; }
        public ICommand SaveSurveyCommand { get; set; }

        public ObservableCollection<InspectorVM> Inspectors { get; set; }
        public ObservableCollection<SurveyVM> ChildSurveys { get; set; }
        public SurveyVM SelectedChildSurvey { get; set; }

        public SurveyEditVM() { }

        public SurveyEditVM(AssignmentEditVM assignmentEditVM, TemplateListVM templateListVM)
        {
            _assignmentEditVM = assignmentEditVM;
            SelectedSurvey = _assignmentEditVM.SelectedSurvey;

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
            QuestionToDelete = new List<QuestionVM>();
            Templates = new ObservableCollection<SurveyVM>(templateListVM.Templates);

            foreach (survey_question survey_question in SelectedSurvey.SurveyQuestion)
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

                // load answers
                newQuestion.Answers = new ObservableCollection<AnswerVM>();
                foreach (answer answer in survey_question.answer)
                    newQuestion.Answers.Add(new AnswerVM(answer));

                foreach (survey childsurvey in SelectedSurvey.ChildSurvey)
                    childsurvey.survey_question.Where(sq => sq.QuestionId == survey_question.QuestionId).Select(sq => sq.answer).First().ToList().ForEach(a => newQuestion.Answers.Add(new AnswerVM(a)));

                Questions.Add(newQuestion);
            }

            QuestionTypes = new ObservableCollection<QuestionTypeVM>(templateListVM.QuestionTypes);
            Inspectors = new ObservableCollection<InspectorVM>(_assignmentEditVM.Inspectors.Where(i => i.HasSchedule));
            ChildSurveys = new ObservableCollection<SurveyVM>(SelectedSurvey.ChildSurvey.ToList().Select(cs => new SurveyVM(cs) { Inspectors = Inspectors }));

            if (SelectedSurvey.ConfirmedByEmployee != null)
                SelectedSurvey.Confirmed = true;
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

                Questions.Add(newQuestion);
            }

            RaisePropertyChanged("QuestionsCount");
            MessageBox.Show("Template succesvol ingeladen");
        }

        private void AddChildSurvey()
        {
            ChildSurveys.Add(new SurveyVM() { Inspectors = Inspectors, AssignmentId = _assignmentEditVM.Assignment.AssignmentId, ParentSurvey = SelectedSurvey.Id, ConfirmedByInspector = false });
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

            if (_surveyRepository.ValidateSurvey(SelectedSurvey.ToModel(), new List<question>(Questions.Select(d => d.ToModel())), new List<survey>(ChildSurveys.Select(cs => cs.ToModel()))))
            {
                Questions.ToList().ForEach(q => q.HandleBeforeAdding());
                _surveyRepository.UpdateSurvey(SelectedSurvey.ToModel(), new List<question>(Questions.ToList().Select(q => q.ToModel())), new List<survey>(ChildSurveys.ToList().Select(cs => cs.ToModel())));
                MessageBox.Show("De wijzigingen zijn succesvol opgeslagen", "Gelukt");
                //_templateListVM.Templates = new ObservableCollection<SurveyVM>(_surveyRepository.GetAllTemplates().Select(s => new SurveyVM(s)));
                MessengerInstance.Send(new NotificationMessage("OpenAssignmentEdit"));
            }
            else
            {
                MessageBox.Show("De wijzigingen zijn niet succesvol opgeslagen", "Waarschuwing", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
