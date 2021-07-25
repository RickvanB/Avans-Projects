using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class SurveyVM : ViewModelBase
    {
        private survey _survey;
        private ObservableCollection<InspectorVM> _inspectors;

        public SurveyVM()
        {
            _survey = new survey();
        }

        public SurveyVM(survey survey)
        {
            _survey = survey;
        }

        public int Id
        {
            get { return _survey.SurveyId; }
            set { _survey.SurveyId = value; }
        }
        // TODO
        public int Survey_Id
        {
            get { return _survey.SurveyId; }
            set { _survey.SurveyId = value; }
        }

        public string Name
        {
            get { return _survey.Name; }
            set { _survey.Name = value; RaisePropertyChanged("Name"); }
        }

        public bool IsTemplate
        {
            get { return _survey.IsTemplate; }
            set { _survey.IsTemplate = value; }
        }

        public int? AssignmentId
        {
            get { return _survey.AssignmentId; }
            set { _survey.AssignmentId = value; }
        }

        public int? InspectorId
        {
            get { return _survey.AssignedEmployee; }
            set { _survey.AssignedEmployee = value; }
        }

        public DateTime? Date
        {
            get { return _survey.Date; }
            set { _survey.Date = value; }
        }

        public ICollection<survey_question> SurveyQuestion
        {
            get { return _survey.survey_question; }
            set { _survey.survey_question = value; }
        }

        public int? ParentSurvey
        {
            get { return _survey.ParentSurvey; }
            set { _survey.ParentSurvey = value; }
        }

        public ICollection<survey> ChildSurvey
        {
            get { return _survey.survey1 ; }
            set { _survey.survey1 = value; }
        }

        public ObservableCollection<InspectorVM> Inspectors
        {
            get { return _inspectors; }
            set { _inspectors = value; }
        }

        public string ConfirmedByInspectorString
        {
            get
            {
                if ((bool)_survey.ConfirmedByInspector)
                {
                    return "Bevestigd";
                }
                else
                {
                    return "Niet bevestigd";
                }
            }
        }

        private bool _confirmed;
        public bool Confirmed
        {
            get { return _confirmed; }
            set { _confirmed = value; }
        }

        public bool? ConfirmedByEmployee
        {
            get { return _survey.ConfirmedByEmployee == null ? false : _survey.ConfirmedByEmployee; }
            set { _survey.ConfirmedByEmployee = value; }
        }

        public bool? ConfirmedByInspector
        {
            get { return _survey.ConfirmedByInspector; }
            set { _survey.ConfirmedByInspector = value; }
        }

        public survey ToModel()
        {
            return _survey;
        }
    }
}