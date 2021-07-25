using Domain.Circuits.enums;
using Domain.Circuits.facade;
using System.Collections.Generic;

namespace Domain.Circuits.builder
{
    public class LinkBuilder
    {
        #region Propperties
        private List<CircuitPart> _parts;
        private CircuitFacade _facade;
        #endregion
        #region Constructor
        public LinkBuilder()
        {
            _parts = new List<CircuitPart>();
            _facade = new CircuitFacade();
        }
        #endregion

        #region Methods
        public ValidationMessage PrepareLinks(List<CircuitPart> parts, Dictionary<string, string> name_connections)
        {
            this._parts = parts;

            foreach (KeyValuePair<string, string> entry in name_connections)
            {
                var result = this.CreateLinks(entry.Key, entry.Value);

                if (!result)
                {
                    return new ValidationMessage(false, (int)ErrorCodes.COULD_NOT_CREATE_LINK);
                }
            }
            // Valid
            return new ValidationMessage(true, 0);

        }

        public List<CircuitPart> GetPreparedLinks()
        {
            return _parts;
        }

        private bool CreateLinks(string name, string connectionWith)
        {
            // Safety Check
            if (_parts == null || string.IsNullOrEmpty(name) || string.IsNullOrEmpty(connectionWith))
            {
                return false;
            }

            // Find part in list
            var part = this.GetPart(name);

            if (part != null)
            {
                // Remove withspaces from connection string
                connectionWith = _facade.RemoveWhiteSpace(connectionWith);

                // Serperate by ,
                var connectionNodes = _facade.Split(',', connectionWith);

                if (connectionNodes != null)
                {
                    foreach (var connectionNode in connectionNodes)
                    {
                        // Search for node and attach if found
                        var connectionPart = this.GetPart(connectionNode);
                        if (connectionPart != null)
                        {
                            // Add linked list connections
                            connectionPart.Previous.Add(part);
                            part.Next.Add(connectionPart);
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
                return true;
            }
            return false;
        }

        private CircuitPart GetPart(string name)
        {
            if (_parts == null)
            {
                return null;
            }
            // Search for a part by name
            foreach (var part in _parts)
            {
                if (part.Name.Equals(name))
                {
                    return part;
                }
            }
            return null;
        }
        #endregion
    }
}
