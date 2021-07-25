namespace Domain.Circuits
{
    public abstract class Node : CircuitPart
    {
        #region Propperties
        public int InitialState { get; set; }
        #endregion

        #region Methods
        public abstract void Activate();
        #endregion
    }
}
