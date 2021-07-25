using Domain.Circuits.enums;
using Domain.Circuits.factories;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace Domain.Circuits
{
    public class NodeFactory : IPartFactory
    {
        #region Fields
        private const string PART_KEY = "PartKey";
        private Dictionary<string, Type> _types;
        #endregion

        #region Constructor
        public NodeFactory()
        {
            _types = new Dictionary<string, Type>();

            var assembly = Assembly.GetExecutingAssembly();
            Type[] types = assembly.GetTypes();

            // Register types
            foreach (var type in types)
            {
                if(!type.IsAbstract && type.IsClass && type.IsSubclassOf(typeof(Node)))
                {
                    var typeKey = type.GetProperty(PART_KEY).GetValue(null, null);
                    RegisterNodeType(typeKey.ToString(), type);
                }
            }
        }
        #endregion

        #region Methods
        private void RegisterNodeType(string type, Type circuitPart)
        {
            _types[type] = circuitPart;
        }

        public CircuitPart CreateCircuitPart(string type, string state)
        {
            if (_types.ContainsKey(type))
            {
                StateFactory stateFactory = new StateFactory();

                Type nodeType = _types[type];
                Node node = (Node)Activator.CreateInstance(nodeType);

                var stateInput = state ?? type;
                node.State = stateFactory.GetStateByType(stateInput, node);
                node.InitialState = node.State.Value;
                return node;
            }
            return null;
        }
        #endregion
    }
}
