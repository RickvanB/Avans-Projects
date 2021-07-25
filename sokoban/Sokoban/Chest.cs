using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sokoban
{
    class Chest : GameObjects
    {
        /* Variables/ Objects */
        private LevelManager _levelManager;

        /* Chest Location */
        private Point _chestLocation;

        /* If chest is standing on a destination tile we will save it here */
        private DestinationTile _destinationTile;

        /* Propperty */
        public Point ChestLocation { get { return _chestLocation; } set { _chestLocation = value; } }
        public DestinationTile DestinationTile { get { return _destinationTile; } set { _destinationTile = value; } }

        /* Constructor */
        public Chest(LevelManager LevelManager)
        {
            _levelManager = LevelManager;
        }

        /* This method will check if a object can be moved and if possible move it.*/
        public override Boolean Move(Point pointToMove, String direction)
        {
            /* Check if tile to move to is not a wall */
            if (_levelManager.LevelTiles[pointToMove.Y][pointToMove.X].GetType() != typeof(Wall))
            {
                for(int i = 0; i < _levelManager.Chests.Count; i++)
                {
                    /* Check if tile to move to is not taken by another chest */
                    if (new Point(pointToMove.X, pointToMove.Y).Equals(_levelManager.Chests[i]._chestLocation))
                        return false;
                }

                /* Move is possible... So lets move */
                this.ChestLocation = pointToMove;

                /* Check if chest is standing on a DestinationTile tile
                 if true save the destinationTile */
                if (_levelManager.LevelTiles[pointToMove.Y][pointToMove.X].GetType() == typeof(DestinationTile))
                    this.DestinationTile = (DestinationTile)_levelManager.LevelTiles[pointToMove.Y][pointToMove.X];
                else
                    // Reset value
                    this.DestinationTile = null;
                return true;
            }
            else
                return false;
        }

    }
}
