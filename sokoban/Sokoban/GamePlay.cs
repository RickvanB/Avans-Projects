using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sokoban
{
    class GamePlay
    {
        private int _chest_on_destinationTiles;
        private int _destinationTiles;

        // Constructor
        public GamePlay(int amount_of_DestinationTiles) { _destinationTiles = amount_of_DestinationTiles; }

        private Boolean CheckWinner()
        {
            if (_chest_on_destinationTiles >= _destinationTiles)
            {
                this.FinishGame();
                return true;
            }

            return false;
                
        }

        /* Check how many chests there are standing on a destinationTile */
        public bool AmountOfChestOnDestination(List<Chest> chests) {
            this._chest_on_destinationTiles = 0;

            /* Check how many chests are on a DestinationTile */
            for (int i = 0; i < chests.Count; i++)
            {
                if (chests[i].DestinationTile != null)
                    this._chest_on_destinationTiles++;
            }
            // Return boolean -- Player win or don't win
            return this.CheckWinner();

                
        }
        /* Player has won the game */
        private void FinishGame()
        {
            /* Player won the game! */
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("We hebben een winnaar!! Gefeliciteerd");
            Console.ForegroundColor = ConsoleColor.White;
        }
    }
}

