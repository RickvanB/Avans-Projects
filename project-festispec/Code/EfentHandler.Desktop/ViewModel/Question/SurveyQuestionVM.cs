using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class SurveyQuestionVM : ViewModelBase
    {
        private survey_question _survey_question;
        private SurveyVM _surveyVM;
        private QuestionVM _questionVM;
        private AnswerVM _answerVM;

        public SurveyQuestionVM(survey_question survey_question)
        {
            _survey_question = survey_question;
        }

        public SurveyQuestionVM()
        {
            _survey_question = new survey_question();
        }

        public SurveyVM Survey
        {
            get { return _surveyVM; }
            set { _surveyVM = value; }
        }

        public QuestionVM Question
        {
            get { return _questionVM; }
            set { _questionVM = value; }
        }

        public AnswerVM Answer
        {
            get { return _answerVM; }
            set { _answerVM = value; }
        }

        public ICollection<answer> Answers
        {
            get { return _survey_question.answer; }
            set { _survey_question.answer = value; }
        }


        public survey_question ToModel()
        {
            return _survey_question;
        }
    }
}