using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using EfentHandler.Domain.Model;
using EfentHandler.Domain.Repository;

namespace EfentHandler.Mobile.Controllers
{
    public class AssignmentsController : Controller
    {
        private EfentHandlerEntities db = new EfentHandlerEntities();
        private AssignmentRepository _assignmentRepository;

        public AssignmentsController()
        {
            _assignmentRepository = new AssignmentRepository();
        }

        // GET: Assignments
        public ActionResult Index()
        {
            try
            {
                user user = (user)Session["User"];
                var result = _assignmentRepository.GetAssignmentsThatBelongsToUser(user);

                return View(result);
            }
            catch (Exception)
            {
                // TODO: Change redirect
                return RedirectToRoute("Default");
            }
        }

        // GET: Assignments/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var assignment = _assignmentRepository.GetSingleAssignmentThatBelongsToUser(id);
            if (assignment == null)
            {
                return HttpNotFound();
            }

            ViewBag.UserId = ((user)Session["User"]).UserId;

            return View(assignment);
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
