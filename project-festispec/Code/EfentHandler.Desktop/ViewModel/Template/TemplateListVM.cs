using EfentHandler.Desktop.View;
using EfentHandler.Domain.Model;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace EfentHandler.Desktop.ViewModel
{
    public class TemplateListVM : ViewModelBase
    {
        private SurveyRepository _surveyRepository = new SurveyRepository();

        public ObservableCollection<SurveyVM> Templates { get; set; }
        public SurveyVM SelectedTemplate { get; set; }

        public ObservableCollection<QuestionTypeVM> QuestionTypes { get; set; }

        public ICommand TemplateEditCommand { get; set; }
        public ICommand TemplateRemoveCommand { get; set; }

        public TemplateListVM()
        {
            _surveyRepository = new SurveyRepository();
            TemplateEditCommand = new RelayCommand(TemplateEdit);
            TemplateRemoveCommand = new RelayCommand(TemplateRemove);

            QuestionTypes = new ObservableCollection<QuestionTypeVM>(_surveyRepository.GetQuestionTypes().Select(type => new QuestionTypeVM(type)));

            Refresh();
        }

        public void Refresh()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) != 1 && _surveyRepository.CheckConnection())
                Templates = new ObservableCollection<SurveyVM>(_surveyRepository.GetAllTemplates().Select(s => new SurveyVM(s)));
        }

        private void TemplateEdit()
        {
            MessengerInstance.Send(new NotificationMessage("OpenTemplateEdit"));
        }

        private void TemplateRemove()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_surveyRepository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (_surveyRepository.RemoveTemplate(SelectedTemplate.ToModel()))
            {
                Refresh();
                RaisePropertyChanged("Templates");
                MessageBox.Show("De template is succesvol verwijderd", "Succesvol verwijderd");
            }
            else
            {
                MessageBox.Show("De template is niet verwijderd. Herlaad de pagina en probeer het opnieuw.", "Niet verwijderd", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
