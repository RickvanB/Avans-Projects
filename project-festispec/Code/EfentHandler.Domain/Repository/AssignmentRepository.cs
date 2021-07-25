using EfentHandler.Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Documents;
using Z.EntityFramework.Plus;
using assignment = EfentHandler.Domain.Model.assignment;

namespace EfentHandler.Domain.Repository
{
    public class AssignmentRepository : MainRepository
    {
        public List<assignment> GetAllAssignments()
        {
            using (var db = new EfentHandlerEntities())
            {
                QueryCacheManager.ExpireAll();

                return db.assignment
                    .Include("client")
                    .Include("client.request")
                    .Include("survey")
                    .Include("survey.user")
                    .Include("survey.survey1")
                    .Include("survey.survey1.user")
                    .Include("survey.user")

                    .Include("survey.survey_question")
                    .Include("survey.survey_question.question")
                    .Include("survey.survey_question.question.questiontype")
                    .Include("survey.survey_question.question.multiplechoiceanswer")
                    .Include("survey.survey_question.question.question_choice")
                    .Include("survey.survey_question.question.survey_question")
                    .Include("survey.survey_question.answer")
                    .Include("survey.survey_question.answer.multiplechoiceanswer1")
                    .Include("survey.survey_question.answer.question_choice")
                    .Include("survey.survey_question.answer.question_choice1")

                    .Include("survey.survey1.survey_question")
                    .Include("survey.survey1.survey_question.question")
                    .Include("survey.survey1.survey_question.question.questiontype")
                    .Include("survey.survey1.survey_question.question.multiplechoiceanswer")
                    .Include("survey.survey1.survey_question.question.question_choice")
                    .Include("survey.survey1.survey_question.question.survey_question")
                    .Include("survey.survey1.survey_question.answer")
                    .Include("survey.survey1.survey_question.answer.multiplechoiceanswer1")
                    .Include("survey.survey1.survey_question.answer.question_choice")
                    .Include("survey.survey1.survey_question.answer.question_choice1")
                    .ToList();
            }
        }

        public List<status> GetAllStatusses()
        {
            using (var db = new EfentHandlerEntities())
            {
                if (CheckConnection())
                {
                    return db.status.ToList();
                }
                else
                {
                    return db.status.FromCache().ToList();

                }
            }
        }
        public List<user_assignment> GetAllUserAssignments()
        {
            using (var db = new EfentHandlerEntities())
            {
                if (CheckConnection())
                {
                    return db.user_assignment.ToList();
                }
                else
                {
                    return db.user_assignment.FromCache().ToList();

                }
            }
        }

        public List<schedule> GetAssignmentsThatBelongsToUser(user user)
        {
            var db = new EfentHandlerEntities();
            
            var assignments = db.schedule.Include("assignment").Where(s => s.user.UserId == user.UserId).FromCache().ToList();
            if (CheckConnection())
            {
                return db.schedule.Include("assignment").Where(s => s.user.UserId == user.UserId).ToList();
            }

            //db.Dispose();

            return assignments;
        }

        public List<assignment> GetAssignmentsByUserID(int userId)
        {
            var db = new EfentHandlerEntities();
            var assignments = new List<assignment>();
            var userAssignments = new List<user_assignment>();

            if (CheckConnection())
            {
                userAssignments = db.user_assignment.Include("assignment").Where(ua => ua.UserId == userId).ToList();

                foreach (var ua in userAssignments)
                {
                    assignments.Add(db.assignment.Find(ua.AssignmentId));
                }
                return assignments;
            }

            //todo get from cache if no conn
            return assignments;

        }

        public assignment GetSingleAssignmentThatBelongsToUser(int? id)
        {
            var db = new EfentHandlerEntities();
            return db.assignment.Find(id);
        }

        public List<string> ValidateAssignment(assignment assignment)
        {
            List<string> errors = new List<string>();
            errors.Add(_validation.AssignmentDate(assignment.StartDate, assignment.EndDate));
            errors.Add(_validation.Description(assignment.Description, null));
            errors.Add(_validation.Street(assignment.Street));
            errors.Add(_validation.ZipCode(assignment.ZipCode));
            errors.Add(_validation.City(assignment.City));
            errors.Add(_validation.HouseNumber(assignment.HouseNumber));
            errors.Add(_validation.HouseNumberAddition(assignment.HouseNumberAddition));
            errors.Add(_validation.ClientId(assignment.ClientId));
            
            foreach (string e in errors)
            {
                if (e != null)
                    return errors;
            }

            return null;
        }
        public bool RemoveAssignment(assignment assignment)
        {
            try
            {
                using (var db = new EfentHandlerEntities())
                {
                    db.Entry(assignment).State = EntityState.Deleted;
                    db.SaveChanges();
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public void EditAssignment(assignment assignment)
        {
            using (var db = new EfentHandlerEntities())
            {
                assignment.client = db.client.Find(assignment.ClientId);
                db.Entry(assignment).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public void AddAssignment(assignment assignment)
        {
            using (var db = new EfentHandlerEntities())
            {
                db.assignment.Add(assignment);
                db.SaveChanges();
            }
        }

        public void SaveAdvice(assignment assignment)
        {
            using (var db = new EfentHandlerEntities())
            {
                assignment assignmentDB = db.assignment.Find(assignment.AssignmentId);
                assignmentDB.Advice = assignment.Advice;
                db.Entry(assignmentDB).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public bool AddUserAssignment(user_assignment newua)
        {
            try
            {
                using (var db = new EfentHandlerEntities())
                {
                    db.user_assignment.Add(newua);
                    db.SaveChanges();
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool RemoveUserAssignment(int UserId, int AssignmentId)
        {
            try
            {
                using (var db = new EfentHandlerEntities())
                {
                    var userAssignment = db.user_assignment.Where(s => s.UserId == UserId && s.AssignmentId == AssignmentId).FirstOrDefault();
                    db.Entry(userAssignment).State = EntityState.Deleted;
                    db.SaveChanges();
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public int GetAmountAssignmentsWithStatus(Boolean status)
        {
            int amountAssignments;
            using (var db = new EfentHandlerEntities())
            {
                if (status)
                {
                amountAssignments = db.assignment.Where(a => a.StatusId <= 5).ToList().Count();
                }
                else
                {
                amountAssignments = db.assignment.Where(a => a.StatusId > 5).ToList().Count();

                }
            }
            return amountAssignments;
        }
    }
}