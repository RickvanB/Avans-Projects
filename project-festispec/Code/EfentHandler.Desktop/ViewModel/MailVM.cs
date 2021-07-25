using EfentHandler.Desktop.Model;
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
using System.Windows.Input;

namespace EfentHandler.Desktop.ViewModel
{
    public class MailVM : ViewModelBase
    {
        #region Fields
        private ObservableCollection<ContactpersonVM> _selectedCP;
        private ObservableCollection<ContactpersonVM> _deSelectedCP;
        private ContactpersonVM _cp;
        private MailGenerator _mailGenerator;
        #endregion

        #region Propperties
        public ObservableCollection<ContactpersonVM> SelectedCP
        {
            get { return _selectedCP; }
            set { _selectedCP = value; base.RaisePropertyChanged("SelectedCP"); }
        }

        public ObservableCollection<ContactpersonVM> DeSelectedCP
        {
            get { return _deSelectedCP; }
            set { _deSelectedCP = value; base.RaisePropertyChanged("DeSelectedCP"); }
        }

        public ContactpersonVM CurrentSelectedCP
        {
            get { return _cp; }
            set { _cp = value; }
        }
        public string CustomerName { get; set; }
        public DateTime InspectionDateStart { get; set; }
        public DateTime InspectionDateEnd { get; set; }

        public string InspectionDate
        {
            get
            {
                if (InspectionDateStart == InspectionDateEnd)
                    return InspectionDateStart.ToShortDateString();

                return InspectionDateStart.ToShortDateString() + " t/m " + InspectionDateEnd.ToShortDateString();
            }
        }
        public string FilePath { get; set; }
        #endregion

        #region Commands
        public ICommand AddCP { get; set; }
        public ICommand RemoveCP { get; set; }
        public ICommand MailCommand { get; set; }
        #endregion

        #region Constructor
        public MailVM()
        {
            _selectedCP = new ObservableCollection<ContactpersonVM>();
            _deSelectedCP = new ObservableCollection<ContactpersonVM>();
            _mailGenerator = new MailGenerator();

            AddCP = new RelayCommand(AddCPToList);
            RemoveCP = new RelayCommand(RemoveCPFromList);
            MailCommand = new RelayCommand(MailCustomer);
        }
        #endregion

        #region Methods
        /// <summary>
        /// This method will add a CP to the selected list
        /// </summary>
        private void AddCPToList()
        {
            SelectedCP.Add(CurrentSelectedCP);
            DeSelectedCP.Remove(CurrentSelectedCP);
        }

        /// <summary>
        /// This method will remove a CP form the selected list
        /// </summary>
        private void RemoveCPFromList()
        {
            DeSelectedCP.Add(CurrentSelectedCP);
            SelectedCP.Remove(CurrentSelectedCP);
        }

        /// <summary>
        /// This method will activate the mailing proces
        /// </summary>
        private void MailCustomer()
        {
            AssignmentRepository repository = new AssignmentRepository();

            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !repository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("Mailen is niet beschikbaar wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (SelectedCP.Count == 0)
            {
                MessageBox.Show("U heeft geen e-mailadressen geselecteerd", "Waarschuwing", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (FilePath != null)
                if (_mailGenerator.SendMail(CustomerName, SelectedCP.Select(c => c.Email).ToList(), InspectionDate, FilePath))
                {
                    MessageBox.Show("De rapportage is verzonden naar de geselecteerde e-mailadressen", "Gelukt!");
                    MessengerInstance.Send(new NotificationMessage("OpenAssignmentEdit"));
                }
                else
                {
                    MessageBox.Show("De rapportage kon niet worden verzonden", "Mislukt!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
        }
        #endregion
    }
}