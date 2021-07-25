package model;

import java.sql.ResultSet;

/**
 * This class is responsible for a various kind of database related actions that
 * are needed for the panel that the user will see
 * 
 * @author Jip van Heugten
 *
 */
public class PanelToShowModel {

	// Objects
	private DatabaseCommunicator dC;

	// Variables
	private final static int TWO_PARAMETERS = 2;
	private final static int FIRST_POSITION = 0;
	private final static int SECOND_POSITION = 1;

	private final static int ONE_PARAMETER = 1;
	private final static int FIRST_RETURN_VALUE = 1;

	private final static int FIRST_RETURN_POSITION = 1;
	private final static String TRUE = "1";
	private static final String FALSE = "0";
	private static final int AMOUNT_OF_TILES = 19;

	private static final int AMOUNT_OF_TILES_RETURN = 1;

	private static final String BANDIT_POSITON = "10";

	// Construtor
	public PanelToShowModel() {
		dC = DatabaseCommunicator.getInstance();
	}

	// Methods
	/**
	 * This method will get the userID of a player
	 * 
	 * @param username
	 * @param gameID
	 * @return
	 */
	public int getUserID(String username, int gameID) {

		ResultSet result;

		int resultInt = 0;

		// Array with parameters
		String[] params = new String[TWO_PARAMETERS];
		params[FIRST_POSITION] = Integer.toString(gameID);
		params[SECOND_POSITION] = username;

		try {
			result = dC.select("SELECT idspeler FROM speler WHERE idspel = ? AND username = ?", params);

			while (result.next()) {
				try {
					resultInt = Integer.parseInt(result.getString(FIRST_RETURN_POSITION));
				} catch (Exception e) {
					e.printStackTrace();
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return resultInt;

	}

	/**
	 * This method will check if the player who wants to throw is on turn
	 * 
	 * @param userID
	 * @param gameID
	 * @return
	 */
	public int playerOnTurn(int gameID) {
		int playerID = 0;
		ResultSet result;

		String[] params = new String[ONE_PARAMETER];
		params[0] = Integer.toString(gameID);

		try {
			result = dC.select("SELECT beurt_idspeler FROM spel WHERE idspel = ?", params);

			while (result.next()) {
				String userIDString = result.getString(FIRST_RETURN_VALUE);
				if (userIDString != null) {
					playerID = Integer.parseInt(userIDString);
				} else {

				}

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return playerID;
	}

	/**
	 * This method will check if a player has allready thrown the dice in his or her
	 * turn
	 * 
	 * @param gameID
	 * @return
	 */
	public boolean hasPlayerThrown(int gameID) {
		// Return boolean
		boolean playerHasThrown = false;
		String resultString = "";

		// To save the result
		ResultSet result;

		// Array with parameters
		String[] params = new String[ONE_PARAMETER];
		params[0] = Integer.toString(gameID);

		try {
			// Execute Query
			result = dC.select("SELECT gedobbeld FROM spel WHERE idspel = ?", params);

			// Save the result

			while (result.next()) {
				resultString = result.getString(FIRST_RETURN_VALUE);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		// Compare results

		if (resultString == null) {
			resultString = FALSE;
		}
		if (resultString.equals(TRUE)) {
			playerHasThrown = true;
		}

		return playerHasThrown;
	}

	/**
	 * This method will find out what is the username that belong to an userID
	 */
	public String getUsername(int userID) {
		// Return String
		String retString = "";

		ResultSet result;

		// Array to save the paramaters
		String[] params = { userID + "" };

		try {

			result = dC.select("SELECT username FROM speler WHERE idspeler = ?", params);

			while (result.next()) {
				retString = result.getString(FIRST_RETURN_VALUE);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return retString;

	}

	/**
	 * This methow will check if a game allready got a gameboard
	 * 
	 * @param gameID
	 * @return
	 */
	public boolean gameBoardExists(int gameID) {
		// Return boolean
		boolean exists = false;
		int tileCounter = 0;

		ResultSet result;

		String[] params = { Integer.toString(gameID) };

		try {

			result = dC.select("SELECT COUNT(idtegel) FROM tegel WHERE idspel = ?", params);

			while (result.next()) {
				tileCounter = Integer.parseInt(result.getString(AMOUNT_OF_TILES_RETURN));
			}

		} catch (Exception e) {
			System.out.println("Warning: [PanelToShow Model] - Get if gameboard exists has failed");
			e.printStackTrace();
		}

		// Check if amount is equal to the total amount of tiles in a game
		if (tileCounter == AMOUNT_OF_TILES) {
			exists = true;
		}

		return exists;
	}

	/**
	 * This method will get the "volgnr" from a user
	 * 
	 * @param userID
	 */
	public int getIdentificatonNumber(int userID) {
		// Result int
		int resultID = 0;

		ResultSet result;

		// Parameters
		String[] params = { Integer.toString(userID) };

		try {
			result = dC.select("SELECT volgnr FROM speler WHERE idspeler = ?", params);

			while (result.next()) {
				resultID = Integer.parseInt(result.getString(FIRST_RETURN_POSITION));
			}
		} catch (Exception e) {
			System.out.println("Warning: [PanelToShow Model] - Get 'volgnr' has failed");
			e.printStackTrace();
		}

		return resultID;
	}

	/**
	 * This method will insert the position of the bandit in a game
	 * 
	 * @param gameID
	 */
	public void insertBandit(int gameID) {

		// Parameters
		String[] params = {BANDIT_POSITON,Integer.toString(gameID)};
		
		try {
			
			dC.updateInsertDelete("UPDATE spel SET struikrover_idtegel = ? WHERE idspel = ?", params);
			
		} catch (Exception e) {
			System.out.println("Warning: Inserting bandit has failed PTSM");
			e.printStackTrace();
		}
	}
}
