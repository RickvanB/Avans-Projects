using GalaSoft.MvvmLight;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class MenuItemVM : ViewModelBase
    {
        public string Name { get; set; }

        public object ViewModel { get; set; }
    }
}
