using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;

namespace EfentHandler.Desktop.ViewModel
{
    public class EmployeeAddVM : ViewModelBase
    {
        private EmployeeListVM _employeeList;

        public EmployeeVM Employee { get; set; }
        public ObservableCollection<UserTypeVM> UserTypes { get; set; }
        public ICommand SaveCommand { get; set; }

        public EmployeeAddVM() { }

        public EmployeeAddVM(EmployeeListVM employeeList)
        {
            _employeeList = employeeList;
            Employee = new EmployeeVM();
            UserTypes = _employeeList.UserTypes;

            SaveCommand = new RelayCommand(Save);
        }

        private void Save()
        {
            UserRepository repository = new UserRepository();

            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !repository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            var errors = repository.ValidateEmployee(Employee.ToModel());
            if (errors == null)
            {
                repository.AddEmployee(Employee.ToModel());

                _employeeList.EmployeeList.Add(Employee);
                MessageBox.Show("De wijzigingen zijn succesvol opgeslagen", "Gelukt");
                _employeeList.EmployeeList = new ObservableCollection<EmployeeVM>(repository.GetAllEmployees().Select(s => new EmployeeVM(s)));
                MessengerInstance.Send(new NotificationMessage("OpenEmployeeList"));
            }
            else
            {
                MessageBox.Show("Er zijn een aantal fouten gevonden: " + Environment.NewLine + " - " + string.Join(Environment.NewLine + " - ", errors.Where(x => x != null)), "Invoer niet opgeslagen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}