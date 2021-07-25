using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sokoban
{
    class KeyListener
    {
        // Objects
        private Truck Truck;

        // Variables
        public String direction { get; set; }
        public Point moveToDirection { get; set; }


        public KeyListener(Truck Truck)
        {
            this.Truck = Truck;
        }

        /* This method will implement the listners */
        public void listener()
        {
            var ch = Console.ReadKey(false).Key;
            int xPos = this.Truck.TruckLocation.X;
            int yPos = this.Truck.TruckLocation.Y;
            switch (ch)
            {
                case ConsoleKey.UpArrow:
                    this.direction = "U";
                    yPos--;
                    break;
                case ConsoleKey.DownArrow:
                    yPos++;
                    this.direction = "D";
                    break;
                case ConsoleKey.LeftArrow:
                    xPos--;
                    this.direction = "L";
                    break;
                case ConsoleKey.RightArrow:
                    xPos++;
                    this.direction = "R";
                    break;

                /* Stop game */
                case ConsoleKey.S:
                    Environment.Exit(0);
                    break;
            }

            this.moveToDirection = new Point(xPos, yPos);
        }


    }
}
