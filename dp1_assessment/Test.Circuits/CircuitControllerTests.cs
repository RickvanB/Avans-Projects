using Domain.Circuits;
using Domain.Circuits.controller;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace Test.Circuits
{
    [TestClass]
    public class CircuitControllerTests
    {
        private const int TRUE = 1;
        private const int FALSE = 0;
        private const int DEFAULT = -1;
        private const int UNSET = 2;

        private List<CircuitPart> _nodes;

        [TestMethod]
        public void SimpleOrCircuit()
        {
            // Rrepare
            CircuitController c = new CircuitController();
            c.SetUpCircuit(Environment.CurrentDirectory + "/Circuits/Circuit1_OT_OR.txt");

            // Execute
            c.Circuit.StartCircuit();

            // Assert
            Assert.AreEqual(FALSE, c.Circuit.InputComposite.GetNodes()[0].Next[0].State.Value);
        }

        [TestMethod]
        public void SimpleAndCircuit()
        {
            // Rrepare
            CircuitController c = new CircuitController();
            c.SetUpCircuit(Environment.CurrentDirectory + "/Circuits/Circuit1_OT_AND.txt");

            // Execute & Assert
            c.Circuit.StartCircuit();
            Assert.AreEqual(FALSE, c.Circuit.InputComposite.GetNodes()[0].Next[0].State.Value);

            c.ChangeInputNodeState("I1");
            Assert.AreEqual(FALSE, c.Circuit.InputComposite.GetNodes()[0].Next[0].State.Value);

            c.ChangeInputNodeState("I3");
            c.ChangeInputNodeState("I5");
            Assert.AreEqual(TRUE, c.Circuit.InputComposite.GetNodes()[0].Next[0].State.Value);
        }

        [TestMethod]
        public void ResetCircuit()
        {
            // Rrepare
            CircuitController c = new CircuitController();
            c.SetUpCircuit(Environment.CurrentDirectory + "/Circuits/Circuit1_OT_NOT_AND.txt");

            c.Circuit.StartCircuit();
            c.ChangeInputNodeState("I5");
            c.ChangeInputNodeState("I3");
            TestHelper(c.Circuit);

            foreach (var node in _nodes)
            {
                switch (node.Name)
                {
                    case "D2":
                        Assert.AreEqual(TRUE, node.State.Value);
                        break;

                    case "NOT1":
                        Assert.AreEqual(TRUE, node.State.Value);
                        break;
                }
            }

            c.ResetCircuit();

            foreach (var node in _nodes)
            {
                switch (node.Name)
                {
                    case "D2":
                        Assert.AreEqual(UNSET, node.State.Value);
                        break;

                    case "NOT1":
                        Assert.AreEqual(DEFAULT, node.State.Value);
                        break;
                }
            }
        }

        [TestMethod]
        public void DecoderCircuitTest()
        {
            // Rrepare
            CircuitController c = new CircuitController();
            c.SetUpCircuit(Environment.CurrentDirectory + "/Circuits_Avans/Circuit2_Decoder.txt");

            // Execute
            c.Circuit.StartCircuit();
            TestHelper(c.Circuit);

            // Assert
            Assert.IsNotNull(_nodes);

            foreach (var node in _nodes)
            {
                switch (node.Name)
                {
                    case "A0":
                        Assert.AreEqual(TRUE, node.State.Value);
                        break;

                    case "A1":
                    case "A2":
                        Assert.AreEqual(FALSE, node.State.Value);
                        break;

                    case "D1":
                        Assert.AreEqual(TRUE, node.State.Value);
                        break;
                    case "D0":
                    case "D2":
                    case "D3":
                    case "D4":
                    case "D5":
                    case "D6":
                    case "D7":
                        Assert.AreEqual(FALSE, node.State.Value);
                        break;
                }
            }
        }

        /// <summary>
        /// This method will loop through the circuit to help the test methods
        /// </summary>
        /// <param name="circuit"></param>
        private void TestHelper(Circuit circuit)
        {
            _nodes = new List<CircuitPart>();

            foreach (var inputNode in circuit.InputComposite.GetNodes())
            {
                CircuitPart part = inputNode;
                part._partCounter = 0;
                part._prevIndex = 0;

                while (part != null)
                {
                    var found = false;
                    // Only add if not added yet 
                    foreach (var foundPart in _nodes)
                    {
                        if (foundPart.Equals(part))
                        {
                            found = true;
                        }
                    }

                    // Add to parts to help the test methods later
                    if (!found)
                    {
                        _nodes.Add(part);
                    }

                    // Check if there is a next node
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
        }
    }
}
