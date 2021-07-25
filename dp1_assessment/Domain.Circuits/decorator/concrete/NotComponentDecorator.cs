using Domain.Circuits.visitor;
using System.Collections.Generic;

namespace Domain.Circuits.decorator.concrete
{
    public class NotComponentDecorator : ComponentDecorator
    {
        #region Fields
        public static string PartKey => "NOT";
        #endregion

        #region Constructor
        public NotComponentDecorator(Component decoratedComponent)
         : base(decoratedComponent) {}
        #endregion
        #region Methods
        public override void Accept(IPartVisitor visitor)
        {
            visitor.Visit(this);
        }    

        public override void DetermineState()
        {
            var prev = decoratedComponent.Previous[0];
            decoratedComponent.Previous = new List<CircuitPart>();
            decoratedComponent.Previous.Add(prev);
            decoratedComponent.Previous.Add(prev);

            base.DetermineState();
        }
        #endregion
    }
}
