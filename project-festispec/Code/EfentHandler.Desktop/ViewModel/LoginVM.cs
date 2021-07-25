using EfentHandler.Desktop.View;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using System.Windows.Threading;

namespace EfentHandler.Desktop.ViewModel
{
    public class LoginVM : ViewModelBase
    {
        private UserRepository _userRepository = new UserRepository();
        private MainRepository _mainRepository = new MainRepository();
        private const int LOADINGTIME = 1;

        public ICommand LoginCommand { get; set; }

        public string EmailAddress { get; set; } = "Stijn@festispec.nl";
        public string Password { get; set; } = "123456";

        public string UserName { get; set; }
        public int UserTypeId { get; set; }

        public LoginVM()
        {
            LoginCommand = new RelayCommand<LoginWindow>(Login);
        }

        private void Login(LoginWindow loginWindow)
        {
            if (!_mainRepository.CheckConnection())
            {
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return; 
            }

            EmployeeVM employee = new EmployeeVM(_mainRepository.Login(EmailAddress, Password));
            OpenMainWindow(employee, loginWindow);
        }

        private void OpenMainWindow(EmployeeVM employee, LoginWindow loginWindow)
        {
            if (employee.ToModel() != null)
            {
                UserName = employee.FullName;
                ConfigurationManager.AppSettings["UserTypeId"] = employee.UserTypeId.ToString();
                ConfigurationManager.AppSettings["UserId"] = employee.UserId.ToString();
                ConfigurationManager.AppSettings["UserName"] = employee.FullName;

                // Hide LoginWindow while showing SplashScreen
                var splashScreen = new SplashScreen("logo_efenthandler_small.PNG");
                loginWindow.Hide();
                splashScreen.Show(false);

                // Instantiate MainWindow (so executing queries etc)
                MainWindow MainWindow = new MainWindow();

                // Close SplashScreen
                splashScreen.Close(TimeSpan.FromSeconds(LOADINGTIME));

                // Show MainWindow and close the LoginWindow
                MainWindow.Show();
                loginWindow.Close();
                
                // Clear variable, just in case
                splashScreen = null;
            }
            else
            {
                MessageBox.Show("De ingevoerde gegevens zijn niet bekend", "Waarschuwing");
            }
        }
    }
}
