using Domain.Circuits.enums;
using Domain.Circuits.factories;
using Domain.Circuits.visitor;
using System;
using System.Collections.Generic;

namespace Domain.Circuits
{
    public abstract class CircuitPart : IEquatable<CircuitPart>
    {
        #region Fields
        public int _partCounter;
        public int _prevIndex;
        #endregion

        #region Propperties
        public string Name { get; set; }
        public List<CircuitPart> Next { get; set; }
        public List<CircuitPart> Previous { get; set; }
        public StateFactory StateFactory { get; private set; }
        public State State { get; set; }
        public int OutputColor { get; set; }
        #endregion

        #region Constructor
        public CircuitPart()
        {
            // Initialize next and previous
            Next = new List<CircuitPart>();
            Previous = new List<CircuitPart>();
            StateFactory = new StateFactory();

            // Set default state
            State = StateFactory.GetState((int)States.STATE_DEFAULT, this);
        }
        #endregion

        #region Methods
        public virtual void DetermineState() {}

        public abstract void Accept(IPartVisitor visitor);

        public bool Equals(CircuitPart other)
        {
            if (this.Name.Equals(other.Name))
            {
                if (other.Next.Count == this.Next.Count 
                    && other.Previous.Count == this.Previous.Count)
                {
                    return true;
                }
            }

            return false;
        }
        #endregion
    }
}
