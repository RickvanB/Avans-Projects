using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace EfentHandler.Desktop.ViewModel
{
    public interface IChartLink
    {

        /// <summary>
        /// This propperty is to keep the Question that is linked to the Chart
        /// </summary>
        String Question { get; set; }

        /// <summary>
        /// This propperty will keep the path to the chart
        /// </summary>
        String ImagePath { get; set; }

        /// <summary>
        /// This propperty will keep in which survey this chart is
        /// </summary>
        int InSurvery_Id { get; set; }

        /// <summary>
        /// This propperty will keep about which question this chart is
        /// </summary>
        int Question_Id { get; set; }

        /// <summary>
        /// This method will construct the correct Charts
        /// </summary>
        /// <param name="type"></param>
        /// <param name="questions"></param>
        /// <returns></returns>
        ISaveableCharts ConstructChart(string type, List<SurveyQuestionVM> questions);

        /// <summary>
        /// This list will keep the data that was used by creating the Chart
        /// </summary>
        List<string> BaseData { get; set; }

    }
}