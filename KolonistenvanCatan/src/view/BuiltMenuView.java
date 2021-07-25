package view;

import java.awt.Dimension;

import javax.swing.JLabel;
import javax.swing.JPanel;

public class BuiltMenuView extends JPanel {

	// Variables
	private final static int PANEL_WIDTH = 450 ;
	private final static int PANEL_HEIGHT = 200;
	
	// Objects
	JPanel header;
	JLabel headerText;
	
	// Constructor
	public BuiltMenuView(int gameID, int userID) {
		// Set sizes
		this.setPreferredSize(new Dimension(PANEL_WIDTH, PANEL_HEIGHT));
		
		// Instatiate
		this.header = new JPanel();
		this.headerText = new JLabel();
	}
}
