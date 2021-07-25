using System.Collections.Generic;
using Domain.Circuits.enums;

namespace Domain.Circuits.builder
{
    public class CircuitValidator
    {
        #region Fields
        private const int UNSET = 2;
        private string _message;
        #endregion

        #region Methods
        public ValidationMessage ValidateCircuit(List<CircuitPart> parts)
        {
            var loopResult = this.CheckForLoops(parts);

            if (!loopResult)
            {
                return new ValidationMessage(false, (int)ErrorCodes.LOOP_DETECTED, _message);
            }

            var probeResult = this.CheckForUnreachableProbes(parts);
            var incompleteCircuitResult = this.CheckIfAllProbesCanBeReached(parts);

            if (!probeResult || !incompleteCircuitResult)
            {
                return new ValidationMessage(false, (int)ErrorCodes.ONE_OR_MORE_PROBES_NOT_REACHABLE, _message);
            }

            return new ValidationMessage(true, 0);
        }

        private bool CheckForLoops(List<CircuitPart> parts)
        {
            var inputNodes = new List<CircuitPart>();

            // Find all input nodes and set all counter = 0
            foreach (var part in parts)
            {
                if(part.Previous.Count == 0 && part.State.Value != (int)States.STATE_DEFAULT)
                {
                    inputNodes.Add(part);
                }
                // Set initial counters
                part._partCounter = 0;
                part._prevIndex = 0;
            }

            // Check for loops
            foreach (var inputNode in inputNodes)
            {
                CircuitPart part = inputNode;
                var foundParts = new List<CircuitPart>();

                while(part != null)
                {
                    foundParts.Add(part);

                    // Check for loop in next nodes
                    // Only check the next's which has not been checked before
                    for(var i = part._partCounter; i < part.Next.Count; i++)
                    {
                        // If already in the list of found parts than there is a loop.
                        if (foundParts.Contains(part.Next[i]))
                        {
                            this._message = $"Node or Gate {part.Name} is part of a loop.";
                            return false;
                        }
                    }

                    // Chekc if there is a next node
                    if(part._partCounter < part.Next.Count)
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
                        // Remove current part from list to prevent from false detecting a loop
                        var toKeep = new List<CircuitPart>();
                        foreach(var foundPart in foundParts)
                        {
                            if (!foundPart.Equals(part))
                            {
                                toKeep.Add(foundPart);
                            }
                        }
                        foundParts = toKeep;

                        // Check if there is a previous node to set a current node
                        if(part._prevIndex < part.Previous.Count)
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
            return true;
        }

        private bool CheckForUnreachableProbes(List<CircuitPart> parts)
        {
            var outputNodes = new List<CircuitPart>();

            // Find all output nodes and set all counter = 0
            foreach (var part in parts)
            {
                
                if (part.Next.Count == 0 && part.State.Value == UNSET)
                {
                    // It is inpossible to reach this probe
                    if(part.Previous.Count == 0)
                    {
                        this._message = $"Probe {part.Name} is unreachable.";
                        return false;
                    }

                    outputNodes.Add(part);
                }
                // Set initial counters
                part._partCounter = 0;
                part._prevIndex = 0;
            }

            // Check for all output nodes if they can be reached
            foreach(var outputNode in outputNodes)
            {
                var part = outputNode;

                while (part != null)
                {
                    // Check if there is a Previous node
                    if (part._prevIndex < part.Previous.Count)
                    {
                        // Set partCounter to keep in mind which node was the previous node.
                        // This way we can go the same way back as how we ended up here
                        var nextCount = 0;
                        foreach (var nexts in part.Previous[part._prevIndex].Next)
                        {
                            if (nexts.Equals(part))
                            {
                                part.Previous[part._prevIndex]._partCounter = nextCount;
                            }

                            nextCount++;
                        }
                        part = part.Previous[part._prevIndex];
                    }
                    else
                    {
                        if (part.Previous.Count == 0 && part.State.Value != (int)States.STATE_DEFAULT)
                        {
                            break;
                        }
                        // Check if there is a next node to set a current node
                        if (part._partCounter < part.Next.Count)
                        {
                            part._prevIndex = 0;
                            part = part.Next[part._partCounter];
                            part._prevIndex++;
                        }
                        else
                        {
                            if(part.Previous.Count != 0)
                            {
                                this._message = $"Probe {part.Name} was unreachable";
                                return false;
                            }
                            // Break while loop and start over with new output node if present
                            part = null;
                        }
                    }
                }
            }
            return true;
        }

        private bool CheckIfAllProbesCanBeReached(List<CircuitPart> parts)
        {
            var inputNodes = new List<CircuitPart>();

            // Find all input nodes and set all counter = 0
            foreach (var part in parts)
            {
                // Exclude input nodes which has no nexts.
                // According to Circuits3_Encoder.txt these are not causing invalid ciruit problems
                if (part.Previous.Count == 0 && part.State.Value != (int)States.STATE_DEFAULT && part.Next.Count != 0)
                {
                    inputNodes.Add(part);
                }
                // Set initial counters
                part._partCounter = 0;
                part._prevIndex = 0;
            }

            // Check for loops
            foreach (var inputNode in inputNodes)
            {
                CircuitPart part = inputNode;

                while (part != null)
                {
                    // Check if the last node in a line is a probe
                    // If not return false 
                    if(part.Next.Count == 0 && part.State.Value != UNSET)
                    {
                        this._message = $"Node or Gate {part.Name} is not a probe. Last node should be a probe.";
                        return false;
                    }

                    // Chekc if there is a next node
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
            return true;
        }
        #endregion
    }
}
