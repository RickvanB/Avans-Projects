using EfentHandler.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class ChartsFactory
    {
        #region Propperties
        private const string COLUMN = "Kolom Chart";
        private const string LINE = "Lijn Chart";
        private const string PIE = "Taart Chart";
        private const string NO_CHART = "Geen Chart";

        private const string MULTIPECHOICE = "Meerkeuze";
        private const string SCALE = "Schaal";
        private const string DISTANCE = "Afstand meten";
        private const string MINUTES = "5 minuten";
        private const string TIME_ESTIMATE = "Tijdschatting";
        private const string IMAGE = "Afbeeldingen";
        private const string DRAWING = "Tekenen";
        private const string COUNT = "Tellen";
        private const string OPEN_QUESTION = "Open vraag";

        public IChartLink ChartCreator { get; private set; }
        public IQuestionLink QuestionCreator { get; private set; }

        public ObservableCollection<QuestionTypeVM> QuestionTypes { get; set; }

        public ObservableCollection<ChartTypeVM> ChartTypes { get; set; }
        #endregion

        #region Constructor
        public ChartsFactory()
        {
            
        }
        #endregion

        #region Methods
        /// <summary>
        /// This method will return the correct IChartLink or IQuestionLink object to create the chart
        /// in the right form
        /// </summary>
        /// <param name="questions"></param>
        /// <returns></returns>
        public string GetChartCreator(List<SurveyQuestionVM> questions)
        {
            // Early abort
            if (questions == null)
                throw new ArgumentNullException();

            // Type Chart
            string ct = ChartTypes.Where(q => q.Id == questions[0].Question.ChartTypeId).Select(q => q.Name).FirstOrDefault();
            // Categorie Chart
            string cc = QuestionTypes.Where(q => q.Id == questions[0].Question.QuestionTypeId).Select(q => q.Name).FirstOrDefault();

            // Abort because there were no types or categories found
            if (cc == null || ct == null)
                throw new KeyNotFoundException();

            ct = ct.TrimEnd();
            cc = cc.TrimEnd();

            // Column chart
            if (ct.Equals(COLUMN))
            {
                if (cc.Equals(MULTIPECHOICE) || cc.Equals(SCALE) || cc.Equals(DISTANCE) || cc.Equals(MINUTES))
                    ChartCreator = new ColumChartViewModel();

                return "Chart";
            }
            // Line chart 
            else if (ct.Equals(LINE))
            {
                if (cc.Equals(TIME_ESTIMATE))
                    ChartCreator = new LineChartViewModel();

                return "Chart";
            }
            // Pie chart
            else if (ct.Equals(PIE))
            {
                if (cc.Equals(MULTIPECHOICE) || cc.Equals(SCALE) || cc.Equals(DISTANCE) || cc.Equals(MINUTES))
                    ChartCreator = new PieChartViewModel();

                return "Chart";
            }
            // No chart
            else if (ct.Equals(NO_CHART))
            {
                if (cc.Equals(OPEN_QUESTION) || cc.Equals(COUNT))
                    QuestionCreator = new OpenQuestionViewModel();
                else if (cc.Equals(IMAGE) || cc.Equals(DRAWING))
                    QuestionCreator = new ImageQuestionViewModel();

                return "Question";
            }


            ChartCreator = null;
            QuestionCreator = null;

            // If not returned yet throw an exception
            throw new ArgumentException();

        }
        #endregion
    }
}