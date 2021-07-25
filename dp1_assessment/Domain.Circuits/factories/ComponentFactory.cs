using Domain.Circuits.decorator.concrete;
using Domain.Circuits.enums;
using Domain.Circuits.factories;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace Domain.Circuits
{
    public class ComponentFactory : IPartFactory
    {
        #region Fields
        private const string PART_KEY = "PartKey";
        private Dictionary<string, Type> _types;
        #endregion

        #region Constructor
        public ComponentFactory()
        {
            _types = new Dictionary<string, Type>();

            var assembly = Assembly.GetExecutingAssembly();
            Type[] types = assembly.GetTypes();

            // Register types
            foreach (var type in types)
            {
                if (!type.IsAbstract && type.IsClass && type.IsSubclassOf(typeof(Component)))
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

        public CircuitPart CreateCircuitPart(string type, string state = null)
        {
            if (_types.ContainsKey(type))
            {
                StateFactory stateFactory = new StateFactory();

                Type gateType = _types[type];
                CircuitPart gate = (CircuitPart)Activator.CreateInstance(gateType, new NandComponent());

                gate.State = stateFactory.GetState((int)States.STATE_DEFAULT, gate);

                return gate;
            }

            return null;
        }
        #endregion
    }
}
