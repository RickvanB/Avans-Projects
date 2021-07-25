using Domain.Circuits.enums;

namespace Domain.Circuits.strategy
{
    public class InputStateChanger : IStateChanger
    {
        #region Methods
        public int FlipState(CircuitPart node)
        {
            if(node.State.Value == (int)States.STATE_TRUE)
            {
                return (int)States.STATE_FALSE;
            }
            else
            {
                return (int)States.STATE_TRUE;
            }
        }
        #endregion
    }
}
