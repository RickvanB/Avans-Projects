using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;
using Microsoft.Maps.MapControl.WPF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class PushpinVM : ViewModelBase
    {
        public Location Location { get; set; }

        public string Background { get; set; }

        public string ToolTip { get; set; }
    }
}