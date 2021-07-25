using EfentHandler.Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Z.EntityFramework.Plus;

namespace EfentHandler.Domain.Repository
{
    public class SurveyRepository : MainRepository
    {
        public bool ValidateTemplate(survey survey, List<question> questions)
        {
            // validate the survey
            if (survey.Name == "" || survey.Name == null || survey.Name.Length > 255)
                return false;

            if (questions.Count == 0)
                return false;

            // validate the questions
            foreach (question question in questions)
            {                    
                if (question.Question1 == "" || question.Question1 == null)
                    return false;

                // check questionType draw
                if (question.QuestionTypeId == 5 && (question.Image == "" || question.Image == null))
                    return false;

                // check multiplechoiceanswer count
                if (question.QuestionTypeId == 7 && question.multiplechoiceanswer.Count == 0 && question.question_choice.Count == 0)
                    return false;

                // check questionchoice count
                if ((question.QuestionTypeId == 4 || question.QuestionTypeId == 9) && question.question_choice.Count == 0)
                    return false;

                // validate the multiplechoiceanswer
                foreach (multiplechoiceanswer multiplechoiceanswer in question.multiplechoiceanswer)
                    if (multiplechoiceanswer.Answer == "" || multiplechoiceanswer.Answer == null)
                        return false;

                // validate the questionchoice
                foreach (question_choice questionchoice in question.question_choice)
                    if (questionchoice.Name == "" || questionchoice.Name == null)
                        return false;
            }

            return true;
        }

        public bool ValidateSurvey(survey survey, List<question> questions, List<survey> childSurveys)
        {
            // validate the survey
            if (!ValidateTemplate(survey, questions))
                return false;

            // check chartType
            foreach (question question in questions)
            {
                if (question.ChartTypeId == null)
                    return false;
            }

            // validate childsurveys
            foreach (survey childSurvey in childSurveys)
                if (childSurvey.AssignedEmployee == null || childSurvey.Date == null)
                    return false;

            return true;
        }

        public List<user> GetInspectors()
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.user.ToList();
            }
        }

        public List<survey> GetAllTemplates()
        {
            using (var db = new EfentHandlerEntities())
            {
                QueryCacheManager.ExpireAll();

                return db.survey
                    .Include("survey_question")
                    .Include("survey_question.question")
                    .Include("survey_question.question.questiontype")
                    .Include("survey_question.question.multiplechoiceanswer")
                    .Include("survey_question.question.question_choice")
                    .Include("survey_question.question.survey_question")
                    .Where(s => s.IsTemplate)
                    .ToList();
            }
        }

        public List<survey> GetSurveyByAssignment(int assignmentId)
        {
            using (var db = new EfentHandlerEntities())
            {
                if (CheckConnection())
                {
                    return db.survey
                        .Include("survey1")
                        .Include("survey1.user")
                        .Include("user")
                        .Include("survey_question")
                        .Include("survey_question.question")
                        .Include("survey_question.question.questiontype")
                        .Include("survey_question.question.multiplechoiceanswer")
                        .Include("survey_question.question.question_choice")
                        .Include("survey_question.question.survey_question")
                        .Include("survey_question.answer")
                        .Include("survey_question.answer.multiplechoiceanswer1")
                        .Include("survey_question.answer.question_choice")
                        .Include("survey_question.answer.question_choice1")
                        .Where(s => s.AssignmentId == assignmentId)
                        .Where(s => s.ParentSurvey == null)
                        .ToList();
                }
                else
                {
                    return db.survey
                         .Include("user")
                         .Include("survey_question")
                         .Include("survey_question.question")
                         .Include("survey_question.question.questiontype")
                         .Include("survey_question.question.multiplechoiceanswer")
                         .Include("survey_question.question.question_choice")
                         .Include("survey_question.question.survey_question")
                         .Include("survey_question.answer")
                         .Include("survey_question.answer.multiplechoiceanswer1")
                         .Include("survey_question.answer.question_choice")
                         .Include("survey_question.answer.question_choice1")
                         .Where(s => s.AssignmentId == assignmentId)
                         .Where(s => s.ParentSurvey == null)
                         .FromCache()
                         .ToList();
                }
            }
        }

        public survey GetSurveyById(int id)
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.survey.Find(id);
            }
        }

        public List<answer> GetAnswersByQuestion(int questionId)
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.answer.Where(a => db.survey_question.Where(sq => sq.QuestionId == questionId).Any(sq => a.survey_question.Equals(sq))).Include("question_choice").Include("multiplechoiceanswer1").ToList();
            }
        }

        public List<questiontype> GetQuestionTypes()
        {
            using (var db = new EfentHandlerEntities())
            {
                if (CheckConnection())
                {
                    return db.questiontype.ToList();
                }
                else
                {
                    return db.questiontype.FromCache().ToList();
                }
            }
        }

        public void AddTemplate(survey survey)
        {
            using (var db = new EfentHandlerEntities())
            {
                db.survey.Add(survey);
                db.SaveChanges();
            }
        }

        public void AddSurvey(survey survey, List<survey> childSurveys)
        {
            using (var db = new EfentHandlerEntities())
            {
                db.survey.Add(survey);
                db.SaveChanges();

                foreach (survey childSurvey in childSurveys)
                {
                    childSurvey.ParentSurvey = survey.SurveyId;
                    childSurvey.Name = survey.Name;
                    db.survey.Add(childSurvey);
                    db.SaveChanges();

                    foreach (survey_question surveyQuestion in survey.survey_question)
                        db.survey_question.Add(new survey_question() { SurveyId = childSurvey.SurveyId, QuestionId = surveyQuestion.QuestionId });

                    db.SaveChanges();
                }
            }
        }

        public void UpdateTemplate(survey survey, List<question> questions)
        {
            using (var db = new EfentHandlerEntities())
            {
                foreach (question question in questions)
                {
                    if (question.QuestionId != 0)
                    {
                        // add new question_choice
                        question.question_choice.Where(qc => qc.QuestionId == null).ToList().ForEach(
                            qc => { qc.QuestionId = question.QuestionId; db.question_choice.Add(qc); db.SaveChanges(); }
                        );

                        // add new multiplechoiceanswer
                        question.multiplechoiceanswer.Where(ma => ma.QuestionId == 0).ToList().ForEach(
                            ma => { ma.QuestionId = question.QuestionId; db.multiplechoiceanswer.Add(ma); db.SaveChanges(); }
                        );
                    }
                }

                foreach (question question in questions)
                {
                    if (question.QuestionId == 0)
                    {
                        survey_question survey_question = new survey_question() { SurveyId = survey.SurveyId };
                        question.survey_question.Add(survey_question);
                        db.question.Add(question);
                    }
                    else
                    { 
                        // update or remove question_choice
                        List<question_choice> questionChoiceList = db.question_choice.Where(qc => qc.QuestionId == question.QuestionId).FromCache().ToList();
                        foreach (question_choice question_choice in questionChoiceList)
                        {
                            if (question.question_choice.Where(qc => qc.QuestionChoiceId == question_choice.QuestionChoiceId).Count() == 0)
                            {
                                db.Entry(question_choice).State = EntityState.Deleted;
                            }
                            else
                            {
                                db.Entry(question.question_choice.Where(qc => qc.QuestionChoiceId == question_choice.QuestionChoiceId).First()).State = EntityState.Modified;
                            }
                        }

                        // update or remove multiplechoiceanswer
                        List<multiplechoiceanswer> multiplechoiceanswerList = db.multiplechoiceanswer.Where(ma => ma.QuestionId == question.QuestionId).FromCache().ToList();
                        foreach (multiplechoiceanswer multiplechoiceanswer in multiplechoiceanswerList)
                        {
                            if (question.multiplechoiceanswer.Where(ma => ma.MultipleChoiceId == multiplechoiceanswer.MultipleChoiceId).Count() == 0)
                            {
                                db.Entry(multiplechoiceanswer).State = EntityState.Deleted;
                            }
                            else
                            {
                                db.Entry(question.multiplechoiceanswer.Where(ma => ma.MultipleChoiceId == multiplechoiceanswer.MultipleChoiceId).FirstOrDefault()).State = EntityState.Modified;
                            }
                        }

                        db.Entry(question).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                }

                // removed questions
                List<survey_question> surveyQuestionList = new List<survey_question>(survey.survey_question);
                foreach (survey_question survey_question in surveyQuestionList)
                {
                    if (!questions.Contains(survey_question.question))
                    {
                        List<question_choice> questionChoiceList = new List<question_choice>(survey_question.question.question_choice);
                        foreach (question_choice question_choice in questionChoiceList)
                        {
                            db.Entry(question_choice).State = EntityState.Deleted;
                        }

                        List<multiplechoiceanswer> multiplechoiceanswerList = new List<multiplechoiceanswer>(survey_question.question.multiplechoiceanswer);
                        foreach (multiplechoiceanswer multiplechoiceanswer in multiplechoiceanswerList)
                        {
                            db.Entry(multiplechoiceanswer).State = EntityState.Deleted;
                        }

                        db.Entry(survey_question.question).State = EntityState.Deleted;
                        db.Entry(survey_question).State = EntityState.Deleted;
                    }
                }

                db.Entry(survey).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public void UpdateSurvey(survey survey, List<question> questions, List<survey> childSurveys)
        {
            using (var db = new EfentHandlerEntities())
            {
                // added childsurveys
                foreach (survey childsurvey in childSurveys)
                {
                    if (childsurvey.SurveyId == 0)
                    {
                        childsurvey.Name = survey.Name;
                        db.survey.Add(childsurvey);
                        db.SaveChanges();

                        foreach (question question in questions)
                        {
                            if (question.QuestionId != 0)
                            {
                                survey_question survey_question = new survey_question() { SurveyId = childsurvey.SurveyId, QuestionId = question.QuestionId };
                                db.survey_question.Add(survey_question);
                            }
                        }

                        db.SaveChanges();
                    }
                }

                foreach (question question in questions)
                {
                    if (question.QuestionId != 0)
                    {
                        // add new question_choice
                        question.question_choice.Where(qc => qc.QuestionId == null).ToList().ForEach(
                            qc => { qc.QuestionId = question.QuestionId; db.question_choice.Add(qc); db.SaveChanges(); }
                        );

                        // add new multiplechoiceanswer
                        question.multiplechoiceanswer.Where(ma => ma.QuestionId == 0).ToList().ForEach(
                            ma => { ma.QuestionId = question.QuestionId; db.multiplechoiceanswer.Add(ma); db.SaveChanges(); }
                        );
                    }
                }

                // added questions
                foreach (question question in questions)
                {
                    if (question.QuestionId == 0)
                    {
                        survey_question survey_question = new survey_question() { SurveyId = survey.SurveyId };
                        question.survey_question.Add(survey_question);
                        db.question.Add(question);

                        foreach (survey childSurvey in survey.survey1)
                        {
                            db.survey_question.Add(new survey_question() { SurveyId = childSurvey.SurveyId, QuestionId = question.QuestionId });
                        }

                        db.SaveChanges();    
                    }
                    else
                    {
                        // update or remove question_choice
                        List<question_choice> questionChoiceList = db.question_choice.Where(qc => qc.QuestionId == question.QuestionId).FromCache().ToList();
                        foreach (question_choice question_choice in questionChoiceList)
                        {
                            if (question.question_choice.Where(qc => qc.QuestionChoiceId == question_choice.QuestionChoiceId).Count() == 0)
                            {
                                db.Entry(question_choice).State = EntityState.Deleted;
                            }
                            else
                            {
                                db.Entry(question.question_choice.Where(qc => qc.QuestionChoiceId == question_choice.QuestionChoiceId).FirstOrDefault()).State = EntityState.Modified;
                            }
                        }

                        // update or remove multiplechoiceanswer
                        List<multiplechoiceanswer> multiplechoiceanswerList = db.multiplechoiceanswer.Where(ma => ma.QuestionId == question.QuestionId).FromCache().ToList();
                        foreach (multiplechoiceanswer multiplechoiceanswer in multiplechoiceanswerList)
                        {
                            if (question.multiplechoiceanswer.Where(ma => ma.MultipleChoiceId == multiplechoiceanswer.MultipleChoiceId).Count() == 0)
                            {
                                db.Entry(multiplechoiceanswer).State = EntityState.Deleted;
                            }
                            else
                            {
                                db.Entry(question.multiplechoiceanswer.Where(ma => ma.MultipleChoiceId == multiplechoiceanswer.MultipleChoiceId).FirstOrDefault()).State = EntityState.Modified;
                            }
                        }

                        db.Entry(question).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                }

                // removed questions
                List<survey_question> surveyQuestionList = new List<survey_question>(survey.survey_question);
                foreach (survey_question survey_question in surveyQuestionList)
                {
                    if (!questions.Contains(survey_question.question))
                    {
                        foreach (survey surveyChild in survey.survey1)
                        {
                            List<survey_question> surveyQuestionListChild = new List<survey_question>(surveyChild.survey_question.Where(sq => sq.QuestionId == survey_question.QuestionId));

                            foreach (survey_question survey_question_child in surveyQuestionListChild)
                            {
                                List<answer> answerList = new List<answer>(survey_question_child.answer);
                                foreach (answer answer in answerList)
                                    db.Entry(answer).State = EntityState.Deleted;

                                db.Entry(survey_question_child).State = EntityState.Deleted;
                            }
                        }

                        List<question_choice> questionChoiceList = new List<question_choice>(survey_question.question.question_choice);
                        foreach (question_choice question_choice in questionChoiceList)
                            db.Entry(question_choice).State = EntityState.Deleted;

                        List<multiplechoiceanswer> multiplechoiceanswerList = new List<multiplechoiceanswer>(survey_question.question.multiplechoiceanswer);
                        foreach (multiplechoiceanswer multiplechoiceanswer in multiplechoiceanswerList)
                            db.Entry(multiplechoiceanswer).State = EntityState.Deleted;

                        db.Entry(survey_question.question).State = EntityState.Deleted;
                        db.survey_question.Where(sq => sq.QuestionId == survey_question.QuestionId).ToList().ForEach(sq => db.Entry(sq).State = EntityState.Deleted);
                    }
                }

                // removed childsurveys
                List<survey> childSurveysToRemove = new List<survey>();
                foreach (survey childsurvey in survey.survey1)
                    if (childSurveys.Where(cs => cs.SurveyId == childsurvey.SurveyId).Count() == 0)
                        childSurveysToRemove.Add(childsurvey);

                foreach (survey childsurvey in childSurveysToRemove)
                {
                    survey.survey1.Remove(childsurvey);
                    db.survey_question.Where(sq => sq.SurveyId == childsurvey.SurveyId).ToList().ForEach(sq => db.Entry(sq).State = EntityState.Detached);
                    db.SaveChanges();
                    db.Entry(childsurvey).State = EntityState.Deleted;
                    db.SaveChanges();
                }

                foreach (survey childSurvey in survey.survey1)
                {
                    childSurvey.Name = survey.Name;
                    db.Entry(childSurvey).State = EntityState.Modified;
                }

                db.SaveChanges();

                db.Entry(survey).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public bool RemoveTemplate(survey survey)
        {
            try
            {
                using (var db = new EfentHandlerEntities())
                {
                    List<survey_question> surveyQuestions = survey.survey_question.ToList();

                    foreach (survey_question survey_question in surveyQuestions)
                    {
                        // remove question_choice
                        List<question_choice> questionChoiceList = survey_question.question.question_choice.ToList();
                        foreach (question_choice questionChoice in questionChoiceList)
                            db.Entry(questionChoice).State = EntityState.Deleted;

                        // remove multiplechoiceanswer
                        List<multiplechoiceanswer> multiplechoiceAnswerList = survey_question.question.multiplechoiceanswer.ToList();
                        foreach (multiplechoiceanswer multiplechoiceanswer in multiplechoiceAnswerList)
                            db.Entry(multiplechoiceanswer).State = EntityState.Deleted;

                        db.Entry(survey_question.question).State = EntityState.Deleted;
                        db.Entry(survey_question).State = EntityState.Deleted;
                    }

                    db.Entry(survey).State = EntityState.Deleted;
                    db.SaveChanges();
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool RemoveSurvey(survey survey)
        {
            try
            {
                using (var db = new EfentHandlerEntities())
                {
                    List<survey_question> surveyQuestions = survey.survey_question.ToList();

                    // remove childsurveys
                    List<survey> childSurveys = survey.survey1.ToList();
                    foreach (survey childSurvey in childSurveys)
                    {
                        // remove answers
                        List<survey_question> childSurveyQuestions = childSurvey.survey_question.ToList();
                        foreach (survey_question survey_question_child in childSurveyQuestions)
                        {
                            survey_question_child.answer.ToList().ForEach(a => db.Entry(a).State = EntityState.Deleted);
                            db.Entry(survey_question_child).State = EntityState.Deleted;
                        }

                        db.Entry(childSurvey).State = EntityState.Deleted;
                    }

                    foreach (survey_question survey_question in surveyQuestions)
                    {
                        // remove question_choice
                        List<question_choice> questionChoiceList = survey_question.question.question_choice.ToList();
                        foreach (question_choice questionChoice in questionChoiceList)
                            db.Entry(questionChoice).State = EntityState.Deleted;

                        // remove multiplechoiceanswer
                        List<multiplechoiceanswer> multiplechoiceAnswerList = survey_question.question.multiplechoiceanswer.ToList();
                        foreach (multiplechoiceanswer multiplechoiceanswer in multiplechoiceAnswerList)
                            db.Entry(multiplechoiceanswer).State = EntityState.Deleted;

                        db.Entry(survey_question.question).State = EntityState.Deleted;
                        db.Entry(survey_question).State = EntityState.Deleted;
                    }

                    db.Entry(survey).State = EntityState.Deleted;
                    db.SaveChanges();
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Get the chart type of a question
        /// </summary>
        /// <param name="chartTypeId"></param>
        /// <returns></returns>
        public string GetChartType(int chartTypeId)
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.chart_type.Where(c => c.ChartTypeId == chartTypeId).Select(c => c.Name).FirstOrDefault();
            }
        }

        /// <summary>
        /// Get the questiontype of a questions
        /// </summary>
        /// <param name="questionTypeId"></param>
        /// <returns></returns>
        public string GetQuestionType(int questionTypeId)
        {
            try
            {
                using (var db = new EfentHandlerEntities())
                {
                    return db.questiontype.Where(q => q.QuestionTypeId == questionTypeId).Select(q => q.Type).FirstOrDefault();
                }
            } catch (SqlException)
            {
                return null;
            }
            
        }

        /// <summary>
        /// This method will return a list of all mulitplechoice answers of a question
        /// </summary>
        /// <param name="questionId"></param>
        /// <returns></returns>
        public ICollection<String> GetMultipleChoiceAnswers(int questionId)
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.multiplechoiceanswer.Where(m => m.QuestionId == questionId).Select(m => m.Answer).ToList();
            }
        }

        /// <summary>
        /// This method will get the actual name of a multipleChoise Question
        /// </summary>
        /// <param name="multipleChoiceAnswer"></param>
        /// <returns></returns>
        public string QuestionChoiceAnswer(int? questionChoice)
        {
            // Early aboart condition
            if (questionChoice == null)
                return "Unknown";

            using (var db = new EfentHandlerEntities())
            {
                return db.question_choice.Where(c => c.QuestionChoiceId == questionChoice).Select(c => c.Name).FirstOrDefault();
            }
        }

        public List<survey> GetSurveyByUser(user user)
        {
            using (var db = new EfentHandlerEntities())
            {
                List<survey> survey = db.survey.Where(s => s.AssignedEmployee == user.UserId)
                .Include(s => s.assignment)
                .Include(s => s.user)
                .Include(s => s.survey2).ToList();

                return survey;
            }
        }

        public List<survey_question> GetQuestionsAndAnswers(int id)
        {
            using (var db = new EfentHandlerEntities())
            {
                List<survey_question> questions = db.survey_question.Where(s => s.SurveyId == id)
                .Include(s => s.question)
                .Include(s => s.question.questiontype)
                .Include(s => s.answer)
                .Include(s => s.question.multiplechoiceanswer)
                .Include(s => s.question.question_choice)
                .ToList();

                return questions;
            }
        }

        public answer CheckAnswerExist(answer ans)
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.answer.Where(a => a.SurveyQuestionId == ans.SurveyQuestionId).FirstOrDefault();
            }
        }

        public void RemoveAnswer(answer answer)
        {
            using (var db = new EfentHandlerEntities())
            {
                db.Entry(answer).State = EntityState.Deleted;
                db.SaveChanges();
            }
        }

        public void AddAnswer(answer answer)
        {
            using (var db = new EfentHandlerEntities())
            {
                db.answer.Add(answer);
                db.SaveChanges();
            }
        }

        public void UpdateAnswer(answer answer)
        {
            using (var db = new EfentHandlerEntities())
            {
                db.Entry(answer).State = EntityState.Modified;
                db.SaveChanges();
            }
        }
    }
}