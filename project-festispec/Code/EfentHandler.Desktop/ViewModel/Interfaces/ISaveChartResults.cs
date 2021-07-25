using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public interface ISaveableQuestion
    {
        /// <summary>
        /// Will save the question that was asked
        /// </summary>
        string Question { get; set; }

        /// <summary>
        /// This will keep a list of given answers
        /// </summary>
        List<string> GivenAnswers { get; set; }
        int InSurvery_Id { get; set; }
        /// <summary>
        /// This propperty will keep about which question this chart is
        /// </summary>
        int Question_Id { get; set; }

        IQuestionLink ViewModel { get; set; }

        List<string> Image_URLS { get;} 
    }
}