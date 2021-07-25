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

namespace EfentHandler.Desktop.View.Control.Charts
{
    /// <summary>
    /// Interaction logic for ImageChartView.xaml
    /// </summary>
    public partial class ImageChartView : UserControl
    {

        public BitmapImage BitMapImage { get; set; }

        public ImageChartView(BitmapImage image)
        {
            BitMapImage = image;

            InitializeComponent();

            DataContext = this;
        }
    }
}