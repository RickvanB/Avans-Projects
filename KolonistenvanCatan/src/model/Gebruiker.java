package model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Gebruiker {

	private final static int DEFAULT_COUNT_PLAYERS = 4;
	private final static int FIRST_RETURN_POSITION = 1;
	
	private ArrayList<Integer> playerInGames;
	private boolean gameIsValid;
	private int gameIsInvalid_ID;
	
	private DatabaseCommunicator dc;
	
	public Gebruiker()
	{
		this.dc = DatabaseCommunicator.getInstance();
	}
	
	
	/**
	 * This method will return the players who are playing the game
	 * 
	 * @param gameID
	 */
	public ArrayList getPlayers(int gameID, int userID) {

		// Convert int to string
		String gameIdentificationNumber = Integer.toString(gameID);

		// ResultSet to save the values the query will return
		ResultSet result = null;
		ArrayList<String> players = new ArrayList<>();

		// Array of parameters
		String[] params = {gameIdentificationNumber, Integer.toString(userID)};

		try {
			// Execute Query get usernames
			result = this.dc.select("SELECT username FROM speler WHERE idspel = ? AND idspeler <> ? ORDER BY volgnr ASC", params);
			// Get values from ResultSet
			while (result.next()) {
				players.add(result.getString(FIRST_RETURN_POSITION));
			}
		} catch (SQLException e) {
			System.out.println("Warning: [User Model] - Get players failed");
			e.printStackTrace();
		}
		
		return players;
	}
	
}
