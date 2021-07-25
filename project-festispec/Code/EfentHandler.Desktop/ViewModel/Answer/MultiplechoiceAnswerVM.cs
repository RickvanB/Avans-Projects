using EfentHandler.Domain.Model;
using GalaSoft.MvvmLight;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfentHandler.Desktop.ViewModel
{
    public class MultiplechoiceAnswerVM : ViewModelBase
    {
        private multiplechoiceanswer _multiplechoiceanswer;

        public MultiplechoiceAnswerVM()
        {
            _multiplechoiceanswer = new multiplechoiceanswer();
        }

        public MultiplechoiceAnswerVM(multiplechoiceanswer multiplechoiceanswer)
        {
            _multiplechoiceanswer = multiplechoiceanswer;
        }

        public int Id
        {
            get { return _multiplechoiceanswer.MultipleChoiceId; }
            set { _multiplechoiceanswer.MultipleChoiceId = value; }
        }

        public string Answer
        {
            get { return _multiplechoiceanswer.Answer; }
            set { _multiplechoiceanswer.Answer = value; }
        }

        public question Question
        {
            get { return _multiplechoiceanswer.question; }
            set { _multiplechoiceanswer.question = value; }
        }

        public multiplechoiceanswer ToModel()
        {
            return _multiplechoiceanswer;
        }
    }
}