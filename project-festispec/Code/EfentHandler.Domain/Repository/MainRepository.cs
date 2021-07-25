using EfentHandler.Domain.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace EfentHandler.Domain.Repository
{
    public class MainRepository
    {
        protected Validation _validation;

        public MainRepository()
        {
            _validation = new Validation();
        }

        public bool CheckConnection()
        {
            using (var db = new EfentHandlerEntities())
            {
                DbConnection conn = db.Database.Connection;

                try
                {
                    using (var client = new WebClient())
                    using (client.OpenRead("https://www.google.nl/"))
                    {
                        return true;
                    }
                }
                catch
                {
                    return false;
                }
            }
        }

        public user Login(string emailAddress, string password)
        {
            string hashedPassword = ComputeSha256Hash(password);
            using (var db = new EfentHandlerEntities())
            {
                user user = db.user.Where(u => u.Email == emailAddress).Where(u => u.Password == hashedPassword).Where(u => u.UserTypeId != 4).FirstOrDefault();
                if (user != null)
                    return user;

                return null;
            }
        }

        public user LoginInspector(string emailAddress, string password)
        {
            string hashedPassword = ComputeSha256Hash(password);
            using (var db = new EfentHandlerEntities())
            {
                user user = db.user.Where(u => u.Email == emailAddress).Where(u => u.Password == hashedPassword).Where(u => u.UserTypeId == 4).FirstOrDefault();
                if (user != null)
                    return user;

                return null;
            }
        }

        protected string ComputeSha256Hash(string rawData)
        {
            // Create a SHA256   
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
