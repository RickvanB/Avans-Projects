using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;

namespace EfentHandler.Desktop.ViewModel
{
    public class UserAssignmentVM : ViewModelBase
    {
        private user_assignment _userassignment;

        public UserAssignmentVM(user_assignment userassignment)
        {
            _userassignment = userassignment;
        }

        public UserAssignmentVM()
        {
            _userassignment = new user_assignment();
        }

        public int AssignmentId
        {
            get { return _userassignment.AssignmentId; }
            set { _userassignment.AssignmentId = value; }
        }
        public int UserId
        {
            get { return _userassignment.UserId; }
            set { _userassignment.UserId = value; }
        }
        public user_assignment ToModel()
        {
            return _userassignment;
        }
    }
}