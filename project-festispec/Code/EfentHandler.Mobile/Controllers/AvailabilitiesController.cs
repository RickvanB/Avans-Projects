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
    public class AvailabilitiesController : Controller
    {
        private ScheduleRepository _scheduleRepository;

        public AvailabilitiesController()
        {
            _scheduleRepository = new ScheduleRepository();
        }

        public ActionResult Index()
        {
            // Go to current week
            return RedirectToAction("Week", new { id = DateTime.Now.DayOfYear / 7 });
        }
        
        // GET: Availabilities/Week/5
        public ActionResult Week(int id)
        {
            try
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

                Dictionary<DateTime, bool> availabilities = new Dictionary<DateTime, bool>();

                foreach (var date in dates)
                {
                    var available = _scheduleRepository.IsAvailableOnDate(date, user);
                    availabilities.Add(date, available);
                }

                ViewBag.availabilities = availabilities;

                return View();
            }
            catch (Exception)
            {
                // TODO: Change redirect
                return Redirect("/Login");
            }
        }

        // POST: Availabilities/Week
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Week(string date, int week)
        {
            user user = (user)Session["User"];
            _scheduleRepository.AddAvailablity(Convert.ToDateTime(date), user);

            return RedirectToAction("Week", new { id = week });
        }

        // POST: Availabilities/Delete
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(string date, int week)
        {
            user user = (user)Session["User"];
            DateTime dt = Convert.ToDateTime(date);
            _scheduleRepository.RemoveAvailablity(dt, user);

            return RedirectToAction("Week", new { id = week });
        }
    }
}
