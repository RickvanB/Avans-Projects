using System;
using System.Collections.Generic;
using System.Text;
using Domain.Circuits.factories;
using Domain.Circuits.visitor;

namespace Domain.Circuits.composite
{
    public class InputComposite : Node
    {
        #region Fields
        public static string PartKey => "INPUT_COMPOSITE";
        #endregion

        #region Fields
        private List<Node> _nodes;
        #endregion
        #region Constructor
        public InputComposite()
        {
            _nodes = new List<Node>();
        }
        #endregion

        #region Methods

        public void AddNode(Node node)
        {
            _nodes.Add(node);
        }

        public List<Node> GetNodes()
        {
            return _nodes;
        }

        public override void Accept(IPartVisitor visitor)
        {
            visitor.Visit(this);
        }

        public override void Activate()
        {
            foreach(var node in _nodes)
            {
                node.Activate();
            }
        }
        #endregion
    }
}
