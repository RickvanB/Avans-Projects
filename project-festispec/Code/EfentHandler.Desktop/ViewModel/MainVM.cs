using CommonServiceLocator;
using EfentHandler.Desktop.View;
using EfentHandler.Domain.Model;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace EfentHandler.Desktop.ViewModel
{
    public class MainVM : ViewModelBase
    {
        private MainRepository _mainRepository;

        private Stack<MenuItemVM> _menuItemStack;
        private MenuItemVM _selectedPageItem;
        private MenuItemVM _selectedMenuItem;

        public int UserTypeId { get; set; }

        public ObservableCollection<MenuItemVM> MenuItems { get; set; }
        public ObservableCollection<MenuItemVM> PageItems { get; set; }

        public MenuItemVM SelectedMenuItem
        {
            get { return _selectedMenuItem; }
            set
            {
                if (value.Name != "Kaart")
                {
                    bool isReport = false;
                    if (_selectedPageItem != null && (_selectedPageItem.Name == "Opdrachten / Rapportage" || _selectedPageItem.Name == "Opdrachten / Rapportage / Mailen"))
                        isReport = true;

                    if (MenuItems.Where(mi => mi.Name == value.Name).Count() > 0)
                    {
                        _selectedMenuItem = value;
                        _selectedPageItem = value;
                    }
                    else
                    {
                        _selectedMenuItem = null;
                        _selectedPageItem = value;
                    }

                    SelectedViewModel = value.ViewModel;
                    PageName = value.Name;

                    if (PageName == "Klanten" || PageName == "Opdrachten" || PageName == "Inspecteurs" || PageName == "Medewerkers" || PageName == "Templates")
                    {
                        ButtonAddVisible = true;

                        if (
                            (PageName == "Opdrachten" && UserTypeId == 2) ||
                            (PageName == "Inspecteurs" && (UserTypeId == 2 || UserTypeId == 3)) ||
                            (PageName == "Medewerkers" && (UserTypeId == 2 || UserTypeId == 3))
                        )
                            ButtonAddVisible = false;
                    }
                    else
                    {
                        ButtonAddVisible = false;
                    }

                    if (_menuItemStack.Count == 0 || _menuItemStack.Peek() != (_selectedMenuItem == null ? _selectedPageItem : _selectedMenuItem))
                        if (!isReport)
                            _menuItemStack.Push((_selectedMenuItem == null ? _selectedPageItem : _selectedMenuItem));

                    if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 0 && !_mainRepository.CheckConnection())
                    {
                        ConfigurationManager.AppSettings["NoConnection"] = 1.ToString();
                        ShowStatusBar = true;
                    }

                    RaisePropertyChanged("SelectedMenuItem");
                    RaisePropertyChanged("PageName");
                    RaisePropertyChanged("SelectedViewModel");
                    RaisePropertyChanged("ButtonAddVisible");
                    RaisePropertyChanged("ShowStatusBar");
                }
                else
                {
                    if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_mainRepository.CheckConnection())
                    {
                        ConfigurationManager.AppSettings["NoConnection"] = 1.ToString();
                        ShowStatusBar = true;
                        MessageBox.Show("Kaart is niet beschikbaar wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                        return;
                    }

                    MapWindow mapWindow = new MapWindow();
                    mapWindow.ShowDialog();
                }
            }
        }

        public string PageName { get; set; }
        public string UserName { get; set; } = ConfigurationManager.AppSettings["UserName"];
        public object SelectedViewModel { get; set; }

        public bool ShowStatusBar { get; set; } = false;
        public bool ButtonAddVisible { get; set; }
        public ICommand ButtonAddCommand { get; set; }
        public ICommand BackButtonCommand { get; set; }
        public ICommand ShowMyProfileCommand { get; set; }
        public ICommand ReloadDatabaseCommand { get; set; }
        public ICommand LogoutCommand { get; set; }

        public MainVM()
        {
            _mainRepository = new MainRepository();
            UserTypeId = Int32.Parse(ConfigurationManager.AppSettings["UserTypeId"]);

            _menuItemStack = new Stack<MenuItemVM>();
            MenuItems = new ObservableCollection<MenuItemVM>();
            PageItems = new ObservableCollection<MenuItemVM>();
            ButtonAddCommand = new RelayCommand(ButtonAdd);
            BackButtonCommand = new RelayCommand(ButtonBack);
            ShowMyProfileCommand = new RelayCommand(ShowMyProfile);
            ReloadDatabaseCommand = new RelayCommand(ReloaDatabase);
            LogoutCommand = new RelayCommand<MainWindow>(Logout);

            MenuItems.Add(new MenuItemVM { Name = "Dashboard", ViewModel = this });

            MenuItems.Add(new MenuItemVM { Name = "Klanten", ViewModel = new ClientListVM() });
            PageItems.Add(new MenuItemVM { Name = "Klanten / Toevoegen", ViewModel = new ClientAddVM() });
            PageItems.Add(new MenuItemVM { Name = "Klanten / Wijzigen", ViewModel = new ClientEditVM() });

            MenuItems.Add(new MenuItemVM { Name = "Opdrachten", ViewModel = new AssignmentListVM() });
            PageItems.Add(new MenuItemVM { Name = "Opdrachten / Toevoegen", ViewModel = new AssignmentAddVM() });
            PageItems.Add(new MenuItemVM { Name = "Opdrachten / Wijzigen", ViewModel = new AssignmentEditVM() });

            MenuItems.Add(new MenuItemVM { Name = "Inspecteurs", ViewModel = new InspectorListVM() });
            PageItems.Add(new MenuItemVM { Name = "Inspecteurs / Toevoegen", ViewModel = new InspectorAddVM() });
            PageItems.Add(new MenuItemVM { Name = "Inspecteurs / Wijzigen", ViewModel = new InspectorEditVM() });

            MenuItems.Add(new MenuItemVM { Name = "Medewerkers", ViewModel = new EmployeeListVM() });
            PageItems.Add(new MenuItemVM { Name = "Medewerkers / Toevoegen", ViewModel = new EmployeeAddVM() });
            PageItems.Add(new MenuItemVM { Name = "Medewerkers / Wijzigen", ViewModel = new EmployeeEditVM() });

            MenuItems.Add(new MenuItemVM { Name = "Templates", ViewModel = new TemplateListVM() });
            PageItems.Add(new MenuItemVM { Name = "Templates / Toevoegen", ViewModel = new TemplateAddVM() });
            PageItems.Add(new MenuItemVM { Name = "Templates / Wijzigen", ViewModel = new TemplateEditVM() });

            PageItems.Add(new MenuItemVM { Name = "Opdrachten / Vragenlijsten / Toevoegen", ViewModel = new SurveyAddVM() });
            PageItems.Add(new MenuItemVM { Name = "Opdrachten / Vragenlijsten / Wijzigen", ViewModel = new SurveyEditVM() });
            PageItems.Add(new MenuItemVM { Name = "Opdrachten / Rapportage", ViewModel = new ReportVM() });

            MenuItems.Add(new MenuItemVM { Name = "Kaart", ViewModel = new MapVM() });
            PageItems.Add(new MenuItemVM { Name = "Mijn profiel", ViewModel = new MyProfileVM() });

            PageItems.Add(new MenuItemVM { Name = "Opdrachten / Rapportage", ViewModel = new ReportVM() });
            PageItems.Add(new MenuItemVM { Name = "Opdrachten / Rapportage / Mailen", ViewModel = new MailVM() });
            PageItems.Add(new MenuItemVM { Name = "Opdrachten / Vragenlijsten / Antwoorden", ViewModel = new SurveyAnswerVM() });

            SelectedMenuItem = MenuItems[0];

            Messenger.Default.Register<NotificationMessage>(this, (message) =>
            {
                switch (message.Notification)
                {
                    case "OpenClientEdit":
                        SelectedMenuItem = PageItems[1];
                        break;
                    case "OpenAssignmentEdit":
                        SelectedMenuItem = PageItems[3];
                        break;
                    case "OpenInspectorEdit":
                        SelectedMenuItem = PageItems[5];
                        break;
                    case "OpenEmployeeEdit":
                        SelectedMenuItem = PageItems[7];
                        break;
                    case "OpenTemplateEdit":
                        SelectedMenuItem = PageItems[9];
                        break;
                    case "OpenSurveyEdit":
                        SelectedMenuItem = PageItems[11];
                        break;
                    case "OpenSurveyAnswer":
                        SelectedMenuItem = PageItems[16];
                        break;

                    case "OpenAssignmentAdd":
                        SelectedMenuItem = PageItems[2];
                        break;
                    case "OpenSurveyAdd":
                        SelectedMenuItem = PageItems[10];
                        break;

                    case "OpenClientList":
                        SelectedMenuItem = MenuItems[1];
                        break;
                    case "OpenAssignmentList":
                        SelectedMenuItem = MenuItems[2];
                        break;
                    case "OpenInspectorList":
                        SelectedMenuItem = MenuItems[3];
                        break;
                    case "OpenEmployeeList":
                        SelectedMenuItem = MenuItems[4];
                        break;
                    case "OpenTemplateList":
                        SelectedMenuItem = MenuItems[5];
                        break;

                    case "OpenReport":
                        SelectedMenuItem = PageItems[14];
                        break;
                    case "OpenMail":
                        SelectedMenuItem = PageItems[15];
                        break;

                    case "ShowStatusBar":
                        ShowStatusBar = true;
                        RaisePropertyChanged("ShowStatusBar");
                        break;
                }
            });
        }
        
        private void ShowMyProfile()
        {
            SelectedMenuItem = PageItems[13];
        }

        private void ButtonAdd()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_mainRepository.CheckConnection())
            {
                ShowStatusBar = true;
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            switch (SelectedMenuItem.Name)
            {
                case "Klanten":
                    SelectedMenuItem = PageItems[0];
                    break;
                case "Opdrachten":
                    SelectedMenuItem = PageItems[2];
                    break;
                case "Inspecteurs":
                    SelectedMenuItem = PageItems[4];
                    break;
                case "Medewerkers":
                    SelectedMenuItem = PageItems[6];
                    break;
                case "Templates":
                    SelectedMenuItem = PageItems[8];
                    break;
                case "Opdrachten / Vragenlijsten":
                    SelectedMenuItem = PageItems[10];
                    break;
            }
        }

        private void ButtonBack()
        {
            if (_menuItemStack.Count > 1)
            {
                _menuItemStack.Pop();
                SelectedMenuItem = _menuItemStack.Peek();
            }               
        }

        private void Logout(MainWindow mainWindow)
        {
            LoginWindow loginWindow = new LoginWindow();
            loginWindow.Show();
            mainWindow.Close();
        }

        private void ReloaDatabase()
        {
            if (_mainRepository.CheckConnection())
            {
                ConfigurationManager.AppSettings["NoConnection"] = 0.ToString();
                ShowStatusBar = false;
                RaisePropertyChanged("ShowStatusBar");
            }
        }
    }
}
