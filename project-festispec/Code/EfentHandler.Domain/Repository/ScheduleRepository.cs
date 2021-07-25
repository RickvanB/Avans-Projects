using EfentHandler.Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Domain.Repository
{
    public class ScheduleRepository
    {
        public List<schedule> GetAllSchedules()
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.schedule.ToList();
            }
        }

        public bool RemoveSchedule(int UserId, int AssignmentId)
        {
            try
            {
                using (var db = new EfentHandlerEntities())
                {
                    var schedule = db.schedule.Where(s => s.Inspector == UserId && s.AssignmentId == AssignmentId).FirstOrDefault();
                    db.Entry(schedule).State = EntityState.Deleted;

                    List<survey> surveys = db.survey.Where(s => s.AssignmentId == AssignmentId && s.AssignedEmployee == UserId).ToList();

                    foreach (survey survey in surveys)
                    {
                        db.survey_question.Where(sq => sq.SurveyId == survey.SurveyId).ToList().ForEach(sq => db.Entry(sq).State = EntityState.Detached);
                        db.SaveChanges();
                        db.Entry(survey).State = EntityState.Deleted;
                        db.SaveChanges();
                    }

                    db.SaveChanges();
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool AddSchedule(schedule schedule)
        {
            try
            {
                using (var db = new EfentHandlerEntities())
                {
                    db.schedule.Add(schedule);
                    db.SaveChanges();
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool EditSchedule(schedule schedule)
        {
            try
            {
                using (var db = new EfentHandlerEntities())
                {
                    db.Entry(schedule).State = EntityState.Modified;
                    db.SaveChanges();
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<schedule> GetSchedule(user user)
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.schedule.Where(s => s.Inspector == user.UserId).ToList();
            }
        }

        public schedule GetScheduleById(int id)
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.schedule.Find(id);
            }
        }

        public List<schedule> GetScheduleByWeek(user user, DateTime first, DateTime last)
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.schedule
                                .Include(s => s.assignment)
                                .Where(s => s.assignment.StartDate >= first
                                && s.assignment.StartDate <= last)
                                .Include(s => s.user)
                                .Where(s => s.user.UserId == user.UserId).ToList();
            }
        }

        public bool IsAvailableOnDate(DateTime date, user user)
        {
            using (var db = new EfentHandlerEntities())
            {
                var available = db.availability.Where(d => d.Date == date)
                                                .Where(d => d.UserId == user.UserId)
                                                .Select(d => (DateTime?)d.Date)
                                                .DefaultIfEmpty()
                                                .FirstOrDefault().HasValue;
                return available;
            }
        }

        public availability GetAvailablityByDate(DateTime date, user user)
        {
            using (var db = new EfentHandlerEntities())
            {
                availability availability = db.availability.Where(d => d.Date == date)
                                            .Where(d => d.UserId == user.UserId)
                                            .FirstOrDefault();
                return availability;
            }
        }
        public void AddAvailablity(DateTime date, user user)
        {
            using (var db = new EfentHandlerEntities())
            {
                availability availability = new availability();
                availability.Date = date;
                availability.UserId = user.UserId;
                db.availability.Add(availability);
                db.SaveChanges();
            }
        }

        public void RemoveAvailablity(DateTime date, user user)
        {
            using (var db = new EfentHandlerEntities())
            {
                availability availability = db.availability.Where(d => d.Date == date).Where(d => d.UserId == user.UserId).FirstOrDefault();
                db.availability.Remove(availability);
                db.SaveChanges();
            }
        }
    }
}