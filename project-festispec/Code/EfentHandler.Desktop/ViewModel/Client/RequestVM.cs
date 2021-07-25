using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;

namespace EfentHandler.Desktop.ViewModel
{
    public class RequestVM : ViewModelBase
    {
        private request _request;

        public RequestVM(request request)
        {
            _request = request;
        }

        public RequestVM()
        {
            _request = new request();
        }

        public request ToModel()
        {
            return _request;
        }

        public int RequestId
        {
            get { return _request.RequestId; }
            set { _request.RequestId = value; }
        }

        public string Description
        {
            get { return _request.Description; }
            set { _request.Description = value; }
        }

        public int ClientId
        {
            get { return _request.ClientId; }
            set { _request.ClientId = value; }
        }

        public void Changed()
        {
            RaisePropertyChanged("Description");
        }
    }
}