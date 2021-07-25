using EfentHandler.Domain.Model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class QuestionScaleVM : QuestionVM
    {
        public QuestionScaleVM()
        {
            _question = new question();

            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 1, Name = "Kolom Chart" });
            ChartTypes.Add(new ChartTypeVM() { Id = 3, Name = "Taart Chart" });
            ChartTypeId = 1;
        }

        public QuestionScaleVM(question question)
        {
            _question = question;

            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 1, Name = "Kolom Chart" });
            ChartTypes.Add(new ChartTypeVM() { Id = 3, Name = "Taart Chart" });
        }
    }
}
