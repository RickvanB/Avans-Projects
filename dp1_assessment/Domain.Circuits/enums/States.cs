using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Circuits.enums
{
    public enum States : int
    {
        STATE_TRUE = 1,
        STATE_FALSE = 0,
        STATE_UNSET = 2,
        STATE_DEFAULT = -1,
    };
}
