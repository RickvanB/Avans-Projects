//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EfentHandler.Domain.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class survey_question
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public survey_question()
        {
            this.answer = new HashSet<answer>();
        }
    
        public int SurveyQuestionId { get; set; }
        public int SurveyId { get; set; }
        public int QuestionId { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<answer> answer { get; set; }
        public virtual question question { get; set; }
        public virtual survey survey { get; set; }
    }
}
