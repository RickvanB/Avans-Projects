using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public interface IQuestionLink
    {
        /// <summary>
        /// This method will prepair a open question before being drawn
        /// </summary>
        /// <param name="type"></param>
        /// <param name="questions"></param>
        /// <returns></returns>
        ISaveableQuestion ConstructQuestion(string type, List<SurveyQuestionVM> questions);
    }
}