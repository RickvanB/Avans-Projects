using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Controls;
using EfentHandler.Desktop.View.Control.Charts;
using LiveCharts;
using LiveCharts.Wpf;

namespace EfentHandler.Desktop.ViewModel
{
    /* This class will create a line chart --> DO NOT CHANGE ANYTHING HERE */
    public class LineChartViewModel : UserControl, IChartLink
    {
        /* Fields */
        private List<string> _baseData;

        /* Propperties */

        // Array with Series - Value
        public List<List<double>> DataInput { get; set; }
        // Asked Question
        public String Question { get; set; }
        // Image path
        public String ImagePath { get; set; }
        // Array with line Titles
        public String[] LineTitles { get; set; }
        // Labels to set
        public String[] Labels { get; set; }
        // Collection with lines to draw
        public SeriesCollection SeriesCollection { get; set; }
        // Format data input from double to string
        public Func<double, string> YFormatter { get; set; }
        // Set Format Type (Value on X-as)
        public string FormatType { get; set; }
        // X-as Title
        public string X_Title { get; set; }
        // Y-as Title
        public string Y_Title { get; set; }
        //Title
        public string QuestionTitle { get { return "Vraag: " + (Question_Id) ?? "UNKNOWN"; } }
        // Survery ID
        public int InSurvery_Id { get; set; }
        // Question ID
        public int Question_Id { get; set; }
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
        public LineChartViewModel()
        {
            BaseData = new List<string>();
        }

        /* Methods */

        /* This method will set the right value for this chart */
        public void CreateChart()
        {
            // Early Aboart
            if (DataInput == null)
                throw new ArgumentNullException();

            SeriesCollection = new SeriesCollection();


            // For every line create Line Serie
            for (int line = 0; line < DataInput.Count; line++)
            {
                // Add line to Collection
                this.SeriesCollection.Add(new LineSeries
                {
                    // Set line title --> If null set name as number of the line
                    Title = LineTitles[line] ?? line.ToString(),
                    // Set values
                    Values = new ChartValues<double>(DataInput[line])
                });
            }
            // Set dataFormatter. If null pick default
            YFormatter = value => value.ToString(FormatType ?? "N");

        }

        /// <summary>
        /// This method will Construct the chart and prepair it before being drawed
        /// </summary>
        public ISaveableCharts ConstructChart(string type, List<SurveyQuestionVM> questions)
        {
            Answers = new List<AnswerVM>();

            if (type.Equals("Tijdschatting"))
            {

                // Data set
                List<double> data = new List<double>();
                Dictionary<int, string> timeList = new Dictionary<int, string>();
                Dictionary<int, double> id_TotalValue = new Dictionary<int, double>();
                Dictionary<int, int> id_Count = new Dictionary<int, int>();
                Dictionary<LineChartAmountKey, int> amount_count = new Dictionary<LineChartAmountKey, int>();

                // Set Question
                this.Question = questions[0].Question.Name;

                // Set Question ID
                this.Question_Id = questions[0].Question?.QuestionId ?? 0;

                // Get labels to set
                foreach (var answer in questions[0].Question.QuestionChoice)
                {
                    timeList.Add(answer.Id, answer.Name);
                }

                // Set line title
                this.LineTitles = new string[] { "Gemiddelde waarneming" };

                // Set label input
                this.Labels = timeList.Values.ToArray();

                // Gather data
                for (int i = 0; i < this.Labels.Count(); i++)
                {
                    // Set default data
                    data.Add(0);
                }

                // For every Question
                foreach (var question in questions)
                {

                    // For every answer
                    foreach (var answer in question.Answers)
                    {
                        // Add to the correct categorie
                        for (int i = 0; i < Labels.Length; i++)
                        {
                            // Check if the Question Choice is equal to the label that was set earlier
                            if (answer.QuestionChoiceId == timeList.Keys.ElementAt(i))
                            {
                                double amount;

                                // Check if the value is already inserted or not. If false insert new record else just add
                                if (id_TotalValue.TryGetValue((int)answer.QuestionChoiceId, out amount))
                                {
                                    id_TotalValue[(int)answer.QuestionChoiceId] = (int)(amount + answer.IntAnswer);
                                }
                                else
                                {
                                    id_TotalValue[(int)answer.QuestionChoiceId] = (int)answer.IntAnswer;
                                }
                                // Higher count value to calculate the average
                                int counted;

                                if (id_Count.TryGetValue((int)answer.QuestionChoiceId, out counted))
                                    id_Count[(int)answer.QuestionChoiceId] = counted + 1;
                                else
                                    id_Count.Add((int)answer.QuestionChoiceId, 1);

                                Answers.Add(new AnswerVM() { DatagridAnswer = answer.IntAnswer?.ToString(), TextAnswer = timeList.ElementAt(i).ToString().Split(',')[1].Substring(0, timeList.ElementAt(i).ToString().Split(',')[1].Length - 1) });
                                BaseData.Add(timeList.ElementAt(i).ToString() + " - " + answer.IntAnswer?.ToString());
                            }
                        }
                    }
                }

                int count = 0;

                foreach (var time in timeList)
                {
                    if (id_Count.Keys.Contains(time.Key))
                    {
                        var lowestValue = id_TotalValue.OrderBy(kvp => kvp.Key).First();

                        // Add to the sorted Dictionary
                        amount_count.Add(new LineChartAmountKey() { Amount = lowestValue.Value, Time = time.Key }, id_Count[lowestValue.Key]);

                        // Remove from original Dictionary
                        id_TotalValue.Remove(lowestValue.Key);
                    }
                    else
                    {
                        amount_count.Add(new LineChartAmountKey() { Amount = 0, Time = time.Key }, 0);
                    }
                }
    
                // Calculate averages
                foreach (var kvp in amount_count)
                {
                    // Amount / Count = Average
                    if (kvp.Key.Amount != 0)
                    {
                        data[count] = (kvp.Key.Amount / kvp.Value);

                    }
                    else
                    {
                        data[count] = 0;
                    }
                    
                    count++;
                }

                // Set data input
                this.DataInput = new List<List<double>> { { data } };

                // Add chart to Charlist
                return new LineChartView(this);
            }

            return null;
        }
    }
}