namespace Domain.Circuits.strategy
{
    public interface IStateChanger
    {
        #region Methods
        int FlipState(CircuitPart node);
        #endregion
    }
}
