package model;

import java.sql.ResultSet;
import java.util.HashMap;

import controller.Log;

/**
 * This class is responsible for passing the turn to the next player
 * 
 * @author Jip van Heugten
 *
 */
public class PassTurnModel {

	// Variables
	private final static int ONE_PARAMETER_ARRAY = 1;
	private final static int TWO_PARAMETER_ARRAY = 2;
	private final static int FOURTH_PLAYER = 4;
	private final static int FIRST_PLAYER_FIRST_ROUND = 1;
	private final static int AMOUNT_OF_BUILDING_BEFORE_ROUND_TO = 1;
	private final static int AMOUNT_OF_BUILDING_AFTER_ROUND_TO = 2;

	private final static int FIRST_PARAMETER = 0;
	private final static int SECOND_PARAMETER = 1;

	private final static int FIRST_RETURN_VALUE = 1;

	private final static String TRUE = "1";
	private final static String FALSE = "0";
	private final static int DEFAULT_VALUE = 0;

	private final static int AMOUNT_OF_PLAYERS = 4;
	private final static int FIRST_PLAYER = 0;
	private static final int SIZE_FOUR = 4;
	private static final int KIND = 0;
	private static final int Y = 1;
	private static final int X = 2;
	private static final int ROBBER_TILE = 3;

	// Objects
	private DatabaseCommunicator dC;
	private Log logmodel;
	private PanelToShowModel pTSM;


	// Constructor
	public PassTurnModel() {
		this.dC = DatabaseCommunicator.getInstance();
		pTSM = new PanelToShowModel();

	}

	// Methods
	/**
	 * This method will find out which player is on turn next
	 * 
	 * @param gameID
	 * @param userID
	 * @return
	 */
	public int playerToPassTo(int gameID, int userID) {

		int playerToPassTo = 0;

		// Save the result
		boolean resultBoolean;

		// Boolean to save if it is the first turn
		boolean firstTurn = false;
		boolean firstTurnLastPlayer = false;

		// Check if game is in the first Round
		resultBoolean = this.inFirstRound(gameID);

		// Check if it's the first round or not
		if (!resultBoolean) {
			firstTurn = false;
		} else if (resultBoolean) {
			firstTurn = true;
			// Check also if player 4 has already played one of its first turns
			firstTurnLastPlayer = firstOrSecondTurnLastPlayerInRoundOne(userID, true);
		} else {
			System.out.println("Somebody is sabotating the database...");
		}

		// Get players who are in the game
		String[] userIDS = this.getPlayersInGame(gameID);

		// Save the values in a HashMap
		HashMap<String, Integer> players = new HashMap<>();

		players = this.getVolgnr(gameID, userIDS);

		// Get color of current playign player
		int identificationPlayerOnTurn = players.get(Integer.toString(userID));
		int positionInArray = DEFAULT_VALUE;

		for (int i = 0; i < AMOUNT_OF_PLAYERS; i++) {
			if (userIDS[i].equals(Integer.toString(userID))) {
				positionInArray = i;
			}
		}

		// Check if the game is in the first round
		int nextPlayer;
		if (firstTurn) {

			// Select the next player
			if (identificationPlayerOnTurn < AMOUNT_OF_PLAYERS && firstTurnLastPlayer) {

				try {
					nextPlayer = Integer.parseInt(userIDS[positionInArray + 1]);
					playerToPassTo = nextPlayer;
				} catch (Exception e) {
					e.printStackTrace();
				}

			} else if (identificationPlayerOnTurn > 0 && !firstTurnLastPlayer) {

				if (identificationPlayerOnTurn == FIRST_PLAYER_FIRST_ROUND) {
					try {
						nextPlayer = Integer.parseInt(userIDS[positionInArray + 1]);
						playerToPassTo = nextPlayer;
					} catch (Exception e) {
						e.printStackTrace();
					}

					// End the first round in the database
					this.endFirstRound(gameID);

				} else {
					try {
						nextPlayer = Integer.parseInt(userIDS[positionInArray - 1]);
						playerToPassTo = nextPlayer;
					} catch (Exception e) {
						e.printStackTrace();
					}
				}

				// Last player in round one plays the second turn directly after the first turn
			} else if (identificationPlayerOnTurn == FOURTH_PLAYER && firstTurnLastPlayer) {
				try {
					nextPlayer = Integer.parseInt(userIDS[positionInArray]);
					playerToPassTo = nextPlayer;
				} catch (Exception e) {
					e.printStackTrace();
				}
				firstTurnLastPlayer = false;

			}

		} else {

			// Select the next player
			if (identificationPlayerOnTurn < AMOUNT_OF_PLAYERS) {

				try {
					nextPlayer = Integer.parseInt(userIDS[positionInArray + 1]);
					playerToPassTo = nextPlayer;
				} catch (Exception e) {
					e.printStackTrace();
				}

			} else {
				try {
					nextPlayer = Integer.parseInt(userIDS[FIRST_PLAYER]);
					playerToPassTo = nextPlayer;
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

		}

		return playerToPassTo;
	}

	/**
	 * This method will get the players who are in the game
	 * 
	 * @param gameID
	 * @return
	 */
	private String[] getPlayersInGame(int gameID) {
		Chat modelClass = new Chat();

		// Get userID's
		String[] userIDS = modelClass.playerInGame(gameID);

		return userIDS;
	}

	/**
	 * This method will get the colors of the players who are in the game
	 * 
	 * @param gameID
	 * @param userIDS
	 * @return
	 */
	private HashMap<String, Integer> getVolgnr(int gameID, String[] userIDS) {
		HashMap<String, Integer> colors = new HashMap<>();

		// ResultSet to save the result from the query
		ResultSet result;

		// Array with parameters
		String[] params = new String[ONE_PARAMETER_ARRAY];

		for (int i = 0; i < AMOUNT_OF_PLAYERS; i++) {
			params[FIRST_PARAMETER] = userIDS[i];

			try {
				// Execute query
				result = dC.select("SELECT volgnr FROM speler WHERE idspeler = ?", params);

				// Save result
				while (result.next()) {
					colors.put(userIDS[i], Integer.parseInt(result.getString(FIRST_RETURN_VALUE)));
				}
			} catch (Exception e) {
				System.out.println("Warning: [PassTurn Model] - Get volgnr has failed");
				e.printStackTrace();
			}
		}

		return colors;
	}

	/**
	 * This method will change the onTurn number in the database. The method will
	 * also turn the value "Gedobbeld" back to 0/false
	 * 
	 * @param playerToPassTo
	 */
	public void passTurnTo(int playerToPassTo, int gameID) {

		// Array of params
		String[] params = new String[TWO_PARAMETER_ARRAY];
		params[FIRST_PARAMETER] = Integer.toString(playerToPassTo);
		params[SECOND_PARAMETER] = Integer.toString(gameID);

		// Set player on turn
		try {
			dC.updateInsertDelete("UPDATE spel SET beurt_idspeler = ? WHERE idspel = ?", params);
			logmodel = new Log(playerToPassTo, gameID);
			logmodel.defaultLog("turn", pTSM.getUsername(playerToPassTo) , null, 0, null, null);
		} catch (Exception e) {
			System.out.println("Warning: [PassTurn Model] - Passing the turn failed");
			e.printStackTrace();
		}

		String[] parameters = new String[ONE_PARAMETER_ARRAY];
		parameters[FIRST_PARAMETER] = Integer.toString(gameID);

		// Set "gedobbeld" back to default
		try {
			dC.updateInsertDelete("UPDATE spel SET gedobbeld = 0 WHERE idspel = ?", parameters);
			
		} catch (Exception e) {
			System.out.println("Warning: [PassTurn Model] - Passing the turn failed");
			e.printStackTrace();
		}
	}

	/**
	 * This method will find out if the player has already played a turn in the
	 * first round. (Player 4 is 2 times)
	 * 
	 * @return firstTurn;
	 */
	public boolean firstOrSecondTurnLastPlayerInRoundOne(int userID, boolean enoughBuildingCheck) {
		boolean firstTurn = false;

		// Counters to save the amount of ... in
		int village_count = 0;
		int road_count = 0;

		ResultSet result;

		// Save parameters
		String[] params = new String[ONE_PARAMETER_ARRAY];
		params[FIRST_PARAMETER] = Integer.toString(userID);

		try {
			result = dC.select(
					"SELECT * FROM spelerstuk WHERE idspeler = ? AND  ((x_van IS NOT NULL AND y_van IS NOT NULL) OR (x_van IS NOT NULL AND y_van IS NOT NULL AND x_naar IS NOT NULL AND y_naar IS NOT NULL))",
					params);

			while (result.next()) {
				String resultString = result.getString(FIRST_RETURN_VALUE);

				// Check what kind of building the player has
				if (resultString.startsWith("r")) {
					road_count++;
				} else if (resultString.startsWith("d")) {
					village_count++;
				}
			}

		} catch (Exception e) {
			System.out.println("Warning: [PassTurn Model] - Check if it is the first round has failed");
			e.printStackTrace();
		}

		if (enoughBuildingCheck) {
			// Check if the amount of building is less than 2
			if (road_count == AMOUNT_OF_BUILDING_BEFORE_ROUND_TO
					&& village_count == AMOUNT_OF_BUILDING_BEFORE_ROUND_TO) {
				firstTurn = true;
			}
		} else {
			if (road_count == AMOUNT_OF_BUILDING_AFTER_ROUND_TO && village_count == AMOUNT_OF_BUILDING_AFTER_ROUND_TO) {
				firstTurn = true;
			}
		}

		return firstTurn;
	}

	/**
	 * This method will end the first round by updating the database
	 * 
	 * @param gameID
	 */
	private void endFirstRound(int gameID) {

		String[] params = new String[ONE_PARAMETER_ARRAY];
		params[FIRST_PARAMETER] = Integer.toString(gameID);

		try {
			// Update First Round
			dC.updateInsertDelete("UPDATE spel SET eersteronde = 0 WHERE idspel = ?", params);
			// Update Should refresh
			dC.updateInsertDelete("UPDATE speler SET shouldrefresh = 1 WHERE idspel = ?", params);
		} catch (Exception e) {
			System.out.println("Warning: [PassTurn Model] - Ending the first round failed");
			e.printStackTrace();
		}
	}

	/**
	 * This method will find out if the player has placed building in the first
	 * round
	 * 
	 * @return
	 */
	public boolean placedBuildings(boolean firstTurn_FirstRound, int userID) {
		// Return boolean
		boolean placedBuildings = false;
		boolean resultBoolean;

		if (firstTurn_FirstRound) {
			resultBoolean = this.firstOrSecondTurnLastPlayerInRoundOne(userID, true);
			if (resultBoolean) {
				placedBuildings = true;
			}
		} else {
			resultBoolean = this.firstOrSecondTurnLastPlayerInRoundOne(userID, false);
			if (resultBoolean) {
				placedBuildings = true;
			}
		}

		return placedBuildings;
	}

	/**
	 * This method will find out if the game is in the first round of the game
	 * 
	 * @param gameID
	 * @return
	 */
	public boolean inFirstRound(int gameID) {
		// Return boolean
		boolean retboolean = false;
		
		String retString = "";

		// To save the result of the query
		ResultSet result;

		// Array of parameters
		String[] params = new String[ONE_PARAMETER_ARRAY];
		params[FIRST_PARAMETER] = Integer.toString(gameID);

		// Save the result

		try {
			// Execute Query
			result = dC.select("SELECT eersteronde FROM spel WHERE idspel = ?", params);

			while (result.next()) {
				retString = result.getString(FIRST_RETURN_VALUE);
			}

		} catch (Exception e) {
			System.out.println("Warning: [PassTurn Model] - Checking if player is in first round has failed");
			e.printStackTrace();
		}
		// Check if it's the first round or not
		if (retString.equals(FALSE)) {
			retboolean = false;
		} else if (retString.equals(TRUE)) {
			retboolean = true;

		} else {
			System.out.println("Somebody is sabotating the database...");
		}

		return retboolean;
	}

	/**
	 * Get userIDs from game
	 * @param gameID
	 * @return
	 */
	public int[] getuserIDS(int gameID) {
		// Return boolean
		int[] playerIDS = new int[AMOUNT_OF_PLAYERS];
		
		ResultSet result;
		
		// Array of Parameters
		String[] params = {Integer.toString(gameID)};
		
		try {
			
			result = dC.select("SELECT idspeler FROM speler WHERE idspel = ?", params);
			
			int counter = 0;
			while(result.next()) {
				playerIDS[counter] = Integer.parseInt(result.getString(FIRST_RETURN_VALUE));
				
				counter++;
			}
			
		} catch (Exception e) {
			System.out.println("Warning [PassTurn Model] - Getting player IDS has failed");
			e.printStackTrace();
		}
		
		return playerIDS;
	}

	/**
	 * This method will get values of a tile
	 * @param i
	 * @return
	 */
	public String[] getTile(int i, int gameID) {
		// String array to return
		String[] tile = new String[SIZE_FOUR];
		
		ResultSet result;
		
		// Parameters
		String[] params = {Integer.toString(gameID), Integer.toString(i)};
		
		try {
			result = dC.select("SELECT idgrondstofsoort, y, x, struikrover_idtegel FROM tegel JOIN spel ON tegel.idspel = spel.idspel WHERE spel.idspel = ? AND idtegel = ?;", params);
			
			while(result.next()) {
				tile[KIND] = result.getString(KIND + 1);
				tile[Y] = result.getString(Y + 1);
				tile[X] = result.getString(X + 1);
				// checks if robber is on the tile
				if (result.getInt(ROBBER_TILE + 1) == i) {
					tile[ROBBER_TILE] = "1";
				}
				else {
					tile[ROBBER_TILE] = "0";
				}
			}
			
			return tile;
		} catch (Exception e) {
			System.out.println("Warning [PassTurn Model] - Get tile values has failed");
			e.printStackTrace();
		}
		
		return null;
	}

}
