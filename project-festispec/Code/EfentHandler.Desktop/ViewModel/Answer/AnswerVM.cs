using EfentHandler.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class AnswerVM
    {
        private answer _answer;

        public AnswerVM()
        {
            _answer = new answer();
        }

        public AnswerVM(answer answerVM)
        {
            _answer = answerVM;
        }

        public int AnswerID
        {
            get { return _answer.AnswerId; }
            set { _answer.AnswerId = value; }
        }

        public int? IntAnswer
        {
            get { return _answer.IntAnswer; }
            set { _answer.IntAnswer = value; }
        }

        public string TextAnswer
        {
            get { return _answer.TextAnswer; }
            set { _answer.TextAnswer = value; }
        }

        public int? MultipleChoiceAnswer
        {
            get { return _answer.MultipleChoiceAnswer; }
            set { _answer.MultipleChoiceAnswer = value; }
        }

        public int? QuestionChoiceAnswer
        {
            get { return _answer.QuestionChoiceId; }
            set { _answer.QuestionChoiceId = value; }
        }

        public int? QuestionChoiceAnswer2
        {
            get { return _answer.QuestionChoiceId2; }
            set { _answer.QuestionChoiceId2 = value; }
        }

        public TimeSpan? Time
        {
            get { return _answer.Time; }
            set { _answer.Time = value; }
        }


        public string DistanceAnswer
        {
            get { return _answer.question_choice.Name + " en " + _answer.question_choice1.Name; }
        }

        public string ChoiceAnswerName
        {
            get { return _answer.question_choice.Name; }
        }

        public string MultipleChoiceAnswerName
        {
            get { return _answer.multiplechoiceanswer1.Answer; }
        }

        public string DatagridAnswer
        {
            get; set;
        }

        public answer ToModel()
        {
            return _answer;
        }
    }
}