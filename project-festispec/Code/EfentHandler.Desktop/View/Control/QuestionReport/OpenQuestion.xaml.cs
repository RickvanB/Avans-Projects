using EfentHandler.Desktop.ViewModel;
using System;
using System.Collections.Generic;
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
    /// Interaction logic for OpenQuestion.xaml
    /// </summary>
    public partial class OpenQuestion : UserControl, ISaveableQuestion
    {
        public List<String> GivenAnswers { get { return this.SetList(); } set { } }

        public List<AnswerVM> GivenAnswersVM { get; set; }

        public IQuestionLink ViewModel { get; set; }

        public string Question { get; set; }

        public int InSurvery_Id { get; set; }

        public int Question_Id { get; set; }

        public String QuestionTitle { get { return "Vraag: " + Question_Id; } }

        public List<string> Image_URLS { get ;}

        public OpenQuestion()
        {
            InitializeComponent();
            DataContext = this;
        }

        public List<string> SetList()
        {
            List<string> _givenAnswers = new List<string>();

            foreach (var answer in GivenAnswersVM)
            {
                _givenAnswers.Add(answer.TextAnswer);
            }

            return _givenAnswers;

        }
    }
}