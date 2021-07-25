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
    public class QuestionVM : ViewModelBase
    {
        protected question _question;

        public ObservableCollection<AnswerVM> Answers { get; set; }

        public ObservableCollection<ChartTypeVM> ChartTypes { get; set; }

        public QuestionVM()
        {
            _question = new question();

            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 4, Name = "Geen Chart" });
            ChartTypeId = 4;
        }

        public QuestionVM(question question)
        {
            _question = question;

            ChartTypes = new ObservableCollection<ChartTypeVM>();
            ChartTypes.Add(new ChartTypeVM() { Id = 4, Name = "Geen Chart" });
        }

        public int Id
        {
            get { return _question.QuestionId; }
            set { _question.QuestionId = value; }
        }
        // TODO
        public int QuestionId
        {
            get { return _question.QuestionId; }
            set { _question.QuestionId = value; }
        }


        public string Name
        {
            get { return _question.Question1; }
            set { _question.Question1 = value; }
        }

        public ICollection<survey_question> SurveyQuestion
        {
            get { return _question.survey_question; }
            set { _question.survey_question = value; }
        }

        public int QuestionTypeId
        {
            get { return _question.QuestionTypeId; }
            set { _question.QuestionTypeId = value; }
        }

        public int? ChartTypeId
        {
            get { return _question.ChartTypeId; }
            set { _question.ChartTypeId = value; }
        }

        public virtual ObservableCollection<MultiplechoiceAnswerVM> MultiplechoiceAnswer { get; set; }
        public virtual void MultiplechoiceAnswerAdd(MultiplechoiceAnswerVM multiplechoiceAnswerVM) { }

        public virtual ObservableCollection<QuestionChoiceVM> QuestionChoice { get; set; }
        public virtual void QuestionChoiceAdd(QuestionChoiceVM questionChoiceVM) { }

        public virtual string Image { get; set; }
        public virtual void HandleBeforeAdding() { }

        public question ToModel()
        {
            return _question;
        }
    }
}