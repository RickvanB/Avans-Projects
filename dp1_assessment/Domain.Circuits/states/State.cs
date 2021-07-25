namespace Domain.Circuits
{
    public abstract class State 
    {
        #region Propperties
        public int Value { get; set; }
        #endregion

        #region Methods
        public virtual void IncomingState(int value, CircuitPart context)
        {
            context.State.DetermineOutputColor(context);
        }

        public virtual void DetermineOutputColor(CircuitPart context) { }
        #endregion
    }
}
