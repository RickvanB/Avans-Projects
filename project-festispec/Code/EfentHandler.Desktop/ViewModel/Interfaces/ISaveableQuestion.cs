using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public interface ISaveableCharts
    {
        /// <summary>
        /// This method will save a Live Chart to a PNG
        /// </summary>
        void SaveResults(String fileName);

        /// <summary>
        /// This propperty will keep the ViewModel of a chart
        /// </summary>
        IChartLink GetViewModel { get; }
    }
}