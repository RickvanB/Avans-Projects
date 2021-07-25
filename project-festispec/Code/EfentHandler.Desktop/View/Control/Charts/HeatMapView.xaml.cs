using EfentHandler.Desktop.ViewModel;
using LiveCharts;
using LiveCharts.Defaults;
using LiveCharts.Wpf;
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

namespace EfentHandler.Desktop.View.Control.Charts
{
    /// <summary>
    /// Interaction logic for HeatMapView.xaml
    /// </summary>
    public partial class HeatMapView : UserControl, ISaveableCharts
    {
        public ChartValues<HeatPoint> SeriesCollection { get; set; }
        public HeatMapChartViewModel VM { get; set; }
        public IChartLink GetViewModel { get { return VM; } }

        public HeatMapView(HeatMapChartViewModel VM)
        {
            this.VM = VM;

            // Build Chart
            VM.CreateMap();

            this.MinWidth = 400;
            this.MinHeight = 400;

            InitializeComponent();
            DataContext = this;

            // Add Binding Component
            SeriesCollection = VM.Values;

        }

        #region Methods
        /// <summary>
        /// This method will save the Chart in a PNG
        /// </summary>
        public void SaveResults(String fileName)
        {
            // Create Chart to create an image of
            var _chart = HeatMap;

            _chart.DisableAnimations = true;
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