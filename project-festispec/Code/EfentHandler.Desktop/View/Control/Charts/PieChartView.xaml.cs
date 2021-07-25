using EfentHandler.Desktop.ViewModel;
using LiveCharts;
using System;
using System.Collections.Generic;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace EfentHandler.Desktop.View.Control.Charts
{
    /// <summary>
    /// Interaction logic for PieChartView.xaml
    /// </summary>
    public partial class PieChartView : UserControl, ISaveableCharts
    {
        #region Propperties
        public SeriesCollection SeriesCollection { get; set; }
        public PieChartViewModel VM { get; set; }
        public IChartLink GetViewModel { get { return VM; } }
        public List<AnswerVM> GivenAnswers { get { return VM.Answers; } }
        #endregion

        public PieChartView(PieChartViewModel VM)
        {

            // Build Chart
            VM.CreateChart();

            this.VM = VM;

            this.MinWidth = 400;
            this.MinHeight = 400;

            InitializeComponent();
            DataContext = this;

            // Add Binding Component
            SeriesCollection = VM.SeriesCollection;



        }

        #region Methods
        /// <summary>
        /// This method will save the Chart in a PNG
        /// </summary>
        public void SaveResults(String fileName)
        {
            var _chart = Chart;

            _chart.DisableAnimations = true;
            _chart.InnerRadius = 125;
            _chart.Update(true, true); //force chart redraw

            var encoder = new PngBitmapEncoder();

            EncodeVisual(_chart, fileName, encoder);

            // Reset Animations
            _chart.DisableAnimations = false;
        }
        /// <summary>
        /// This method will save a PNG of a chart
        /// </summary>
        /// <param name="visual"></param>
        /// <param name="fileName"></param>
        /// <param name="encoder"></param>
        private static void EncodeVisual(FrameworkElement visual, string fileName, PngBitmapEncoder encoder)
        {
            var bitmap = new RenderTargetBitmap((int)visual.ActualWidth, (int)visual.ActualHeight, 96, 96, PixelFormats.Pbgra32);

            bitmap.Render(visual);

            var frame = BitmapFrame.Create(bitmap);

            encoder.Frames.Add(frame);

            String folderPath = "files\\images\\";
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            using (var stream = File.Create(folderPath + fileName)) encoder.Save(stream);

        }
        #endregion
    }
}