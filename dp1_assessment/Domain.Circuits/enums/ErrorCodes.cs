using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Circuits.enums
{
    public enum ErrorCodes : int
    {
        FILE_NOT_FOUND = 1,
        CONTAINS_INVALID_NODE = 2,
        COULD_NOT_CREATE_LINK = 3,
        UNKNOWN_ERROR = 4,
        LOOP_DETECTED = 5,
        ONE_OR_MORE_PROBES_NOT_REACHABLE = 6
    };
}
