using Domain.Circuits.composite;
using Domain.Circuits.decorator.concrete;
using Domain.Circuits.enums;

namespace Domain.Circuits.visitor
{
    public class ResetVisitor : IPartVisitor
    {
        public void Visit(InputComposite circuitPart)
        {
           // Nothing
        }
        public void Visit(InputNode circuitPart)
        {
            circuitPart.State.IncomingState(circuitPart.InitialState, circuitPart);
        }

        public void Visit(OutputNode circuitPart)
        {
            circuitPart.State.IncomingState((int)States.STATE_UNSET, circuitPart);
        }

        public void Visit(NandComponent circuitPart)
        {
            circuitPart.State.IncomingState((int)States.STATE_DEFAULT, circuitPart);
        }

        public void Visit(OrComponentDecorator circuitPart)
        {
            circuitPart.State.IncomingState((int)States.STATE_DEFAULT, circuitPart);
        }

        public void Visit(AndComponentDecorator circuitPart)
        {
            circuitPart.State.IncomingState((int)States.STATE_DEFAULT, circuitPart);
        }

        public void Visit(NorComponentDecorator circuitPart)
        {
            circuitPart.State.IncomingState((int)States.STATE_DEFAULT, circuitPart);
        }

        public void Visit(NotComponentDecorator circuitPart)
        {
            circuitPart.State.IncomingState((int)States.STATE_DEFAULT, circuitPart);
        }

        public void Visit(XorComponentDecorator circuitPart)
        {
            circuitPart.State.IncomingState((int)States.STATE_DEFAULT, circuitPart);
        }
    }
}
