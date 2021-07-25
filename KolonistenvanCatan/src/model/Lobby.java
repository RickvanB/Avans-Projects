package model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import controller.LobbyController;

/**
 * This class is responsible for getting game out of the database
 * 
 * @author Jip van Heugten
 *
 */
public class Lobby {

	// Variable
	private int userID;

	// Objects

	// Constructor
	public Lobby(int userID) {
		this.userID = userID;
	}

	// Methods
	public void getLobbies() {
	}

	private boolean gameIsValid;
	private int gameIsInvalid_ID;
	private String player_name;

	// Static variables
	private final static int DEFAULT_COUNT_PLAYERS = 4;
	private final static int FIRST_RETURN_POSITION = 1;
	private final static String DEFAULT_STRING_VALUE = "0";
	private final static int DELETE_POSITION = 0;
	private final static int EMPTY_ARRAYLIST = 0;
	private final static int AMOUNT_OF_PLAYERS = 4;
	private final static int ONE_PARAMETER_ARRAY = 1;
	private final static int FIRST_VALUE_ARRAY = 0;
	private static final String GAME_OVER = "uitgespeeld";

	// Objects
	private ArrayList<String> lobbies;
	private DatabaseCommunicator dC;
	private ArrayList<Integer> playerInGames;
	private ArrayList<String> playerColors;

	// Lobby Controller
	private LobbyController lc;

	// Constructor
	public Lobby(LobbyController lc) {
		// Instantiating objects and variables
		lobbies = new ArrayList<>();
		dC = DatabaseCommunicator.getInstance();
		playerInGames = new ArrayList<>();
		playerColors = new ArrayList<>();
		this.gameIsValid = true;

		// Instantiating lobbyController
		this.lc = lc;
	}

	// Getters and Setters
	public boolean isGameIsValid() {
		return gameIsValid;
	}

	public void setGameIsValid(boolean gameIsValid) {
		this.gameIsValid = gameIsValid;
	}

	// Methods
	/**
	 * This method will get the lobbies where the player is invited to
	 * 
	 * @param UserID
	 */
	public void getLobbies(String userName) {

		// There will be checked in which games the user is playing
		this.playerInGames(userName);

		// Clean up the arraylist
		for (int i = 0; i < playerInGames.size(); i++) {

			// Reset Valid game boolean
			this.gameIsValid = true;

			if (lobbies.size() > EMPTY_ARRAYLIST) {
				int size = this.lobbies.size();

				for (int b = 0; b < size; b++) {
					lobbies.remove(DELETE_POSITION);
				}
			}

			// Get the players who are participating
			this.getPlayers(playerInGames.get(i));

			if (gameIsValid) {
				// Get the player who is on turn
				this.playerOnturn(playerInGames.get(i));
				this.lobbies.add(player_name);

				// Get the colors from the players who are participating
				this.getPlayerColors(playerInGames.get(i));

				// Add colors to the Lobbies array
				for (int counter = 0; counter < AMOUNT_OF_PLAYERS; counter++) {
					lobbies.add(playerColors.get(counter));

				}
			}
			// This will instantiate the lobby
			if (this.gameIsValid) {
				lc.instantiateLobbies(this.lobbies);

			} else {
				System.out.println("Warning: [Lobby] - GAME IS INVALID - " + gameIsInvalid_ID);
				continue;
			}

		}

	}

	/**
	 * This method will return the players who are playing the game
	 * 
	 * @param gameID
	 */
	public void getPlayers(int gameID) {

		// Convert int to string
		String gameIdentificationNumber = Integer.toString(gameID);

		// Return gameID
		lobbies.add(gameIdentificationNumber);

		// ResultSet to save the values the query will return
		ResultSet result;

		// Array of parameters
		String[] params = new String[ONE_PARAMETER_ARRAY];
		params[FIRST_VALUE_ARRAY] = gameIdentificationNumber;

		try {
			// Execute Query get usernames
			result = dC.select("SELECT username FROM speler WHERE idspel = ? ORDER BY volgnr ASC", params);

			// Get values from ResultSet

			int counter = 1;
			while (result.next()) {
				lobbies.add(result.getString(FIRST_RETURN_POSITION));
				counter++;
			}
			// If there are less than 4 players the game is not playable
			if (counter < DEFAULT_COUNT_PLAYERS) {
				gameIsValid = false;
				gameIsInvalid_ID = gameID;
				return;
			}
		} catch (SQLException e) {
			System.out.println("Warning: [Lobby Model] - Get Players failed");
			e.printStackTrace();
		}
	}

	/**
	 * This method will get the usernames from the players who are in the game
	 * 
	 * @param userName
	 */
	public void playerInGames(String userName) {

		// ResultSet to save the values the query will return
		ResultSet result;

		// Array of parameters
		String[] params = new String[ONE_PARAMETER_ARRAY];
		params[FIRST_VALUE_ARRAY] = userName;

		try {
			result = dC.select(
					"SELECT DISTINCT spel.idspel, speler.username FROM spel RIGHT JOIN speler ON spel.idspel = speler.idspel WHERE speler.username = ? AND speler.speelstatus IN ('uitdager', 'geaccepteerd', 'uitgespeeld ')",
					params);

			int counter = 1;

			while (result.next()) {
				int resultInteger = Integer.parseInt(result.getString(counter));
				this.playerInGames.add(resultInteger);

			}
		} catch (SQLException e) {
			System.out.println("Warning: [Lobby Model] - Get the players who are in a game has failed");
			e.printStackTrace();
		}

	}
	
	public int checkIfEveryoneHaveAccepted(int gameID)
	{
		ResultSet result;
		int counter = 0;
		String gameIdentificationNumber = Integer.toString(gameID);
		String query = "SELECT COUNT(speelstatus) FROM speler WHERE idspel = ? AND speelstatus = 'geaccepteerd'";
		String[] params = {gameIdentificationNumber};
		
		try {
			result = this.dC.select(query, params);
			while(result.next()) {
				counter = result.getInt(1);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return counter;
		
	}

	/**
	 * This method will get the username from the user who is on turn
	 * 
	 * @param gameID
	 */
	public void playerOnturn(int gameID) {

		// ResultSet to save the values the query will return
		ResultSet result;

		// Convert int to string
		String gameIdentificationNumber = Integer.toString(gameID);

		// Array of parameters
		String[] params = new String[ONE_PARAMETER_ARRAY];
		params[FIRST_VALUE_ARRAY] = gameIdentificationNumber;

		// Get the user ID out of the ResultSet
		String userID = DEFAULT_STRING_VALUE;

		try {
			// Get the user On Turn ID
			result = dC.select("SELECT DISTINCT s.beurt_idspeler, s.idspel FROM spel s WHERE s.idspel = ?", params);

			while (result.next()) {
				userID = result.getString(FIRST_RETURN_POSITION);
			}

		} catch (NumberFormatException e) {
			System.out.println("Warning: [Lobby Model] - Get player on turn failed");
			e.printStackTrace();
		} catch (SQLException e) {
			System.out.println("Warning: [Lobby Model] - Get player on turn failed");
			e.printStackTrace();
		}

		// Reset the ResultSet and the params array
		result = null;
		params[FIRST_VALUE_ARRAY] = userID;

		try {
			// Get playernames
			result = dC.select("SELECT username FROM speler WHERE idspeler = ?", params);

			while (result.next()) {
				this.player_name = result.getString(FIRST_RETURN_POSITION);
			}

		} catch (Exception e) {
			System.out.println("Warning: [Lobby Model] - Get player on turn failed");
			e.printStackTrace();
		}

	}

	/**
	 * This method will get the colors of the players from the database
	 * 
	 * @param gameID
	 */
	public void getPlayerColors(int gameID) {
		// ResultSet to save the values the query will return
		ResultSet result;

		// Convert int to string
		String gameIdentificationNumber = Integer.toString(gameID);

		// Array of parameters
		String[] params = new String[ONE_PARAMETER_ARRAY];
		params[FIRST_VALUE_ARRAY] = gameIdentificationNumber;

		try {
			// Execute Query
			result = dC.select("SELECT kleur FROM speler WHERE idspel = ? ORDER BY volgnr ASC", params);

			// Clean up the ArrayList
			if (this.playerColors.size() > EMPTY_ARRAYLIST) {
				int size = this.playerColors.size();
				for (int counter = 0; counter < size; counter++) {
					this.playerColors.remove(DELETE_POSITION);
				}
			}
			// Add the colors to the arrayList
			while (result.next()) {
				this.playerColors.add(result.getString(FIRST_RETURN_POSITION));
			}

		} catch (Exception e) {
			System.out.println("Warning: [Lobby Model] - Get player Colors has failed");
			e.printStackTrace();
		}

	}

	/**
	 * This method will check if a game is allready won 
	 * @return
	 */
	public boolean gameIsWon(String username, int gameID) {
		// Return boolean
		boolean gameIsWon = false;
		
		int userID = 0;
		
		ResultSet result;
		
		
		// Get userID
		String[] params1 = {username, Integer.toString(gameID)};
		
		try {
			// Get userID
			result = dC.select("SELECT idspeler FROM speler WHERE username = ? AND idspel = ?", params1);
			
			while(result.next()) {
				userID = Integer.parseInt(result.getString(FIRST_RETURN_POSITION));
			}
			
		} catch (Exception e) {
			System.out.println("Warning: [Lobby Model] - Getting if the game is allready won by a player has failed");
			e.printStackTrace();
		}
		
		result = null;
		
		if(userID != 0) {
			try {
				String[] params2 = {Integer.toString(userID)};
				
				// Get if the game is allready won
				result = dC.select("SELECT speelstatus FROM speler WHERE idspeler = ?", params2);
				
				while(result.next()) {
					if(result.getString(FIRST_RETURN_POSITION).equals(GAME_OVER)){
						gameIsWon = true;
					}
				}
				
			} catch (Exception e) {
				System.out.println("Warning: [Lobby Model] - Getting if the game is allready won by a player has failed");
				e.printStackTrace();
				
			}
		}
		
		return gameIsWon;
	}
}
