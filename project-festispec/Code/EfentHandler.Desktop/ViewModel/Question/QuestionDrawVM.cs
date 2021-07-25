using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using Microsoft.Win32;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using System.Windows.Media.Imaging;
using static System.Net.Mime.MediaTypeNames;

namespace EfentHandler.Desktop.ViewModel
{
    public class QuestionDrawVM : QuestionVM
    {
        private bool _uploadImage = false;
        private string _imagePath;

        public ICommand UploadImageWindowCommand { get; set; }

        public override string Image
        {
            get { return _question.Image; }
            set { _question.Image = value; }
        }

        public QuestionDrawVM()
        {
            UploadImageWindowCommand = new RelayCommand(UploadImageWindow);

            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 4, Name = "Geen Chart" });
            ChartTypeId = 4;
        }

        public QuestionDrawVM(question question)
        {
            UploadImageWindowCommand = new RelayCommand(UploadImageWindow);
            _question = question;

            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 4, Name = "Geen Chart" });
        }

        public override void HandleBeforeAdding()
        {
            if (_uploadImage)
                UploadImage();
        }

        private void UploadImageWindow()
        {
            OpenFileDialog dialog = new OpenFileDialog();
            dialog.Filter = "Image files (*.png)|*.jpg|All files (*.*)|*.*";

            if (dialog.ShowDialog() == true)
            {
                _imagePath = dialog.InitialDirectory + dialog.FileName;
                //_uploadImage = true;
                UploadImage();
                RaisePropertyChanged("Image");
            }
        }

        private void UploadImage()
        {
            string fileName = _imagePath;
            _imagePath = null;

            // Get connection-strings from App.config
            string connString = ConfigurationManager.ConnectionStrings["AzureStorageAccount"].ConnectionString;
            string localFolder = ConfigurationManager.AppSettings["sourceFolder"];
            string destContainer = ConfigurationManager.AppSettings["destContainer"];

            // Get a reference to the storage account
            CloudStorageAccount sa = CloudStorageAccount.Parse(connString);
            CloudBlobClient bc = sa.CreateCloudBlobClient();

            // Get a reference to the container
            CloudBlobContainer container = bc.GetContainerReference(destContainer);

            // Create if it doesn't exist yet
            container.CreateIfNotExists();

            // Generate a unique key based on filename and current timestamp
            string key = DateTime.UtcNow.ToString("yyyy-MM-dd-HH:mm:ss") + "-" + System.IO.Path.GetFileName(fileName);

            // Upload Blob
            // Get a blob reference to write the file to
            CloudBlockBlob blob = container.GetBlockBlobReference(key);

            // Start uploading it
            using (var file = System.IO.File.Open(fileName, FileMode.Open, FileAccess.Read, FileShare.None))
                blob.UploadFromStream(file);

            // Show the image in some temporary window
            System.Windows.Controls.Image image = new System.Windows.Controls.Image();
            Image = blob.Uri.AbsoluteUri;
        }
    }
}