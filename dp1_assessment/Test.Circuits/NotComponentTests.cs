using Microsoft.VisualStudio.TestTools.UnitTesting;
using Domain.Circuits;
using Domain.Circuits.decorator.concrete;
using Domain.Circuits.enums;

namespace Test.Circuits
{
    [TestClass]
    public class NotComponentTests
    {
        private const int TRUE = 1;
        private const int FALSE = 0;

        [TestMethod]
        public void NotComponentInputTrue()
        {
            // Rrepare Test
            Component comp = new NotComponentDecorator(new NandComponent());
            var previous = new NotComponentDecorator(new NandComponent());
            previous.State.IncomingState((int)States.STATE_TRUE, previous);
            comp.Previous.Add(previous);


            // Excute method
            comp.DetermineState();

            // Assert and Equal
            Assert.AreEqual(FALSE, comp.State.Value);

        }

        [TestMethod]
        public void NotComponentInputFalse()
        {
            // Rrepare Test
            Component comp = new NotComponentDecorator(new NandComponent());
            var previous = new NotComponentDecorator(new NandComponent());
            previous.State.IncomingState((int)States.STATE_FALSE, previous);
            comp.Previous.Add(previous);

            // Excute method
            comp.DetermineState();

            // Assert and Equal
            Assert.AreEqual(TRUE, comp.State.Value);

        }
    }
}
