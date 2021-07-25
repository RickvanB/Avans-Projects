using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Windows.Shapes;

namespace Front.Circuits.models
{
    public class Gate
    {
        public string Name { get; set; }
        public Ellipse Comp { get; set; }
        public TextBlock Label { get; set; }

        public int XPos { get; set; }

        public int YPos { get; set; }

        public Gate()
        {
            Name = "NOT_SET";
        }
    }
}
