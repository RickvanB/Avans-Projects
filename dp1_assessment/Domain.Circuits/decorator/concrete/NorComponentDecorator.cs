using Domain.Circuits.visitor;
using System.Collections.Generic;

namespace Domain.Circuits.decorator.concrete
{
    public class NorComponentDecorator : ComponentDecorator
    {
        #region Fields
        public static string PartKey => "NOR";
        #endregion

        #region Constructor
        public NorComponentDecorator(Component decoratedComponent)
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

            var secNand = new NandComponent();
            foreach (var result in results)
            {
                var compAsPrev = new NotComponentDecorator(new NandComponent());
                compAsPrev.State.Value = result;

                secNand.Previous.Add(compAsPrev);
            }
            secNand.DetermineState();

            decoratedComponent.Previous = new List<CircuitPart>();
            decoratedComponent.Previous.Add(secNand);
            decoratedComponent.Previous.Add(secNand);

            base.DetermineState();
        }
        #endregion
    }
}
