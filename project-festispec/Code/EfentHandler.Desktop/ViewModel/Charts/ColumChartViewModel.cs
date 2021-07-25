using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Controls;
using EfentHandler.Desktop.View.Control.Charts;
using EfentHandler.Domain.Model;
using LiveCharts;
using LiveCharts.Wpf;

namespace EfentHandler.Desktop.ViewModel
{
    public class ColumChartViewModel : UserControl, IChartLink
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
        // Survery ID
        public int InSurvery_Id { get; set; }
        // Question ID
        public int Question_Id { get; set; }
        // Set Steps
        public double Steps { get; internal set; }
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
        public ColumChartViewModel()
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


            // For every instance (Like a year of person) create an Colum
            for (int line = 0; line < DataInput.Count; line++)
            {
                // Add Colum to Collection
                this.SeriesCollection.Add(new ColumnSeries
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
            // Create new instance of answer list to fill the datagrid
            Answers = new List<AnswerVM>();

            if (type.Equals("Schaal"))
            {

                // Set Scale from one to ten
                this.Labels = new string[] { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" };
                // Set Colum names
                this.LineTitles = new string[] { "Aantal beoordelingen" };

                // Set X and Y title
                this.X_Title = "Schaal";
                this.Y_Title = "Aantal beoordelingen";

                // Gather all the data after setting default values
                List<double> data = new List<double>();
                for (int i = 0; i < 10; i++)
                {
                    data.Add(0);
                }

                for (int i = 0; i < questions.Count; i++)
                {
                    if (questions[i].Answers.ElementAt(0).IntAnswer != null)
                    {
                        data[(int)questions[i].Answers.ElementAt(0).IntAnswer - 1] = data[(int)questions[i].Answers.ElementAt(0).IntAnswer - 1] + 1;
                    }
                }

                // Set data input
                this.DataInput = new List<List<double>> { data };

                // Set question
                this.Question = questions[0].Question.Name;

                // Set Survery Value
                this.InSurvery_Id = questions[0].Survey?.Survey_Id ?? 0;

                // Set Question ID
                this.Question_Id = questions[0].Question?.QuestionId ?? 0;

                foreach (var question in questions)
                {
                    foreach (var answerToInsert in question.Answers)
                    {
                        Answers.Add(new AnswerVM() { DatagridAnswer = answerToInsert.IntAnswer?.ToString() });
                        BaseData.Add(answerToInsert.IntAnswer?.ToString());
                    }
                }

                // Add chart to Charlist
                return new ColumChartView(this);

            }
            else if (type.Equals("Afstand meten"))
            {
                // Set X and Y title
                this.X_Title = "Afstanden";
                this.Y_Title = "Aantal beoordelingen";

                // Set lables grouped by distance
                // Get highest value
                int? maxValue = 0;

                foreach (var question in questions)
                {
                    foreach (var answersItem in question.Answers)
                    {
                        if (maxValue < answersItem.IntAnswer)
                            maxValue = answersItem.IntAnswer;
                    }
                }

                if (maxValue == null)
                    maxValue = 50;

                // Calculate scale
                int amountOfSerpations = 0;
                int seperationAmount = 0;

                if (maxValue > 45)
                {
                    amountOfSerpations = ((int)maxValue / 15);
                    seperationAmount = 15;
                }
                else
                {
                    amountOfSerpations = ((int)maxValue / 4);
                    seperationAmount = 4;
                }

                List<int> label_values = new List<int>();
                List<string> labels = new List<string>();

                int lastInserted = -1;

                for (int i = 0; i < amountOfSerpations; i++)
                {
                    if (i != amountOfSerpations - 1)
                        labels.Add((lastInserted + 1) + " - " + (lastInserted + (seperationAmount - 1)));
                    else
                        labels.Add((lastInserted + 1) + " > ");


                    // Set of two are coupled and will be used later on for setting the correct data
                    label_values.Add((lastInserted + 1));
                    label_values.Add((lastInserted + (seperationAmount - 1)));

                    // Set last inserted amount
                    lastInserted = lastInserted + (seperationAmount - 1);
                }
                // Set lables
                this.Labels = labels.ToArray();

                // Set LineTitles
                this.LineTitles = new string[] { "" };

                // Set data input 
                List<double> data = new List<double>();

                // Fill data list with default data
                for (int i = 0; i < labels.Count; i++)
                {
                    data.Add(0);
                }

                foreach (var question in questions)
                {
                    int positionInDataList = 0;
                    int loopCounter = 0;

                    foreach (var answer in question.Answers)
                    {
                        if (answer.IntAnswer == null || answer.IntAnswer < 0)
                            continue;

                        positionInDataList = 0;

                        bool isPlaced = false;

                        for (int i = 0; i < label_values.Count; i++)
                        {
                            if (i != label_values.Count - 1 && answer.IntAnswer >= label_values[i] && answer.IntAnswer <= label_values[i + 1])
                            {
                                isPlaced = true;
                                data[i / 2] = data[i / 2] + 1;
                                break;
                            }

                            positionInDataList++;
                        }

                        if (!isPlaced)
                            data[labels.Count - 1] = data[labels.Count - 1] + 1;

                        loopCounter = loopCounter + 2;

                    }
                }

                foreach (var question in questions)
                {
                    foreach (var answerToInsert in question.Answers)
                    {
                        Answers.Add(new AnswerVM() { DatagridAnswer = answerToInsert.IntAnswer?.ToString() });
                        BaseData.Add(answerToInsert.IntAnswer?.ToString());
                    }
                }

                // Set data input
                this.DataInput = new List<List<double>> { data };

                // Set question
                this.Question = questions[0].Question.Name;

                // Set Survery Value
                this.InSurvery_Id = questions[0].Survey?.Survey_Id ?? 0;

                // Set Question ID
                this.Question_Id = questions[0].Question?.QuestionId ?? 0;

                // Add chart to Charlist
                return new ColumChartView(this);
            }
            else if (type.Equals("Meerkeuze"))
            {
                // Set categorie titles
                List<string> labels = new List<string>();
                List<int> label_Ids = new List<int>();

                // Get labels
                foreach (var answer in questions[0].Question.MultiplechoiceAnswer)
                {
                    labels.Add(answer.Answer);
                    label_Ids.Add(answer.Id);
                }

                // Set labels on X-as
                this.Labels = labels.ToArray();

                // Set Title of colums
                this.LineTitles = new string[] { "Aantal beoordelingen" };

                // Set question
                this.Question = questions[0].Question.Name;

                // Set Survery Value
                this.InSurvery_Id = questions[0].Survey?.Survey_Id ?? 0;

                // Set Question ID
                this.Question_Id = questions[0].Question?.QuestionId ?? 0;

                // Data set
                List<double> data = new List<double>();

                // Gather data
                for (int i = 0; i < this.Labels.Count(); i++)
                {
                    // Set default data
                    data.Add(0);
                }

                // Get every answer and add one to the correct categorie    
                for (int i = 0; i < questions.Count; i++)
                {
                    foreach (var answer in questions[i].Answers)
                    {
                        for (int j = 0; j < labels.Count; j++)
                        {
                            if (label_Ids[j] == answer.MultipleChoiceAnswer)
                            {
                                data[j] = data[j] + 1;
                                Answers.Add(new AnswerVM() { DatagridAnswer = labels[j] });
                                BaseData.Add(labels[j]);
                                break;
                            }
                        }
                    }
                }

                // Set data input
                this.DataInput = new List<List<double>> { data };

                // Save chart
                return new ColumChartView(this);
            }
            else if (type.Equals("5 minuten"))
            {
                // Set Question
                this.Question = questions[0].Question.Name;

                // Set Question ID
                this.Question_Id = questions[0].Question?.QuestionId ?? 0;

                int? minValue = 0;
                int? minMidValue;
                int? midValue = 0;
                int? midMaxValue = 0;
                int? maxValue = 0;

                foreach (var question in questions)
                    foreach (var answersItem in question.Answers)
                        if (maxValue < answersItem.IntAnswer)
                            maxValue = answersItem.IntAnswer;

                midValue = maxValue / 2;
                minMidValue = midValue / 2;
                midMaxValue = midValue + minMidValue;

                string[] labels = new string[] { minValue + " - " + minMidValue, minMidValue + " - " + midValue, midValue + " - " + midMaxValue, midMaxValue + " - " + maxValue, "" };

                // Set lables
                this.Labels = labels.ToArray();

                // Set Line titles
                this.LineTitles = new string[] { "Aantal beoordelingen" };

                // Data set
                List<double> data = new List<double>();

                // Gather data
                for (int i = 0; i < this.Labels.Count(); i++)
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

                        // Add to answerlist
                        Answers.Add(new AnswerVM() { DatagridAnswer = answer.IntAnswer?.ToString() });
                        BaseData.Add(answer.IntAnswer?.ToString());
                    }
                }

                // Set data input
                this.DataInput = new List<List<double>> { data };

                return new ColumChartView(this);
            }

            return null;
        }
    }
}