using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sokoban
{
    class Game
    {

        LevelManager manager;
        static void Main(string[] args)
        {

         LevelManager manager = new LevelManager();

            manager.ShowIntroScreen();
            Console.ReadLine();

        }
    }
}
