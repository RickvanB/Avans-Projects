using Domain.Circuits.enums;
using Domain.Circuits.factories;
using System;

namespace Domain.Circuits
{
    public class StateFalse : State
    {
        #region Constructor
        public StateFalse()
        {
            Value = (int)States.STATE_FALSE;
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
            context.OutputColor = (int)OutputColors.OUTPUT_LOW;
        }
        #endregion
    }
}
