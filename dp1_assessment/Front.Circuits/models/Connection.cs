using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Windows.Shapes;

namespace Front.Circuits.models
{
    public class Connection
    {
        public Line ConnectionLink { get; set; }
        public TextBlock Label { get; set; }

        // Naming Convention: Cur_Prev
        public string Name { get; set; }

        public Connection()
        {
            Name = "NOT_SET";
        }
    }
}
