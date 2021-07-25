using Front.Circuits.viewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Front.Circuits.views
{
    /// <summary>
    /// Interaction logic for CircuitWindow.xaml
    /// </summary>
    public partial class CircuitWindow : Window
    {
        private CircuitVM _vm;

        public CircuitWindow()
        {
            InitializeComponent();
            _vm = (CircuitVM)DataContext;

            DrawLegend();
            DrawCircuit();

            _vm.ViewUpdates += () =>
            {
                DrawCircuit();
            }; 
        }

        private void DrawLegend()
        {
            
            foreach (var component in _vm.Legend.Components)
            {
                legendGrid.Children.Add(component);
            }

            foreach (var label in _vm.Legend.Labels)
            {
                legendGrid.Children.Add(label);
            }
        }

        private void DrawCircuit()
        {
            adderGrid.Children.Clear();

            foreach (var connection in _vm.Connections)
            {
                adderGrid.Children.Add(connection.ConnectionLink);

                if (connection.Label != null)
                {
                    adderGrid.Children.Add(connection.Label);
                }
            }

            foreach (var inputNode in _vm.Nodes)
            {

                adderGrid.Children.Add(inputNode.Comp);
                adderGrid.Children.Add(inputNode.Label);
            }

            foreach (var gate in _vm.Gates)
            {
                adderGrid.Children.Add(gate.Comp);
                adderGrid.Children.Add(gate.Label);
            }
        }
    }
}
