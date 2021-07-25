using Domain.Circuits.enums;

namespace Domain.Circuits
{
    public class StateUnset : State
    {
        #region Constructor
        public StateUnset()
        {
            Value = (int)States.STATE_UNSET;
        }
        #endregion
        #region Methods
        public override void IncomingState(int value, CircuitPart context)
        {
            if (value != Value)
            {
                context.State = context.StateFactory.GetState(value, context);
            }
            base.IncomingState(value, context);
        }
        
        public override void DetermineOutputColor(CircuitPart context)
        {
            context.OutputColor = (int)OutputColors.OUTPUT_UNSET;
        }
        #endregion
    }
}
