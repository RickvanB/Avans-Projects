using Domain.Circuits;
using Domain.Circuits.controller;
using Domain.Circuits.enums;
using Front.Circuits.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Front.Circuits.repository
{
    public class CircuitRepository
    {
        private CircuitController _circuitController;
        // Events
        public delegate void CircuitChanges();
        public event CircuitChanges CircuitChanged;

        public CircuitRepository()
        {
            _circuitController = new CircuitController();

            // Set up correct event when circuit changes
            _circuitController.CircuitChanged += () =>
            {
                CircuitChanged?.Invoke();
            };
        }

        internal Circuit GetCircuit()
        {
            return _circuitController.Circuit;
        }

        internal ResultMessage PrepareCircuit(string filePath)
        {
            var result = _circuitController.SetUpCircuit(filePath);

            if (result.IsValid)
            {
                return new ResultMessage(result.IsValid);
            }

            var message = GetErrorMessage(result.ErrCode);
            if (result.Message != null)
            {
                message += $"\n(System Error: {result.Message})";
            }
            return new ResultMessage(result.IsValid, message);
                
        }

        private string GetErrorMessage(int code)
        {
            switch (code)
            {
                case (int)ErrorCodes.CONTAINS_INVALID_NODE:
                    return "Het Circuit bevat een of meer ongeldige nodes";

                case (int)ErrorCodes.COULD_NOT_CREATE_LINK:
                    return "Het Circuit bevat een ongeldige link tussen de nodes";

                case (int)ErrorCodes.FILE_NOT_FOUND:
                    return "Het Circuit kon niet worden geladen omdat het bestand niet is gevonden";

                case (int)ErrorCodes.LOOP_DETECTED:
                    return "Het Circuit bevat een oneindige loop en kan daarom niet worden geladen";

                case (int)ErrorCodes.ONE_OR_MORE_PROBES_NOT_REACHABLE:
                    return "Het Circuit bevat nodes die onbereikbaar zijn";

                case (int)ErrorCodes.UNKNOWN_ERROR:
                    return "Het Circuit kon niet worden geladen";
            }

            return null;
        }

        public Circuit StartCircuit()
        {
            _circuitController.Circuit?.StartCircuit();

            CircuitChanged?.Invoke();
            return _circuitController.Circuit;
        }

        public Circuit ResetCircuit()
        {
            _circuitController.ResetCircuit();

            return _circuitController.Circuit;
        }

        public Circuit ChangeInputNodeState(string nodeName)
        {
            _circuitController.ChangeInputNodeState(nodeName);

            return _circuitController.Circuit;
        }
    }
}
