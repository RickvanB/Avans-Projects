using Domain.Circuits;
using Domain.Circuits.enums;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace Test.Circuits
{
    [TestClass]
    public class CircuitBuilderTestsAvans
    {
        [TestMethod]
        public void buildValidCircuit()
        {
            // Prepare
            CircuitBuilder b = new CircuitBuilder();

            // Execute
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits_Avans/Circuit1_FullAdder.txt");

            // Assert
            Assert.AreEqual(true, result.IsValid);
            Assert.AreEqual(0, result.ErrCode);
        }


        [TestMethod]
        public void CircuitContainsLoop()
        {
            // Prepare
            CircuitBuilder b = new CircuitBuilder();

            // Execute
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits_Avans/Circuit4_InfiniteLoop.txt");

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
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits_Avans/Circuit5_NotConnected.txt");

            // Assert
            Assert.AreEqual(false, result.IsValid);
            Assert.AreEqual((int)ErrorCodes.ONE_OR_MORE_PROBES_NOT_REACHABLE, result.ErrCode);
        }


        [TestMethod]
        public void CircuitEncoder()
        {
            // Prepare
            CircuitBuilder b = new CircuitBuilder();

            // Execute
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits_Avans/Circuit3_Encoder.txt");

            // Assert
            Assert.AreEqual(true, result.IsValid);
            Assert.AreEqual(0, result.ErrCode);
        }


        [TestMethod]
        public void CircuitDecoder()
        {
            // Prepare
            CircuitBuilder b = new CircuitBuilder();

            // Execute
            var result = b.PrepareCircuit(Environment.CurrentDirectory + "/Circuits_Avans/Circuit2_Decoder.txt");

            // Assert
            Assert.AreEqual(true, result.IsValid);
            Assert.AreEqual(0, result.ErrCode);
        }

    }
}
