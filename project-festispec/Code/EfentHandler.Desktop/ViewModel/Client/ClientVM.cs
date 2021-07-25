using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;

namespace EfentHandler.Desktop.ViewModel
{
    public class ClientVM : ViewModelBase
    {
        private client _client;

        public ClientVM(client client)
        {
            _client = client;
        }

        public ClientVM()
        {
            _client = new client();
        }

        public client ToModel()
        {
            return _client;
        }

        public int ClientId
        {
            get { return _client.ClientId; }
        }

        public string CompanyName
        {
            get { return _client.CompanyName; }
            set { _client.CompanyName = value; }
        }

        public int? KvKNumber
        {
            get { return _client.KvKNumber; }
            set { _client.KvKNumber = value; }
        }

        public int? EstablishmentNumber
        {
            get { return _client.EstablishmentNumber; }
            set { _client.EstablishmentNumber = value; }
        }

        public string Street
        {
            get { return _client.Street; }
            set { _client.Street = value; }
        }

        public string ZipCode
        {
            get { return _client.ZipCode; }
            set { _client.ZipCode = value; }
        }

        public string City
        {
            get { return _client.City; }
            set { _client.City = value; }
        }

        public int HouseNumber
        {
            get { return _client.HouseNumber; }
            set { _client.HouseNumber = value; }
        }

        public string HouseNumberAddition
        {
            get { return _client.HouseNumberAddition; }
            set { _client.HouseNumberAddition = value; }
        }

        public int Phone
        {
            get { return _client.Phone; }
            set { _client.Phone = value; }
        }

        public string Email
        {
            get { return _client.Email; }
            set { _client.Email = value; }
        }

        public string Website
        {
            get { return _client.Website; }
            set { _client.Website = value; }
        }

        public double Long
        {
            get { return (double) _client.Long; }
            set { _client.Long = value; }
        }

        public double Lat
        {
            get { return (double)_client.Lat; }
            set { _client.Lat = value; }
        }

        public ICollection<contactperson> Contactpersons
        {
            get { return _client.contactperson; }
            set { _client.contactperson = value; }
        }

        public ICollection<request> Requests
        {
            get { return _client.request; }
            set { _client.request = value; }
        }

        public void Changed()
        {
            RaisePropertyChanged("CompanyName");
            RaisePropertyChanged("KvKNumber");
            RaisePropertyChanged("EstablishmentNumber");
            RaisePropertyChanged("Street");
            RaisePropertyChanged("ZipCode");
            RaisePropertyChanged("City");
            RaisePropertyChanged("HouseNumber");
            RaisePropertyChanged("HouseNumberAddition");
            RaisePropertyChanged("Phone");
            RaisePropertyChanged("Email");
            RaisePropertyChanged("Website");
            RaisePropertyChanged("Contactpersons");
            RaisePropertyChanged("Requests");
            RaisePropertyChanged("Lat");
            RaisePropertyChanged("Long");
        }
    }
}