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
    public class ClientListVM : ViewModelBase
    {
        private ClientRepository _clientRepository;
        private ClientVM _selectedClient;

        public bool ButtonDeleteVisible { get; set; }

        public ClientVM SelectedClient
        {
            get { return _selectedClient; }
            set
            {
                _selectedClient = value;
                base.RaisePropertyChanged();
            }
        }

        public ObservableCollection<ClientVM> ClientList { get; set; }
        public ObservableCollection<UserTypeVM> ContactPersons { get; set; }
        public ICommand ClientDeleteCommand { get; set; }
        public ICommand ShowClientAddCommand { get; set; }
        public ICommand ShowClientEditCommand { get; set; }

        public ClientListVM()
        {
            _clientRepository = new ClientRepository();
            ClientDeleteCommand = new RelayCommand(ClientDelete);
            ShowClientEditCommand = new RelayCommand(ShowClientEdit);
        }

        public void Refresh()
        {
            ButtonDeleteVisible = Int32.Parse(ConfigurationManager.AppSettings["UserTypeId"]) == 2 ? false : true;

            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) != 1 && _clientRepository.CheckConnection())
                ClientList = new ObservableCollection<ClientVM>(_clientRepository.GetAllClients().Select(e => new ClientVM(e)));
        }

        private void ClientDelete()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_clientRepository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (_clientRepository.RemoveClient(_selectedClient.ToModel()))
            {
                ClientList.Remove(SelectedClient);
                MessageBox.Show("De klant is succesvol verwijderd", "Succesvol verwijderd");
            }
            else
            {
                MessageBox.Show("De klant is niet verwijderd. Mogelijk heeft de klant een opdracht (gehad).", "Niet verwijderd", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ShowClientEdit()
        {
            MessengerInstance.Send(new NotificationMessage("OpenClientEdit"));
        }
    }
}