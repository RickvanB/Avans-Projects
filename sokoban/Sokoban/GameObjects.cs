using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;


namespace Sokoban
{
    abstract class GameObjects
    {
        // This method will make the objects move
        abstract public Boolean Move(Point pointToMove, String direction);

    }
}
