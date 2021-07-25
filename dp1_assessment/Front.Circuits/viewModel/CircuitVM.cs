using Domain.Circuits;
using Domain.Circuits.enums;
using Front.Circuits.controllers;
using Front.Circuits.models;
using Front.Circuits.repository;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Input;

namespace Front.Circuits.viewModel
{
    public class CircuitVM : ViewModelBase
    {
        // Fields
        private CircuitRepository _circuitRepo;
        private GuiController _guiController;
        private Circuit _circuit;
        private bool _isStarted;
        private const int NODE_SIZE = 25;
        private const int CANVAS_WIDHT = 780;
        private const int CANVAS_HEIGTH = 400;
        private const string START = "Start Circuit";
        private const string STOP = "Stop Circuit";
        // Propperties
        public Circuit Circuit
        {
            get
            {
                return _circuit;
            }
            private set
            {
                ViewUpdates?.Invoke();
                _circuit = value;
            }
        }

        public string ActivateButton
        {
            get
            {
                if (_isStarted)
                {
                    return STOP;
                }
                else
                {
                    return START;
                }
            }
        }

        public List<Connection> Connections { get; private set; }
        public List<Gate> Nodes { get; private set; }
        public List<Gate> Gates { get; private set; }
        public Legend Legend { get; private set; }

        // Events
        public delegate void RedrawView();
        public event RedrawView ViewUpdates;

        // Commands
        public ICommand StartCircuitButton { get; set; }
        public ICommand ResetCircuitButton { get; set; }
        public ICommand ExitCircuitButton { get; set; }


        // Constructor
        public CircuitVM(CircuitRepository repository)
        {
            _circuitRepo = repository;
            _guiController = new GuiController();
            _isStarted = false;

            // Initialize Event
            _circuitRepo.CircuitChanged += () =>
            {
                PrepareDrawings();
                ViewUpdates?.Invoke();
            };

            StartCircuitButton = new RelayCommand(StartCircuit);
            ResetCircuitButton = new RelayCommand(ResetCircuit);
            ExitCircuitButton = new RelayCommand<Front.Circuits.views.CircuitWindow>(ExitCircuit);

            PrepareLegend();
            Circuit = repository.GetCircuit();
            PrepareDrawings();
        }


        /// <summary>
        /// This method will start the circuit
        /// </summary>
        private void StartCircuit()
        {
            if (!_isStarted)
            {
                _circuitRepo.StartCircuit();
                _isStarted = !_isStarted;
            }
            else
            {
                ResetCircuit();
            }      
            RaisePropertyChanged("ActivateButton");
        }

        /// <summary>
        /// Reset all nodes in the circuit
        /// </summary>
        private void ResetCircuit()
        {
            Circuit = _circuitRepo.ResetCircuit();
            _isStarted = false;
            RaisePropertyChanged("ActivateButton");
        }

        /// <summary>
        /// Exit the current circuit and return to the main window
        /// </summary>
        private void ExitCircuit(Front.Circuits.views.CircuitWindow curWindow)
        {
            // Close window and open Circuit Window
            Front.Circuits.views.MainWindow mainWindow = new Front.Circuits.views.MainWindow();
            mainWindow.Show();
            curWindow.Close();
        }

        /// <summary>
        /// Perpaire a legend for the circuit
        /// </summary>
        public void PrepareLegend()
        {
            Legend = _guiController.PrepareLegend(NODE_SIZE);
        }

        /// <summary>
        /// Change the state of an input node
        /// This way the user can change the circuit output while running
        /// </summary>
        /// <param name="nodeName"></param>
        private void ChangeState(string nodeName)
        {
            // Safty check
            if (string.IsNullOrEmpty(nodeName))
            {
                return;
            }

            // Only if started
            if (_isStarted)
            {
                Circuit = _circuitRepo.ChangeInputNodeState(nodeName);
                PrepareDrawings();
                ViewUpdates?.Invoke();
            }

        }

        /// <summary>
        /// This method will prepare the shapes for the canvas
        /// which  will display the gates and nodes
        /// </summary>
        public void PrepareDrawings()
        {
            // Safety Check
            if(Circuit == null)
            {
                return;
            }

            var ySpacing = CANVAS_HEIGTH / Circuit.InputComposite.GetNodes().Count;
            var xSpacing = 120;
            var count = 0;
            var height_count = 0;

            Nodes = new List<Gate>();
            Gates = new List<Gate>();
            Connections = new List<Connection>();

            foreach (var inputNode in Circuit.InputComposite.GetNodes())
            {
                CircuitPart part = inputNode;
                part._partCounter = 0;
                part._prevIndex = 0;

                // Add input node to the Canvas
                var generatedInput = _guiController.GenerateNode(part.Name, NODE_SIZE, count, ySpacing);
                generatedInput.Comp.MouseUp += (s, e) => 
                {
                    this.ChangeState(generatedInput.Comp.Name);
                };
                Nodes.Add(generatedInput);

                var subcount = 0;
                while (part != null)
                {
                    foreach (var prevPart in part.Previous)
                    {
                        // Check if connections was not created before
                        if (!ConnectionExists($"{part.Name}_{prevPart.Name}"))
                        {
                            var gate = FindComponent(part.Name);
                            var prevGate = FindComponent(prevPart.Name);

                            if(gate != null && prevGate != null)
                            {
                                prevPart.State.DetermineOutputColor(prevPart);
                                Connections.Add(_guiController.GenerateConnection(NODE_SIZE, prevPart.OutputColor, prevGate, gate));
                            }
                        }
                    }

                    // If next count = 0 then draw end node
                    if(part.Next.Count == 0 && part.Previous.Count > 0)
                    {
                        if (!ConnectionExists($"{part.Name}_END"))
                        {
                            var gate = FindComponent(part.Name);

                            if(gate != null)
                            {
                                if(part.Previous != null)
                                {
                                    part.Previous[0].State.DetermineOutputColor(part.Previous[0]);
                                    Connections.Add(_guiController.GenerateEndConnection(NODE_SIZE, part.Previous[0].OutputColor, gate));
                                }
                            }
                        }
                    }

                    // Only add if not added yet
                    if (FindComponent(part.Name) == null)
                    {
                        // Add gate to the list with gates
                        Gates.Add(_guiController.GenerateGate(part.Name, part.Next.Count != 0, NODE_SIZE, count, height_count, subcount, ySpacing, xSpacing, Gates));

                        // Add count if at end node
                        if (part.Next.Count == 0)
                        {
                            height_count++;
                        }
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
                        subcount++;
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
                        subcount = 0;
                    }
                }
                count++;
            }
        }

        /// <summary>
        /// Check if a connection was already added
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        private bool ConnectionExists(string name)
        {
            foreach (var connection in Connections)
            {
                if (connection.Name.Equals(name))
                {
                    return true;
                }
            }

            return false;
        }

        /// <summary>
        /// Get component that was already added before
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        private Gate FindComponent(string name)
        {
            foreach (var gate in Gates)
            {
                if (gate.Name.Equals(name))
                {
                    return gate;
                }
            }

            foreach (var node in Nodes)
            {
                if (node.Name.Equals(name))
                {
                    return node;
                }
            }

            return null;
        }
    }
}
