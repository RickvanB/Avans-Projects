using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class QuestionTypeVM : ViewModelBase
    {
        private questiontype _questiontype;

        public QuestionTypeVM()
        {
            _questiontype = new questiontype();
        }

        public QuestionTypeVM(questiontype questiontype)
        {
            _questiontype = questiontype;
        }

        public int Id
        {
            get { return _questiontype.QuestionTypeId; }
            set { _questiontype.QuestionTypeId = value; }
        }

        public string Name
        {
            get { return _questiontype.Type; }
            set { _questiontype.Type = value; }
        }

        public ICollection<question> Questions
        {
            get { return _questiontype.question; }
            set { _questiontype.question = value; }
        }

        public questiontype ToModel()
        {
            return _questiontype;
        }
    }
}