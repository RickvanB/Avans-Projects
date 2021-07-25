using Domain.Circuits.builder;
using Domain.Circuits.strategy;
using Domain.Circuits.visitor;

namespace Domain.Circuits.controller
{
    public class CircuitController
    {
        #region Fields
        private Circuit _circuit;
        private CircuitBuilder _builder;
        private IStateChanger _stateChanger;
        #endregion

        #region Propperties
        public Circuit Circuit
        {
            get
            {
                return _circuit;
            }
            private set
            {
                CircuitChanged?.Invoke();
                _circuit = value;
            }
        }

        // Events
        public delegate void CircuitChanges();
        public event CircuitChanges CircuitChanged;
        #endregion

        #region Constructor
        public CircuitController()
        {
            _builder = new CircuitBuilder();
            _stateChanger = new InputStateChanger();
        }
        #endregion

        #region Methods

        public ValidationMessage SetUpCircuit(string pathToCircuit)
        {
            var builtResult = this._builder.PrepareCircuit(pathToCircuit);

            if (builtResult.IsValid)
            {
                this.Circuit = _builder.GetPreparedCircruit();
            }

            return builtResult;
        }

        public void ResetCircuit()
        {
            foreach(var inputNode in Circuit.InputComposite.GetNodes())
            {
                CircuitPart part = inputNode;
                part._partCounter = 0;
                part._prevIndex = 0;

                while (part != null)
                {
                    // Add reset visitor
                    part.Accept(new ResetVisitor());

                    // Check if there is a next node
                    if (part._partCounter < part.Next.Count)
                    {
                        // Set prevIndex to keep in mind which node was the previous node.
                        // This way we can go the same way back as how we ended up here
                        var prevCount = 0;
                        foreach (var prevs in part.Next[part._partCounter].Previous)
                        {
                            if (prevs.Equals(part))
                            {
                                part.Next[part._partCounter]._prevIndex = prevCount;
                            }

                            prevCount++;
                        }
                        part = part.Next[part._partCounter];
                    }
                    else
                    {
                        // Check if there is a previous node to set a current node
                        if (part._prevIndex < part.Previous.Count)
                        {
                            part._partCounter = 0;
                            part = part.Previous[part._prevIndex];
                            part._partCounter++;
                        }
                        else
                        {
                            // Break while loop and start over with new input node if present
                            part = null;
                        }
                    }
                }
            }
            CircuitChanged?.Invoke();
        }

        public void ChangeInputNodeState(string nodeName)
        {
            // Safty checks
            if(Circuit == null || Circuit?.InputComposite == null)
            {
                return;
            }

            //Find node
            foreach (var node in Circuit.InputComposite.GetNodes())
            {
                if(node.Name == nodeName)
                {
                    // Use Strategy
                    node.State.IncomingState(_stateChanger.FlipState(node), node);
                    // Activate Determine next
                    node.Activate();
                    CircuitChanged?.Invoke();
                }
            }
        }
        #endregion
    }
}
