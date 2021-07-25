using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using EfentHandler.Domain.Model;
using Z.EntityFramework.Plus;

namespace EfentHandler.Domain.Repository
{
    public class ClientRepository : MainRepository
    {
        public List<client> GetAllClients()
        {
            using (var db = new EfentHandlerEntities())
            {
                return db.client.Include("contactperson").Include("request").ToList();
            }
        }

        public List<string> ValidateClient(client client)
        {
            List<string> errors = new List<string>();
            errors.Add(_validation.CompanyName(client.CompanyName));
            errors.Add(_validation.KvKNumber(client.KvKNumber));
            errors.Add(_validation.EstablishmentNumber(client.EstablishmentNumber));
            errors.Add(_validation.Street(client.Street));
            errors.Add(_validation.ZipCode(client.ZipCode));
            errors.Add(_validation.City(client.City));
            errors.Add(_validation.HouseNumber(client.HouseNumber));
            errors.Add(_validation.HouseNumberAddition(client.HouseNumberAddition));
            errors.Add(_validation.Phone(client.Phone, "algemene gegevens"));
            errors.Add(_validation.Email(client.Email, 0, "algemene gegevens"));
            errors.Add(_validation.Website(client.Website));

            foreach (contactperson contactperson in client.contactperson)
            {
                var list = ValidateContactperson(contactperson);
                if (list != null)
                    list.ForEach(i => errors.Add(i));
            }

            foreach (request request in client.request)
            {
                var list = ValidateRequest(request);
                if (list != null)
                    list.ForEach(i => errors.Add(i));
            }

            foreach (string e in errors)
            {
                if (e != null)
                    return errors;
            }

            return null;
        }

        public List<string> ValidateContactperson(contactperson contactperson)
        {
            List<string> errors = new List<string>();
            errors.Add(_validation.FirstName(contactperson.FirstName, "contactpersonen"));
            errors.Add(_validation.LastName(contactperson.LastName, "contactpersonen"));
            errors.Add(_validation.Email(contactperson.Email, 0, "contactpersonen"));
            errors.Add(_validation.Phone(contactperson.Phone, "contactpersonen"));
            errors.Add(_validation.ClientId(contactperson.ClientId));
            errors.Add(_validation.Role(contactperson.Role, "contactpersonen"));

            foreach (string e in errors)
            {
                if (e != null)
                    return errors;
            }
            return null;
        }

        public List<string> ValidateRequest(request request)
        {
            List<string> errors = new List<string>();
            errors.Add(_validation.Description(request.Description, "wensen"));
            errors.Add(_validation.ClientId(request.ClientId));

            foreach (string e in errors)
            {
                if (e != null)
                    return errors;
            }
            return null;
        }

        public void AddClient(client client)
        {
            using (var db = new EfentHandlerEntities())
            {
                db.client.Add(client);
                db.SaveChanges();
            }
        }

        public void EditClient(client client, List<request> requests, List<contactperson> contactpersons)
        {
            using (var db = new EfentHandlerEntities())
            {
                //Update requests if needed
                if (requests != null)
                {
                    foreach (request request in client.request.ToList())
                    {
                        //Insert new request
                        if (request.RequestId == 0)
                        {
                            db.request.Add(request);
                        }
                        //Update existing request
                        else
                        {
                            request data = db.request.Find(request.RequestId);
                            db.Entry(data).CurrentValues.SetValues(request);
                            db.Entry(data).State = EntityState.Modified;
                        }
                    }

                    //Delete removed requests
                    foreach (request request in client.request.ToList())
                    {
                        if (!requests.Contains(request))
                        {
                            var r = db.request.Find(request.RequestId);
                            db.Entry(r).State = EntityState.Deleted;
                        }
                    }
                } //End request

                //Update contactpersons if needed
                if (contactpersons != null)
                {
                    foreach (contactperson contactperson in client.contactperson.ToList())
                    {
                        //Insert new contactperson
                        if (contactperson.ContactPersonId == 0)
                        {
                            db.contactperson.Add(contactperson);
                        }
                        //Update existing contactperson
                        else
                        {
                            contactperson data = db.contactperson.Find(contactperson.ContactPersonId);
                            db.Entry(data).CurrentValues.SetValues(contactperson);
                            db.Entry(data).State = EntityState.Modified;
                        }    
                    }

                    //Delete removed contactpersons
                    foreach (contactperson contactperson in client.contactperson.ToList())
                    {
                        if (!contactpersons.Contains(contactperson))
                        {
                            var r = db.contactperson.Find(contactperson.ContactPersonId);
                            db.Entry(r).State = EntityState.Deleted;
                        }
                    }
                } //End contactperson

                //Update client
                client a = db.client.Find(client.ClientId);
                db.Entry(a).CurrentValues.SetValues(client);
                db.Entry(a).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public bool RemoveClient(client client)
        {
            using (var db = new EfentHandlerEntities())
            {
                if (db.assignment.Any(c => c.ClientId == client.ClientId))
                {
                    return false;
                }
                else
                {
                    foreach (request request in client.request.ToList())
                    {
                        db.Entry(request).State = EntityState.Deleted;
                    }

                    foreach (contactperson contactperson in client.contactperson.ToList())
                    {
                        db.Entry(contactperson).State = EntityState.Deleted;
                    }

                    db.Entry(client).State = EntityState.Deleted;
                    db.SaveChanges();
                }
            }

            return true;
        }
    }
}