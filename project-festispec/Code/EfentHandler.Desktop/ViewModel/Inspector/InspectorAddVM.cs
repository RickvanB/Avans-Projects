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
    public class InspectorAddVM : ViewModelBase
    {
        private InspectorListVM _inspectorList;
        private GeodanAPI _geodanAPI;

        public InspectorVM Inspector { get; set; }
        public ICommand SaveCommand { get; set; }

        public InspectorAddVM() { }

        public InspectorAddVM(InspectorListVM inspectorList)
        {
            _inspectorList = inspectorList;
            Inspector = new InspectorVM();
            SaveCommand = new RelayCommand(Save);

            // define user as inspector
            Inspector.UserTypeId = 4;
            Inspector.Certified = true;
            Inspector.ServiceDate = DateTime.Now;
            Inspector.CertificationEndDate = DateTime.Now.AddYears(1);
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

            var errors = repository.ValidateInspector(Inspector.ToModel());
            if (errors == null)
            {
                // GEODAN
                _geodanAPI = new GeodanAPI();
                var coordinates = _geodanAPI.GetGeoCoordinatesFromAddress(Inspector.HouseNumber, Inspector.ZipCode);

                if (coordinates == null || coordinates.Length == 0)
                {
                    MessageBox.Show("Het opgegeven adres is niet geldig, probeer het opnieuw", "Waarschuwing", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                Inspector.Lat = coordinates[0];
                Inspector.Long = coordinates[1];

                repository.AddInspector(Inspector.ToModel());

                _inspectorList.InspectorList.Add(Inspector);
                MessageBox.Show("De wijzigingen zijn succesvol opgeslagen", "Gelukt");
                _inspectorList.InspectorList = new ObservableCollection<InspectorVM>(repository.GetAllInspectors().Select(s => new InspectorVM(s)));
                MessengerInstance.Send(new NotificationMessage("OpenInspectorList"));
            }
            else
            {
                MessageBox.Show("Er zijn een aantal fouten gevonden: " + Environment.NewLine + " - " + string.Join(Environment.NewLine + " - ", errors.Where(x => x != null)), "Invoer niet opgeslagen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}