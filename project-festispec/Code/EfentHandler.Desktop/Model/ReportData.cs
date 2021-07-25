using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.Model
{
    public class ReportData
    {
        public string CustomerName { get; set; }

        public string EventName { get; set; }

        public string EmployeeName { get; set; }

        public string FilePath { get; set; }

        public string FolderPath { get; set; }
        public string Advice { get; set; }

        public void CreateFileName()
        {
            FolderPath = "files\\pdf\\";
            string fileName = CustomerName + "_" + RemoveSpecialCharacters(EventName) + "_" + DateTime.Today.ToString("dd/MM/yyyy");
            FilePath = FolderPath + fileName;
        }

        private string RemoveSpecialCharacters(string str)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in str)
            {
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '.' || c == '_')
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }
    }
}