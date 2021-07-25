using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Circuits.builder
{
    public class ValidationMessage
    {
        #region Propperties
        public bool IsValid { get; private set; }
        public int ErrCode { get; private set; }
        public string Message { get; private set; }
        #endregion

        #region Constructor
        public ValidationMessage(bool isValid, int errCode, string message = null)
        {
            this.IsValid = isValid;
            this.ErrCode = errCode;
            this.Message = message;
        }
        #endregion
    }
}
