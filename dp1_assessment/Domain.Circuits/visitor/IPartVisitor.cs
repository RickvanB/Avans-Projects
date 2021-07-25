using Domain.Circuits.composite;
using Domain.Circuits.decorator.concrete;

namespace Domain.Circuits.visitor
{
    public interface IPartVisitor
    {
        #region Methods
        void Visit(InputComposite circuitPart);
        void Visit(InputNode circuitPart);
        void Visit(OutputNode circuitPart);
        void Visit(NandComponent circuitPart);
        void Visit(OrComponentDecorator circuitPart);
        void Visit(AndComponentDecorator circuitPart);
        void Visit(NorComponentDecorator circuitPart);
        void Visit(NotComponentDecorator circuitPart);
        void Visit(XorComponentDecorator circuitPart);
        #endregion
    }
}
