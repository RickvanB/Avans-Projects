using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace Sokoban
{
    abstract class Tile
    {
        /* Every Tile has at least 2 but at most 4 neighbours */
        public virtual Tile Left_neighbour { get; set; }
        public virtual Tile Right_neighbour { get; set; }
        public virtual Tile Down_neighbour { get; set; }
        public virtual Tile Upper_neighbour { get; set; }

    }
}
