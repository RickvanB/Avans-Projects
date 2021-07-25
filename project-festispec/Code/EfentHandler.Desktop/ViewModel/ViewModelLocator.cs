/*
  In App.xaml:
  <Application.Resources>
      <vm:ViewModelLocator xmlns:vm="clr-namespace:EfentHandler.Desktop"
                           x:Key="Locator" />
  </Application.Resources>
  
  In the View:
  DataContext="{Binding Source={StaticResource Locator}, Path=ViewModelName}"

  You can also use Blend to do all this with the tool's support.
  See http://www.galasoft.ch/mvvm
*/

using CommonServiceLocator;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Ioc;
using System;
using System.Linq;

namespace EfentHandler.Desktop.ViewModel
{
    /// <summary>
    /// This class contains static references to all the view models in the
    /// application and provides an entry point for the bindings.
    /// </summary>
    public class ViewModelLocator
    {
        /// <summary>
        /// Initializes a new instance of the ViewModelLocator class.
        /// </summary>
        public ViewModelLocator()
        {
            ServiceLocator.SetLocatorProvider(() => SimpleIoc.Default);
         
            SimpleIoc.Default.Register<TemplateListVM>();
            SimpleIoc.Default.Register<EmployeeListVM>();
            SimpleIoc.Default.Register<InspectorListVM>();
            SimpleIoc.Default.Register<AssignmentListVM>();
            SimpleIoc.Default.Register<ClientListVM>();
            SimpleIoc.Default.Register<AssignmentEditVM>();
            SimpleIoc.Default.Register<ReportGenerator>();
            SimpleIoc.Default.Register<MyProfileVM>();
            SimpleIoc.Default.Register<DashboardVM>();
        }

        public LoginVM Login
        {
            get { return new LoginVM(); }
        }

        public DashboardVM Dashboard
        {
            get
            {
                ServiceLocator.Current.GetInstance<DashboardVM>().AssignmentListVM = AssignmentList;
                ServiceLocator.Current.GetInstance<DashboardVM>().Employee = EmployeeProfile.Employee;
                ServiceLocator.Current.GetInstance<DashboardVM>().AmountCustomers = ClientList.ClientList.Count;
                ServiceLocator.Current.GetInstance<DashboardVM>().AmountAssignments = AssignmentList.AssignmentList.Count;
                ServiceLocator.Current.GetInstance<DashboardVM>().AmountInspectors = InspectorList.InspectorList.Count;
                ServiceLocator.Current.GetInstance<DashboardVM>().AmountEmployees = EmployeeList.EmployeeList.Count;
                ServiceLocator.Current.GetInstance<DashboardVM>().Refresh();

                return ServiceLocator.Current.GetInstance<DashboardVM>();
            }
        }

        public MainVM Main
        {
            get
            {
                ServiceLocator.Current.GetInstance<TemplateListVM>().Refresh();
                ServiceLocator.Current.GetInstance<EmployeeListVM>().Refresh();
                ServiceLocator.Current.GetInstance<InspectorListVM>().Refresh();
                ServiceLocator.Current.GetInstance<AssignmentListVM>().Refresh();
                ServiceLocator.Current.GetInstance<ClientListVM>().Refresh();
                ServiceLocator.Current.GetInstance<MyProfileVM>().Refresh();

                ServiceLocator.Current.GetInstance<DashboardVM>().AssignmentListVM = AssignmentList;
                ServiceLocator.Current.GetInstance<DashboardVM>().Employee = EmployeeProfile.Employee;
                ServiceLocator.Current.GetInstance<DashboardVM>().AmountCustomers = ClientList.ClientList.Count;
                ServiceLocator.Current.GetInstance<DashboardVM>().AmountAssignments = AssignmentList.AssignmentList.Count;
                ServiceLocator.Current.GetInstance<DashboardVM>().AmountInspectors = InspectorList.InspectorList.Count;
                ServiceLocator.Current.GetInstance<DashboardVM>().AmountEmployees = EmployeeList.EmployeeList.Count;
                ServiceLocator.Current.GetInstance<DashboardVM>().Refresh();

                return new MainVM();
            }
        }

        public MapVM Map
        {
            get { return new MapVM(ServiceLocator.Current.GetInstance<ClientListVM>().ClientList, ServiceLocator.Current.GetInstance<AssignmentListVM>().AssignmentList, ServiceLocator.Current.GetInstance<InspectorListVM>().InspectorList); }
        }

        public TemplateListVM TemplateList
        {
            get
            {
                ServiceLocator.Current.GetInstance<TemplateListVM>().Refresh();
                return ServiceLocator.Current.GetInstance<TemplateListVM>();
            }
        }

        public TemplateAddVM TemplateAdd
        {
            get { return new TemplateAddVM(TemplateList); }
        }

        public TemplateEditVM TemplateEdit
        {
            get { return new TemplateEditVM(TemplateList); }
        }

        public EmployeeListVM EmployeeList
        {
            get
            {
                ServiceLocator.Current.GetInstance<EmployeeListVM>().Refresh();
                return ServiceLocator.Current.GetInstance<EmployeeListVM>();
            }
        }

        public EmployeeAddVM EmployeeAdd
        {
            get { return new EmployeeAddVM(EmployeeList); }
        }

        public EmployeeEditVM EmployeeEdit
        {
            get { return new EmployeeEditVM(EmployeeList, EmployeeList.UserTypes); }
        }

        public MyProfileVM EmployeeProfile
        {
            get { return ServiceLocator.Current.GetInstance<MyProfileVM>(); }
        }

        public InspectorListVM InspectorList
        {
            get
            {
                ServiceLocator.Current.GetInstance<InspectorListVM>().Refresh();
                return ServiceLocator.Current.GetInstance<InspectorListVM>();
            }
        }

        public InspectorAddVM InspectorAdd
        {
            get { return new InspectorAddVM(InspectorList); }
        }

        public InspectorEditVM InspectorEdit
        {
            get { return new InspectorEditVM(InspectorList); }
        }

        public AssignmentListVM AssignmentList
        {
            get
            {
                ServiceLocator.Current.GetInstance<AssignmentListVM>().Refresh();
                return ServiceLocator.Current.GetInstance<AssignmentListVM>();
            }
        }

        public AssignmentAddVM AssignmentAdd
        {
            get { return new AssignmentAddVM(AssignmentList); }
        }

        public AssignmentEditVM AssignmentEdit
        {
            get
            {
                ServiceLocator.Current.GetInstance<AssignmentEditVM>().AssignmentListVM = AssignmentList;
                ServiceLocator.Current.GetInstance<AssignmentEditVM>().Assignment = AssignmentList.SelectedAssignment;

                ServiceLocator.Current.GetInstance<AssignmentEditVM>().InspectorListVM = InspectorList;

                ServiceLocator.Current.GetInstance<AssignmentEditVM>().Clients = ClientList.ClientList;
                ServiceLocator.Current.GetInstance<AssignmentEditVM>().Employees = EmployeeList.EmployeeList;

                ServiceLocator.Current.GetInstance<AssignmentEditVM>().ReportGenerator = new ReportGenerator();
                ServiceLocator.Current.GetInstance<AssignmentEditVM>().ReportGenerator.ChartsViewModel = new ChartsViewModel();
                ServiceLocator.Current.GetInstance<AssignmentEditVM>().ReportGenerator.ChartsViewModel.QuestionTypes = TemplateList.QuestionTypes;

                ServiceLocator.Current.GetInstance<AssignmentEditVM>().Refresh();

                return ServiceLocator.Current.GetInstance<AssignmentEditVM>();
            }
        }

        public ClientListVM ClientList
        {
            get
            {
                ServiceLocator.Current.GetInstance<ClientListVM>().Refresh();
                return ServiceLocator.Current.GetInstance<ClientListVM>();
            }
        }

        public ClientAddVM ClientAdd
        {
            get { return new ClientAddVM(ClientList); }
        }

        public ClientEditVM ClientEdit
        {
            get { return new ClientEditVM(ClientList, AssignmentList); }
        }

        public SurveyAddVM SurveyAdd
        {
            get
            {
                return new SurveyAddVM(ServiceLocator.Current.GetInstance<AssignmentEditVM>(), ServiceLocator.Current.GetInstance<TemplateListVM>());
            }
        }

        public SurveyEditVM SurveyEdit
        {
            get
            {
                return new SurveyEditVM(ServiceLocator.Current.GetInstance<AssignmentEditVM>(), ServiceLocator.Current.GetInstance<TemplateListVM>());
            }
        }
      
        public MailVM Mail
        { 
            get
            {
                MailVM mailVM = new MailVM();
                
                mailVM.FilePath = ServiceLocator.Current.GetInstance<AssignmentEditVM>().ReportGenerator.ReportData.FilePath;
                mailVM.InspectionDateStart = ServiceLocator.Current.GetInstance<AssignmentEditVM>().Assignment.StartDate;
                mailVM.InspectionDateEnd = ServiceLocator.Current.GetInstance<AssignmentEditVM>().Assignment.EndDate;

                ClientVM client = ClientList.ClientList.ToList().Where(c => c.ClientId == AssignmentEdit.Assignment.ClientId).FirstOrDefault();

                mailVM.CustomerName = client.CompanyName;
                mailVM.DeSelectedCP.Add(new ContactpersonVM() { Email = client.Email, FirstName = client.CompanyName });
                client.Contactpersons.ToList().ForEach(c => mailVM.DeSelectedCP.Add(new ContactpersonVM(c)));

                return mailVM;
            }
        }

        public ReportVM Report
        {
            get
            {
                ReportVM reportVM = new ReportVM();
                reportVM.ChartsVM = ServiceLocator.Current.GetInstance<AssignmentEditVM>().ReportGenerator.ChartsViewModel;
                reportVM.ReportGenerator = ServiceLocator.Current.GetInstance<AssignmentEditVM>().ReportGenerator;
                reportVM.AssignmentEditVM = ServiceLocator.Current.GetInstance<AssignmentEditVM>();

                return reportVM;
            }
        }

        public static void Cleanup()
        {
            // TODO Clear the ViewModels
        }
    }
}