using System;
using System.Collections.Generic;
using Domain.Circuits.builder;
using Domain.Circuits.composite;
using Domain.Circuits.enums;
using Domain.Circuits.facade;

namespace Domain.Circuits
{
    public class CircuitBuilder
    {
        #region Fields
        private CircuitPartFactory _partFactory;
        private List<CircuitPart> _createdParts;
        private FileParser _fileParser;
        private CircuitValidator _validator;
        private Circuit _circuit;
        private LinkBuilder _linkBuilder;
        private CircuitFacade _facade;

        private const string INPUT_LOW = "INPUT_LOW";
        private const string INPUT_HIGH = "INPUT_HIGH";
        private const string INPUT_NODE = "INPUT_NODE";
        #endregion

        #region Constructor
        public CircuitBuilder()
        {
            _partFactory = new CircuitPartFactory();
            _validator = new CircuitValidator();
            _fileParser = new FileParser();
            _linkBuilder = new LinkBuilder();
            _facade = new CircuitFacade();
        }
        #endregion

        #region Methods
        public Circuit GetPreparedCircruit()
        {
            return _circuit;
        }

        public ValidationMessage PrepareCircuit(string pathToCircuit)
        {       
            var circuitFile = _fileParser.ReadCircuit(pathToCircuit);
            if(circuitFile == null)
            {
                return new ValidationMessage(false, (int)ErrorCodes.FILE_NOT_FOUND);
            }

            // Check if there is at least one line
            if(circuitFile.Count > 0)
            {
                // Read all lines
                var isCreationLine = true;
                _createdParts = new List<CircuitPart>();
                var name_connections = new Dictionary<string, string>();
                foreach (var line in circuitFile)
                {
                    // Skipe lines with #
                    if (_facade.ContainsCharacter("#", line))
                    {
                        continue;
                    }

                    if (!_facade.ContainsCharacter(";", line))
                    {
                        isCreationLine = false;
                        continue;
                    }

                    // Convert to char array to read input
                    var lineChars = line.ToCharArray();
                    var name = "";
                    var typeOrConnection = "";
                    bool isName = true;

                    foreach (Char charItem in lineChars)
                    {
                        // Continue if tab or whitespace or is end of line ;
                        if (_facade.IsEndOfLineOrWhiteSpace(charItem))
                        {
                            continue;
                        }

                        // Continue if : but name has ended so set boolean.
                        if (_facade.EqualsCharacter(':', charItem))
                        {
                            isName = false;
                            continue;
                        }

                        // Add char to name string if char is before :
                        // Else add to type string
                        if (isName)
                        {
                            name += charItem;
                        }
                        else
                        {
                            typeOrConnection += charItem;
                        }

                    }

                    // If line is CircuitPart than generate item by factory
                    // Else prepare connections between objects
                    if (isCreationLine)
                    {
                        // Get object from Factory
                        string state = null;
                        if(typeOrConnection.Equals(INPUT_LOW) || typeOrConnection.Equals(INPUT_HIGH)) {
                            state = typeOrConnection;
                            typeOrConnection = INPUT_NODE;
                        }

                        var circuitPart = _partFactory.CreateCircuitPart(name, typeOrConnection, state);
                        
                        // Check if object is created
                        if(circuitPart != null)
                        {
                            _createdParts.Add(circuitPart);
                        }
                        else
                        {
                            // Rerturn error
                            var message = $"Node or Gate {name} could not be created due to an error.";
                            return new ValidationMessage(false, (int)ErrorCodes.CONTAINS_INVALID_NODE, message);
                        } 
                    }
                    else
                    {
                        // Add to dictionary to create links later on
                        name_connections.Add(name, typeOrConnection);
                    }
                }

                // Build links between the nodes
                var result = _linkBuilder.PrepareLinks(_createdParts, name_connections);

                if(!result.IsValid)
                {
                    return result;
                }
                else
                {
                    _createdParts = _linkBuilder.GetPreparedLinks();
                }

                // Validate Circuit
                var validationResult = _validator.ValidateCircuit(_createdParts);

                if (!validationResult.IsValid)
                {
                    return validationResult;
                }


                if (!PrepareForUse())
                {
                    return new ValidationMessage(false, (int)ErrorCodes.UNKNOWN_ERROR);
                }

                return new ValidationMessage(true, 0);
            }
            return new ValidationMessage(false, (int)ErrorCodes.UNKNOWN_ERROR);
        }

        private bool PrepareForUse()
        {
            _circuit = new Circuit();
            _circuit.InputComposite = new InputComposite();

            try
            {
                // Find all input nodes and set all counter = 0
                foreach (var part in _createdParts)
                {
                    if (part.Previous.Count == 0 && part.State.Value != -1 && part.State.Value != 2)
                    {
                        _circuit.InputComposite.AddNode((Node)part);
                    }
                }
                return true;

            } catch
            {
                return false;
            } 
        }
        #endregion
    }
}
