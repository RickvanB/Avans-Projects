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
    public class QuestionEstimateVM : QuestionVM
    {
        private ObservableCollection<QuestionChoiceVM> _questionChoice;

        public QuestionChoiceVM SelectedQuestionChoice { get; set; }
        public ICommand DeleteQuestionChoiceCommand { get; set; }

        public QuestionEstimateVM()
        {
            _questionChoice = new ObservableCollection<QuestionChoiceVM>();
            DeleteQuestionChoiceCommand = new RelayCommand(DeleteQuestionChoice);

            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 2, Name = "Lijn Chart" });
            ChartTypeId = 2;
        }

        public QuestionEstimateVM(question question)
        {
            _question = question;
            _questionChoice = new ObservableCollection<QuestionChoiceVM>(_question.question_choice.Select(qc => new QuestionChoiceVM(qc)));
            DeleteQuestionChoiceCommand = new RelayCommand(DeleteQuestionChoice);

            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 2, Name = "Lijn Chart" });
        }

        public override ObservableCollection<QuestionChoiceVM> QuestionChoice
        {
            get { return _questionChoice; }
            set { _questionChoice = value; }
        }

        public override void QuestionChoiceAdd(QuestionChoiceVM questionChoiceVM)
        {
            QuestionChoice.Add(questionChoiceVM);
            _question.question_choice.Add(questionChoiceVM.ToModel());
        }

        private void DeleteQuestionChoice()
        {
            _question.question_choice.Remove(SelectedQuestionChoice.ToModel());
            QuestionChoice.Remove(SelectedQuestionChoice);
        }
    }
}
