using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class QuestionChoiceVM : ViewModelBase
    {
        private question_choice _questionChoice;

        public QuestionChoiceVM()
        {
            _questionChoice = new question_choice();
        }

        public QuestionChoiceVM(question_choice questionChoice)
        {
            _questionChoice = questionChoice;
        }

        public int Id
        {
            get { return _questionChoice.QuestionChoiceId; }
            set { _questionChoice.QuestionChoiceId = value; }
        }

        public string Name
        {
            get { return _questionChoice.Name; }
            set { _questionChoice.Name = value; }
        }

        public question Question
        {
            get { return _questionChoice.question; }
            set { _questionChoice.question = value; }
        }

        public question_choice ToModel()
        {
            return _questionChoice;
        }
    }
}