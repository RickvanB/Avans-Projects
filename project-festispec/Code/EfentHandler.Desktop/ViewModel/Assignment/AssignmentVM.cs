using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;

namespace EfentHandler.Desktop.ViewModel
{
    public class AssignmentVM : ViewModelBase
    {
        private assignment _assignment;
        private bool _addWindow;
        private DateTime _startDate;
        private DateTime _endDate;

        public AssignmentVM(assignment assignment)
        {
            _assignment = assignment;
            _startDate = assignment.StartDate;
            _endDate = assignment.EndDate;
            _addWindow = false;
        }

        public AssignmentVM()
        {
            _assignment = new assignment();
            _addWindow = true;
        }

        public int AssignmentId
        {
            get { return _assignment.AssignmentId; }
            set { _assignment.AssignmentId = value; }
        }
        public string Description
        {
            get { return _assignment.Description; }
            set { _assignment.Description = value; }
        }
        public DateTime StartDate
        {
            get { return _assignment.StartDate; }
            set
            {
                _assignment.StartDate = value;
                if (_addWindow)
                    EndDate = value;
            }
        }
        public DateTime EndDate
        {
            get { return _assignment.EndDate; }
            set { _assignment.EndDate = value; RaisePropertyChanged("EndDate"); }
        }
        public bool DateChanged { get; set; } = false;

        public string Street
        {
            get { return _assignment.Street; }
            set { _assignment.Street = value; }
        }
        public int HouseNumber
        {
            get { return _assignment.HouseNumber; }
            set { _assignment.HouseNumber = value; }
        }

        public string HouseNumberAddition
        {
            get { return _assignment.HouseNumberAddition; }
            set { _assignment.HouseNumberAddition = value; }
        }

        public string City
        {
            get { return _assignment.City; }
            set { _assignment.City = value; }
        }

        public string ZipCode
        {
            get { return _assignment.ZipCode; }
            set { _assignment.ZipCode = value; }
        }

        public int StatusId
        {
            get { return _assignment.StatusId; }
            set { _assignment.StatusId = value; }
        }

        public string Request
        {
            get { return _assignment.Request; }
            set { _assignment.Request = value; }
        }

        public ObservableCollection<RequestVM> UserRequests
        {
            get { return new ObservableCollection<RequestVM>(_assignment.client.request.ToList().Select(r => new RequestVM(r))); }
        }

        public string Advice
        {
            get { return _assignment.Advice; }
            set { _assignment.Advice = value; }
        }

        public client Client
        {
            get { return _assignment.client; }
            set { _assignment.client = value; }
        }

        public int ClientId
        {
            get { return _assignment.ClientId; }
            set { _assignment.ClientId = value; }
        }

        public string ClientName
        {
            get { return _assignment.client.CompanyName; }
            set { _assignment.client.CompanyName = value; }
        }

        public double Lat
        {
            get { return (double) _assignment.Lat; }
            set { _assignment.Lat = value; }
        }

        public double Long
        {
            get { return (double)_assignment.Long; }
            set { _assignment.Long = value; }
        }

        public ICollection<survey> Surveys
        {
            get { return _assignment.survey; }
            set { _assignment.survey = value; }
        }

        public void Changed()
        {
            RaisePropertyChanged("Email");
        }

        public void SetDatesBack()
        {
            _assignment.StartDate = _startDate;
            _assignment.EndDate = _endDate;
        }

        public assignment ToModel()
        {
            return _assignment;
        }
    }
}