using Domain.Circuits.factories;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace Domain.Circuits
{
    public class CircuitPartFactory
    {
        #region Fields
        private NodeFactory _nodeFactory;
        private ComponentFactory _componentFactory;
        private Dictionary<string, Type> _types;
        // Types
        private const string INPUT_HIGH = "INPUT_HIGH";
        private const string INPUT_LOW = "INPUT_LOW";
        private const string PROBE = "PROBE";
        #endregion

        #region Constructor
        public CircuitPartFactory()
        {
            _nodeFactory = new NodeFactory();
            _componentFactory = new ComponentFactory();
            _types = new Dictionary<string, Type>();

            var assembly = Assembly.GetExecutingAssembly();
            Type[] types = assembly.GetTypes();

            // Register types
            foreach (var type in types)
            {  
                if (!type.IsAbstract && type.IsClass && type.GetInterface(nameof(IPartFactory)) != null)
                {
                    _types[type.Name] = type;
                }
            }
        }
        #endregion

        #region Methods
        public CircuitPart CreateCircuitPart(string name, string type, string state = null)
        {
            CircuitPart part = null;
            IPartFactory factory;
            if (state == INPUT_HIGH || state == INPUT_LOW || type == PROBE)
            {
                factory = (IPartFactory)Activator.CreateInstance(_types["NodeFactory"]);
            }
            else
            {
                factory = (IPartFactory)Activator.CreateInstance(_types["ComponentFactory"]);
            }

            part = factory.CreateCircuitPart(type, state);

            if (part != null)
            {
                part.Name = name;
            }

            return part;
        }
        #endregion
    }
}
