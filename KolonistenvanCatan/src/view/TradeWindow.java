package view;

import java.awt.Component;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;

import controller.Log;
import controller.TradeController;
import model.GameRefreshModel;
import model.Gebruiker;
import model.PanelToShowModel;

public class TradeWindow extends JPanel {

	private JComboBox<String> combo;
	private JTextField brick_give;
	private JTextField wood_give;
	private JTextField ore_give;
	private JTextField grain_give;
	private JTextField wool_give;

	private JTextField brick_wanted;
	private JTextField wood_wanted;
	private JTextField ore_wanted;
	private JTextField grain_wanted;
	private JTextField wool_wanted;

	private JCheckBox counterbidCheckbox;
	private JCheckBox tradeWithBankCheckbox;
	private GameRefreshModel rm;

	private Log logCreater;

	private int gameID;
	private int userID;
	private String username;

	private HashMap<String, Integer> give;
	private HashMap<String, Integer> wanted;

	private Gebruiker g;
	private TradeController tc;
	private PanelToShowModel ptsm;

	private final static String TRADE = "Handelsverzoek indienen";
	private final static String TRADE_OVERVIEW = "Handelsoverzicht";
	private final static String TRADE_FROM = "Handelsverzoek van ";
	private final static String TRADE_SUCCESSFULL = "Het handelen is gelukt!";
	private final static String TRADE_FAILED = "Het handelen is niet gelukt, probeer een nieuw handelsverzoek aan te maken";
	private static final String BANK = "bank";
	private static final String SUCCES = "Het handelen met de bank is gelukt";
	private static final String FAILED = "Handelen geannuleerd";
	private static final String INVALLID_INPUT = "Handelen geannuleerd - Gegevens ongeldig";

	public TradeWindow(int gameID, int userID, String userName) {
		this.setLayout(new GridLayout(0, 1));
		this.rm = new GameRefreshModel();
		this.g = new Gebruiker();
		this.ptsm = new PanelToShowModel();
		this.tc = new TradeController(gameID, userID);

		this.gameID = gameID;
		this.userID = userID;
		this.username = userName;
		this.logCreater = new Log(userID, gameID);

		this.give = new HashMap<>();
		this.wanted = new HashMap<>();

		this.brick_give = new JTextField();
		this.wood_give = new JTextField();
		this.ore_give = new JTextField();
		this.grain_give = new JTextField();
		this.wool_give = new JTextField();

		this.brick_wanted = new JTextField();
		this.wood_wanted = new JTextField();
		this.ore_wanted = new JTextField();
		this.grain_wanted = new JTextField();
		this.wool_wanted = new JTextField();

		this.counterbidCheckbox = new JCheckBox();
		this.tradeWithBankCheckbox = new JCheckBox();

	}

	/**
	 * Creates new trading request.
	 */
	public void createNewTradeRequest() {
		// Add components
		this.addComponents(false);
		this.setEditable(true);
		this.clearTextFields();

		this.add(new JLabel("Tegenbod:"));
		this.add(this.counterbidCheckbox);

		this.add(new JLabel("Handelen met bank:"));
		this.add(this.tradeWithBankCheckbox);

		// Show confirm dialog
		int result = JOptionPane.showConfirmDialog(null, this, TRADE, JOptionPane.OK_CANCEL_OPTION,
				JOptionPane.PLAIN_MESSAGE);

		// If user wants to trade
		if (result == JOptionPane.OK_OPTION) {
			try {

				String[] values_give = { this.brick_give.getText(), this.wood_give.getText(), this.ore_give.getText(),
						this.grain_give.getText(), this.wool_give.getText() };

				String[] values_wanted = { this.brick_wanted.getText(), this.wood_wanted.getText(),
						this.ore_wanted.getText(), this.grain_wanted.getText(), this.wool_wanted.getText() };

				String[] materials = { "brick", "wood", "ore", "grain", "wool" };

				for (int i = 0; i < values_give.length; i++) {

					if (values_give[i] != null && materials[i] != null) {
						this.give.put(materials[i], Integer.parseInt(values_give[i]));
					} else {
						this.give.put(materials[i], 0);
					}

				}

				for (int i = 0; i < values_wanted.length; i++) {
					if (values_wanted[i] != null && materials[i] != null) {
						this.wanted.put(materials[i], Integer.parseInt(values_wanted[i]));
					} else {
						this.wanted.put(materials[i], 0);
					}
				}

				// Make trade request
				if (this.counterbidCheckbox.isSelected() && !(this.tradeWithBankCheckbox.isSelected())) {
					this.tc.makeOrGetTradeRequest(this.userID, true, this.give, this.wanted);
					// Set Refresh message
					rm.setRefreshValue(true, gameID);

					// If the player places no counter bid but also no trade with the bank
				} else if (!(this.counterbidCheckbox.isSelected()) && !(this.tradeWithBankCheckbox.isSelected())) {
					this.tc.makeOrGetTradeRequest(this.userID, false, this.give, this.wanted);

					// If the player places no counter bid but want to trade with the bank
				} else if (!(this.counterbidCheckbox.isSelected()) && (this.tradeWithBankCheckbox.isSelected())) {
					boolean succesfull = this.tc.tradeWithBank(this.give, this.wanted, BANK, null);

					if (succesfull) {
						JOptionPane.showMessageDialog(null, SUCCES);
					} else {
						JOptionPane.showMessageDialog(null, FAILED);
					}
				}
			} catch (Exception e) {
				System.out.println("Warning - [TradeWindow View] - User input is invallid");
				JOptionPane.showMessageDialog(null, INVALLID_INPUT);
				
			}

		}
	}

	/**
	 * Shows all trade requests in the current game
	 */
	public void showTradeRequests() {

		this.addComponents(true);

		boolean tradeSuccesfullGive = false;
		boolean tradeSuccesfullTake = false;

		// Show confirm dialog
		int result = JOptionPane.showConfirmDialog(null, this, TRADE_OVERVIEW, JOptionPane.OK_CANCEL_OPTION,
				JOptionPane.PLAIN_MESSAGE);

		// If trade is accepted
		if (result == JOptionPane.OK_OPTION) {
			// Get all variables
			int receiver = this.ptsm.getUserID(this.combo.getSelectedItem().toString(), this.gameID);
			
			String[] values_give = { this.brick_give.getText(), this.wood_give.getText(), this.ore_give.getText(),
					this.grain_give.getText(), this.wool_give.getText() };
			String[] values_wanted = { this.brick_wanted.getText(), this.wood_wanted.getText(),
					this.ore_wanted.getText(), this.grain_wanted.getText(), this.wool_wanted.getText() };

			// Start trading
			try {

				tradeSuccesfullGive = this.tc.tradeMaterialsPlayer_to_Player(this.userID, receiver,
						Integer.parseInt(values_give[0]), Integer.parseInt(values_give[1]),
						Integer.parseInt(values_give[2]), Integer.parseInt(values_give[3]),
						Integer.parseInt(values_give[4]));
				tradeSuccesfullTake = this.tc.tradeMaterialsPlayer_to_Player(receiver, this.userID,
						Integer.parseInt(values_wanted[0]), Integer.parseInt(values_wanted[1]),
						Integer.parseInt(values_wanted[2]), Integer.parseInt(values_wanted[3]),
						Integer.parseInt(values_wanted[4]));
			} catch (Exception e) {
				System.out.println("Warning: [Trade Window] - Accepted & Execute trade has failed");
				e.printStackTrace();
				
			} finally {
				// Clear the database
				if (tradeSuccesfullTake && tradeSuccesfullGive) {
					JOptionPane.showOptionDialog(null, TRADE_SUCCESSFULL, "", JOptionPane.DEFAULT_OPTION,
							JOptionPane.INFORMATION_MESSAGE, null, new Object[] {}, null);
					tc.clearDatabase(userID);
				} else {
					JOptionPane.showOptionDialog(null, TRADE_FAILED, "", JOptionPane.DEFAULT_OPTION,
							JOptionPane.INFORMATION_MESSAGE, null, new Object[] {}, null);

				}
				// Add log message
				this.logCreater.defaultLog("trade", username, null, 0, null, this.ptsm.getUsername(receiver));
			}
		}
	}

	/**
	 * Shows trade request from player who is on turn
	 */
	public void showTradeRequestPlayerOnTurn() {
		// Setup popup
		this.addComponents(false);
		this.clearTextFields();
		this.setEditable(false);
		int player = this.ptsm.playerOnTurn(this.gameID);
		String username = this.ptsm.getUsername(player);
		this.getTradeRequest(player);

		// Show popup
		JOptionPane.showOptionDialog(null, this, TRADE_FROM + username, JOptionPane.DEFAULT_OPTION,
				JOptionPane.INFORMATION_MESSAGE, null, new Object[] {}, null);

	}

	/**
	 * Get trade request
	 */
	private void getTradeRequest(int userID) {

		int receiver = 0;
		if (userID == 0) {
			String trader = this.combo.getSelectedItem().toString();
			if (trader != null && trader != "") {
				receiver = this.ptsm.getUserID(trader, this.gameID);
			} else {
				System.out.println("Warning: [Trade Window] - Get Username has failed ");
				return;
			}
		} else {
			receiver = userID;
		}

		String[] counterBids = tc.getCounterbids(receiver, gameID);

		this.brick_give.setText(counterBids[0]);
		this.ore_give.setText(counterBids[1]);
		this.grain_give.setText(counterBids[2]);
		this.wood_give.setText(counterBids[3]);
		this.wool_give.setText(counterBids[4]);

		this.brick_wanted.setText(counterBids[5]);
		this.ore_wanted.setText(counterBids[6]);
		this.grain_wanted.setText(counterBids[7]);
		this.wood_wanted.setText(counterBids[8]);
		this.wool_wanted.setText(counterBids[9]);

		this.setEditable(false);
	}

	/**
	 * Sets JTextFields editable yes or no
	 * 
	 * @param editable
	 */
	private void setEditable(boolean editable) {
		JTextField[] textFields = { this.brick_give, this.ore_give, this.grain_give, this.wood_give, this.wool_give,
				this.brick_wanted, this.ore_wanted, this.grain_wanted, this.wood_wanted, this.wool_wanted };

		for (int i = 0; i < textFields.length; i++) {
			textFields[i].setEditable(editable);
		}
	}

	/**
	 * Clears JTextFields when switching panels
	 */
	private void clearTextFields() {
		JTextField[] textFields = { this.brick_give, this.ore_give, this.grain_give, this.wood_give, this.wool_give,
				this.brick_wanted, this.ore_wanted, this.grain_wanted, this.wood_wanted, this.wool_wanted };

		for (int i = 0; i < textFields.length; i++) {
			textFields[i].setText("");
		}
	}

	/**
	 * Adding the popup components to the dialog window.
	 * 
	 * @param boolean
	 *            combo
	 */
	private void addComponents(boolean combo) {

		this.removeAll();
		this.revalidate();
		this.repaint();

		if (!this.isThisComponentFoundInJPanel(this.brick_give)) {

			if (combo) {
				ArrayList players = this.g.getPlayers(this.gameID, this.userID);
				// Convert ArrayList to string array
				Object[] objectList = players.toArray();
				String[] stringArray = Arrays.copyOf(objectList, objectList.length, String[].class);

				String[] users = stringArray;

				this.combo = new JComboBox<>(users);

				this.combo.addActionListener(new ActionListener() {
					@Override
					public void actionPerformed(ActionEvent arg0) {
						// Get trade requests from current selected user
						getTradeRequest(0);
					}
				});

				this.add(new JLabel("Gebruiker:"));
				this.add(this.combo);
			}

			this.add(new JLabel("Geven:"));

			this.add(new JLabel("Baksteen:"));
			this.add(this.brick_give);
			this.add(new JLabel("Hout:"));
			this.add(this.wood_give);
			this.add(new JLabel("Erts:"));
			this.add(this.ore_give);
			this.add(new JLabel("Graan:"));
			this.add(this.grain_give);
			this.add(new JLabel("Wol:"));
			this.add(this.wool_give);
		}

		if (!this.isThisComponentFoundInJPanel(this.brick_wanted)) {
			this.add(new JLabel("Nodig:"));
			this.add(new JLabel("Baksteen:"));
			this.add(this.brick_wanted);
			this.add(new JLabel("Hout:"));
			this.add(this.wood_wanted);
			this.add(new JLabel("Erts:"));
			this.add(this.ore_wanted);
			this.add(new JLabel("Graan:"));
			this.add(this.grain_wanted);
			this.add(new JLabel("Wol:"));
			this.add(this.wool_wanted);
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
