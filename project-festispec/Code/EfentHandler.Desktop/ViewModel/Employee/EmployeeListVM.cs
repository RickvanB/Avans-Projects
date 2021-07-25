using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using System.Windows;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;
using System.Configuration;

namespace EfentHandler.Desktop.ViewModel
{
    public class EmployeeListVM : ViewModelBase
    {
        private UserRepository _userRepository;
        private EmployeeVM _selectedEmployee;

        public bool ButtonEditVisible { get; set; }
        public bool ButtonDeleteVisible { get; set; }

        public EmployeeVM SelectedEmployee
        {
            get { return _selectedEmployee; }
            set
            {
                _selectedEmployee = value;
                base.RaisePropertyChanged();
            }
        }

        public ObservableCollection<EmployeeVM> EmployeeList { get; set; }
        public ObservableCollection<UserTypeVM> UserTypes { get; set; }

        public ICommand EmployeeDeleteCommand { get; set; }
        public ICommand ShowEmployeeEditCommand { get; set; }

        public EmployeeListVM()
        {
            _userRepository = new UserRepository();
            UserTypes = new ObservableCollection<UserTypeVM>(_userRepository.GetAllUserTypes().Where(u => u.UserTypeId != 4).Select(e => new UserTypeVM(e)));

            EmployeeDeleteCommand = new RelayCommand(EmployeeDelete);
            ShowEmployeeEditCommand = new RelayCommand(ShowEmployeeEdit);

            Refresh();
        }

        public void Refresh()
        {
            ButtonEditVisible = Int32.Parse(ConfigurationManager.AppSettings["UserTypeId"]) == 1 ? true : false;
            ButtonDeleteVisible = Int32.Parse(ConfigurationManager.AppSettings["UserTypeId"]) == 1 ? true : false;

            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) != 1 && _userRepository.CheckConnection())
                EmployeeList = new ObservableCollection<EmployeeVM>(_userRepository.GetAllEmployees().Select(e => new EmployeeVM(e)));
        }

        private void EmployeeDelete()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_userRepository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (_userRepository.RemoveUser(_selectedEmployee.ToModel()))
            {
                EmployeeList.Remove(SelectedEmployee);
                MessageBox.Show("De medewerker is succesvol verwijderd", "Succesvol verwijderd");
            }
            else
            {
                MessageBox.Show("De medewerker is niet verwijderd. Herlaad de pagina en probeer het opnieuw.", "Niet verwijderd", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ShowEmployeeEdit()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["UserTypeId"]) != 1)
            {
                MessageBox.Show("U heeft geen rechten om deze actie uit te voeren", "Geen rechten!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            MessengerInstance.Send(new NotificationMessage("OpenEmployeeEdit"));
        }
    }
}