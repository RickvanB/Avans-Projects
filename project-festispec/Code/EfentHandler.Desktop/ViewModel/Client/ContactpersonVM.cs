using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;

namespace EfentHandler.Desktop.ViewModel
{
    public class ContactpersonVM : ViewModelBase
    {
        private contactperson _contactPerson;

        public ContactpersonVM(contactperson contactPerson)
        {
            _contactPerson = contactPerson;
        }

        public ContactpersonVM()
        {
            _contactPerson = new contactperson();
        }

        public contactperson ToModel()
        {
            return _contactPerson;
        }

        public string FirstName
        {
            get { return _contactPerson.FirstName; }
            set { _contactPerson.FirstName = value; }
        }

        public string LastName
        {
            get { return _contactPerson.LastName; }
            set { _contactPerson.LastName = value; }
        }

        public string FullName
        {
            get { return FirstName + " " + LastName; }
        }

        public string Email
        {
            get { return _contactPerson.Email; }
            set { _contactPerson.Email = value; }
        }

        public int Phone
        {
            get { return _contactPerson.Phone; }
            set { _contactPerson.Phone = value; }
        }

        public string Notes
        {
            get { return _contactPerson.Notes; }
            set { _contactPerson.Notes = value; }
        }

        public int ClientId
        {
            get { return _contactPerson.ClientId; }
            set { _contactPerson.ClientId = value; }
        }

        public string Role
        {
            get { return _contactPerson.Role; }
            set { _contactPerson.Role = value; }
        }

        public void Changed()
        {
            RaisePropertyChanged("FirstName");
            RaisePropertyChanged("LastName");
            RaisePropertyChanged("Email");
            RaisePropertyChanged("Phone");
            RaisePropertyChanged("Notes");
            RaisePropertyChanged("ClientId");
            RaisePropertyChanged("Role");
        }
    }
}