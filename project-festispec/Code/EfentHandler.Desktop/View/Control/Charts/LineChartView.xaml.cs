using EfentHandler.Desktop.ViewModel;
using LiveCharts;
using LiveCharts.Wpf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace EfentHandler.Desktop.View.Control.Charts
{
    /// <summary>
    /// Interaction logic for LineChartView.xaml
    /// </summary>
    public partial class LineChartView : UserControl, ISaveableCharts
    {
        #region Propperties
        public LineChartViewModel VM { get; set; }
        public IChartLink GetViewModel { get { return VM; } }
        public SeriesCollection SeriesCollection { get; set; }
        public List<AnswerVM> GivenAnswers { get { return VM.Answers; } }
        #endregion

        #region Constructor
        public LineChartView(LineChartViewModel VM)
        {
            this.VM = VM;

            // Build Chart
            VM.CreateChart();

            InitializeComponent();
            DataContext = this;

            this.MinWidth = 400;
            this.MinHeight = 400;

            // Add Binding Component
            SeriesCollection = VM.SeriesCollection;
        }
        #endregion


        #region Methods
        /// <summary>
        /// This method will save the Chart in a PNG
        /// </summary>
        public void SaveResults(String fileName)
        {
            // Build Chart - Hot Fix
            VM.CreateChart();

            // Create Chart to create an image of
            var _chart = new CartesianChart
            {
                Series = VM.SeriesCollection,
                // Setting correct Size
                MinWidth = (VM.Labels.Count() * VM.DataInput.Count()) * 75,
                MinHeight = 400,
            };

            _chart.DisableAnimations = true;

            var viewbox = new Viewbox();
            viewbox.Child = _chart;
            viewbox.Measure(_chart.RenderSize);
            viewbox.Arrange(new Rect(new Point(0, 0), _chart.RenderSize));
            _chart.Update(true, true); //force chart redraw
            _chart.Background = new System.Windows.Media.SolidColorBrush(System.Windows.Media.Color.FromRgb(255, 255, 255));
            viewbox.UpdateLayout();

            var encoder = new PngBitmapEncoder();

            EncodeVisual(_chart, fileName, encoder);
        }
        /// <summary>
        /// This method will save a PNG of a chart
        /// </summary>
        /// <param name="visual"></param>
        /// <param name="fileName"></param>
        /// <param name="encoder"></param>
        private static void EncodeVisual(FrameworkElement visual, string fileName, PngBitmapEncoder encoder)
        {
            var bitmap = new RenderTargetBitmap((int)visual.MinWidth, (int)visual.MinHeight, 96, 96, PixelFormats.Pbgra32);

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