using Domain.Circuits;
using Domain.Circuits.decorator.concrete;
using Domain.Circuits.enums;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace Test.Circuits
{
    [TestClass]
    public class NorComponentTests
    {
        private const int TRUE = 1;
        private const int FALSE = 0;

        [TestMethod]
        public void NorComponentInputFalse_False()
        {
            // Rrepare Test
            Component comp = new NorComponentDecorator(new NandComponent());
            var previous_0 = new NotComponentDecorator(new NandComponent());
            var previous_1 = new NotComponentDecorator(new NandComponent());

            previous_0.State.IncomingState((int)States.STATE_FALSE, previous_0);
            previous_1.State.IncomingState((int)States.STATE_FALSE, previous_1);
            comp.Previous.Add(previous_0);
            comp.Previous.Add(previous_1);

            // Excute method
            comp.DetermineState();

            // Assert and Equal
            Assert.AreEqual(TRUE, comp.State.Value);

        }

        [TestMethod]
        public void NorComponentInputFalse_True()
        {
            // Rrepare Test
            Component comp = new NorComponentDecorator(new NandComponent());
            var previous_0 = new NotComponentDecorator(new NandComponent());
            var previous_1 = new NotComponentDecorator(new NandComponent());

            previous_0.State.IncomingState((int)States.STATE_FALSE, previous_0);
            previous_1.State.IncomingState((int)States.STATE_TRUE, previous_1);
            comp.Previous.Add(previous_0);
            comp.Previous.Add(previous_1);

            // Excute method
            comp.DetermineState();

            // Assert and Equal
            Assert.AreEqual(FALSE, comp.State.Value);

        }

        [TestMethod]
        public void NorComponentInputTrue_False()
        {
            // Rrepare Test
            Component comp = new NorComponentDecorator(new NandComponent());
            var previous_0 = new NotComponentDecorator(new NandComponent());
            var previous_1 = new NotComponentDecorator(new NandComponent());

            previous_0.State.IncomingState((int)States.STATE_TRUE, previous_0);
            previous_1.State.IncomingState((int)States.STATE_FALSE, previous_1);
            comp.Previous.Add(previous_0);
            comp.Previous.Add(previous_1);

            // Excute method
            comp.DetermineState();

            // Assert and Equal
            Assert.AreEqual(FALSE, comp.State.Value);

        }

        [TestMethod]
        public void NorComponentInputTrue_True()
        {
            // Rrepare Test
            Component comp = new NorComponentDecorator(new NandComponent());
            var previous_0 = new NotComponentDecorator(new NandComponent());
            var previous_1 = new NotComponentDecorator(new NandComponent());

            previous_0.State.IncomingState((int)States.STATE_TRUE, previous_0);
            previous_1.State.IncomingState((int)States.STATE_TRUE, previous_1);
            comp.Previous.Add(previous_0);
            comp.Previous.Add(previous_1);

            // Excute method
            comp.DetermineState();

            // Assert and Equal
            Assert.AreEqual(FALSE, comp.State.Value);

        }

        [TestMethod]
        public void NorComponentInputTrue_True_True()
        {
            // Rrepare Test
            Component comp = new NorComponentDecorator(new NandComponent());
            var previous_0 = new NotComponentDecorator(new NandComponent());
            var previous_1 = new NotComponentDecorator(new NandComponent());
            var previous_2 = new NotComponentDecorator(new NandComponent());

            previous_0.State.IncomingState((int)States.STATE_TRUE, previous_0);
            previous_1.State.IncomingState((int)States.STATE_TRUE, previous_1);
            previous_2.State.IncomingState((int)States.STATE_TRUE, previous_2);
            comp.Previous.Add(previous_0);
            comp.Previous.Add(previous_1);
            comp.Previous.Add(previous_2);

            // Excute method
            comp.DetermineState();

            // Assert and Equal
            Assert.AreEqual(FALSE, comp.State.Value);

        }

        [TestMethod]
        public void NorComponentInputTrue_False_True()
        {
            // Rrepare Test
            Component comp = new NorComponentDecorator(new NandComponent());
            var previous_0 = new NotComponentDecorator(new NandComponent());
            var previous_1 = new NotComponentDecorator(new NandComponent());
            var previous_2 = new NotComponentDecorator(new NandComponent());

            previous_0.State.IncomingState((int)States.STATE_TRUE, previous_0);
            previous_1.State.IncomingState((int)States.STATE_FALSE, previous_1);
            previous_2.State.IncomingState((int)States.STATE_TRUE, previous_2);
            comp.Previous.Add(previous_0);
            comp.Previous.Add(previous_1);
            comp.Previous.Add(previous_2);

            // Excute method
            comp.DetermineState();

            // Assert and Equal
            Assert.AreEqual(FALSE, comp.State.Value);

        }

        [TestMethod]
        public void NorComponentInputFalse_False_False()
        {
            // Rrepare Test
            Component comp = new NorComponentDecorator(new NandComponent());
            var previous_0 = new NotComponentDecorator(new NandComponent());
            var previous_1 = new NotComponentDecorator(new NandComponent());
            var previous_2 = new NotComponentDecorator(new NandComponent());

            previous_0.State.IncomingState((int)States.STATE_FALSE, previous_0);
            previous_1.State.IncomingState((int)States.STATE_FALSE, previous_1);
            previous_2.State.IncomingState((int)States.STATE_FALSE, previous_2);
            comp.Previous.Add(previous_0);
            comp.Previous.Add(previous_1);
            comp.Previous.Add(previous_2);

            // Excute method
            comp.DetermineState();

            // Assert and Equal
            Assert.AreEqual(TRUE, comp.State.Value);

        }
    }
}
