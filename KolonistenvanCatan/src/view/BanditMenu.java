package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.Arrays;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.WindowConstants;

import controller.Bandit;
import model.Gebruiker;
import model.PanelToShowModel;

public class BanditMenu extends JPanel {

	// Variables

	private final static int PANEL_HEIGHT = 200;
	private final static int PANEL_WIDTH = 450;

	private static final int HEADER_WIDTH = 450;
	private static final int HEADER_HEIGHT = 25;

	private static final int BUTTON_WIDTH = 120;
	private static final int BUTTON_HEIGHT = 30;

	// Fonts
	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 18);
	private final static Font INPUT_FONT = new Font("Arial", Font.CENTER_BASELINE, 16);
	// Colors
	private final static Color BACKGROUNDCOLOR = new Color(217, 217, 217);
	private static final Color HEADER_COLOR = Color.ORANGE;

	// Messages
	private static final String HEADER_MESSAGE = "Struikrover:";
	private static final String INPUT_MESSAGE = "Typ de naam van de gene die je wilt aanvallen:";
	private static final String ATTACK = "Aanvallen!";
	private static final String BANDIT = "Speler aanvallen";

	private boolean sevenIsThrown;
	private boolean banditHasMoved;
	private boolean firstTime;
	
	private int userID;
	private int gameID;

	// Objects

	private JComboBox combo;
	
	private PanelToShowModel pTSM;
	private Gebruiker g;
	private Bandit b;

	// Constructor
	public BanditMenu(int gameID, int userID) {
		// Set size
		this.setPreferredSize(new Dimension(PANEL_WIDTH, PANEL_HEIGHT));

		this.pTSM = new PanelToShowModel();
		this.sevenIsThrown = false;
		this.banditHasMoved = false;

		this.gameID = gameID;
		this.userID = userID;
		
		this.g = new Gebruiker();
		this.b = new Bandit(this.gameID, this.userID);
		
	}
	
	public void showBanditAttackPopup()
	{
		this.addComponents();
		// Show confirm dialog
		int result = JOptionPane.showConfirmDialog(null, this, BANDIT, JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
		
		if(result == JOptionPane.OK_OPTION) {
			banditHasMoved = false;
			firstTime = true;
			boolean attackSuccesfull;
			
			// Check if player is on turn and if the player has thown seven
			if (this.userID == pTSM.playerOnTurn(this.gameID) && sevenIsThrown) {
				
				String user = this.combo.getSelectedItem().toString();
				int attackId = this.b.getUserID(user);
				
				if(firstTime) {
					attackSuccesfull = this.b.attack(attackId);
					firstTime = false;
				} else {
					attackSuccesfull = this.b.attack(attackId);
				}
				
				
				if(attackSuccesfull) {
					sevenIsThrown = false;
					firstTime = true;
				}
			}

		}
	}

	// Getters and Setters
	public boolean isSevenIsThrown() {
		return sevenIsThrown;
	}

	public void setSevenIsThrown(boolean sevenIsThrown) {
		this.sevenIsThrown = sevenIsThrown;
	}
	
	/**
	 * Adding the popup components to the dialog window.
	 * 
	 * @param boolean
	 *            combo
	 */
	private void addComponents() {

		this.removeAll();
		this.revalidate();
		this.repaint();

		if (!this.isThisComponentFoundInJPanel(this.combo)) {

			ArrayList players = this.b.getPlayersThatCanBeAttacked(this.gameID);
			// Convert ArrayList to string array
			Object[] objectList = players.toArray();
			String[] stringArray = Arrays.copyOf(objectList, objectList.length, String[].class);

			String[] users = stringArray;

			this.combo = new JComboBox<>(users);
			this.add(this.combo);

		}
	}

	/**
	 * Checks if component already exists
	 * 
	 * @param c
	 * @return boolean
	 */
	private boolean isThisComponentFoundInJPanel(Component c) {
		Component[] components = this.getComponents();
		for (Component component : components) {
			if (c.getParent() == this) {
				return true;
			}
		}

		return false;
	}
}
