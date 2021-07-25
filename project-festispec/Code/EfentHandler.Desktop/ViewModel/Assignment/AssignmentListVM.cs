using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using System.Windows;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;
using System.Configuration;

namespace EfentHandler.Desktop.ViewModel
{
    public class AssignmentListVM : ViewModelBase
    {
        private AssignmentRepository _assignmentRepository;
        private AssignmentVM _selectedAssignment;

        public bool ButtonDeleteVisible { get; set; }

        public AssignmentVM SelectedAssignment
        {
            get { return _selectedAssignment; }
            set
            {
                _selectedAssignment = value;
                base.RaisePropertyChanged();
            }
        }

        public ObservableCollection<AssignmentVM> AssignmentList { get; set; }
        public ObservableCollection<StatusVM> Statusses { get; set; }

        public ICommand AssignmentDeleteCommand { get; set; }
        public ICommand ShowAssignmentEditCommand { get; set; }

        public AssignmentListVM()
        {
            _assignmentRepository = new AssignmentRepository();

            Statusses = new ObservableCollection<StatusVM>(_assignmentRepository.GetAllStatusses().Select(s => new StatusVM(s)).ToList());

            AssignmentDeleteCommand = new RelayCommand(AssignmentDelete);
            ShowAssignmentEditCommand = new RelayCommand(AssignmentEdit);

            Refresh();
        }

        public void Refresh()
        {
            ButtonDeleteVisible = Int32.Parse(ConfigurationManager.AppSettings["UserTypeId"]) == 2 ? false : true;

            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) != 1 && _assignmentRepository.CheckConnection())
                AssignmentList = new ObservableCollection<AssignmentVM>(_assignmentRepository.GetAllAssignments().Select(a => new AssignmentVM(a)));
        }

        private void AssignmentDelete()
        {
            if (Int32.Parse(ConfigurationManager.AppSettings["NoConnection"]) == 1 || !_assignmentRepository.CheckConnection())
            {
                MessengerInstance.Send(new NotificationMessage("ShowStatusBar"));
                MessageBox.Show("U kunt geen bewerkingen uitvoeren wanneer u offline bent", "U bent offline!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (_assignmentRepository.RemoveAssignment(_selectedAssignment.ToModel()))
            {
                Refresh();
                RaisePropertyChanged("AssignmentList");
                MessageBox.Show("De opdracht is succesvol verwijderd", "Succesvol verwijderd");
            }
            else
            {
                MessageBox.Show("De opdracht is niet verwijderd. Herlaad de pagina en probeer het opnieuw.", "Niet verwijderd", MessageBoxButton.OK, MessageBoxImage.Error);
            }            
        }

        private void AssignmentEdit()
        {
            MessengerInstance.Send(new NotificationMessage("OpenAssignmentEdit"));
        }
    }
}