using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using EfentHandler.Domain.Geodan;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;

namespace EfentHandler.Desktop.ViewModel
{
    public class ClientAddVM : ViewModelBase
    {
        private ClientListVM _clientList;
        private GeodanAPI _GeodanAPI;

        public ClientVM Client { get; set; }
        public ObservableCollection<UserTypeVM> UserTypes { get; set; }
        public ICommand SaveCommand { get; set; }

        public ClientAddVM() { }

        public ClientAddVM(ClientListVM clientList)
        {
            _clientList = clientList;
            Client = new ClientVM();
            SaveCommand = new RelayCommand(Save);
        }

        private void Save()
        {
            ClientRepository repository = new ClientRepository();

            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !repository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            var errors = repository.ValidateClient(Client.ToModel());
            if (errors == null)
            {
                // GEODAN
                _GeodanAPI = new GeodanAPI();
                var coordinates = _GeodanAPI.GetGeoCoordinatesFromAddress(Client.HouseNumber, Client.ZipCode);

                if (coordinates == null || coordinates.Length == 0)
                {
                    MessageBox.Show("Het opgegeven adres is niet geldig, probeer het opnieuw", "Waarschuwing", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                Client.Lat = coordinates[0];
                Client.Long = coordinates[1];

                repository.AddClient(Client.ToModel());

                _clientList.ClientList.Add(Client);
                MessageBox.Show("De wijzigingen zijn succesvol opgeslagen", "Gelukt");
                _clientList.ClientList = new ObservableCollection<ClientVM>(repository.GetAllClients().Select(s => new ClientVM(s)));
                MessengerInstance.Send(new NotificationMessage("OpenClientList"));
            }
            else
            {
                MessageBox.Show("Er zijn een aantal fouten gevonden: " + Environment.NewLine + " - " + string.Join(Environment.NewLine + " - ", errors.Where(x => x != null)), "Invoer niet opgeslagen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}