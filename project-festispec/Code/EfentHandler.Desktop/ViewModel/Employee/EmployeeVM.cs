using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;

namespace EfentHandler.Desktop.ViewModel
{
    public class EmployeeVM : ViewModelBase
    {
        private user _employee;
        private bool _isAssigned;
        private bool _assignedChanged;
        public ICommand HasChanged { get; set; }



        public EmployeeVM(user employee)
        {
            _employee = employee;
            _assignedChanged = false;
            HasChanged = new RelayCommand(ChangeIsAssigned);
        }

        public EmployeeVM()
        {
            _employee = new user();
        }

        public bool IsAssigned
        {
            get { return _isAssigned; }
            set
            {
                if (this.UserId != Int32.Parse(ConfigurationManager.AppSettings["UserId"]))
                {
                    _isAssigned = value;
                }
            }
        }

        public bool SetIsAssignedFirst
        {
            set { _isAssigned = value; }
        }

        public void ChangeIsAssigned()
        {
            if (_assignedChanged)
            {
                _assignedChanged = false;
            }
            else
            {
                _assignedChanged = true;
            }
        }
        public bool AssignedChanged
        {
            get { return _assignedChanged; }
        }
        public user ToModel()
        {
            return _employee;
        }

        public int UserId
        {
            get { return _employee.UserId; }
            set { _employee.UserId = value; }
        }

        public string Email
        {
            get { return _employee.Email; }
            set { _employee.Email = value; }
        }

        public string Password
        {
            get { return _employee.Password; }
            set { _employee.Password = value; }
        }

        private string _passWordNew;
        public string PasswordNew
        {
            get { return _passWordNew; }
            set { _passWordNew = value; }
        }

        public string FirstName
        {
            get { return _employee.FirstName; }
            set { _employee.FirstName = value; }
        }

        public string LastName
        {
            get { return _employee.LastName; }
            set { _employee.LastName = value; }
        }

        public string Street
        {
            get { return _employee.Street; }
            set { _employee.Street = value; }
        }

        public string ZipCode
        {
            get { return _employee.ZipCode; }
            set { _employee.ZipCode = value; }
        }

        public string City
        {
            get { return _employee.City; }
            set { _employee.City = value; }
        }

        public int HouseNumber
        {
            get { return _employee.HouseNumber; }
            set { _employee.HouseNumber = value; }
        }

        public string HouseNumberAddition
        {
            get { return _employee.HouseNumberAddition; }
            set { _employee.HouseNumberAddition = value; }
        }

        public int Phone
        {
            get { return _employee.Phone; }
            set { _employee.Phone = value; }
        }

        public DateTime? ServiceDate
        {
            get { return _employee.ServiceDate; }
            set { _employee.ServiceDate = value; }
        }

        public int UserTypeId
        {
            get { return _employee.UserTypeId; }
            set { _employee.UserTypeId = value; }
        }

        public string FullName
        {
            get { return FirstName + " " + LastName; }
        }

        public string FullHouseNumber
        {
            get { return HouseNumber + HouseNumberAddition; }
        }

        public string UserType
        {
            get { return _employee.usertype.UserType1; }
        }

        public double Lat
        {
            get { return (double)_employee.Lat; }
            set { _employee.Lat = value; }
        }

        public double Long
        {
            get { return (double)_employee.Long; }
            set { _employee.Long = value; }
        }

        public ICollection<user_assignment> Assigments
        {
            get { return _employee.user_assignment; }
            set { _employee.user_assignment = value; }
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
            RaisePropertyChanged("Phone");
            RaisePropertyChanged("ServiceDate");
            RaisePropertyChanged("UserTypeId");
            RaisePropertyChanged("FullName");
            RaisePropertyChanged("UserType");
            RaisePropertyChanged("Lat");
            RaisePropertyChanged("Long");
        }
    }
}