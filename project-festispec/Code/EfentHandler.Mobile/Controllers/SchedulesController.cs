using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using EfentHandler.Domain.Model;
using EfentHandler.Domain.Repository;

namespace EfentHandler.Mobile.Controllers
{
    public class SchedulesController : Controller
    {
        private EfentHandlerEntities db = new EfentHandlerEntities();
        private ScheduleRepository _scheduleRepository = new ScheduleRepository();

        public ActionResult Index()
        {
            // Go to current week
            return RedirectToAction("Week", new { id = DateTime.Now.DayOfYear / 7 });
        }

        // GET: Schedules
        public ActionResult Week(int id)
        {
            user user = (user)Session["User"];

            // Calculate days in a week
            DateTime first = new DateTime(DateTime.Now.Year, 1, 1);
            int daysOffset = DayOfWeek.Thursday - first.DayOfWeek;
            DateTime firstThursday = first.AddDays(daysOffset);
            var cal = CultureInfo.CurrentCulture.Calendar;
            int firstWeek = cal.GetWeekOfYear(firstThursday, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);

            var weekNum = id;
            ViewBag.currentWeek = id;
            if (firstWeek == 1)
                weekNum -= 1;
            var result = firstThursday.AddDays(weekNum * 7);

            var startDate = result;
            startDate = startDate.AddDays(-(((startDate.DayOfWeek - DayOfWeek.Monday) + 7) % 7));
            var endDate = startDate.AddDays(7);
            // The number of days in our range of dates
            var numDays = (int)((endDate - startDate).TotalDays);

            List<DateTime> dates = Enumerable
                       .Range(0, numDays)
                       .Select(x => startDate.AddDays(x))
                       .ToList();

            DateTime last = dates.Last();
            DateTime firstd = dates.First();

            return View(_scheduleRepository.GetScheduleByWeek(user, firstd, last));
        }

        // GET: Schedules/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            schedule schedule = _scheduleRepository.GetScheduleById((int)id);

            if (schedule == null)
                return HttpNotFound();

            return View(schedule);
        }

        // POST: Schedules/Update/5
        [ValidateAntiForgeryToken]
        public ActionResult Update(int id)
        {
            schedule schedule = _scheduleRepository.GetScheduleById(id);
            schedule.Confirmed = schedule.Confirmed == 1 ? 0 : 1;
            _scheduleRepository.EditSchedule(schedule);

            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
