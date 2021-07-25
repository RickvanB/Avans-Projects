using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

namespace Sokoban
{
    class LevelManager
    {
        /* Objects */
        private LevelBuilder _levelBuilder;
        private List<List<Tile>> _level_tiles;
        private Truck _truck;
        private List<Chest> _chests;
        private Chest _chest;
        private GamePlay _gameplay;
        private KeyListener _keyListener;

        // Constructor
        public LevelManager()
        {
            _truck = new Truck(this);
            _chests = new List<Chest>();
            _keyListener = new KeyListener(_truck);
        }

        //Properties
        public List<List<Tile>> LevelTiles { get { return _level_tiles; } set { _level_tiles = value; } }
        public Truck Truck { get { return _truck; } set {_truck = value; } }
        public List<Chest> Chests { get {return _chests; } set {_chests = value; } }



        // Choose a level to play
        private void ChoseLevel()
        {
            int LevelToPlay;

            /* Insert a number to play a level */
            Console.WriteLine("Insert a number between {0} and {1} to play a game - press s to stop", "1", "4" );
            String UserInput = Console.ReadLine();

            /* Start level if input is correct */
            if (String.IsNullOrWhiteSpace(UserInput))
                /* Re-call method */
                this.ChoseLevel();

            /* Else Try to parse the String into an Integer */
            if (Int32.TryParse(UserInput, out LevelToPlay))   
                  this.playLevel(LevelToPlay);

            /* Close application if user presses 's' */
            else if (UserInput.Equals("s"))
                Environment.Exit(0);

            /* If not re-call method */
            this.ChoseLevel();



        }

        public void ShowIntroScreen()
        {
            /* Print intro screen on console */
            Console.WriteLine("+-----------------------------------------------------+");
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("|           Klaar voor Sokoban? Mooi! Let's Go        |");
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("+-----------------------------------------------------+");
            Console.WriteLine("| Symbolen & Betekenis           | Doel van het spel  |");
            Console.WriteLine("| Spatie : Outerspace            | Duw met de truk de |");
            Console.WriteLine("|      ▒ : Muur                  | krat(ten) naar de  |");
            Console.WriteLine("|      . : Vloer                 | bestemming         |");
            Console.WriteLine("|      O : Krat                  +--------------------+");
            Console.WriteLine("|      0 : Krat op bestemming    | Made By:           |");
            Console.WriteLine("|      X : Bestemming            | Rick van Beek      |");
            Console.WriteLine("|      @ : Truck                 | Jip van Heugten    |");
            Console.WriteLine("+-----------------------------------------------------+");

            /* Open level chooser */
            this.ChoseLevel();
        }

        // Play a level
        public void playLevel(int level)
        {
            _levelBuilder = new LevelBuilder();
            /* Get level */
            this.LevelTiles = _levelBuilder.BuildLevel(level);

            /* Check if the levelbuilder method has succeded */
            if(LevelTiles == null)
            {
                this.ChoseLevel();
            }

            /* Set start location of truck */
            _truck.TruckLocation = _levelBuilder.TruckLocation;

            /* Reset List if needed */
            _chests.Clear();

            /* Set Start locations of chests */
            for (int i = 0; i < _levelBuilder.ChestLocations.Count; i++)
            {
                _chests.Add(_chest = new Chest(this) { ChestLocation = _levelBuilder.ChestLocations[i]});
            }

            /* Set amount of destination tiles --> Chest.Count is equal to the amount of destinationTiles */
            _gameplay = new GamePlay(_chests.Count());

            /* Draw level on console */
            this.builtPlayGround();

            while (true)
            {
                /* Check if the amount of DestinationTiles is equal to the amount of chests on destinationTiles */
                if (this._gameplay.AmountOfChestOnDestination(this.Chests))
                    break;

                Console.WriteLine("Verplaats de truck:");
                _keyListener.listener();
                Boolean moved = _truck.Move(_keyListener.moveToDirection, _keyListener.direction);
                
                if (moved)
                {
                    this.builtPlayGround();
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("Ongeldigde zet!");
                    Console.ForegroundColor = ConsoleColor.White;
                }
            }

        }

        public void builtPlayGround()
        {
            /* Clear the console */
            Console.Clear();

            /* Check boolean */
            Boolean chestPlaced = false;

           for(int i = 0; i < _level_tiles.Count; i++)
            {
                for (int j = 0; j < _level_tiles[i].Count; j++)
                {
                    chestPlaced = false;

                    if (_level_tiles[i][j] != null)
                    {
                        /* Draw Truck */
                        if(_truck.TruckLocation.Equals(new Point(j, i)))
                        {
                            Console.Write("@");
                            continue;
                        }

                        /* Check if there is a chest on this position */
                        for(int chestList = 0; chestList < _chests.Count; chestList++)
                        {
                            /* Draw Chest */
                            if(_chests[chestList].ChestLocation.Equals(new Point(j, i)) && _chests[chestList].DestinationTile == null)
                            {
                                Console.Write("O");
                                chestPlaced = true;
                                break;
                            } else if(_chests[chestList].ChestLocation.Equals(new Point(j, i)) && _chests[chestList].DestinationTile != null)
                            {
                                Console.Write("0");
                                chestPlaced = true;
                                break;
                            }

                        }
                        /* If there is placed a chest go on to the next tile */
                        if (chestPlaced)
                        {
                            continue;
                        }

                        /* Draw Wall */
                        if (_level_tiles[i][j].GetType() == typeof(Wall))
                            Console.Write("▒");

                        /* Draw Destination Tile */
                        else if (_level_tiles[i][j].GetType() == typeof(DestinationTile))
                            Console.Write("X");

                        /* Draw Normal Tile */
                        else if (_level_tiles[i][j].GetType() == typeof(NormalTile))
                            Console.Write(".");
                    }
                    else
                        /* Draw Outerspace */
                        Console.Write(" ");
                }
                /* Draw Line-End */
                Console.Write("\n");
            }
        }


    }
}