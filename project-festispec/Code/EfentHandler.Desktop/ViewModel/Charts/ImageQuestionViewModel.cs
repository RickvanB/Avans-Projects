using EfentHandler.Desktop.View.Control.Charts;
using EfentHandler.Desktop.View.Control.QuestionReport;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media.Imaging;

namespace EfentHandler.Desktop.ViewModel
{
    public class ImageQuestionViewModel : IQuestionLink
    {
        public List<AnswerVM> GivenAnswersVM { get; set; }

        public List<System.Drawing.Image> Images { get; set; }

        public List<BitmapImage> BitMapImageList { get { return this.BitMapToImage(); } }

        public ISaveableQuestion ConstructQuestion(string type, List<SurveyQuestionVM> questions)
        {
            Images = new List<System.Drawing.Image>();

            if (type.Equals("Afbeeldingen") || type.Equals("Tekenen"))
            {
                // Create Image Object
                ImageQuestion imageQuestionView = new ImageQuestion();
                imageQuestionView.GivenAnswers = new List<string>();

                // set VM for pdf generator
                imageQuestionView.ViewModel = this;

                foreach (var question in questions)
                {
                    foreach (var image in question.Answers)
                    {
                        if (image.TextAnswer != null)
                        {
                            Images.Add(this.DownloadData(image.TextAnswer));
                            imageQuestionView.GivenAnswers.Add(image.TextAnswer);
                        }
                            
                    }

                }

                imageQuestionView.ImageCharts = GetImageCharts();

                // Set Question
                imageQuestionView.Question = questions[0].Question.Name;

                // Set Survery Value
                imageQuestionView.InSurvery_Id = questions[0].Survey?.Survey_Id ?? 0;

                // Set Question ID
                imageQuestionView.Question_Id = questions[0].Question?.QuestionId ?? 0;

                // Add object
                return imageQuestionView;

            }
            return null;
        }

        /// <summary>
        /// This method will try to get an image from a URL
        /// </summary>
        /// <param name="URL"></param>
        /// <returns></returns>
        public System.Drawing.Image DownloadData(string URL)
        {
            try
            {
                WebClient wc = new WebClient();
                byte[] bytes = wc.DownloadData(URL);
                MemoryStream ms = new MemoryStream(bytes);
                System.Drawing.Image img = System.Drawing.Image.FromStream(ms);

                return img;
            }
            catch
            {
                MessageBox.Show("Het laden van de afbeelding: " + URL + " is mislukt. \n Check de geldigheid van de URL");
            }

            return null;
        }
        /// <summary>
        /// This method will create Images of the Bitmaps
        /// </summary>
        /// <returns></returns>
        private List<BitmapImage> BitMapToImage()
        {
            List<BitmapImage> images = new List<BitmapImage>();

            foreach (var bitmap in Images)
            {
                if (bitmap != null)
                {
                    using (MemoryStream memory = new MemoryStream())
                    {
                        bitmap.Save(memory, System.Drawing.Imaging.ImageFormat.Bmp);
                        memory.Position = 0;
                        BitmapImage bitmapimage = new BitmapImage();
                        bitmapimage.BeginInit();
                        bitmapimage.StreamSource = memory;
                        bitmapimage.CacheOption = BitmapCacheOption.OnLoad;
                        bitmapimage.EndInit();

                        images.Add(bitmapimage);
                    }
                }
                
            }

            return images;
        }
        /// <summary>
        /// This method will create the actual images on an user control
        /// </summary>
        /// <returns></returns>
        private List<UserControl> GetImageCharts()
        {
            List<UserControl> images = new List<UserControl>();

            foreach (var image in BitMapImageList)
            {
                images.Add(new ImageChartView(image));
            }

            return images;
        }


    }
}