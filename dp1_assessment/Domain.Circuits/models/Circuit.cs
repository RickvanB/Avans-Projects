using Domain.Circuits.composite;

namespace Domain.Circuits
{
    public class Circuit
    {
        #region Propperties
        public InputComposite InputComposite { get; set; }
        #endregion

        #region Methods
        public void StartCircuit()
        {
            InputComposite?.Activate();
        }
        #endregion
    }
}
