using Domain.Circuits;
using Domain.Circuits.enums;
using Front.Circuits.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace Front.Circuits.controllers
{
    public class GuiController
    {
        private const int MARGIN = 10;
        private const int END_NODE_SIZE = 25;
        private const int LABEL_MARGIN = 3;

        private const bool HAS_NEXT = true;
        private const bool HAS_PREVIOUS = true;

        /// <summary>
        /// This method will generate a inputnode based on the given values 
        /// </summary>
        /// <param name="input"></param>
        /// <param name="nodeSize"></param>
        /// <param name="inputNodeCount"></param>
        /// <param name="spaceBetween"></param>
        /// <returns></returns>
        public Gate GenerateNode(string nameOfPart, int nodeSize, int inputNodeCount, int spaceBetween)
        {
            Gate node = new Gate();
            node.Comp = new Ellipse();
            // Propperties
            node.Comp.Fill = Brushes.Yellow;
            node.Comp.Width = nodeSize;
            node.Comp.Height = nodeSize;
            node.Comp.Name = nameOfPart;
            node.XPos = 0;
            node.YPos = inputNodeCount * spaceBetween;
            node.Name = nameOfPart;
            node.Label = new TextBlock();
            node.Label.Text = node.Name;
            node.Label.Background = Brushes.NavajoWhite;

            // Position
            Canvas.SetLeft(node.Comp, node.XPos);
            Canvas.SetTop(node.Comp, node.YPos);
            Canvas.SetLeft(node.Label, node.XPos + (nodeSize / 4));
            Canvas.SetTop(node.Label, node.YPos + nodeSize + LABEL_MARGIN);
            Canvas.SetZIndex(node.Label, 99999);

            return node;
        }

        /// <summary>
        /// This method will generate a gate based on the given values 
        /// </summary>
        /// <param name="input"></param>
        /// <param name="nodeSize"></param>
        /// <param name="inputNodeCount"></param>
        /// <param name="spaceBetween"></param>
        /// <returns></returns>
        public Gate GenerateGate(string nameOfPart, bool hasNext, int nodeSize, int inputNodeCount, int height_count, int subcount, int ySpacing, int xSpacing, List<Gate> gates)
        {
            Gate gate = new Gate();
            gate.Comp = new Ellipse();
            
            // Check if gate is normale gate or output node
            if (!hasNext)
            {
                gate.Comp.Fill = Brushes.Red;
            }
            else
            {
                gate.Comp.Fill = Brushes.DeepSkyBlue;
            }

            gate.Comp.Width = nodeSize;
            gate.Comp.Height = nodeSize;
            gate.XPos = (xSpacing * (subcount + 1));
            gate.YPos = (height_count * 100) + (inputNodeCount * (ySpacing / 4));

            // Check position
            gate.YPos += IntersectionCorrection(gate.YPos, gate.XPos, gates, nodeSize);

            gate.Name = nameOfPart;
            gate.Label = new TextBlock();
            gate.Label.Text = gate.Name;
            gate.Label.Background = Brushes.NavajoWhite;

            // Position
            Canvas.SetLeft(gate.Comp, gate.XPos);
            Canvas.SetTop(gate.Comp, gate.YPos);
            Canvas.SetLeft(gate.Label, gate.XPos );
            Canvas.SetTop(gate.Label, gate.YPos + nodeSize + LABEL_MARGIN);
            Canvas.SetZIndex(gate.Label, 99999);

            return gate;

        }

        /// <summary>
        /// Generate a connection between nodes and gates
        /// </summary>
        /// <param name="nodeSize"></param>
        /// <param name="outputColor"></param>
        /// <param name="prevGate"></param>
        /// <param name="curGate"></param>
        /// <returns></returns>
        public Connection GenerateConnection(int nodeSize, int outputColor, Gate prevGate, Gate curGate)
        {
            Connection connection = new Connection();
            connection.Name = $"{curGate.Name}_{prevGate.Name}";
            connection.ConnectionLink = new Line();
            connection.ConnectionLink.Stroke = GetOutputColor(outputColor);
            connection.ConnectionLink.X1 = prevGate.XPos + (nodeSize / 2);
            connection.ConnectionLink.X2 = curGate.XPos + (nodeSize / 2);
            connection.ConnectionLink.Y1 = prevGate.YPos + (nodeSize / 2);
            connection.ConnectionLink.Y2 = curGate.YPos + (nodeSize / 2);
            connection.ConnectionLink.HorizontalAlignment = HorizontalAlignment.Left;
            connection.ConnectionLink.VerticalAlignment = VerticalAlignment.Center;
            connection.ConnectionLink.StrokeThickness = 4;
            // Add mouseOver Event
            connection.ConnectionLink.MouseEnter += (s, e) => connection.ConnectionLink.Stroke = Brushes.Yellow;
            connection.ConnectionLink.MouseLeave += (s, e) => connection.ConnectionLink.Stroke = connection.ConnectionLink.Stroke = GetOutputColor(outputColor);


            return connection;
        }

        /// <summary>
        /// This method will generate connection for end nodes to display their state 
        /// </summary>
        /// <param name="nodeSize"></param>
        /// <param name="outputColor"></param>
        /// <param name="curGate"></param>
        /// <returns></returns>
        public Connection GenerateEndConnection(int nodeSize, int outputColor, Gate curGate)
        {
            Connection connection = new Connection();
            connection.Name = $"{curGate.Name}_END";
            connection.ConnectionLink = new Line();
            connection.ConnectionLink.Stroke = GetOutputColor(outputColor);
            connection.ConnectionLink.X1 = curGate.XPos + (nodeSize / 2);
            connection.ConnectionLink.X2 = curGate.XPos + END_NODE_SIZE + (nodeSize / 2);
            connection.ConnectionLink.Y1 = curGate.YPos + (nodeSize / 2);
            connection.ConnectionLink.Y2 = curGate.YPos + (nodeSize / 2);
            connection.ConnectionLink.HorizontalAlignment = HorizontalAlignment.Left;
            connection.ConnectionLink.VerticalAlignment = VerticalAlignment.Center;
            connection.ConnectionLink.StrokeThickness = 4;
            // Add mouseOver Event
            connection.ConnectionLink.MouseEnter += (s, e) => connection.ConnectionLink.Stroke = Brushes.Yellow;
            connection.ConnectionLink.MouseLeave += (s, e) => connection.ConnectionLink.Stroke = connection.ConnectionLink.Stroke = GetOutputColor(outputColor);


            // Add label
            connection.Label = new TextBlock();
            connection.Label.Text = GetOutputState(outputColor);

            Canvas.SetLeft(connection.Label, connection.ConnectionLink.X2 + MARGIN);
            Canvas.SetTop(connection.Label, connection.ConnectionLink.Y1 - (nodeSize / 3));
            Canvas.SetZIndex(connection.Label, 99999);

            return connection;
        }

        /// <summary>
        /// Check if gate intersects with antother gate.
        /// If true than search for a correction of the Ypos where there is
        /// no intersection between gates
        /// </summary>
        /// <param name="yPos"></param>
        /// <param name="xPos"></param>
        /// <returns>Correction for the YPos</returns>
        private int IntersectionCorrection(int yPos, int xPos, List<Gate> gates, int nodeSize)
        {
            foreach (var gate in gates)
            {
                // Check for intersections between gates
                if (gate.XPos >= xPos && xPos <= (gate.XPos + nodeSize) && gate.YPos >= yPos && yPos <= (gate.YPos + nodeSize))
                {
                    // Check if given correction is empty spot
                    if (IntersectionCorrection(yPos + nodeSize + 50, xPos, gates, nodeSize) == 0)
                    {
                        return (nodeSize + 50);
                    }
                }
            }

            return 0;
        }

        /// <summary>
        /// Determine the correct output coler based on the state
        /// </summary>
        /// <param name="outputColor"></param>
        /// <returns></returns>
        private SolidColorBrush GetOutputColor(int outputColor)
        {
            var color = Brushes.LightGray;

            switch (outputColor)
            {
                case (int)OutputColors.OUTPUT_HIGH:
                    color = Brushes.LightGreen;
                    break;
                case (int)OutputColors.OUTPUT_LOW:
                    color = Brushes.Black;
                    break;
                case (int)OutputColors.OUTPUT_UNSET:
                    color = Brushes.DarkGray;
                    break;
            }

            return color;
        }

        /// <summary>
        /// Determine the correct output coler based on the state
        /// </summary>
        /// <param name="outputColor"></param>
        /// <returns></returns>
        private string GetOutputState(int outputColor)
        {
            var output = "#";

            switch (outputColor)
            {
                case (int)OutputColors.OUTPUT_HIGH:
                    output = "1";
                    break;
                case (int)OutputColors.OUTPUT_LOW:
                    output = "0";
                    break;
            }

            return output;
        }

        /// <summary>
        /// Generate a component for the legend of the circuit
        /// </summary>
        /// <param name="nameOfPart"></param>
        /// <param name="nodeSize"></param>
        /// <param name="count"></param>
        /// <param name="hasNext"></param>
        /// <param name="hasPrev"></param>
        /// <returns></returns>
        public Legend GenerateLegendComponent(string nameOfPart, int nodeSize, int count, bool hasNext, bool hasPrev)
        {
            var legend = new Legend();
            legend.CurShape = new Ellipse();
            legend.curLabel = new TextBlock();

            // Propperties
            // Determine kind
            if(hasNext && hasPrev)
            {
                legend.CurShape.Fill = Brushes.DeepSkyBlue;

            } else if (!hasNext && hasPrev)
            {
                legend.CurShape.Fill = Brushes.Red;
            }
            else
            {
                legend.CurShape.Fill = Brushes.Yellow;
            }
            
            legend.CurShape.Width = nodeSize;
            legend.CurShape.Height = nodeSize;
            legend.CurShape.Name = nameOfPart;
            legend.curLabel.Text = nameOfPart;

            // Position
            Canvas.SetLeft(legend.CurShape, MARGIN + (nodeSize * 3) * count);
            Canvas.SetTop(legend.CurShape, MARGIN);
            Canvas.SetLeft(legend.curLabel, MARGIN + (nodeSize * 3) * count);
            Canvas.SetTop(legend.curLabel, MARGIN + nodeSize);

            return legend;
        }

        /// <summary>
        /// Generate a component for the legend of the circuit
        /// </summary>
        /// <param name="nameOfPart"></param>
        /// <param name="nodeSize"></param>
        /// <param name="count"></param>
        /// <param name="hasNext"></param>
        /// <param name="hasPrev"></param>
        /// <returns></returns>
        public Legend GenerateLegendConnection(string nameOfState, int connectionSize, int count, int type)
        {
            var legend = new Legend();
            var line = new Line();
            legend.curLabel = new TextBlock();
            line.Stroke = GetOutputColor(type);
            line.X1 = MARGIN;
            line.X2 = MARGIN + connectionSize;
            line.Y1 = MARGIN;
            line.Y2 = MARGIN;
            line.HorizontalAlignment = HorizontalAlignment.Left;
            line.VerticalAlignment = VerticalAlignment.Center;
            line.StrokeThickness = 4;

            legend.curLabel.Text = nameOfState;
            legend.CurShape = line;

            // Position
            Canvas.SetLeft(legend.CurShape, MARGIN + (connectionSize * 3) * count);
            Canvas.SetTop(legend.CurShape, MARGIN);
            Canvas.SetLeft(legend.curLabel, MARGIN + (connectionSize * 3) * count);
            Canvas.SetTop(legend.curLabel, MARGIN + connectionSize);

            return legend;
        }

        /// <summary>
        /// Perpaire a legend for the circuit
        /// </summary>
        public Legend PrepareLegend(int nodeSize)
        {
            var legend = new Legend();

            legend.Components = new List<System.Windows.Shapes.Shape>();
            legend.Labels = new List<System.Windows.Controls.TextBlock>();

            // Input node
            var output = GenerateLegendComponent("INPUT", nodeSize, 0, HAS_NEXT, !HAS_PREVIOUS);
            legend.Components.Add(output.CurShape);
            legend.Labels.Add(output.curLabel);

            // Gate
            output = GenerateLegendComponent("GATE", nodeSize, 1, HAS_NEXT, HAS_PREVIOUS);
            legend.Components.Add(output.CurShape);
            legend.Labels.Add(output.curLabel);

            // Output node
            output = GenerateLegendComponent("OUTPUT", nodeSize, 2, !HAS_NEXT, HAS_PREVIOUS);
            legend.Components.Add(output.CurShape);
            legend.Labels.Add(output.curLabel);

            // Low
            output = GenerateLegendConnection("0 - LOW", nodeSize, 3, (int)OutputColors.OUTPUT_LOW);
            legend.Components.Add(output.CurShape);
            legend.Labels.Add(output.curLabel);

            // High
            output = GenerateLegendConnection("1 - HIGH", nodeSize, 4, (int)OutputColors.OUTPUT_HIGH);
            legend.Components.Add(output.CurShape);
            legend.Labels.Add(output.curLabel);

            // Default
            output = GenerateLegendConnection("DEFAULT", nodeSize, 5, (int)OutputColors.OUTPUT_DEFAULT);
            legend.Components.Add(output.CurShape);
            legend.Labels.Add(output.curLabel);

            // Unset
            output = GenerateLegendConnection("UNSET", nodeSize, 6, (int)OutputColors.OUTPUT_UNSET);
            legend.Components.Add(output.CurShape);
            legend.Labels.Add(output.curLabel);

            return legend;
        }
    }
}
