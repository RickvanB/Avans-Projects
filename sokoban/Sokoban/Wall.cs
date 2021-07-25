using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Sokoban
{
    class Wall : Tile
    { 
        /* Return itself because the wall has no neighbour */
        public override Tile Left_neighbour
        {
            get
            {
                return this;
            }
        }
        /* Return itself because the wall has no neighbour */
        public override Tile Right_neighbour
        {
            get
            {
                return this;
            }
        }
        /* Return itself because the wall has no neighbour */
        public override Tile Upper_neighbour
        {
            get
            {
                return this;
            }
        }
        /* Return itself because the wall has no neighbour */
        public override Tile Down_neighbour
        {
            get
            {
                return this;
            }
        }



    }
}