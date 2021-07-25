using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace EfentHandler.Desktop.View
{
    public class DateConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value == null || value.ToString() == "")
            {
                return null;
            }

            if (value is DateTime)
            {
                return DateTime.Parse(value.ToString()).ToString("dd-MM-yyyy HH:mm:ss");
            }
            else
            {
                throw new InvalidOperationException("The target must be a DateTime");
            }
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value == null || value.ToString() == "")
            {
                return null;
            }

            if (value is string)
            {
                return DateTime.Parse(value.ToString()).ToString("yyyy-MM-dd HH:mm:ss");
            }
            else
            {
                throw new InvalidOperationException("The target must be a string");
            }
        }
    }
}