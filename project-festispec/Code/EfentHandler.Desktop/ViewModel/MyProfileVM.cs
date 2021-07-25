using EfentHandler.Domain.Model;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using Microsoft.Maps.MapControl.WPF;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class MyProfileVM : ViewModelBase
    {
        private UserRepository _userRepository;

        public EmployeeVM Employee { get; set; }

        public MyProfileVM()
        {
            _userRepository = new UserRepository(); 
        }

        public void Refresh()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) != 1)
                Employee = _userRepository.GetAllEmployees().Where(u => u.UserId == Int32.Parse(ConfigurationManager.AppSettings["UserId"])).Select(e => new EmployeeVM(e)).FirstOrDefault();
        }
    }
}