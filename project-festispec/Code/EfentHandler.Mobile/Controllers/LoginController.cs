using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using EfentHandler.Domain.Model;
using EfentHandler.Domain.Repository;

namespace EfentHandler.Mobile.Controllers
{
    public class LoginController : Controller
    {
        //private EfentHandlerEntities db = new EfentHandlerEntities();

        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        // POST: Login
        [HttpPost]
        public ActionResult Login(string email, string password)
        {
            try
            {
                MainRepository mainRepository = new MainRepository();
                user inspector = mainRepository.LoginInspector(email, password);

                if (inspector != null)
                {
                    Session["User"] = inspector;
                    return Redirect("/Availabilities");
                }
                else
                {
                    return RedirectToAction("Index");
                }
            }
            catch
            {
                // TODO: Put error in Viewbag
                return RedirectToAction("Index");
            }
        }

        public ActionResult Out()
        {
            Session["User"] = null;
            return RedirectToAction("Index");
        }
    }
}
