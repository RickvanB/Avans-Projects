using System.Collections.Generic;
using Domain.Circuits.visitor;

namespace Domain.Circuits.decorator.concrete
{
    public class AndComponentDecorator : ComponentDecorator
    {
        #region Fields
        public static string PartKey => "AND";
        #endregion

        #region Constructor
        public AndComponentDecorator(Component decoratedComponent)
         : base(decoratedComponent) {}
        #endregion

        #region Methods
        public override void Accept(IPartVisitor visitor)
        {
            visitor.Visit(this);
        }

        public override void DetermineState()
        {
            var nand = new NandComponent();
            foreach (var prev in decoratedComponent.Previous)
            {
                var node = new NotComponentDecorator(new NandComponent());
                node.State.IncomingState(prev.State.Value, node);
                nand.Previous.Add(node);
            }
            nand.DetermineState();

            Component comp = new NotComponentDecorator(new NandComponent());
            comp.State.IncomingState(nand.State.Value, comp);

            decoratedComponent.Previous = new List<CircuitPart>();
            decoratedComponent.Previous.Add(comp);
            decoratedComponent.Previous.Add(comp);

            base.DetermineState();
        }
        #endregion
    }
}
