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
    
    public partial class assignment
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public assignment()
        {
            this.user_assignment = new HashSet<user_assignment>();
            this.schedule = new HashSet<schedule>();
            this.survey = new HashSet<survey>();
        }
    
        public int AssignmentId { get; set; }
        public string Description { get; set; }
        public System.DateTime StartDate { get; set; }
        public System.DateTime EndDate { get; set; }
        public string Street { get; set; }
        public int HouseNumber { get; set; }
        public string HouseNumberAddition { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public int StatusId { get; set; }
        public string Request { get; set; }
        public string Advice { get; set; }
        public int ClientId { get; set; }
        public Nullable<double> Lat { get; set; }
        public Nullable<double> Long { get; set; }
    
        public virtual client client { get; set; }
        public virtual status status { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<user_assignment> user_assignment { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<schedule> schedule { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<survey> survey { get; set; }
    }
}