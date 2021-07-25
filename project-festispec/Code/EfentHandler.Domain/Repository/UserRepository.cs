using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using EfentHandler.Domain.Model;
using Z.EntityFramework.Plus;

namespace EfentHandler.Domain.Repository
{
    public class UserRepository : MainRepository
    {
        public user GetUser(string emailAddress)
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.user.Where(u => u.Email == emailAddress).Where(u => u.UserTypeId != 4).FirstOrDefault();
            }
        }

        public List<user> GetAllEmployees()
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.user.Where(u =>
                   u.UserTypeId.Equals(1) ||
                   u.UserTypeId.Equals(2) ||
                   u.UserTypeId.Equals(3)
                   ).Include("user_assignment")
                   .Include(u => u.usertype)
                   .ToList();
            }
        }

        public List<user> GetAllInspectors()
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.user.Where(u => u.UserTypeId.Equals(4)).Include("availability").Include("schedule").ToList();
            }
        }

        public int GetAmountInspectors()
        {
            using (var db = new EfentHandlerEntities())
            {

                if (CheckConnection())
                {
                    return db.user.Where(u => u.UserTypeId.Equals(4)).ToList().Count();
                }
                else
                {
                    return db.user.Where(u => u.UserTypeId.Equals(4)).FromCache().ToList().Count();
                }
            }
        }

        public List<usertype> GetAllUserTypes()
        {
            using (var db = new EfentHandlerEntities())
            {
                if (CheckConnection())
                {
                    return db.usertype.ToList();
                }
                else
                {
                    return db.usertype.FromCache().ToList();
                }
            }
        }

        public List<string> ValidateEmployee(user employee)
        {
            List<string> errors = new List<string>();
            errors.Add(_validation.Email(employee.Email, employee.UserId, null));
            errors.Add(_validation.Password(employee.Password));
            errors.Add(_validation.FirstName(employee.FirstName, null));
            errors.Add(_validation.LastName(employee.LastName, null));
            errors.Add(_validation.Street(employee.Street));
            errors.Add(_validation.ZipCode(employee.ZipCode));
            errors.Add(_validation.City(employee.City));
            errors.Add(_validation.HouseNumber(employee.HouseNumber));
            errors.Add(_validation.HouseNumberAddition(employee.HouseNumberAddition));
            errors.Add(_validation.Phone(employee.Phone, null));
            errors.Add(_validation.ServiceDate(employee.ServiceDate));
            errors.Add(_validation.EmployeeUserTypeId(employee.UserTypeId));

            foreach (string e in errors)
            {
                if (e != null)
                    return errors;
            }
            return null;
        }

        public List<string> ValidateInspector(user inspector)
        {
            List<string> errors = new List<string>();
            errors.Add(_validation.Email(inspector.Email, inspector.UserId, null));
            errors.Add(_validation.Password(inspector.Password));
            errors.Add(_validation.FirstName(inspector.FirstName, null));
            errors.Add(_validation.LastName(inspector.LastName, null));
            errors.Add(_validation.Street(inspector.Street));
            errors.Add(_validation.ZipCode(inspector.ZipCode));
            errors.Add(_validation.City(inspector.City));
            errors.Add(_validation.HouseNumber(inspector.HouseNumber));
            errors.Add(_validation.HouseNumberAddition(inspector.HouseNumberAddition));
            errors.Add(_validation.Phone(inspector.Phone, null));
            errors.Add(_validation.ServiceDate(inspector.ServiceDate));
            errors.Add(_validation.Certification(inspector.Certified, inspector.CertificationEndDate));
            errors.Add(_validation.IBAN(inspector.IBAN));
            errors.Add(_validation.InspectorUserTypeId(inspector.UserTypeId));

            foreach (string e in errors)
            {
                if (e != null)
                    return errors;
            }
            return null;
        }

        public void AddEmployee(user employee)
        {
            employee.Password = ComputeSha256Hash(employee.Password);
            using (var db = new EfentHandlerEntities())
            {
                db.user.Add(employee);
                db.SaveChanges();
            }
        }

        public void AddInspector(user inspector)
        {
            inspector.Password = ComputeSha256Hash(inspector.Password);
            using (var db = new EfentHandlerEntities())
            {
                db.user.Add(inspector);
                db.SaveChanges();
            }
        }

        public void EditEmployee(user employee, string password)
        {
            if (password != null)
                employee.Password = ComputeSha256Hash(password);

            using (var db = new EfentHandlerEntities())
            {
                db.Entry(employee).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public void EditInspector(user inspector, string password)
        {
            if (password != null)
                inspector.Password = ComputeSha256Hash(password);

            using (var db = new EfentHandlerEntities())
            {
                db.Entry(inspector).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public bool RemoveUser(user user)
        {
            try
            {
                using (var db = new EfentHandlerEntities())
                {
                    user = db.user.Find(user.UserId);
                    db.Entry(user).State = EntityState.Deleted;
                    db.SaveChanges();
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<user> GetAllAvailableInspectors(DateTime StartDate, DateTime EndDate)
        {
            using (var db = new EfentHandlerEntities())
            {
                var availableuserslist = db.availability.Where(a => a.Date >= StartDate && a.Date <= EndDate).Select(av => av.UserId).ToList();

                return db.user.Where(u => u.UserTypeId.Equals(4)).Where(i => availableuserslist.Contains(i.UserId)).ToList();
            }
        }
    }
}