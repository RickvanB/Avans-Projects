using Domain.Circuits;
using Domain.Circuits.enums;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace Test.Circuits
{
    [TestClass]
    public class CircuitBuilderTests
    {
        [TestMethod]
        public void buildValidCircuit()
        {
            // Prepare
            CircuitBuilder b = new CircuitBuilder();

            // Execute
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits/Circuit1_FullAdder.txt");

            // Assert
            Assert.AreEqual(true, result.IsValid);
            Assert.AreEqual(0, result.ErrCode);
        }


        [TestMethod]
        public void CantFindCircuit()
        {
            // Prepare
            CircuitBuilder b = new CircuitBuilder();

            // Execute
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits/Circuit1_FullAdderNotFound.txt");

            // Assert
            Assert.AreEqual(false, result.IsValid);
            Assert.AreEqual((int)ErrorCodes.FILE_NOT_FOUND, result.ErrCode);
        }

        [TestMethod]
        public void CircuitContainsInvalidNode()
        {
            // Prepare
            CircuitBuilder b = new CircuitBuilder();

            // Execute
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits/Circuit1_FullAdder_Invalid_Node.txt");

            // Assert
            Assert.AreEqual(false, result.IsValid);
            Assert.AreEqual((int)ErrorCodes.CONTAINS_INVALID_NODE, result.ErrCode);
        }

        [TestMethod]
        public void CircuitContainsInvalidLink()
        {
            // Prepare
            CircuitBuilder b = new CircuitBuilder();

            // Execute
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits/Circuit1_FullAdder_Invalid_Link.txt");

            // Assert
            Assert.AreEqual(false, result.IsValid);
            Assert.AreEqual((int)ErrorCodes.COULD_NOT_CREATE_LINK, result.ErrCode);
        }

        [TestMethod]
        public void CircuitContainsShortLoop()
        {
            // Prepare
            CircuitBuilder b = new CircuitBuilder();

            // Execute
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits/Circuit1_FullAdder_Contains_Loop.txt");

            // Assert
            Assert.AreEqual(false, result.IsValid);
            Assert.AreEqual((int)ErrorCodes.LOOP_DETECTED, result.ErrCode);
        }

        [TestMethod]
        public void CircuitContainsLongLoop()
        {
            // Prepare
            CircuitBuilder b = new CircuitBuilder();

            // Execute
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits/Circuit1_FullAdder_Contains_Long_Loop.txt");

            // Assert
            Assert.AreEqual(false, result.IsValid);
            Assert.AreEqual((int)ErrorCodes.LOOP_DETECTED, result.ErrCode);
        }

        [TestMethod]
        public void CircuitContainsUnreachableProbe()
        {
            // Prepare
            CircuitBuilder b = new CircuitBuilder();

            // Execute
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits/Circuit1_FullAdder_Unreachable_Probe.txt");

            // Assert
            Assert.AreEqual(false, result.IsValid);
            Assert.AreEqual((int)ErrorCodes.ONE_OR_MORE_PROBES_NOT_REACHABLE, result.ErrCode);
        }

        [TestMethod]
        public void CircuitContainsProbeNeverReachesInputNode()
        {
            // Prepare
            CircuitBuilder b = new CircuitBuilder();

            // Execute
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits/Circuit1_FullAdder_Cant_Reach_Inputnode.txt");

            // Assert
            Assert.AreEqual(false, result.IsValid);
            Assert.AreEqual((int)ErrorCodes.ONE_OR_MORE_PROBES_NOT_REACHABLE, result.ErrCode);
        }
    }
}
