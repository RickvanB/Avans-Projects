namespace Domain.Circuits
{
    public abstract class Component : CircuitPart
    {
        #region Methods
        public override void DetermineState()
        {
            base.DetermineState();
        }

        protected void StateHasChanged()
        {
            if(base.Next != null)
            {
                foreach (var nextNode in base.Next)
                {
                    nextNode.DetermineState();
                }
            }
        }
        #endregion
    }
}
