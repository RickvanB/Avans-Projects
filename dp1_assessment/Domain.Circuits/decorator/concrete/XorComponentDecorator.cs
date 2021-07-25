using Domain.Circuits.visitor;
using System.Collections.Generic;

namespace Domain.Circuits.decorator.concrete
{
    public class XorComponentDecorator: ComponentDecorator
    {
        #region Fields
        public static string PartKey => "XOR";
        #endregion

        #region Constructor
        public XorComponentDecorator(Component decoratedComponent)
         : base(decoratedComponent) {}
        #endregion

        #region Methods
        public override void Accept(IPartVisitor visitor)
        {
            visitor.Visit(this);
        }

        public override void DetermineState()
        {
            if(decoratedComponent.Previous.Count >= 2)
            {
                // First nand comp to combine input of A and B
                var nandComp = new NandComponent();
                nandComp.Previous.Add(decoratedComponent.Previous[0]);
                nandComp.Previous.Add(decoratedComponent.Previous[1]);
                nandComp.DetermineState();

                // Combine output from first nand comp with A
                var prevComp = new NandComponent();
                prevComp.State = nandComp.State;
                nandComp.Previous = new List<CircuitPart>();
                nandComp.Previous.Add(decoratedComponent.Previous[0]);
                nandComp.Previous.Add(prevComp);
                nandComp.DetermineState();

                var combindedState = nandComp.State;

                // Combine output from first Nand comp with B
                nandComp.Previous[0] = decoratedComponent.Previous[1];
                nandComp.DetermineState();

                // Decide final state
                var prevComp1 = new NandComponent();
                var prevComp2 = new NandComponent();
                prevComp1.State = combindedState;
                prevComp2.State = nandComp.State;

                nandComp.Previous = new List<CircuitPart>();
                nandComp.Previous.Add(prevComp1);
                nandComp.Previous.Add(prevComp2);
                nandComp.DetermineState();

                combindedState = nandComp.State;

                for(var i = 2; i < decoratedComponent.Previous.Count; i++)
                {
                    prevComp.State = combindedState;
                    // First nand comp to combine input of A and B
                    nandComp = new NandComponent();
                    nandComp.Previous.Add(prevComp);
                    nandComp.Previous.Add(decoratedComponent.Previous[i]);
                    nandComp.DetermineState();

                    // Combine output from first nand comp with A
                    prevComp1.State = nandComp.State;

                    nandComp.Previous = new List<CircuitPart>();
                    nandComp.Previous.Add(prevComp);
                    nandComp.Previous.Add(prevComp1);
                    nandComp.DetermineState();

                    prevComp2.State = nandComp.State;

                    // Combine output from first Nand comp with B
                    nandComp.Previous = new List<CircuitPart>();
                    nandComp.Previous.Add(prevComp1);
                    nandComp.Previous.Add(decoratedComponent.Previous[i]);
                    nandComp.DetermineState();

                    prevComp1.State = nandComp.State;

                    // If this is the last time to execute this for loop than break
                    if(i == (decoratedComponent.Previous.Count - 1))
                    {
                        break;
                    }
                    else
                    {
                        nandComp.Previous = new List<CircuitPart>();
                        nandComp.Previous.Add(prevComp1);
                        nandComp.Previous.Add(prevComp2);
                        nandComp.DetermineState();
                    }
                }

                decoratedComponent.Previous = new List<CircuitPart>();
                decoratedComponent.Previous.Add(prevComp1);
                decoratedComponent.Previous.Add(prevComp2);

                base.DetermineState();
            }
        }
        #endregion
    }
}
