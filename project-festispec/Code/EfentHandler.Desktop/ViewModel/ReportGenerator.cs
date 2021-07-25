using EfentHandler.Desktop.Model;
using EfentHandler.Desktop.View.Control;
using EfentHandler.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace EfentHandler.Desktop.ViewModel
{
    public class ReportGenerator
    {
        #region Fields
        private PdfGenerator _pdfGenerator;
        private ReportData _reportData;
        private ReportViewControl _reportViewControl;
        #endregion

        #region Propperties
        public ChartsViewModel ChartsViewModel { get; set; }
        public string Advice { get; set; }
        public string CustomerName { get; set; }
        public string ContactPersonName { get; set; }
        public string EfentName { get; set; }
        public ReportData ReportData { get { return _reportData; } }
        #endregion

        #region Constructor
        public ReportGenerator()
        {
            _pdfGenerator = new PdfGenerator();
        }
        #endregion

        #region Methods
        /// <summary>
        /// This method will create the charts of a report
        /// </summary>
        /// <param name="groupedQuestionCollection"></param>
        public ReportViewControl GenerateReport(List<List<SurveyQuestionVM>> groupedQuestionCollection)
        {
            // Chearte new Chart Creator
            //ChartsViewModel = new ChartsViewModel();

            // For every group of questions
            foreach (var questionCollection in groupedQuestionCollection)
            {
                // Create Charts
                bool succeded = ChartsViewModel.CreateChart(questionCollection);
            }

            // Set report View and return it
            _reportViewControl = new ReportViewControl();
            return _reportViewControl;
        }

        /// <summary>
        /// This method will Save the charts and data into a PDF 
        /// </summary>
        public void SaveToPDF(string customerName, string eventName, string employeeName)
        {
            #region Early abort conditions
            if (_reportViewControl == null)
            {
                MessageBox.Show("Het opslaan van de resultaten is mislukt omdat er geen overzicht van de rapportage aanwezig is", "Mislukt");
                return;
            }
            if (ChartsViewModel.ReportCharts.Count == 0 && ChartsViewModel.ReportQuestions.Count == 0)
            {
                MessageBox.Show("Het opslaan van de resultat" +
                    "en is mislukt omdat er geen rapportages aanwezig zijn", "Mislukt");
                return;
            }
            #endregion

            // Save Charts to PNG
            ChartsViewModel.SaveChartsToPNG();

            // Set MetaData
            _reportData = new ReportData()
            {
                CustomerName = customerName,
                EventName = eventName,
                EmployeeName = employeeName,
                Advice = Advice ?? ""

            };

            // Generate PDF Elements
            try
            {
                _pdfGenerator.GeneratePdfElements(ChartsViewModel.ReportCharts.ToList(), ChartsViewModel.ReportQuestions.ToList(), _reportData);
                MessageBox.Show("Het genereren van een PDF is gelukt!", "Succes");
            }
            catch
            {
                MessageBox.Show("Het exporteren naar PDF is mislukt", "Error");
            }
        }

        public void OnNext(ReportVM value)
        {
            Advice = value.Advice;
        }
        #endregion
    }
}