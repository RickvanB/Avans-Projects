using System;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using DPINT_Wk3_Observer.Model;
using Microsoft.Practices.ServiceLocation;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Collections.ObjectModel;
using System.Collections.Specialized;

namespace DPINT_Wk3_Observer.ViewModel
{
    /// <summary>
    /// This class contains properties that the main View can data bind to.
    /// <para>
    /// Use the <strong>mvvminpc</strong> snippet to add bindable properties to this ViewModel.
    /// </para>
    /// <para>
    /// You can also use Blend to data bind with the tool's support.
    /// </para>
    /// <para>
    /// See http://www.galasoft.ch/mvvm
    /// </para>
    /// </summary>
    public class MainViewModel : ViewModelBase
    {
        #region Properties to bind to
        private string _nieuweVluchtVanaf;
        public string NieuweVluchtVanaf
        {
            get { return _nieuweVluchtVanaf; }
            set { _nieuweVluchtVanaf = value; RaisePropertyChanged("NieuweVluchtVanaf"); }
        }

        private int _nieuweVluchtAantalKoffers;
        public int NieuweVluchtAantalKoffers
        {
            get { return _nieuweVluchtAantalKoffers; }
            set { _nieuweVluchtAantalKoffers = value; RaisePropertyChanged("NieuweVluchtAantalKoffers"); }
        }

        public BaggagebandViewModel Band1 { get; set; }
        public BaggagebandViewModel Band2 { get; set; }
        public BaggagebandViewModel Band3 { get; set; }
        public RelayCommand NieuweVluchtCommand { get; set; }
        public RelayCommand AssignVluchtenCommand { get; set; }
        public RelayCommand VerversBaggagebandenCommand { get; set; }

        public ObservableCollection<VluchtViewModel> WachtendeVluchten { get; set; }
        #endregion Properties to bind to

        private Aankomsthal _aankomsthal;

        /// <summary>
        /// Initializes a new instance of the MainViewModel class.
        /// </summary>
        public MainViewModel(Aankomsthal aankomsthal)
        {
            NieuweVluchtCommand = new RelayCommand(AddNieuweVlucht);
            AssignVluchtenCommand = new RelayCommand(AssignVluchten);
            VerversBaggagebandenCommand = new RelayCommand(VerversBaggagebanden);
            WachtendeVluchten = new ObservableCollection<VluchtViewModel>();

            NieuweVluchtAantalKoffers = 5;

            _aankomsthal = aankomsthal;
            _aankomsthal.WachtendeVluchten.CollectionChanged += this.VerversWachtendeVluchten;


            Band1 = new BaggagebandViewModel(_aankomsthal.Baggagebanden[0]);
            Band2 = new BaggagebandViewModel(_aankomsthal.Baggagebanden[1]);
            Band3 = new BaggagebandViewModel(_aankomsthal.Baggagebanden[2]);

            InitializeDefaultVluchten();
        }

        private void InitializeDefaultVluchten()
        {
            _aankomsthal.NieuweInkomendeVlucht("New York", 7);
            _aankomsthal.NieuweInkomendeVlucht("Paris", 2);
            _aankomsthal.NieuweInkomendeVlucht("Beijing", 8);
            _aankomsthal.NieuweInkomendeVlucht("London", 6);
            _aankomsthal.NieuweInkomendeVlucht("Barcelona", 4);
            _aankomsthal.NieuweInkomendeVlucht("Sydney", 9);
            _aankomsthal.NieuweInkomendeVlucht("Moskow", 1);
            _aankomsthal.NieuweInkomendeVlucht("Rio de Janeiro", 9);
            _aankomsthal.NieuweInkomendeVlucht("Cape Town", 7);
            _aankomsthal.NieuweInkomendeVlucht("Tokyo", 3);
        }
        
        private void AssignVluchten()
        {

        }

        private void VerversWachtendeVluchten(object sender, NotifyCollectionChangedEventArgs e)
        {   
             if(e.Action == NotifyCollectionChangedAction.Add)
             {
                WachtendeVluchten.Add(new VluchtViewModel(e.NewItems[0] as Vlucht));
             } else if(e.Action == NotifyCollectionChangedAction.Remove)
             {
                WachtendeVluchten.RemoveAt(e.OldStartingIndex);
             }   
        }

        private void VerversBaggagebanden()
        {
            // TODO: Dit gaat straks vanzelf, deze hele methode kan dus weg.
            /*
            Band1.Update(_aankomsthal.Baggagebanden[0]);
            Band2.Update(_aankomsthal.Baggagebanden[1]);
            Band3.Update(_aankomsthal.Baggagebanden[2]);
            */
        }

        private void AddNieuweVlucht()
        {
            if (!String.IsNullOrWhiteSpace(NieuweVluchtVanaf))
            {
                _aankomsthal.NieuweInkomendeVlucht(NieuweVluchtVanaf, NieuweVluchtAantalKoffers);

                // TODO: Dit gaat straks vanzelf, kan hier dus weg.
                //WachtendeVluchten.Add(new VluchtViewModel(new Vlucht(NieuweVluchtVanaf, NieuweVluchtAantalKoffers)));

                NieuweVluchtAantalKoffers = 5;
                NieuweVluchtVanaf = null;
            }
        }
    }
}
 