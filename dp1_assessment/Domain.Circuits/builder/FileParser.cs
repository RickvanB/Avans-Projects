using System;
using System.Collections.Generic;

namespace Domain.Circuits.builder
{
    #region Methods
    public class FileParser
    {
        public List<String> ReadCircuit(string path)
        {
            /* Read input from TXT file */
            List<String> circuitLines = new List<string>();
            try
            {
                /* Level file */
                int counter = 0;
                string line;

                System.IO.StreamReader file =
                new System.IO.StreamReader(path);
                while ((line = file.ReadLine()) != null)
                {
                    circuitLines.Add(line);
                    counter++;
                }

                file.Close();
            }
            catch
            {
                return null;
            }
            return circuitLines;
        }
    }
    #endregion
}
