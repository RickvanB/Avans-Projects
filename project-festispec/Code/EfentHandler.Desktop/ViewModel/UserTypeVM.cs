using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;

namespace EfentHandler.Desktop.ViewModel
{
    public class UserTypeVM : ViewModelBase
    {
        private usertype _usertype;

        public UserTypeVM(usertype userType)
        {
            _usertype = userType;
        }

        public UserTypeVM()
        {
            _usertype = new usertype();
        }

        public usertype ToModel()
        {
            return _usertype;
        }

        public int UserTypeId
        {
            get { return _usertype.UserTypeId; }
            set { _usertype.UserTypeId = value; }
        }

        public string UserType1
        {
            get { return _usertype.UserType1; }
            set { _usertype.UserType1 = value; }
        }

        public void Changed()
        {
            RaisePropertyChanged("UserTypeId");
            RaisePropertyChanged("UserType1");
        }
    }
}