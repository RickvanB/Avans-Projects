using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Controls;
using System.Windows.Media;
using EfentHandler.Desktop.View.Control.Charts;
using LiveCharts;
using LiveCharts.Wpf;

namespace EfentHandler.Desktop.ViewModel
{
    /* This class will create a Pie chart --> DO NOT CHANGE ANYTHING HERE */
    public class PieChartViewModel : UserControl, IChartLink
    {
        /* Fields */
        private List<string> _baseData;

        /* Propperties */

        // Array with Series - Value
        public List<double> DataInput { get; set; }
        // Asked Question
        public string Question { get; set; }
        // Image path
        public string ImagePath { get; set; }
        // Array with line Titles
        public string[] LineTitles { get; set; }
        // Collection with lines to draw
        public SeriesCollection SeriesCollection { get; set; }
        // Survery ID
        public int InSurvery_Id { get; set; }
        // Question ID
        public int Question_Id { get; set; }
        //Title
        public string QuestionTitle { get { return "Vraag: " + (Question_Id) ?? "UNKNOWN"; } }
        // Connected answers
        public List<AnswerVM> Answers { get; set; }
        // Base data : Interface implementations
        public List<string> BaseData
        {
            get
            {
                return _baseData;
            }
            set
            {
                if (_baseData == null)
                {
                    _baseData = new List<string>();
                }
                _baseData = value;
            }
        }
        /* Constructor */
        public PieChartViewModel()
        {
            BaseData = new List<string>();
        }

        /* Methods */

        /* This method will set the right value for this chart */
        public void CreateChart()
        {
            // Early Aboart
            if (DataInput == null || LineTitles == null)
                throw new ArgumentNullException();

            SeriesCollection = new SeriesCollection();

            for (int i = 0; i < DataInput.Count; i++)
            {
                // Solved a bug... Don't Touch.. Kind of
                if (i == DataInput.Count - 1)
                {
                    SeriesCollection.Add(new PieSeries
                    {
                        Title = LineTitles[i] ?? i.ToString(),
                        Values = new ChartValues<double> { DataInput[i] },
                        DataLabels = true,
                        Fill = Brushes.White
                    });
                }
                else
                {
                    SeriesCollection.Add(new PieSeries
                    {
                        Title = LineTitles[i] ?? i.ToString(),
                        Values = new ChartValues<double> { DataInput[i] },
                        DataLabels = true,
                    });
                }
            }
        }

        /// <summary>
        /// This method will Construct the chart and prepair it before being drawed
        /// </summary>
        public ISaveableCharts ConstructChart(string type, List<SurveyQuestionVM> questions)
        {
            Answers = new List<AnswerVM>();

            if (type == "Meerkeuze")
            {
                // Set categorie titles
                this.LineTitles = questions[0].Question.MultiplechoiceAnswer.Select(mc => mc.Answer).ToArray();

                // Set question
                this.Question = questions[0].Question.Name;

                // Set Survery Value
                this.InSurvery_Id = questions[0].Survey?.Survey_Id ?? 0;

                // Set Question ID
                this.Question_Id = questions[0].Question?.QuestionId ?? 0;

                // Data set
                List<double> data = new List<double>();

                Dictionary<int, string> multipleChoiceAnswersList = new Dictionary<int, string>();
                foreach (var answer in questions[0].Question.MultiplechoiceAnswer)
                {
                    multipleChoiceAnswersList.Add(answer.Id, answer.Answer);
                }
                // Hot Fix
                multipleChoiceAnswersList.Add(-1, "");

                this.LineTitles = multipleChoiceAnswersList.Values.ToArray();

                // Gather data
                for (int i = 0; i < this.LineTitles.Count(); i++)
                {
                    // Set default data
                    data.Add(0);
                }

                // Get every answer and add one to the correct categorie    
                for (int i = 0; i < questions.Count; i++)
                {
                    foreach (var answer in questions[i].Answers)
                    {
                        int dataIndex = Array.IndexOf(this.LineTitles, multipleChoiceAnswersList[(int)answer.MultipleChoiceAnswer]);
                        data[dataIndex] = data[dataIndex] + 1;
                        Answers.Add(new AnswerVM() { DatagridAnswer = multipleChoiceAnswersList[(int)answer.MultipleChoiceAnswer] });
                        BaseData.Add(multipleChoiceAnswersList[(int)answer.MultipleChoiceAnswer]);
                    }
                }


                // Set data input
                this.DataInput = data;

                // Save chart
                return new PieChartView(this);
            }
            else if (type.Equals("5 minuten"))
            {
                // Set Question
                this.Question = questions[0].Question.Name;

                // Set lables grouped by distance
                // Get highest value
                int? minValue = 0;
                int? minMidValue;
                int? midValue = 0;
                int? midMaxValue = 0;
                int? maxValue = 0;

                foreach (var question in questions)
                    foreach (var answers in question.Answers)
                        if (maxValue < answers.IntAnswer)
                            maxValue = answers.IntAnswer;

                midValue = maxValue / 2;
                minMidValue = midValue / 2;
                midMaxValue = midValue + minMidValue;

                string[] labels = new string[] { minValue + " - " + minMidValue, minMidValue + " - " + midValue, midValue + " - " + midMaxValue, midMaxValue + " - " + maxValue, "" };

                // Set lables
                this.LineTitles = labels.ToArray();

                // Set Line titles
                List<string> title_input = new List<string>();

                // Data set
                List<double> data = new List<double>();

                // Gather data
                for (int i = 0; i < this.LineTitles.Count(); i++)
                {
                    // Set default data
                    data.Add(0);
                }

                foreach (var question in questions)
                {
                    foreach (var answer in question.Answers)
                    {
                        int intAnswer = (int)answer.IntAnswer;

                        if (intAnswer >= minValue && intAnswer < minMidValue)
                            data[0] = data[0] + 1;

                        if (intAnswer >= minMidValue && intAnswer < midValue)
                            data[1] = data[1] + 1;

                        if (intAnswer >= midValue && intAnswer < midMaxValue)
                            data[2] = data[2] + 1;

                        if (intAnswer >= midMaxValue && intAnswer <= maxValue)
                            data[3] = data[3] + 1;

                        Answers.Add(new AnswerVM() { DatagridAnswer = answer.IntAnswer?.ToString() });
                        BaseData.Add(answer.IntAnswer?.ToString());
                    }
                }

                // Set data input
                this.DataInput = data;

                return new PieChartView(this);
            }
            else if (type.Equals("Schaal"))
            {

                // Set Scale from one to ten
                this.LineTitles = new string[] { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "" };

                // Gather all the data after setting default values
                List<double> data = new List<double>();
                for (int i = 0; i < 11; i++)
                {
                    data.Add(0);
                }

                for (int i = 0; i < questions.Count; i++)
                {
                    if (questions[i].Answers.ElementAt(0).IntAnswer != null)
                    {
                        data[(int)questions[i].Answers.ElementAt(0).IntAnswer - 1] = data[(int)questions[i].Answers.ElementAt(0).IntAnswer - 1] + 1;
                        Answers.Add(new AnswerVM() { DatagridAnswer = questions[i].Answers.ElementAt(0).IntAnswer?.ToString() });
                        BaseData.Add(questions[i].Answers.ElementAt(0).IntAnswer?.ToString());
                    }
                }

                // Set data input
                this.DataInput = data;

                // Set question
                this.Question = questions[0].Question.Name;

                // Set Survery Value
                this.InSurvery_Id = questions[0].Survey?.Survey_Id ?? 0;

                // Set Question ID
                this.Question_Id = questions[0].Question?.QuestionId ?? 0;

                // Add chart to Charlist
                return new PieChartView(this);

            }
            else if (type.Equals("Afstand meten"))
            {
                // Set lables grouped by distance
                // Get highest value
                int? minValue = 0;
                int? minMidValue;
                int? midValue = 0;
                int? midMaxValue = 0;
                int? maxValue = 0;

                foreach (var question in questions)
                    foreach (var answers in question.Answers)
                        if (maxValue < answers.IntAnswer)
                            maxValue = answers.IntAnswer;

                midValue = maxValue / 2;
                minMidValue = midValue / 2;
                midMaxValue = midValue + minMidValue;

                string[] labelsTitles = new string[] { minValue + " - " + minMidValue, minMidValue + " - " + midValue, midValue + " - " + midMaxValue, midMaxValue + " - " + maxValue, "" };

                // Set lables
                this.LineTitles = labelsTitles.ToArray();

                // Set data input 
                List<double> data = new List<double>();

                // Gather data
                for (int i = 0; i < this.LineTitles.Count(); i++)
                {
                    // Set default data
                    data.Add(0);
                }

                foreach (var question in questions)
                {
                    foreach (var answer in question.Answers)
                    {
                        int intAnswer = (int)answer.IntAnswer;

                        if (intAnswer >= minValue && intAnswer < minMidValue)
                            data[0] = data[0] + 1;

                        if (intAnswer >= minMidValue && intAnswer < midValue)
                            data[1] = data[1] + 1;

                        if (intAnswer >= midValue && intAnswer < midMaxValue)
                            data[2] = data[2] + 1;

                        if (intAnswer >= midMaxValue && intAnswer <= maxValue)
                            data[3] = data[3] + 1;

                        Answers.Add(new AnswerVM() { DatagridAnswer = answer.IntAnswer?.ToString() });
                        BaseData.Add(answer.IntAnswer?.ToString());
                    }
                }

                // Set data input
                this.DataInput = data;

                // Set question
                this.Question = questions[0].Question.Name;

                // Set Survery Value
                this.InSurvery_Id = questions[0].Survey?.Survey_Id ?? 0;

                // Set Question ID
                this.Question_Id = questions[0].Question?.QuestionId ?? 0;

                // Add chart to Charlist
                return new PieChartView(this);
            }

            return null;
        }
    }
}