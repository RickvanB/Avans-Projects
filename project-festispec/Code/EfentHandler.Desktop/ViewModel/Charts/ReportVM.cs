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

namespace EfentHandler.Desktop.ViewModel
{
    public class ReportVM : ViewModelBase
    {
        #region Fields
        private ChartsViewModel _chartsVM;
        #endregion

        #region Propperties
        /// <summary>
        /// Propperty to keep the advice the user has given
        /// </summary>
        public string Advice {
            get => AssignmentEditVM.Assignment.Advice;
            set { AssignmentEditVM.Assignment.Advice = value; } }
        public AssignmentEditVM AssignmentEditVM { get; set; }
        public ReportGenerator ReportGenerator { get; set; }
        public bool CanGeneratePDFBool { get; set; }
        /// <summary>
        /// This propperty will keep a list ISaveableCharts --> The created charts
        /// </summary>
        public ObservableCollection<ISaveableCharts> ReportCharts
        {
            get
            {
                return ChartsVM?.ReportCharts;
            }
        }
        /// <summary>
        /// This propperty will keep a list op ISaveableQuestions --> Image, open or count Question
        /// </summary>
        public ObservableCollection<ISaveableQuestion> ReportQuestions
        {
            get
            {
                return ChartsVM?.ReportQuestions;
            }
        }

        public bool OfflineInfoVisible { get; set; } = false;

        public ChartsViewModel ChartsVM
        {
            get { return _chartsVM; }
            set { _chartsVM = value; CanGeneratePDFBool = true; }
        }

        public RelayCommand SaveToPDFCommand { get; set; }
        public RelayCommand MailPDFCommand { get; set; }
        public RelayCommand SaveAdviceCommand { get; set; }
        #endregion

        #region Constructor
        public ReportVM()
        {
            // Commands
            SaveToPDFCommand = new RelayCommand(SaveToPDF, CanSaveToPDF);
            MailPDFCommand = new RelayCommand(MailPdfToCustomer);
            SaveAdviceCommand = new RelayCommand(SaveAdvice);

            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1)
                OfflineInfoVisible = true;
        }
        #endregion

        #region Methods
        /// <summary>
        /// This method will check if there can be generated a PDF
        /// </summary>
        /// <returns></returns>
        private bool CanSaveToPDF()
        {
            return CanGeneratePDFBool;
        }
        /// <summary>
        /// This method will generate a PDF and save it
        /// </summary>
        private void SaveToPDF()
        {
            if (ReportGenerator != null)
            {
                ReportGenerator.ChartsViewModel = ChartsVM;

                ReportGenerator.Advice = Advice;

                // Generate PDF
                ReportGenerator.SaveToPDF(
                    ReportGenerator.CustomerName ?? "Customer UNKNOWN",
                    ReportGenerator.EfentName ?? "Efent UNKNOWN",
                    ReportGenerator.ContactPersonName ?? "Contactperson UNKNOWN"
                    );

                CanGeneratePDFBool = false;
                SaveToPDFCommand.RaiseCanExecuteChanged();
            }
        }

        /// <summary>
        /// This method will start the proces to mail an user
        /// </summary>
        private void MailPdfToCustomer()
        {
            AssignmentRepository repository = new AssignmentRepository();

            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !repository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("Mailen is niet beschikbaar wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            SaveToPDF();
            MessengerInstance.Send(new NotificationMessage("OpenMail"));
        }

        /// <summary>
        /// This method will save the advice
        /// </summary>
        private void SaveAdvice()
        {
            AssignmentEditVM.SaveAdvice();
        }
        #endregion
    }
}