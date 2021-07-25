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
    public class InspectorListVM : ViewModelBase
    {
        private UserRepository _userRepository;
        private InspectorVM _selectedInspector;

        public bool ButtonDeleteVisible { get; set; }

        public InspectorVM SelectedInspector
        {
            get { return _selectedInspector; }
            set
            {
                _selectedInspector = value;
                base.RaisePropertyChanged();
            }
        }

        public ObservableCollection<InspectorVM> InspectorList { get; set; }

        public ICommand InspectorDeleteCommand { get; set; }
        public ICommand ShowInspectorEditCommand { get; set; }

        public InspectorListVM()
        {
            _userRepository = new UserRepository();
            InspectorDeleteCommand = new RelayCommand(InspectorDelete);
            ShowInspectorEditCommand = new RelayCommand(ShowInspectorEdit);

            Refresh();
        }

        public void Refresh()
        {
            ButtonDeleteVisible = Int32.Parse(ConfigurationManager.AppSettings["UserTypeId"]) == 1 ? true : false;

            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) != 1 && _userRepository.CheckConnection())
                InspectorList = new ObservableCollection<InspectorVM>(_userRepository.GetAllInspectors().Select(e => new InspectorVM(e)));
        }

        private void InspectorDelete()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_userRepository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (_userRepository.RemoveUser(_selectedInspector.ToModel()))
            {
                InspectorList.Remove(SelectedInspector);
                MessageBox.Show("De inspecteur is succesvol verwijderd", "Succesvol verwijderd");
                InspectorList = new ObservableCollection<InspectorVM>(_userRepository.GetAllInspectors().Select(e => new InspectorVM(e)));
            }
            else
            {
                MessageBox.Show("De medewerker is niet verwijderd. Herlaad de pagina en probeer het opnieuw.", "Niet verwijderd", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ShowInspectorEdit()
        {
            MessengerInstance.Send(new NotificationMessage("OpenInspectorEdit"));
        }
    }
}