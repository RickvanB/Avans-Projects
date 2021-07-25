using Front.Circuits.repository;
using Front.Circuits.views;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace Front.Circuits.viewModel
{
    public class MainVM : ViewModelBase
    {
        // Variables
        private string _filePath;
        private string _safeName;
        private CircuitRepository _circuitRepo;

        // Commands
        public ICommand UploadFileButton { get; set; }
        public ICommand LoadCircuitButton { get; set; }

        // Propperties
        public string FileName {
            get
            {
                return "Gekozen Bestand: " + _safeName;
            }
            private set
            {
                _safeName = value;
            }
        }

        // Constructor
        public MainVM(CircuitRepository circuitRepo)
        {
            UploadFileButton = new RelayCommand(UploadFile);
            LoadCircuitButton = new RelayCommand<Front.Circuits.views.MainWindow>(LoadCircuit);

            _circuitRepo = circuitRepo;
        }

        /// <summary>
        /// Open file dialog to upload file to read the circuit from
        /// </summary>
        private void UploadFile()
        {
            OpenFileDialog fileDialog = new OpenFileDialog();
            fileDialog.DefaultExt = ".txt";
            fileDialog.Filter = "Text documents (.txt)|*.txt";

            // Read input if user is ready
            if (fileDialog.ShowDialog() == true)
            {
                // Save path to file
                _filePath = fileDialog.FileName;
                FileName = fileDialog.SafeFileName;
                RaisePropertyChanged("FileName");
            }
        }

        /// <summary>
        /// This method will try to get the circuit from the selected file
        /// </summary>
        private void LoadCircuit(Front.Circuits.views.MainWindow mainWindow)
        {
            // Check if there has been uploaded a file
            if (string.IsNullOrEmpty(_filePath))
            {
                MessageBox.Show("U dient eerst een Circuit te kiezen voordat u deze kunt inladen.");
                return;
            }
            // Try get circuit
            var result = _circuitRepo.PrepareCircuit(_filePath);

            if (!result.IsValid)
            {
                // Reset file Upload
                FileName = null;
                RaisePropertyChanged("FileName");
                // Display Message
                MessageBox.Show(result.Message);
            }
            else
            {
                // Close window and open Circuit Window
                CircuitWindow circuitWindow = new CircuitWindow();
                circuitWindow.Show();
                mainWindow.Close();
            }
        }
    }
}
