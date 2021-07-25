using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Windows.Shapes;

namespace Front.Circuits.models
{
    public class Legend
    {
        public List<Shape> Components { get; set; }
        public List<TextBlock> Labels { get; set; }

        public Shape CurShape { get; set; }
        public TextBlock curLabel { get; set; }
    }
}
