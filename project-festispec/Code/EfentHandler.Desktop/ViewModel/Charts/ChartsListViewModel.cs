using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace EfentHandler.Desktop.ViewModel
{
    public class ChartsViewModel : ViewModelBase
    {
        #region Fields
        // Fields - Constants
        private ObservableCollection<ISaveableCharts> _reportCharts;
        private SurveyRepository _surveyRepository;
        private ObservableCollection<ISaveableQuestion> _reportQuestions;
        private ChartsFactory _chartFactory;
        private const string CHART = "Chart";
        #endregion

        #region Propperties
        /// <summary>
        /// This propperty will keep a list ISaveableCharts --> The created charts
        /// </summary>
        public ObservableCollection<ISaveableCharts> ReportCharts
        {
            get
            {
                return _reportCharts;
            }
            set
            {
                _reportCharts = value;
                //_reportViewControl.Charts = _reportCharts;
                base.RaisePropertyChanged("ReportCharts");
            }

        }
        /// <summary>
        /// This propperty will keep a list op ISaveableQuestions --> Image, open or count Question
        /// </summary>
        public ObservableCollection<ISaveableQuestion> ReportQuestions
        {
            get
            {
                return _reportQuestions;
            }
            set
            {
                _reportQuestions = value;
                //_reportViewControl.OpenQuestions = _reportQuestions;
                base.RaisePropertyChanged("ReportQuestions");
            }
        }

        public ObservableCollection<QuestionTypeVM> QuestionTypes { get; set; }

        public ObservableCollection<ChartTypeVM> ChartTypes { get; set; }
        #endregion

        #region Constructor
        public ChartsViewModel()
        {
            _surveyRepository = new SurveyRepository();
            _chartFactory = new ChartsFactory();

            ReportCharts = new ObservableCollection<ISaveableCharts>();
            ReportQuestions = new ObservableCollection<ISaveableQuestion>();
        }
        #endregion

        #region Methods
        /// <summary>
        /// This method will return a list with all question that are coupeld to the charts
        /// </summary>
        /// <returns></returns>
        public List<IChartLink> GetPDFChartObjects()
        {
            List<IChartLink> chart_values = new List<IChartLink>();

            for (int i = 0; i < ReportCharts.Count; i++)
            {
                chart_values.Add(ReportCharts[i].GetViewModel);
            }

            return chart_values;
        }

        /// <summary>
        /// This method will save every chart in the report list to a PNG
        /// </summary>
        public void SaveChartsToPNG()
        {

            try
            {
                for (int i = 0; i < ReportCharts.Count; i++)
                {

                    // Save in this format --> "[Survery_ID]_[Question_ID]_[Position_in_list].png"
                    String fileName = ReportCharts[i].GetViewModel.InSurvery_Id + "_" + ReportCharts[i].GetViewModel.Question_Id + "_" + i + ".png";

                    // Save every chart
                    ReportCharts[i].SaveResults(fileName);

                    // Save image path
                    string current_path = Environment.CurrentDirectory;
                    ReportCharts[i].GetViewModel.ImagePath = current_path + "\\files\\images\\" + fileName;

                }
            }
            catch
            {
                // Saving went wrong --> Dispaly Catch
                MessageBox.Show("Het opslaan van de resultaten is mislukt", "Mislukt");
            }
        }
        /// <summary>
        /// This method will create the right chart for the type of question
        /// </summary>
        /// <param name="questions"> This method expects a list of questions with the same Question ID</param>
        public bool CreateChart(List<SurveyQuestionVM> questions)
        {
            // Early aboard conditions
            if (questions == null || questions?.Count == 0)
                return false;

            // Deside the type of the question
            string typeSummary = QuestionTypes.Where(q => q.Id == questions[0].Question.QuestionTypeId).Select(q => q.Name).FirstOrDefault();

            // Safety check
            if (typeSummary == null)
                return false;

            _chartFactory.QuestionTypes = QuestionTypes;
            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 1, Name = "Kolom Chart" });
            ChartTypes.Add(new ChartTypeVM() { Id = 2, Name = "Lijn Chart" });
            ChartTypes.Add(new ChartTypeVM() { Id = 3, Name = "Taart Chart" });
            ChartTypes.Add(new ChartTypeVM() { Id = 4, Name = "Geen Chart" });
            _chartFactory.ChartTypes = ChartTypes;

            String chartToConstruct = _chartFactory.GetChartCreator(questions);

            if (chartToConstruct.Equals(CHART))
            {
                ReportCharts.Add(_chartFactory.ChartCreator?.ConstructChart(typeSummary, questions));
                RaisePropertyChanged("ReportCharts");
            }
            else
            {
                ReportQuestions.Add(_chartFactory.QuestionCreator?.ConstructQuestion(typeSummary, questions));
                RaisePropertyChanged("ReportQuestions");
            }

            return true;
        }
        #endregion
    }
}