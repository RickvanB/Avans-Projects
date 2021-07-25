namespace Domain.Circuits.decorator
{
    public abstract class ComponentDecorator : Component
    {
        #region Propperties
        protected Component decoratedComponent;
        #endregion
        #region Constructor
        public ComponentDecorator(Component decoratedComponent)
        {
            this.decoratedComponent = decoratedComponent;
            this.decoratedComponent.Next = this.Next;
            this.decoratedComponent.Previous = this.Previous;
        }
        #endregion

        #region Methods
        public override void DetermineState()
        {
            if(decoratedComponent != null)
            {
                decoratedComponent.DetermineState();
                this.State = decoratedComponent.State;

                // Restore originals
                this.decoratedComponent.Previous = this.Previous;

                // Warn for state change
                base.StateHasChanged();
            }
        }
        #endregion
    }
}
