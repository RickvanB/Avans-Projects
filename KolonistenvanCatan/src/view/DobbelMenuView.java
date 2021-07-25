package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

import controller.Log;
import model.Ontwikkelingskaart;
import model.PanelToShowModel;

public class DobbelMenuView extends JPanel {

	// Variables
	private final static String BUTTON_TEXT = "Dobbelen";
	private final static int BUTTON_WIDTH = 150;
	private final static int BUTTON_HEIGHT = 25;

	private final static int DICE_HEIGHT = 65;
	private final static int PANEL_WIDTH = 350;

	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 16);
	// Color
	private final static Color HEADERCOLOR = Color.ORANGE;
	private final static Color BACKGROUNDCOLOR = new Color(217, 217, 217);

	private final static String HEADER_STRING = "Dobbelsteen";

	// Player Variables
	private int userID;
	private int gameID;

	// Objects
	private DobbelView dV;
	private JButton throwDice;
	private JPanel dicePanel;
	private JPanel buttonPanel;
	private JPanel header;
	private JLabel headerText;

	// Model
	private PanelToShowModel pTSM;

	// Constructor
	public DobbelMenuView(int gameID, int userID, Log log, BanditMenu bm, PanelToShow pts) {

		// Instantiating Objects
		this.dV = new DobbelView(gameID, bm , pts, userID);
		this.throwDice = new JButton(BUTTON_TEXT);
		this.dicePanel = new JPanel();
		this.buttonPanel = new JPanel();
		this.header = new JPanel();
		this.headerText = new JLabel();
		this.pTSM = new PanelToShowModel();

		this.userID = userID;
		this.gameID = gameID;
		


		// Layout Manager
		this.setLayout(new GridBagLayout());
		GridBagConstraints gbc = new GridBagConstraints();
		gbc.fill = GridBagConstraints.VERTICAL;

		// Header Layout
		gbc.gridx = 0;
		gbc.gridy = 0;
		gbc.ipadx = PANEL_WIDTH;
		this.add(header, gbc);

		// Button Layout
		gbc.gridx = 0;
		gbc.gridy = 1;

		this.add(buttonPanel, gbc);

		// Dice Panel layout
		gbc.gridx = 0;
		gbc.gridy = 2;
		gbc.ipady = DICE_HEIGHT;
		this.add(dicePanel, gbc);

		// Layout Manager
		dicePanel.setLayout(new FlowLayout());
		

		// Header settings
		header.setBackground(HEADERCOLOR);
		headerText.setText(HEADER_STRING);
		headerText.setFont(HEADER_FONT);
		header.add(headerText);

		// Button Settings
		throwDice.setPreferredSize(new Dimension(BUTTON_WIDTH, BUTTON_HEIGHT));

		// Background Color
		dicePanel.setBackground(BACKGROUNDCOLOR);
		dV.setBackground(BACKGROUNDCOLOR);
		buttonPanel.setBackground(BACKGROUNDCOLOR);

		// Add Components
		dicePanel.add(dV);
		buttonPanel.add(throwDice);

		// ActionListners
		this.throwDice.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				boolean playerOnTurn = false;
				boolean playerHasAlreadyThrown;
				int userIDReturn = pTSM.playerOnTurn(gameID);

				// Check if the player is on turn
				if(userIDReturn == userID) {
					playerOnTurn = true;
				}
				
				// Check if the player has not already thrown
					playerHasAlreadyThrown = pTSM.hasPlayerThrown(gameID);

				
				
				// This if statements checks if the player is on turn
				if (playerOnTurn && !playerHasAlreadyThrown) {
					dV.setDrawDice(true);
					throwDice.setForeground(Color.BLACK);
					repaint();
					dV.repaint();


				} else {
					throwDice.setForeground(Color.RED);
					dV.setDrawDice(false);
				}



			}
		});
	}
	
	/**
	 * This method will repaint the dice when there is a new diceresult
	 */
	public void repaintDice() {
		dV.setDrawDice(false);
		dV.repaint();
		dV.validate();
	}
	

}
