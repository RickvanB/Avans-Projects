using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Drawing;

namespace Sokoban
{
    class LevelBuilder
    {
        /* Variables */
        private Point _truckLocation;
        private List<Point> _chestLocations;
        private DestinationTile _destinationTile;
        private NormalTile _normalTile;
        private Wall _wall;
        private int _amountOfDestinationTiles;

        /* Properties */
        public Point TruckLocation { get { return _truckLocation; } private set{_truckLocation = value; } }
        public List<Point> ChestLocations { get { return _chestLocations; } private set { _chestLocations = value; } }
        public int AmountOfDestinationTiles { get { return _amountOfDestinationTiles; } set { _amountOfDestinationTiles = value; } }

        /* Constructor */
        public LevelBuilder()
        {
            _chestLocations = new List<Point>();
            /* Default value --> Will be updated later */
            this.AmountOfDestinationTiles = 0;
        }

        /* This method will add the levels into the game */
        public List<List<Tile>> BuildLevel(int level)
        {
            /* Return List */
            List<List<Tile>> tiles_lines = new List<List<Tile>>();

            /* Read input from TXT file */
            String level_map = null;
            try
            {
                /* Level file */
                level_map = System.IO.File.ReadAllText(@"doolhof\doolhof" + level + ".txt");
            }
            catch
            {
                /* If level not found */
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Waarschuwing: Level not found");
                Console.ForegroundColor = ConsoleColor.White;

                return null;
            }
           

            /* Save every Char into this chars array */
            Char[] levelChars = level_map.ToCharArray();

            /* Lines Lists */
            List<List<Char>> CharLines = new List<List<Char>>();
            List<List<Tile>> TileLines = new List<List<Tile>>();

            /* There is always one row at least. So we add it here */ 
            CharLines.Add(new List<Char>());
            TileLines.Add(new List<Tile>());

            /* Find out how many lines there are */
            for (int i = 0; i < levelChars.Length; i++)
            {
                if (levelChars[i].Equals('\n'))
                {
                    CharLines.Add(new List<Char>());
                    TileLines.Add(new List<Tile>());
                }
            }

            int takeList = 0;
            int ID = 0;

            /* Add correct Tile Objects to Lists */
            for (int i = 0; i < levelChars.Length; i++)
            {
                switch (levelChars[i])
                {
                    /* Wall */
                    case '#':
                        CharLines[takeList].Add(levelChars[i]);
                        TileLines[takeList].Add(_wall = new Wall());

                        ID++;
                        break;

                    /* Normal Tile */
                    case '.':
                        CharLines[takeList].Add(levelChars[i]);
                        TileLines[takeList].Add(_normalTile = new NormalTile());

                        ID++;
                        break;

                    /* Çhest */
                    case 'o':
                        ChestLocations.Add(new Point(ID, takeList));

                        CharLines[takeList].Add(levelChars[i]);
                        TileLines[takeList].Add(_normalTile = new NormalTile());

                        ID++;
                        break;

                    /* Truck */
                    case '@':
                        TruckLocation = new Point(ID,takeList);
                        CharLines[takeList].Add(levelChars[i]);
                        TileLines[takeList].Add(_normalTile = new NormalTile());

                        ID++;
                        break;

                    /* Destination */
                    case 'x':
                        CharLines[takeList].Add(levelChars[i]);
                        TileLines[takeList].Add(_destinationTile = new DestinationTile());
                        ID++;
                        this.AmountOfDestinationTiles++;
                        break;

                    /* Empty space */
                    case ' ':
                        CharLines[takeList].Add(levelChars[i]);
                        TileLines[takeList].Add(null);
                        break;

                    /* New Line */
                    case '\n':
                        takeList++;
                        ID = 0;
                        break;
                }
            }


            /* Add/Insert neighbour tile properties */
            for(int i = 0; i < TileLines.Count; i++)
            {
                for(int j = 0; j < TileLines[i].Count; j++)
                {
                    if (TileLines[i][j] != null)
                    {
                        if(j > 0)
                        {
                            /* Insert Left neighbour */
                            TileLines[i][j].Left_neighbour = TileLines[i][j - 1];
                        }

                        if(j < TileLines[i].Count - 1)
                        {
                            /* Insert Right neighbour */
                            TileLines[i][j].Right_neighbour = TileLines[i][j + 1];
                        }

                        if(i > 0)
                        {
                            /* Insert Upper neighbour */
                            TileLines[i][j].Upper_neighbour = TileLines[i - 1][j];
                        }

                        if (i > TileLines.Count - 1)
                        {
                            /* Insert Upper neighbour */
                            TileLines[i][j].Down_neighbour = TileLines[i + 1][j];
                        }
                    }

                    
                }
                /* Add Tile List to return List */
                tiles_lines.Add(TileLines[i]);
            }

            return tiles_lines;
        }
    }
}