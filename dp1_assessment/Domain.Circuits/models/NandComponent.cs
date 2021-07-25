using Domain.Circuits.enums;
using Domain.Circuits.visitor;

namespace Domain.Circuits
{
    public class NandComponent : Component
    {
        #region Fields
        public static string PartKey => "NAND";
        #endregion

        #region Methods
        public override void Accept(IPartVisitor visitor)
        {
            visitor.Visit(this);
        }

        public override void DetermineState()
        {
            if (Previous.Count >= 2)
            {
                var result = Previous[0].State.Value;

                for (var i = 1; i < Previous.Count; i++)
                {
                    result = result * Previous[i].State.Value;
                }

                if (result == 0)
                {
                    State.IncomingState((int)States.STATE_TRUE, this);
                }
                else if (result == 1)
                {
                    State.IncomingState((int)States.STATE_FALSE, this);
                }
            }
        }
        #endregion
    }
}