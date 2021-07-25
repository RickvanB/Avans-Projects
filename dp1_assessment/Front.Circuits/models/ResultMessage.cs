using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Front.Circuits.models
{
    public class ResultMessage
    {
        public bool IsValid { get; private set; }
        public string Message { get; private set; }

        public ResultMessage(bool isValid, string message = null)
        {
            IsValid = isValid;
            Message = message;
        }
    }
}
