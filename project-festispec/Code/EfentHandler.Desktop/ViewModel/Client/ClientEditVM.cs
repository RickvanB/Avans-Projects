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
using EfentHandler.Domain.Model;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;

namespace EfentHandler.Desktop.ViewModel
{
    public class ClientEditVM : ViewModelBase
    {
        private ClientRepository _repository;
        private ContactpersonVM _selectedContactperson;
        private RequestVM _selectedRequest;
        private ClientListVM _clientList;
        private GeodanAPI _GeodanAPI;

        public ClientVM Client { get; set; }
        public ObservableCollection<ContactpersonVM> Contactpersons { get; set; }
        public ObservableCollection<RequestVM> Requests { get; set; }
        public ObservableCollection<UserTypeVM> UserTypes { get; set; }
        public AssignmentListVM AssignmentListVM { get; set; }
        public ObservableCollection<AssignmentVM> Assignments { get; set; }

        public ContactpersonVM SelectedContactperson
        {
            get { return _selectedContactperson; }
            set
            {
                _selectedContactperson = value;
                base.RaisePropertyChanged();
            }
        }

        public RequestVM SelectedRequest
        {
            get { return _selectedRequest; }
            set
            {
                _selectedRequest = value;
                base.RaisePropertyChanged();
            }
        }

        public ICommand AddAssignmentCommand { get; set; }
        public ICommand AddContactpersonCommand { get; set; }
        public ICommand DeleteContactpersonCommand { get; set; }
        public ICommand AddRequestCommand { get; set; }
        public ICommand DeleteRequestCommand { get; set; }
        public ICommand SaveCommand { get; set; }

        public ClientEditVM() { }

        public ClientEditVM(ClientListVM clientListVM, AssignmentListVM assignmentListVM)
        {
            Client = clientListVM.SelectedClient;
            _clientList = clientListVM;
            _repository = new ClientRepository();
            AssignmentListVM = assignmentListVM;
            Assignments = new ObservableCollection<AssignmentVM>(AssignmentListVM.AssignmentList.Where(a => a.ClientId == Client.ClientId).Select(a => new AssignmentVM(a.ToModel())));

            Contactpersons = new ObservableCollection<ContactpersonVM>(Client.Contactpersons.Select(c => new ContactpersonVM(c)));
            Requests = new ObservableCollection<RequestVM>(Client.Requests.Select(r => new RequestVM(r)));

            AddAssignmentCommand = new RelayCommand(AddAssignment);
            AddContactpersonCommand = new RelayCommand(AddContactperson);
            DeleteContactpersonCommand = new RelayCommand(DeleteContactperson);
            AddRequestCommand = new RelayCommand(AddRequest);
            DeleteRequestCommand = new RelayCommand(DeleteRequest);
            SaveCommand = new RelayCommand<string>(Save);
        }

        private void DeleteRequest()
        {
            Requests.Remove(_selectedRequest);
        }

        private void AddRequest()
        {
            RequestVM newRequest = new RequestVM
            {
                ClientId = Client.ClientId
            };
            Client.Requests.Add(newRequest.ToModel());
            Requests.Add(newRequest);
        }

        private void DeleteContactperson()
        {
            Contactpersons.Remove(_selectedContactperson);
        }

        private void AddAssignment()
        {
            MessengerInstance.Send(new NotificationMessage("OpenAssignmentAdd"));
        }

        private void AddContactperson()
        {
            ContactpersonVM newContact = new ContactpersonVM
            {
                ClientId = Client.ClientId
            };
            Client.Contactpersons.Add(newContact.ToModel());
            Contactpersons.Add(newContact);
        }

        private void Save(string buttonCommand)
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_repository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            var errors = _repository.ValidateClient(Client.ToModel());
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

                Requests.ToList().ForEach(r => r.RaisePropertyChanged());
                Contactpersons.ToList().ForEach(c => c.RaisePropertyChanged());
                _repository.EditClient(Client.ToModel(), new List<request>(Requests.ToList().Select(r => r.ToModel())), new List<contactperson>(Contactpersons.ToList().Select(c => c.ToModel())));

                Client.Changed();
                MessageBox.Show("De wijzigingen zijn succesvol opgeslagen", "Gelukt");
                _clientList.ClientList = new ObservableCollection<ClientVM>(_repository.GetAllClients().Select(s => new ClientVM(s)));
                if (Int32.Parse(buttonCommand) == 1)
                    MessengerInstance.Send(new NotificationMessage("OpenClientList"));
            }
            else
            {
                MessageBox.Show("Er zijn een aantal fouten gevonden: " + Environment.NewLine + " - " + string.Join(Environment.NewLine + " - ", errors.Where(x => x != null)), "Invoer niet opgeslagen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}