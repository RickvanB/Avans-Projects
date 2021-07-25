using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight.Command;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace EfentHandler.Desktop.ViewModel
{
    public class QuestionMultiplechoiceVM : QuestionVM
    {
        private ObservableCollection<MultiplechoiceAnswerVM> _multiplechoiceAnswer;
        private ObservableCollection<QuestionChoiceVM> _questionChoice;

        public MultiplechoiceAnswerVM SelectedMultiplechoiceAnswer { get; set; }
        public ICommand DeleteMultiplechoiceAnswerCommand { get; set; }
        public QuestionChoiceVM SelectedQuestionChoice { get; set; }
        public ICommand DeleteQuestionChoiceCommand { get; set; }

        public QuestionMultiplechoiceVM()
        {
            _multiplechoiceAnswer = new ObservableCollection<MultiplechoiceAnswerVM>();
            _questionChoice = new ObservableCollection<QuestionChoiceVM>();

            DeleteMultiplechoiceAnswerCommand = new RelayCommand(DeleteMultiplechoiceAnswer);
            DeleteQuestionChoiceCommand = new RelayCommand(DeleteQuestionChoice);

            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 1, Name = "Kolom Chart" });
            ChartTypes.Add(new ChartTypeVM() { Id = 3, Name = "Taart Chart" });
            ChartTypeId = 1;
        }

        public QuestionMultiplechoiceVM(question question)
        {
            _question = question;
            _multiplechoiceAnswer = new ObservableCollection<MultiplechoiceAnswerVM>(question.multiplechoiceanswer.Select(q => new MultiplechoiceAnswerVM(q)));
            _questionChoice = new ObservableCollection<QuestionChoiceVM>(question.question_choice.Select(q => new QuestionChoiceVM(q)));

            DeleteMultiplechoiceAnswerCommand = new RelayCommand(DeleteMultiplechoiceAnswer);
            DeleteQuestionChoiceCommand = new RelayCommand(DeleteQuestionChoice);

            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 1, Name = "Kolom Chart" });
            ChartTypes.Add(new ChartTypeVM() { Id = 3, Name = "Taart Chart" });
        }

        public override ObservableCollection<MultiplechoiceAnswerVM> MultiplechoiceAnswer
        {
            get { return _multiplechoiceAnswer; }
            set { _multiplechoiceAnswer = value; }
        }

        public override ObservableCollection<QuestionChoiceVM> QuestionChoice
        {
            get { return _questionChoice; }
            set { _questionChoice = value; }
        }

        public override void MultiplechoiceAnswerAdd(MultiplechoiceAnswerVM multiplechoiceAnswerVM)
        {
            MultiplechoiceAnswer.Add(multiplechoiceAnswerVM);
            _question.multiplechoiceanswer.Add(multiplechoiceAnswerVM.ToModel());
        }

        public override void QuestionChoiceAdd(QuestionChoiceVM questionChoiceVM)
        {
            QuestionChoice.Add(questionChoiceVM);
            _question.question_choice.Add(questionChoiceVM.ToModel());
        }

        private void DeleteMultiplechoiceAnswer()
        {
            _question.multiplechoiceanswer.Remove(SelectedMultiplechoiceAnswer.ToModel());
            MultiplechoiceAnswer.Remove(SelectedMultiplechoiceAnswer);
        }

        private void DeleteQuestionChoice()
        {
            _question.question_choice.Remove(SelectedQuestionChoice.ToModel());
            QuestionChoice.Remove(SelectedQuestionChoice);
        }
    }
}