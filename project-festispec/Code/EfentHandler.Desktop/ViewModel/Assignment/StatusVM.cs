using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;

namespace EfentHandler.Desktop.ViewModel
{
    public class StatusVM : ViewModelBase
    {
        private status _status;

        public StatusVM(status status)
        {
            _status = status;
        }
        public int StatusId
        {
            get { return _status.StatusId; }
        }
        public string Description
        {
            get { return _status.Status1; }
        }
        
        public void Changed()
        {
        }
        public status ToModel()
        {
            return _status;
        }
    }
}