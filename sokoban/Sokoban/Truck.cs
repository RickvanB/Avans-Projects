using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace Sokoban
{
    class Truck : GameObjects
    {
        /* Truck Location */
        private Point _truckLocation;
        private LevelManager _levelManager;

        /* Propperty */
        public Point TruckLocation { get { return _truckLocation; } set { _truckLocation = value; } }

        /* Constructor */
        public Truck(LevelManager LevelManager)
        {
            _levelManager = LevelManager;
        }

        /* This method will check if a object can be moved and if possible move it.*/
        public override Boolean Move(Point pointToMove, String direction)
        {
            
            /* Check if tile to move to is not a wall */
            if (_levelManager.LevelTiles[pointToMove.Y][pointToMove.X].GetType() != typeof(Wall))
            {
                for (int i = 0; i < _levelManager.Chests.Count(); i++)
                {
                    /* Check if tile to move to is not taken by a chest and check if there is a chest the chest can or can't be moved */
                    if (new Point(pointToMove.X, pointToMove.Y).Equals(_levelManager.Chests[i].ChestLocation))
                        if (_levelManager.Chests[i].Move(this.MovePointChest(pointToMove, direction), direction))
                            break;
                        else
                        {
                            return false;
                        }
                }

                /* Move is possible so lets move */
                this.TruckLocation = pointToMove;

                return true;
            }

            return false;
        }

        /* This method will calculate the next position of a chest that needs to be checked */
        public Point MovePointChest(Point pointToMove, String direction)
        {
            int xPos = 0;
            int yPos = 0;

            switch (direction)
            {
                /* Check for every direcion if the new position is not invalid */

                /* To the left */
                case "L":
                    if(pointToMove.X > 0)
                    {
                        xPos = pointToMove.X - 1;
                        yPos = pointToMove.Y;
                    }
                    break;
                /* To the right */
                case "R":
                    if (pointToMove.X < _levelManager.LevelTiles[pointToMove.Y].Count)
                    {
                        xPos = pointToMove.X + 1;
                        yPos = pointToMove.Y;
                    }
                    break;
                /* Downwards */
                case "D":
                    if (pointToMove.Y < _levelManager.LevelTiles.Count)
                    {
                        yPos = pointToMove.Y + 1;
                        xPos = pointToMove.X;
                    }
                    break;
                /* Upwards */
                case "U":
                    if (pointToMove.Y > 0)
                    {
                        yPos = pointToMove.Y - 1;
                        xPos = pointToMove.X;
                    }
                    break;
            }

            return new Point(xPos, yPos);
        }

    }
}
