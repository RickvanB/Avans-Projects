using EfentHandler.Desktop.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace EfentHandler.Desktop.View.Control.QuestionReport
{

    /// <summary>
    /// Interaction logic for ImageQuestion.xaml
    /// </summary>
    public partial class ImageQuestion : UserControl, ISaveableQuestion
    {
        public List<String> GivenAnswers { get; set; }

        public List<UserControl> ImageCharts { get; set; }

        public IQuestionLink ViewModel { get; set; }

        public string Question { get; set; }

        public int InSurvery_Id { get; set; }

        public int Question_Id { get; set; }

        public string QuestionTitle { get { return "Vraag: " + Question_Id; } }

        public List<string> Image_URLS { get { return GivenAnswers; }}

        public ImageQuestion()
        {
            InitializeComponent();
            DataContext = this;
        }
    }
}