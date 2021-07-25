using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;

namespace EfentHandler.Desktop.ViewModel
{
    public class InspectorVM : ViewModelBase
    {
        private user _inspector;

        private List<availability> _availabilities;
        private bool _hasSchedule;
        private bool _changedSchedule;
        private schedule _currentSchedule;
        public ICommand HasChanged { get; set; }

        public InspectorVM(user inspector)
        {
            _inspector = inspector;
            HasChanged = new RelayCommand(ChangeSchedule);
            _currentSchedule = new schedule();
        }

        public InspectorVM()
        {
            _inspector = new user();
        }

        public void ChangeSchedule()
        {
            if (_changedSchedule)
            {
                _changedSchedule = false;
            }
            else
            {
                _changedSchedule = true;
            }
        }

        public bool ScheduleChanged
        {
            get { return _changedSchedule; }
        }

        public bool HasSchedule
        {
            get { return _hasSchedule; }
            set { _hasSchedule = value; }
        }

        public schedule CurrentSchedule
        {
            get { return _currentSchedule; }
            set { _currentSchedule = value; }
        }

        public ICollection<availability> Availability
        {
            get { return _inspector.availability; }
            set { _inspector.availability = value; }
        }

        public ICollection<schedule> Schedule
        {
            get { return _inspector.schedule; }
            set { _inspector.schedule = value; }
        }

        public int Id
        {
            get { return _inspector.UserId; }
            set { _inspector.UserId = value; }
        }

        public string Email
        {
            get { return _inspector.Email; }
            set { _inspector.Email = value; }
        }

        public string Password
        {
            get { return _inspector.Password; }
            set { _inspector.Password = value; }
        }

        private string _passWordNew;
        public string PasswordNew
        {
            get { return _passWordNew; }
            set { _passWordNew = value; }
        }

        public string FirstName
        {
            get { return _inspector.FirstName; }
            set { _inspector.FirstName = value; }
        }

        public string LastName
        {
            get { return _inspector.LastName; }
            set { _inspector.LastName = value; }
        }

        public string Street
        {
            get { return _inspector.Street; }
            set { _inspector.Street = value; }
        }

        public string ZipCode
        {
            get { return _inspector.ZipCode; }
            set { _inspector.ZipCode = value; }
        }

        public string City
        {
            get { return _inspector.City; }
            set { _inspector.City = value; }
        }

        public int HouseNumber
        {
            get { return _inspector.HouseNumber; }
            set { _inspector.HouseNumber = value; }
        }

        public string HouseNumberAddition
        {
            get { return _inspector.HouseNumberAddition; }
            set { _inspector.HouseNumberAddition = value; }
        }

        public int Phone
        {
            get { return _inspector.Phone; }
            set { _inspector.Phone = value; }
        }

        public DateTime? ServiceDate
        {
            get { return _inspector.ServiceDate; }
            set { _inspector.ServiceDate = value; }
        }

        public bool Certified
        {
            get { return _inspector.Certified; }
            set { _inspector.Certified = value; }
        }

        public DateTime? CertificationEndDate
        {
            get { return _inspector.CertificationEndDate; }
            set { _inspector.CertificationEndDate = value; }
        }

        public string IBAN
        {
            get { return _inspector.IBAN; }
            set { _inspector.IBAN = value; }
        }

        public int UserTypeId
        {
            get { return _inspector.UserTypeId; }
            set { _inspector.UserTypeId = value; }
        }

        public string FullName
        {
            get { return FirstName + " " + LastName; }
        }

        public string TravelDistance { get; set; }
        
        public double Lat
        {
            get { return (double) _inspector.Lat; }
            set { _inspector.Lat = value; }
        }

        public double Long
        {
            get { return (double)_inspector.Long; }
            set { _inspector.Long = value; }
        }
        
        public user ToModel()
        {
            return _inspector;
        }

        public void Changed()
        {
            RaisePropertyChanged("Email");
            RaisePropertyChanged("Password");
            RaisePropertyChanged("FirstName");
            RaisePropertyChanged("LastName");
            RaisePropertyChanged("Street");
            RaisePropertyChanged("ZipCode");
            RaisePropertyChanged("City");
            RaisePropertyChanged("HouseNumber");
            RaisePropertyChanged("HouseNumberAddition");
            RaisePropertyChanged("ServiceDate");
            RaisePropertyChanged("Certified");
            RaisePropertyChanged("CertificationEndDate");
            RaisePropertyChanged("IBAN");
            RaisePropertyChanged("UserTypeId");
            RaisePropertyChanged("FullName");
            RaisePropertyChanged("Lat");
            RaisePropertyChanged("Long");
        }
    }
}