using EfentHandler.Domain.Model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class QuestionImagesVM : QuestionVM
    {
        public QuestionImagesVM()
        {
            _question = new question();

            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 4, Name = "Geen Chart" });
            ChartTypeId = 4;
        }

        public QuestionImagesVM(question question)
        {
            _question = question;

            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 4, Name = "Geen Chart" });
        }
    }
}
