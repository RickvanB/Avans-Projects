using Domain.Circuits.visitor;

namespace Domain.Circuits
{
    public class InputNode : Node
    {
        #region Fields
        public static string PartKey => "INPUT_NODE";
        #endregion

        #region Methods
        public override void Accept(IPartVisitor visitor)
        {
            visitor.Visit(this);
        }

        public override void Activate()
        {
            if(base.Next != null)
            {
                foreach (var nextNode in base.Next)
                {
                    nextNode.DetermineState();
                }
            }
        }
        #endregion
    }
}
