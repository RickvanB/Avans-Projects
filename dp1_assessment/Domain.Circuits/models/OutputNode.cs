using Domain.Circuits.visitor;

namespace Domain.Circuits
{
    public class OutputNode : Node
    {
        #region Fields
        public static string PartKey => "PROBE";
        #endregion

        #region Methods
        public override void Accept(IPartVisitor visitor)
        {
            visitor.Visit(this);
        }

        public override void Activate()
        {
            // Do nothing
        }

        public override void DetermineState()
        {
            State.IncomingState(Previous[0].State.Value, this);
        }
        #endregion
    }
}
