using Domain.Circuits;
using Domain.Circuits.builder;
using Domain.Circuits.decorator.concrete;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace Test.Circuits
{
    [TestClass]
    public class LinkBuilderTests
    {
        [TestMethod]
        public void checkNextLinks()
        {
            // Prepare
            LinkBuilder b = new LinkBuilder();
            Dictionary<string, string> name_connections = new Dictionary<string, string>();
            List<CircuitPart> parts = new List<CircuitPart>();

            CircuitPart part0 = new InputNode();
            CircuitPart part1 = new NotComponentDecorator(new NandComponent());
            CircuitPart part2 = new XorComponentDecorator(new NandComponent());
            CircuitPart part3 = new AndComponentDecorator(new NandComponent());
            CircuitPart part4 = new OutputNode();
            CircuitPart part5 = new OutputNode();

            part0.Name = "A";
            part1.Name = "NODE1";
            part2.Name = "NODE2";
            part3.Name = "NODE3";
            part4.Name = "OUT";
            part5.Name = "COUT";

            parts.Add(part0);
            parts.Add(part1);
            parts.Add(part2);
            parts.Add(part3);
            parts.Add(part4);
            parts.Add(part5);

            name_connections.Add(part0.Name, "NODE1");
            name_connections.Add(part1.Name, "NODE2, NODE3");
            name_connections.Add(part2.Name, "OUT");
            name_connections.Add(part3.Name, "COUT");

            // Expected Outpunt
            var E_part0_Next_Output = new List<string>();
            var A_part0_Next_Output = new List<string>();
            var E_part1_Next_Output = new List<string>();
            var A_part1_Next_Output = new List<string>();
            var E_part2_Next_Output = new List<string>();
            var A_part2_Next_Output = new List<string>();
            var E_part3_Next_Output = new List<string>();
            var A_part3_Next_Output = new List<string>();
            var E_part4_Next_Output = new List<string>();
            var A_part4_Next_Output = new List<string>();
            var E_part5_Next_Output = new List<string>();
            var A_part5_Next_Output = new List<string>();

            E_part0_Next_Output.Add("NODE1");
            E_part1_Next_Output.Add("NODE2");
            E_part1_Next_Output.Add("NODE3");
            E_part2_Next_Output.Add("OUT");
            E_part3_Next_Output.Add("COUT");

            // Execute
            var result = b.PrepareLinks(parts, name_connections);
            var linkedParts = b.GetPreparedLinks();
            foreach (var part in linkedParts)
            {
                switch (part.Name)
                {
                    case "A":
                        foreach(var node in part.Next)
                        {
                            A_part0_Next_Output.Add(node.Name);
                        }
                        break;
                    case "NODE1":
                        foreach (var node in part.Next)
                        {
                            A_part1_Next_Output.Add(node.Name);
                        }
                        break;
                    case "NODE2":
                        foreach (var node in part.Next)
                        {
                            A_part2_Next_Output.Add(node.Name);
                        }
                        break;
                    case "NODE3":
                        foreach (var node in part.Next)
                        {
                            A_part3_Next_Output.Add(node.Name);
                        }
                        break;
                    case "OUT":
                        foreach (var node in part.Next)
                        {
                            A_part4_Next_Output.Add(node.Name);
                        }
                        break;
                    case "COUT":
                        foreach (var node in part.Next)
                        {
                            A_part5_Next_Output.Add(node.Name);
                        }
                        break;
                }
            }

            // Assert
            Assert.AreEqual(true, result.IsValid);
            Assert.AreEqual(0, result.ErrCode);
            CollectionAssert.AreEqual(E_part0_Next_Output, A_part0_Next_Output);
            CollectionAssert.AreEqual(E_part1_Next_Output, A_part1_Next_Output);
            CollectionAssert.AreEqual(E_part2_Next_Output, A_part2_Next_Output);
            CollectionAssert.AreEqual(E_part3_Next_Output, A_part3_Next_Output);
            CollectionAssert.AreEqual(E_part4_Next_Output, A_part4_Next_Output);
            CollectionAssert.AreEqual(E_part5_Next_Output, A_part5_Next_Output);
        }

        [TestMethod]
        public void checkPreviousLinks()
        {
            // Prepare
            LinkBuilder b = new LinkBuilder();
            Dictionary<string, string> name_connections = new Dictionary<string, string>();
            List<CircuitPart> parts = new List<CircuitPart>();

            CircuitPart part0 = new InputNode();
            CircuitPart part1 = new NotComponentDecorator(new NandComponent());
            CircuitPart part2 = new XorComponentDecorator(new NandComponent());
            CircuitPart part3 = new AndComponentDecorator(new NandComponent());
            CircuitPart part4 = new OutputNode();
            CircuitPart part5 = new OutputNode();

            part0.Name = "A";
            part1.Name = "NODE1";
            part2.Name = "NODE2";
            part3.Name = "NODE3";
            part4.Name = "OUT";
            part5.Name = "COUT";

            parts.Add(part0);
            parts.Add(part1);
            parts.Add(part2);
            parts.Add(part3);
            parts.Add(part4);
            parts.Add(part5);

            name_connections.Add(part0.Name, "NODE1");
            name_connections.Add(part1.Name, "NODE2, NODE3");
            name_connections.Add(part2.Name, "OUT");
            name_connections.Add(part3.Name, "COUT");

            // Expected Outpunt
            var E_part0_Previous_Output = new List<string>();
            var A_part0_Previous_Output = new List<string>();
            var E_part1_Previous_Output = new List<string>();
            var A_part1_Previous_Output = new List<string>();
            var E_part2_Previous_Output = new List<string>();
            var A_part2_Previous_Output = new List<string>();
            var E_part3_Previous_Output = new List<string>();
            var A_part3_Previous_Output = new List<string>();
            var E_part4_Previous_Output = new List<string>();
            var A_part4_Previous_Output = new List<string>();
            var E_part5_Previous_Output = new List<string>();
            var A_part5_Previous_Output = new List<string>();

            E_part1_Previous_Output.Add("A");
            E_part2_Previous_Output.Add("NODE1");
            E_part3_Previous_Output.Add("NODE1");
            E_part4_Previous_Output.Add("NODE2");
            E_part5_Previous_Output.Add("NODE3");

            // Execute
            var result = b.PrepareLinks(parts, name_connections);
            var linkedParts = b.GetPreparedLinks();
            foreach (var part in linkedParts)
            {
                switch (part.Name)
                {
                    case "A":
                        foreach (var node in part.Previous)
                        {
                            A_part0_Previous_Output.Add(node.Name);
                        }
                        break;
                    case "NODE1":
                        foreach (var node in part.Previous)
                        {
                            A_part1_Previous_Output.Add(node.Name);
                        }
                        break;
                    case "NODE2":
                        foreach (var node in part.Previous)
                        {
                            A_part2_Previous_Output.Add(node.Name);
                        }
                        break;
                    case "NODE3":
                        foreach (var node in part.Previous)
                        {
                            A_part3_Previous_Output.Add(node.Name);
                        }
                        break;
                    case "OUT":
                        foreach (var node in part.Previous)
                        {
                            A_part4_Previous_Output.Add(node.Name);
                        }
                        break;
                    case "COUT":
                        foreach (var node in part.Previous)
                        {
                            A_part5_Previous_Output.Add(node.Name);
                        }
                        break;
                }
            }

            // Assert
            Assert.AreEqual(true, result.IsValid);
            Assert.AreEqual(0, result.ErrCode);
            CollectionAssert.AreEqual(E_part0_Previous_Output, A_part0_Previous_Output);
            CollectionAssert.AreEqual(E_part1_Previous_Output, A_part1_Previous_Output);
            CollectionAssert.AreEqual(E_part2_Previous_Output, A_part2_Previous_Output);
            CollectionAssert.AreEqual(E_part3_Previous_Output, A_part3_Previous_Output);
            CollectionAssert.AreEqual(E_part4_Previous_Output, A_part4_Previous_Output);
            CollectionAssert.AreEqual(E_part5_Previous_Output, A_part5_Previous_Output);
        }
    }
}
