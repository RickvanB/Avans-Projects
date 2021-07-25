using Domain.Circuits.visitor;
using System.Collections.Generic;

namespace Domain.Circuits.decorator.concrete
{
    public class OrComponentDecorator : ComponentDecorator
    {
        #region Fields
        public static string PartKey => "OR";
        #endregion

        #region Constructor
        public OrComponentDecorator(Component decoratedComponent)
          : base(decoratedComponent) {}
        #endregion
        #region Methods
        public override void Accept(IPartVisitor visitor)
        {
            visitor.Visit(this);
        }

        public override void DetermineState()
        {
            var results = new List<int>();
            foreach (var prev in decoratedComponent.Previous)
            {
                var component = new NandComponent();
                component.Previous.Add(prev);
                component.Previous.Add(prev);

                component.DetermineState();
                results.Add(component.State.Value);
            }

            decoratedComponent.Previous = new List<CircuitPart>();
            foreach(var result in results)
            {
                var compAsPrev = new NotComponentDecorator(new NandComponent());
                compAsPrev.State.Value = result;

                decoratedComponent.Previous.Add(compAsPrev);
            }

            base.DetermineState();
        }
        #endregion
    }
}
