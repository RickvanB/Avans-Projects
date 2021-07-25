using EfentHandler.Desktop.View.Control.Charts;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace EfentHandler.Desktop.ViewModel
{
    class ChartTestData
    {
        public ObservableCollection<ISaveableCharts> TestCode()
        {
            PieChartViewModel PieChart = new PieChartViewModel();

            List<double> values = new List<double> { 10, 10, 40, 20 };

            String[] Titles = new String[] { "Bezoekers", "Organisatoren", "Personeel", "Artiesten" };
            PieChart.LineTitles = Titles;

            PieChart.DataInput = values;
            PieChart.Question = "Wat is de zin van deze hele applicatie... Geen idee... Weet jij het? Ik ook niet";

            PieChart.CreateChart();

            LineChartViewModel LineChart = new LineChartViewModel();

            List<double> list1 = new List<double> { 1, 2, 3, 4, 5 };
            List<double> list2 = new List<double> { 1, 4, 5, 6, 7 };

            List<List<double>> mainList = new List<List<double>> { list1, list2 };

            LineChart.DataInput = mainList;
            LineChart.Labels = new string[] { "Jan", "Feb", "Mrt", "Apr" };
            LineChart.LineTitles = new string[] { "Jip", "Rick" };

            LineChart.Question = "Wat is de zin van deze hele applicatie... Geen idee... Weet jij het? Ik ook niet";

            LineChart.X_Title = "Maanden";
            LineChart.Y_Title = "Bedrag";

            LineChart.FormatType = "C";

            ColumChartViewModel ColumChart = new ColumChartViewModel();

            List<double> list3 = new List<double> { 10, 50, 75, 85 };
            List<double> list4 = new List<double> { 15, 18, 85, 90 };

            List<List<double>> mainList1 = new List<List<double>> { list3, list4 };

            ColumChart.DataInput = mainList1;
            ColumChart.Labels = new string[] { "Rick", "Patrick", "Jip", "Koen" };
            ColumChart.LineTitles = new string[] { "2017", "2018" };

            ColumChart.Question = "Wat is de zin van deze hele applicatie... Geen idee... Weet jij het? Ik ook niet";

            ColumChart.X_Title = "Maanden";
            ColumChart.Y_Title = "Bedrag";

            ColumChart.FormatType = "N";

            ColumChart.CreateChart();

            HeatMapChartViewModel HeatMapChart = new HeatMapChartViewModel();

            List<String> Locations = new List<String> { "Toiletten A", "Toiletten B", "Toiletten Uitgang", "Toiletten FoodBar" };
            List<String> TimeAmounts = new List<String> { "08:00", "09:00", "10:00", "11:00", "12:00", "13:00" };

            HeatMapChart.LocationValues = Locations;
            HeatMapChart.DateValues = TimeAmounts;

            HeatMapChart.Question = "Wat is de zin van deze hele applicatie... Geen idee... Weet jij het? Ik ook niet";

            List<int> Bussynes1 = new List<int> { 1, 1, 1, 1, 10, 5 };
            List<int> Bussynes2 = new List<int> { 1, 2, 3, 4, 10, 10 };
            List<int> Bussynes3 = new List<int> { 8, 4, 5, 10, 10, 1 };
            List<int> Bussynes4 = new List<int> { 2, 5, 7, 8, 5, 10 };

            List<List<int>> Data = new List<List<int>> { Bussynes1, Bussynes2, Bussynes3, Bussynes4 };

            HeatMapChart.Data_Input = Data;

            ColumChartView pei = new ColumChartView(ColumChart);

            ObservableCollection<ISaveableCharts> Charts = new ObservableCollection<ISaveableCharts>();

            for (int i = 0; i < 2; i++)
            {
                /*window.ChartPanel.Children.Add(pei);
                window.ChartPanel.Children.Add(new LineChartView(LineChart));
                window.ChartPanel.Children.Add(new ColumChartView(ColumChart));
                window.ChartPanel.Children.Add(new HeatMapView(HeatMapChart));*/

                Charts.Add(new PieChartView(PieChart));
                Charts.Add(new LineChartView(LineChart));
                Charts.Add(new ColumChartView(ColumChart));
                Charts.Add(new HeatMapView(HeatMapChart));
            }



            //window.Show();



            return Charts;
        }

        public List<List<SurveyQuestionVM>> OfficialTestData()
        {
            List<List<SurveyQuestionVM>> questionsCollection = new List<List<SurveyQuestionVM>>();

            List<SurveyQuestionVM> questions;
            // TIJDSCHATTING
            questions = new List<SurveyQuestionVM>();

            QuestionVM question50 = new QuestionMultiplechoiceVM();
            question50.QuestionTypeId = 8;
            question50.Name = "Hoe druk was het bij de WC’s? Maak elk uur een schatting.";
            question50.ChartTypeId = 2;
            question50.QuestionId = 1;

            QuestionChoiceVM questionchoice80 = new QuestionChoiceVM() { Id = 1, Name = "12:00", Question = question50.ToModel() };
            question50.QuestionChoiceAdd(questionchoice80);
            QuestionChoiceVM questionchoice81 = new QuestionChoiceVM() { Id = 2, Name = "13:00", Question = question50.ToModel() };
            question50.QuestionChoiceAdd(questionchoice81);
            QuestionChoiceVM questionchoice82 = new QuestionChoiceVM() { Id = 3, Name = "14:00", Question = question50.ToModel() };
            question50.QuestionChoiceAdd(questionchoice82);
            QuestionChoiceVM questionchoice83 = new QuestionChoiceVM() { Id = 4, Name = "15:00", Question = question50.ToModel() };
            question50.QuestionChoiceAdd(questionchoice83);
            QuestionChoiceVM questionchoice84 = new QuestionChoiceVM() { Id = 5, Name = "16:00", Question = question50.ToModel() };
            question50.QuestionChoiceAdd(questionchoice84);
            QuestionChoiceVM questionchoice86 = new QuestionChoiceVM() { Id = 7, Name = "18:00", Question = question50.ToModel() };
            question50.QuestionChoiceAdd(questionchoice86);

            // persoon 1
            SurveyQuestionVM surveyQuestion50 = new SurveyQuestionVM() { Question = question50 };
            surveyQuestion50.Answers.Add(new AnswerVM() { IntAnswer = 1, QuestionChoiceAnswer = 1 }.ToModel());
            surveyQuestion50.Answers.Add(new AnswerVM() { IntAnswer = 3, QuestionChoiceAnswer = 2 }.ToModel());
            surveyQuestion50.Answers.Add(new AnswerVM() { IntAnswer = 2, QuestionChoiceAnswer = 3 }.ToModel());
            surveyQuestion50.Answers.Add(new AnswerVM() { IntAnswer = 10, QuestionChoiceAnswer = 4 }.ToModel());
            surveyQuestion50.Answers.Add(new AnswerVM() { IntAnswer = 6, QuestionChoiceAnswer = 5 }.ToModel());

            // persoon 2
            SurveyQuestionVM surveyQuestion53 = new SurveyQuestionVM() { Question = question50 };
            surveyQuestion53.Answers.Add(new AnswerVM() { IntAnswer = 2, QuestionChoiceAnswer = 1 }.ToModel());
            surveyQuestion53.Answers.Add(new AnswerVM() { IntAnswer = 1, QuestionChoiceAnswer = 2 }.ToModel());
            surveyQuestion53.Answers.Add(new AnswerVM() { IntAnswer = 3, QuestionChoiceAnswer = 3 }.ToModel());
            surveyQuestion53.Answers.Add(new AnswerVM() { IntAnswer = 3, QuestionChoiceAnswer = 5 }.ToModel());

            // persoon 3
            SurveyQuestionVM surveyQuestion56 = new SurveyQuestionVM() { Question = question50 };
            surveyQuestion56.Answers.Add(new AnswerVM() { IntAnswer = 5, QuestionChoiceAnswer = 1 }.ToModel());
            surveyQuestion56.Answers.Add(new AnswerVM() { IntAnswer = 2, QuestionChoiceAnswer = 2 }.ToModel());
            surveyQuestion56.Answers.Add(new AnswerVM() { IntAnswer = 3, QuestionChoiceAnswer = 3 }.ToModel());
            surveyQuestion56.Answers.Add(new AnswerVM() { IntAnswer = 4, QuestionChoiceAnswer = 4 }.ToModel());
            surveyQuestion56.Answers.Add(new AnswerVM() { IntAnswer = 4, QuestionChoiceAnswer = 5 }.ToModel());

            questions.Add(surveyQuestion50);
            questions.Add(surveyQuestion53);
            questions.Add(surveyQuestion56);

            questionsCollection.Add(questions);


            // 5 MINUTEN
            questions = new List<SurveyQuestionVM>();

            QuestionVM question4 = new QuestionMultiplechoiceVM();
            question4.QuestionTypeId = 9;
            question4.Name = "Geef het aantal mensen in de rij 5 minuten voor het begin van de elke theater show.";
            question4.ChartTypeId = 1;
            question4.QuestionId = 2;

            QuestionChoiceVM questionchoice3 = new QuestionChoiceVM() { Id = 1, Name = "Show nummer 1", Question = question4.ToModel() };
            question4.QuestionChoiceAdd(questionchoice3);
            QuestionChoiceVM questionchoice4 = new QuestionChoiceVM() { Id = 2, Name = "Show nummer 2", Question = question4.ToModel() };
            question4.QuestionChoiceAdd(questionchoice4);

            // persoon 1
            SurveyQuestionVM surveyQuestion12 = new SurveyQuestionVM() { Question = question4 };
            surveyQuestion12.Answers.Add(new AnswerVM() { QuestionChoiceAnswer = 1, IntAnswer = 80 }.ToModel());
            surveyQuestion12.Answers.Add(new AnswerVM() { QuestionChoiceAnswer = 2, IntAnswer = 47 }.ToModel());

            // persoon 2
            SurveyQuestionVM surveyQuestion13 = new SurveyQuestionVM() { Question = question4 };
            surveyQuestion13.Answers.Add(new AnswerVM() { QuestionChoiceAnswer = 1, IntAnswer = 25 }.ToModel());
            surveyQuestion13.Answers.Add(new AnswerVM() { QuestionChoiceAnswer = 2, IntAnswer = 70 }.ToModel());

            // persoon 3
            SurveyQuestionVM surveyQuestion14 = new SurveyQuestionVM() { Question = question4 };
            surveyQuestion14.Answers.Add(new AnswerVM() { QuestionChoiceAnswer = 1, IntAnswer = 53 }.ToModel());
            surveyQuestion14.Answers.Add(new AnswerVM() { QuestionChoiceAnswer = 2, IntAnswer = 55 }.ToModel());
            surveyQuestion14.Answers.Add(new AnswerVM() { QuestionChoiceAnswer = 2, IntAnswer = 30 }.ToModel());

            questions.Add(surveyQuestion12);
            questions.Add(surveyQuestion13);
            questions.Add(surveyQuestion14);

            questionsCollection.Add(questions);


            // MEERKEUZE
            questions = new List<SurveyQuestionVM>();

            QuestionVM question2 = new QuestionMultiplechoiceVM();
            question2.QuestionTypeId = 7;
            question2.Name = "Wat beschrijft het beste de sfeer bij het publiek na de shows bij de main stage?";
            question2.ChartTypeId = 1;
            question2.QuestionId = 3;

            MultiplechoiceAnswerVM multiplechoiceanswer1 = new MultiplechoiceAnswerVM() { Id = 1, Answer = "Antwoord A", Question = question2.ToModel() };
            question2.MultiplechoiceAnswerAdd(multiplechoiceanswer1);
            MultiplechoiceAnswerVM multiplechoiceanswer2 = new MultiplechoiceAnswerVM() { Id = 2, Answer = "Antwoord B", Question = question2.ToModel() };
            question2.MultiplechoiceAnswerAdd(multiplechoiceanswer2);
            MultiplechoiceAnswerVM multiplechoiceanswer3 = new MultiplechoiceAnswerVM() { Id = 3, Answer = "Antwoord C", Question = question2.ToModel() };
            question2.MultiplechoiceAnswerAdd(multiplechoiceanswer3);
            MultiplechoiceAnswerVM multiplechoiceanswer4 = new MultiplechoiceAnswerVM() { Id = 4, Answer = "Antwoord D", Question = question2.ToModel() };
            question2.MultiplechoiceAnswerAdd(multiplechoiceanswer4);

            QuestionChoiceVM questionchoice1 = new QuestionChoiceVM() { Id = 1, Name = "Act nummer 1", Question = question2.ToModel() };
            question2.QuestionChoiceAdd(questionchoice1);
            QuestionChoiceVM questionchoice2 = new QuestionChoiceVM() { Id = 2, Name = "Act nummer 2", Question = question2.ToModel() };
            question2.QuestionChoiceAdd(questionchoice2);

            // persoon 1
            SurveyQuestionVM surveyQuestion4 = new SurveyQuestionVM() { Question = question2 };
            surveyQuestion4.Answers.Add(new AnswerVM() { MultipleChoiceAnswer = 1, QuestionChoiceAnswer = 1 }.ToModel());
            surveyQuestion4.Answers.Add(new AnswerVM() { MultipleChoiceAnswer = 4, QuestionChoiceAnswer = 2 }.ToModel());

            // persoon 2
            SurveyQuestionVM surveyQuestion6 = new SurveyQuestionVM() { Question = question2 };
            surveyQuestion6.Answers.Add(new AnswerVM() { MultipleChoiceAnswer = 2, QuestionChoiceAnswer = 1 }.ToModel());
            surveyQuestion6.Answers.Add(new AnswerVM() { MultipleChoiceAnswer = 3, QuestionChoiceAnswer = 2 }.ToModel());
            surveyQuestion6.Answers.Add(new AnswerVM() { MultipleChoiceAnswer = 3, QuestionChoiceAnswer = 1 }.ToModel());

            // persoon 3
            SurveyQuestionVM surveyQuestion20 = new SurveyQuestionVM() { Question = question2 };
            surveyQuestion20.Answers.Add(new AnswerVM() { MultipleChoiceAnswer = 4, QuestionChoiceAnswer = 2 }.ToModel());

            questions.Add(surveyQuestion4);
            questions.Add(surveyQuestion6);
            questions.Add(surveyQuestion20);

            questionsCollection.Add(questions);

            // SCHAAL
            questions = new List<SurveyQuestionVM>();

            QuestionVM question1 = new QuestionVM();
            question1.QuestionTypeId = 1;
            question1.Name = "Op een schaal van 1 tot 10, hoe wakker ben ik vandaag?";
            question1.ChartTypeId = 3;
            question1.QuestionId = 4;

            // persoon 1
            SurveyQuestionVM surveyQuestion1 = new SurveyQuestionVM() { Question = question1 };
            surveyQuestion1.Answers.Add(new AnswerVM() { IntAnswer = 5 }.ToModel());

            // persoon 2
            SurveyQuestionVM surveyQuestion2 = new SurveyQuestionVM() { Question = question1 };
            surveyQuestion2.Answers.Add(new AnswerVM() { IntAnswer = 8 }.ToModel());

            // persoon 3
            SurveyQuestionVM surveyQuestion3 = new SurveyQuestionVM() { Question = question1 };
            surveyQuestion3.Answers.Add(new AnswerVM() { IntAnswer = 8 }.ToModel());

            questions.Add(surveyQuestion1);
            questions.Add(surveyQuestion2);
            questions.Add(surveyQuestion3);

            questionsCollection.Add(questions);

            // AFSTAND METEN
            questions = new List<SurveyQuestionVM>();

            QuestionVM question3 = new QuestionVM();
            question3.QuestionTypeId = 4;
            question3.Name = "Meet de afstand tussen de steden";
            question3.ChartTypeId = 1;
            question3.QuestionId = 5;

            QuestionChoiceVM choice = new QuestionChoiceVM() { Id = 1, Name = "Weert", Question = question3.ToModel() };
            question3.QuestionChoiceAdd(choice);
            QuestionChoiceVM choice2 = new QuestionChoiceVM() { Id = 2, Name = "Maastricht", Question = question3.ToModel() };
            question3.QuestionChoiceAdd(choice2);
            QuestionChoiceVM choice3 = new QuestionChoiceVM() { Id = 3, Name = "Eindhoven", Question = question3.ToModel() };
            question3.QuestionChoiceAdd(choice3);
            QuestionChoiceVM choice4 = new QuestionChoiceVM() { Id = 4, Name = "Den Bosch", Question = question3.ToModel() };
            question3.QuestionChoiceAdd(choice4);

            // persoon 1
            SurveyQuestionVM surveyQuestion8 = new SurveyQuestionVM() { Question = question3 };
            surveyQuestion8.Answers.Add(new AnswerVM() { IntAnswer = 45, QuestionChoiceAnswer = 1, QuestionChoiceAnswer2 = 2 }.ToModel());
            surveyQuestion8.Answers.Add(new AnswerVM() { IntAnswer = 0, QuestionChoiceAnswer = 2, QuestionChoiceAnswer2 = 4 }.ToModel());

            // persoon 2
            SurveyQuestionVM surveyQuestion9 = new SurveyQuestionVM() { Question = question3 };
            surveyQuestion9.Answers.Add(new AnswerVM() { IntAnswer = 33, QuestionChoiceAnswer = 1, QuestionChoiceAnswer2 = 2 }.ToModel());

            // persoon 3
            SurveyQuestionVM surveyQuestion10 = new SurveyQuestionVM() { Question = question3 };
            surveyQuestion10.Answers.Add(new AnswerVM() { IntAnswer = 67, QuestionChoiceAnswer = 1, QuestionChoiceAnswer2 = 2 }.ToModel());
            surveyQuestion10.Answers.Add(new AnswerVM() { IntAnswer = -1, QuestionChoiceAnswer = 1, QuestionChoiceAnswer2 = 2 }.ToModel());
            surveyQuestion10.Answers.Add(new AnswerVM() { IntAnswer = 250, QuestionChoiceAnswer = 1, QuestionChoiceAnswer2 = 2 }.ToModel());

            questions.Add(surveyQuestion8);
            questions.Add(surveyQuestion9);
            questions.Add(surveyQuestion10);

            questionsCollection.Add(questions);

            // TELLEN
            questions = new List<SurveyQuestionVM>();

            QuestionVM question40 = new QuestionVM();
            question40.QuestionTypeId = 6;
            question40.ChartTypeId = 4;
            question40.Name = "Dit is een telvraag!";

            // persoon 1
            SurveyQuestionVM surveyQuestion52 = new SurveyQuestionVM() { Question = question40 };
            surveyQuestion52.Answers.Add(new AnswerVM() { IntAnswer = 80 }.ToModel());

            // persoon 2
            SurveyQuestionVM surveyQuestion63 = new SurveyQuestionVM() { Question = question40 };
            surveyQuestion63.Answers.Add(new AnswerVM() { IntAnswer = 25 }.ToModel());

            // persoon 3
            SurveyQuestionVM surveyQuestion54 = new SurveyQuestionVM() { Question = question40 };
            surveyQuestion54.Answers.Add(new AnswerVM() { IntAnswer = 53 }.ToModel());

            questions.Add(surveyQuestion52);
            questions.Add(surveyQuestion63);
            questions.Add(surveyQuestion54);

            questionsCollection.Add(questions);

            // TEKENEN
            questions = new List<SurveyQuestionVM>();

            QuestionVM question5 = new QuestionVM();
            question5.QuestionTypeId = 5;
            question5.ChartTypeId = 4;
            question5.Name = "Dit is een tekenvraag!";

            // persoon 1
            SurveyQuestionVM surveyQuestion45 = new SurveyQuestionVM() { Question = question5 };
            surveyQuestion45.Answers.Add(new AnswerVM() { TextAnswer = "https://www.delunchbus.nl/wp-content/uploads/2017/04/Appel-jg.png" }.ToModel());

            // persoon 2
            SurveyQuestionVM surveyQuestion46 = new SurveyQuestionVM() { Question = question5 };
            surveyQuestion46.Answers.Add(new AnswerVM() { TextAnswer = "https://www.consumentenbond.nl/binaries/content/gallery/cbhippowebsite/tests/aansprakelijkheidsverzekering/afbeeldingen/fbto-peer-eerste-indruk.jpg" }.ToModel());

            // persoon 3
            SurveyQuestionVM surveyQuestion47 = new SurveyQuestionVM() { Question = question5 };
            surveyQuestion47.Answers.Add(new AnswerVM() { TextAnswer = "https://cdn.ekoplaza.nl/ekoplaza/producten/large/2166940000000.jpg" }.ToModel());

            questions.Add(surveyQuestion45);
            questions.Add(surveyQuestion46);
            questions.Add(surveyQuestion47);

            questionsCollection.Add(questions);

            // AFBEELDINGEN
            questions = new List<SurveyQuestionVM>();

            QuestionVM question6 = new QuestionVM();
            question6.QuestionTypeId = 3;
            question6.ChartTypeId = 4;
            question6.Name = "Dit is een afbeeldingenvraag!";

            // persoon 1
            SurveyQuestionVM surveyQuestion48 = new SurveyQuestionVM() { Question = question6 };
            surveyQuestion48.Answers.Add(new AnswerVM() { TextAnswer = "https://www.delunchbus.nl/wp-content/uploads/2017/04/Appel-jg.png" }.ToModel());
            surveyQuestion48.Answers.Add(new AnswerVM() { TextAnswer = "https://images.nrc.nl/k8l_owQ3M0g6Uy0CuRccIZsR0E4=/1280x/filters:no_upscale()/s3/static.nrc.nl/images/stripped/1104nnwetappel.jpg" }.ToModel());

            // persoon 2
            SurveyQuestionVM surveyQuestion49 = new SurveyQuestionVM() { Question = question6 };
            surveyQuestion49.Answers.Add(new AnswerVM() { TextAnswer = "https://cdn.ekoplaza.nl/ekoplaza/producten/large/2166940000000.jpg" }.ToModel());
            surveyQuestion49.Answers.Add(new AnswerVM() { TextAnswer = "https://www.ekonoom.nl/media/catalog/product/cache/2/image/375x250/9df78eab33525d08d6e5fb8d27136e95/b/a/banaan-large.jpg" }.ToModel());

            questions.Add(surveyQuestion48);
            questions.Add(surveyQuestion49);

            questionsCollection.Add(questions);

            // OPEN VRAAG
            questions = new List<SurveyQuestionVM>();

            QuestionVM question11 = new QuestionVM();
            question11.QuestionTypeId = 2;
            question11.ChartTypeId = 4;
            question11.Name = "Dit is een openvraag!";

            // persoon 1
            SurveyQuestionVM surveyQuestion40 = new SurveyQuestionVM() { Question = question11 };
            surveyQuestion40.Answers.Add(new AnswerVM() { TextAnswer = "En nu dan?" }.ToModel());

            // persoon 2
            SurveyQuestionVM surveyQuestion41 = new SurveyQuestionVM() { Question = question11 };
            surveyQuestion41.Answers.Add(new AnswerVM() { TextAnswer = "Limburg" }.ToModel());

            // persoon 3
            SurveyQuestionVM surveyQuestion42 = new SurveyQuestionVM() { Question = question11 };
            surveyQuestion42.Answers.Add(new AnswerVM() { TextAnswer = "Brabant" }.ToModel());

            questions.Add(surveyQuestion40);
            questions.Add(surveyQuestion41);
            questions.Add(surveyQuestion42);

            questionsCollection.Add(questions);


            return questionsCollection;
        }


    }
}