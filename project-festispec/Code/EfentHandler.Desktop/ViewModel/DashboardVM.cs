using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using EfentHandler.Domain.Model;
using EfentHandler.Domain.Repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Messaging;

namespace EfentHandler.Desktop.ViewModel
{
    public class DashboardVM : ViewModelBase
    {
        public AssignmentListVM AssignmentListVM { get; set; }
        public ObservableCollection<AssignmentVM> AssignmentList { get; set; }
        public EmployeeVM Employee { get; set; }

        public int AmountCustomers { get; set; }
        public int AmountAssignments { get; set; }
        public int AmountInspectors { get; set; }
        public int AmountEmployees { get; set; }

        public ICommand AssignmentDeleteCommand { get; set; }
        public ICommand ShowAssignmentEditCommand { get; set; }

        public DashboardVM()
        {       
            ShowAssignmentEditCommand = new RelayCommand(AssignmentEdit);
        }

        public void Refresh()
        {
            AssignmentList = new ObservableCollection<AssignmentVM>();

            if (AssignmentListVM.AssignmentList.Count != 0)
                foreach (user_assignment assignment in Employee.Assigments)
                    AssignmentList.Add(AssignmentListVM.AssignmentList.Where(a => a.AssignmentId == assignment.AssignmentId).FirstOrDefault());
        }

        private void AssignmentEdit()
        {
            MessengerInstance.Send(new NotificationMessage("OpenAssignmentEdit"));
        }
    }
}
