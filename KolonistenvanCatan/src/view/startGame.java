package view;

import java.awt.Component;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JList;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;

import controller.GameCreateController;
import controller.InviteController;

public class startGame extends JPanel {

	private static final String STARTUP_NEW_GAME = "Maak een nieuw spel";
	private static final String INVITE_NEW = "Nodig nieuwe spelers uit";
	private static final String USERS_INVITE = "Gebruikers uitnodigen";
	private static final String SETTINGS = "Instellingen";
	private static final String RANDOM_BOARD = "Random bord";
	private static final String GAMES = "Spellen";
	private static final String USERS = "Gebruikers";
	private static final int AMOUNT_TO_INVITE = 3;
	private static final String TO_MANY_PLAYERS = "Maximaal 3 speler uitnodigen";
	private static final String GAME_SET = "Uitnodiging is verstuurd";
	private static final String NOT_ENOUGH = "Ovoldoende spelers";
	private static final String ALREADY_EXISTS = " bestaat al in dit spel, probeer iemand anders uit te nodigen.";

	private InviteController iC;

	private String username;
	private int gameID;
	private boolean createSuccesfull;

	private JList users;
	private JScrollPane scroll;
	private JCheckBox checkbox;

	private JComboBox<String> games_combo;
	private JComboBox<String> users_combo;

	private GameCreateController gCC;

	public startGame() {
		this.gCC = new GameCreateController();
		this.iC = new InviteController();
		this.setLayout(new GridLayout(0, 1));
	}

	// Getters
	public int getGameID() {
		return gameID;
	}

	public boolean isCreateSuccesfull() {
		return createSuccesfull;
	}

	// Methods

	/**
	 * Adds a popup with fields to start a new game
	 */
	public String setupNewGame() {
		// Return String
		String message = null;

		// Reset succes value
		this.createSuccesfull = false;

		// Add compontents
		this.addComponents();

		// Show confirm dialog
		int result = JOptionPane.showConfirmDialog(null, this, STARTUP_NEW_GAME, JOptionPane.OK_CANCEL_OPTION,
				JOptionPane.PLAIN_MESSAGE);

		// If user wants to startup new game
		if (result == JOptionPane.OK_OPTION) {
			// Get selected users
			List<String> values = this.users.getSelectedValuesList();
			// Convert to a String array
			String[] sUsers = (String[]) values.stream().toArray(String[]::new);
			boolean random = this.checkbox.isSelected();

			// Check if there are only 3 users selected
			if (sUsers.length > AMOUNT_TO_INVITE) {
				System.out.println("Message: [StartGame] - Player has invited to much players to start a game");
				// Set message
				message = TO_MANY_PLAYERS;
			} else if (sUsers.length < 1) {
				message = NOT_ENOUGH;
				System.out.println("Message: [StartGame] - Player has not invited enough players to start a game");
			} else if(sUsers.length == AMOUNT_TO_INVITE){
				// Create game
				gameID = this.gCC.createGame(sUsers, random, this.username);
				if (gameID != 0) {
					createSuccesfull = true;
					System.out.println("Message: [StartGame] - Game will be created. Host: " + username);
				}
				// Set message
				message = GAME_SET;
			}

		}
		return message;
	}

	/**
	 * Shows a popup to invite extra players
	 */
	public void inviteNewPlayers() {
		this.addInviteComponents();
		
		int gameID = 0;
		String username = null;

		// Show confirm dialog
		int result = JOptionPane.showConfirmDialog(null, this, INVITE_NEW, JOptionPane.OK_CANCEL_OPTION,
				JOptionPane.PLAIN_MESSAGE);

		// If user wants to startup new game
		if (result == JOptionPane.OK_OPTION) {
			try {
				gameID = Integer.parseInt(this.games_combo.getSelectedItem().toString());
				username = this.users_combo.getSelectedItem().toString();
			} catch (Exception e) {
				gameID = 0; 
				System.out.println("Warning: [Start Game] - Getting gameID and username has failed. There will be no player re-invited");
			}
			
			boolean exists = this.iC.isAlreadyInGame(username, gameID);
			
			if(exists) {
				JOptionPane.showMessageDialog(new JFrame(), username + ALREADY_EXISTS);
				return;
			}

			// Check if there are correct values inserted
			if(gameID != 0 && username != null && !(username.equals(""))) {
				this.iC.re_invitePlayer(username, gameID);
			}
			

		}
	}

	/**
	 * Adds components to the view
	 */
	private void addComponents() {
		this.removeAll();
		this.revalidate();
		this.repaint();

		if (!this.isThisComponentFoundInJPanel(this.users)) {
			this.scroll = new JScrollPane();
			this.users = new JList<String>(this.gCC.getAllUsers(this.username));
			this.scroll.setViewportView(this.users);
			this.checkbox = new JCheckBox();
			
			this.scroll.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);

			this.add(new JLabel(USERS_INVITE));
			this.add(this.scroll);
			this.add(new JLabel(RANDOM_BOARD));
			this.add(this.checkbox);
		}
	}

	/**
	 * Adds components for the invite view
	 */
	private void addInviteComponents() {
		this.removeAll();
		this.revalidate();
		this.repaint();
		
		// Get all players
		ArrayList players = iC.getAllAccounts(username, gameID);
		// Convert ArrayList to string array
		Object[] objectList = players.toArray();
		String[] stringArray = Arrays.copyOf(objectList, objectList.length, String[].class);
		String[] users = stringArray;

		// Get all games
		ArrayList gamesList = this.iC.getAllGames(this.username);
		Object[] objectListGames = gamesList.toArray();
		String[] stringArrayGames = Arrays.copyOf(objectListGames, objectListGames.length, String[].class);
		String[] games = stringArrayGames;

		if (!this.isThisComponentFoundInJPanel(this.games_combo)) {
			this.users_combo = new JComboBox(users);
			this.games_combo = new JComboBox(games);

			this.add(new JLabel(GAMES));
			this.add(this.games_combo);
			this.add(new JLabel(USERS));
			this.add(this.users_combo);
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

	public void setUsername(String username) {

		this.username = username;
	}

}
