using GalaSoft.MvvmLight;
using Microsoft.Maps.MapControl.WPF;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class MapVM : ViewModelBase
    {
        private bool _clientsSelected = true;
        private bool _assignmentsSelected = true;
        private bool _inspectorsSelected = true;

        private List<PushpinVM> Inspectors;
        private List<PushpinVM> Clients;
        private List<PushpinVM> Assignments;

        public ObservableCollection<PushpinVM> PushPins { get; set; }

        public bool ClientsSelected
        {
            get
            {
                return _clientsSelected;
            }
            set
            {
                _clientsSelected = value;
                RaisePropertyChanged("ClientsSelected");
                UpdateMap();
            }
        }

        public bool AssignmentsSelected
        {
            get
            {
                return _assignmentsSelected;
            }
            set
            {
                _assignmentsSelected = value;
                RaisePropertyChanged("AssignmentsSelected");
                UpdateMap();
            }
        }

        public bool InspectorsSelected
        {
            get
            {
                return _inspectorsSelected;
            }
            set
            {
                _inspectorsSelected = value;
                RaisePropertyChanged("InspectorsSelected");
                UpdateMap();
            }
        }

        public MapVM() { }

        public MapVM(ObservableCollection<ClientVM> clients, ObservableCollection<AssignmentVM> assignments, ObservableCollection<InspectorVM> inspectors)
        {
            PushPins = new ObservableCollection<PushpinVM>();
            Clients = new List<PushpinVM>();
            Assignments = new List<PushpinVM>();
            Inspectors = new List<PushpinVM>();

            clients.ToList().ForEach(c => PushPins.Add(new PushpinVM() { Location = new Location(c.Lat, c.Long), Background = "Blue", ToolTip = c.CompanyName }));
            clients.ToList().ForEach(c => Clients.Add(new PushpinVM() { Location = new Location(c.Lat, c.Long), Background = "Blue", ToolTip = c.CompanyName }));

            assignments.ToList().ForEach(a => PushPins.Add(new PushpinVM() { Location = new Location(a.Lat, a.Long), Background = "Red", ToolTip = a.Description }));
            assignments.ToList().ForEach(a => Assignments.Add(new PushpinVM() { Location = new Location(a.Lat, a.Long), Background = "Red", ToolTip = a.Description }));

            inspectors.ToList().ForEach(i => PushPins.Add(new PushpinVM() { Location = new Location(i.Lat, i.Long), Background = "Green", ToolTip = i.FullName }));
            inspectors.ToList().ForEach(i => Inspectors.Add(new PushpinVM() { Location = new Location(i.Lat, i.Long), Background = "Green", ToolTip = i.FullName }));
        }

        private void UpdateMap()
        {
            PushPins.Clear();

            if (!_clientsSelected && !_assignmentsSelected && !_inspectorsSelected)
                return;

            if (_clientsSelected)
                for (int i = 0; i < Clients.Count; i++)
                    PushPins.Add(Clients.ElementAt(i));


            if (_assignmentsSelected)
                for (int i = 0; i < Assignments.Count; i++)
                    PushPins.Add(Assignments.ElementAt(i));

            if (_inspectorsSelected)
                for (int i = 0; i < Inspectors.Count; i++)
                    PushPins.Add(Inspectors.ElementAt(i));
        }
    }
}