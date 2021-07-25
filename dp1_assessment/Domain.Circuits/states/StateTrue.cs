using Domain.Circuits.enums;

namespace Domain.Circuits
{
    public class StateTrue : State
    {
        #region Constructor
        public StateTrue()
        {
            Value = (int)States.STATE_TRUE;
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
            context.OutputColor = (int)OutputColors.OUTPUT_HIGH;
        }
        #endregion
    }
}
