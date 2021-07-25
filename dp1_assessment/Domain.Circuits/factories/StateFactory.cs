using Domain.Circuits.enums;

namespace Domain.Circuits.factories
{
    public class StateFactory
    {
        #region Methods
        public State GetState(int value, CircuitPart context)
        {
            switch (value)
            {
                case (int)States.STATE_UNSET:
                    return new StateUnset();

                case (int)States.STATE_TRUE:
                    return new StateTrue();

                case (int)States.STATE_FALSE:
                    return new StateFalse();

                default:
                    return new StateDefault();
            }
        }

        public State GetStateByType(string type, CircuitPart context)
        {
            switch (type)
            {
                case "PROBE":
                    return new StateUnset();

                case "INPUT_HIGH":
                    return new StateTrue();

                case "INPUT_LOW":
                    return new StateFalse();

                default:
                    return new StateDefault();
            }
        }
        #endregion
    }
}
