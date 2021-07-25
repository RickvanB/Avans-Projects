using LiveCharts;
using LiveCharts.Defaults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace EfentHandler.Desktop.ViewModel
{
    public class HeatMapChartViewModel : UserControl, IChartLink
    {
        /* Propperties */

        // Actual HeatMap
        public ChartValues<HeatPoint> Values { get; set; }
        // Asked Question
        public String Question { get; set; }
        // Image path
        public String ImagePath { get; set; }
        // List with Dates
        public List<String> DateValues { get; set; }
        // List with Locations
        public List<String> LocationValues { get; set; }
        // Data input
        public List<List<int>> Data_Input { get; set; }
        // Survery ID
        public int InSurvery_Id { get; set; }
        // Question ID
        public int Question_Id { get; set; }
        public List<string> BaseData { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public void CreateMap()
        {
            Values = new ChartValues<HeatPoint>();

            // For every data_input field create an heatpoint on the right location
            for (int line = 0; line < Data_Input.Count; line++)
            {
                for (int row = 0; row < Data_Input[line].Count; row++)
                {
                    // Add new HeatPoint
                    Values.Add(new HeatPoint(line, row, Data_Input[line][row]));
                }
            }
        }

        /// <summary>
        /// This method will Construct the chart and prepair it before being drawed
        /// </summary>
        public ISaveableCharts ConstructChart(string type, List<SurveyQuestionVM> questions)
        {
            return null;
        }
    }
}