using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Circuits.factories
{
    public interface IPartFactory
    {
        CircuitPart CreateCircuitPart(string type, string state = null);
    }
}
