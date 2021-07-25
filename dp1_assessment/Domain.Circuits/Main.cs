using Domain.Circuits.controller;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Circuits
{
    class Program
    {
        static void Main(string[] args)
        {
            CircuitController c = new CircuitController();
            var result = c.SetUpCircuit(Environment.CurrentDirectory + "/Circuit1_FullAdder.txt");
            if (result.IsValid)
            {
                Console.WriteLine("Status: Circuit Succesfull Created");
            }
            else
            {
                Console.WriteLine("Error-Code: " + result.ErrCode);
            }
            

            Console.ReadKey();
            Console.ReadLine();
        }
    }
}
