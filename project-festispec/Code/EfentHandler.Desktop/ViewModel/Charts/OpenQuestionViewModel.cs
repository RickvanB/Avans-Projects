using EfentHandler.Desktop.View.Control.QuestionReport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class OpenQuestionViewModel : IQuestionLink
    {

        public ISaveableQuestion ConstructQuestion(string type, List<SurveyQuestionVM> questions)
        {
            if (type.Equals("Open vraag"))
            {
                // Create Object  
                OpenQuestion openQuestionView = new OpenQuestion();

                // set VM for pdf generator
                openQuestionView.ViewModel = this;

                // Set Question
                openQuestionView.Question = questions[0].Question.Name;

                // Set Answers
                List<AnswerVM> answers = new List<AnswerVM>();

                foreach (var question in questions)
                {
                    foreach (var answer in question.Answers)
                    {
                        answers.Add(new AnswerVM() { TextAnswer = answer.TextAnswer });
                    }
                }

                openQuestionView.GivenAnswersVM = answers;

                // Set Survery Value
                openQuestionView.InSurvery_Id = questions[0].Survey?.Survey_Id ?? 0;

                // Set Question ID
                openQuestionView.Question_Id = questions[0].Question?.QuestionId ?? 0;

                // Add Object
                return openQuestionView;
            }
            else if (type.Equals("Tellen"))
            {
                // Create Object
                OpenQuestion countQuestionView = new OpenQuestion();

                // set VM for pdf generator
                countQuestionView.ViewModel = this;

                // Set Question
                countQuestionView.Question = questions[0].Question.Name;

                // Set Answers
                List<AnswerVM> answers = new List<AnswerVM>();

                foreach (var question in questions)
                {
                    foreach (var answer in question.Answers)
                    {
                        answers.Add(new AnswerVM() { TextAnswer = (answer.IntAnswer.ToString()) });
                    }
                }

                countQuestionView.GivenAnswersVM = answers;

                // Set Survery Value
                countQuestionView.InSurvery_Id = questions[0].Survey?.Survey_Id ?? 0;

                // Set Question ID
                countQuestionView.Question_Id = questions[0].Question?.QuestionId ?? 0;

                // Add Object
                return countQuestionView;

            }

            return null;
        }
    }
}