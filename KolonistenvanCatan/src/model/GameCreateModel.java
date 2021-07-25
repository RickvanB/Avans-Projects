package model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * This class will create new games and import existing games
 * 
 * @author Jip van Heugten
 *
 */
public class GameCreateModel {

	// Variables
	private ArrayList<String> values;

	// Parameter values
	private final static int FIRSTPARAMETER = 0;

	// Return values to save in ArrayList
	private final static int IDSPEL_POSITION = 0;
	private final static int BEURT_SPELER_POSITION = 1;
	private final static int GROOTSTE_RM_IDSPELER_POSITION = 2;
	private final static int LANGSTE_HR_IDSPELER_POSITION = 3;
	private final static int GEDOBBELD_POSITION = 4;
	private final static int LAATSTE_WORP_STEEN1_POSITION = 5;
	private final static int LAATSTE_WORP_STEEN2_POSITION = 6;
	private final static int ISRANDOMBORD_POSITION = 7;
	private final static int EERSTERONDE_POSITION = 8;
	private final static int STRUIKROVER_IDTEGEL_POSITION = 9;
	private static final int THREE_PARAMETERS = 3;

	// Result from resultset
	private final static int RESULTPLUSONE = 1;

	// Create new Game
	private final static int RETURNVALUE_GAMEID = 1;

	private static final int TWO_PARAMETERS = 2;

	private static final int ID_PLAYER = 1;

	private static final int NOT_SET = 0;

	private static final int ID_GAME = 1;

	private static final String FALSE = "0";

	private static final int BOOLEAN_POSITION = 1;

	// Objects
	DatabaseCommunicator dC;

	// Constructor
	public GameCreateModel() {
		dC = DatabaseCommunicator.getInstance();

		values = new ArrayList<>();
	}

	// Methods
	/**
	 * This method will return the values of an existing game
	 */
	public ArrayList<String> importExistingGame(int gameID) {

		// ResultSet to save the values the query will return
		ResultSet result = null;

		// Rest the arrayList
		for (int i = 0; i < values.size(); i++) {
			values.remove(i);
		}

		String gameNumber;
		gameNumber = Integer.toString(gameID);

		try {
			// The parameters for the query
			String[] params = new String[1];
			params[FIRSTPARAMETER] = gameNumber;

			// Executing query
			result = dC.select("SELECT * FROM spel WHERE idspel = ?", params);

		} catch (Exception e) {
			System.out.println("Warning: [GameCreate Model] - Import game has failed");
			e.printStackTrace();
		}

		// Save the values in the ArrayList
		try {
			result.next();
			values.add(IDSPEL_POSITION, result.getString(IDSPEL_POSITION + RESULTPLUSONE));
			values.add(BEURT_SPELER_POSITION, result.getString(BEURT_SPELER_POSITION + RESULTPLUSONE));
			values.add(GROOTSTE_RM_IDSPELER_POSITION, result.getString(GROOTSTE_RM_IDSPELER_POSITION + RESULTPLUSONE));
			values.add(LANGSTE_HR_IDSPELER_POSITION, result.getString(LANGSTE_HR_IDSPELER_POSITION + RESULTPLUSONE));
			values.add(GEDOBBELD_POSITION, result.getString(GEDOBBELD_POSITION + RESULTPLUSONE));
			values.add(LAATSTE_WORP_STEEN1_POSITION, result.getString(LAATSTE_WORP_STEEN1_POSITION + RESULTPLUSONE));
			values.add(LAATSTE_WORP_STEEN2_POSITION, result.getString(LAATSTE_WORP_STEEN2_POSITION + RESULTPLUSONE));
			values.add(ISRANDOMBORD_POSITION, result.getString(ISRANDOMBORD_POSITION + RESULTPLUSONE));
			values.add(EERSTERONDE_POSITION, result.getString(EERSTERONDE_POSITION + RESULTPLUSONE));
			values.add(STRUIKROVER_IDTEGEL_POSITION, result.getString(STRUIKROVER_IDTEGEL_POSITION + RESULTPLUSONE));
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return values;

	}

	/**
	 * This method will create a new game in the database
	 * 
	 * @param userID
	 * @param randomBoard
	 */
	public int createNewGame(boolean randomBoard, String username) {

		// To save the result that will be return by the query
		ResultSet result;
		String randomBordBoolean;
		int newGameID = 0;
		// Convert boolean to String
		if (randomBoard) {
			randomBordBoolean = "1";
		} else {
			randomBordBoolean = "0";
		}

		// Get the new gameID
		newGameID = this.getFirstEmptyID();

		// Save the new GameID

		String newGameIDString = Integer.toString(newGameID);

		// Execute create query
		try {
			Invite iM = new Invite();
			int playerId = iM.getFirstFreeInteger();
			String playerToStart = Integer.toString(this.getPlayerToStart(newGameIDString));

			// Insert values
			String[] params1 = new String[THREE_PARAMETERS];
			params1[0] = newGameIDString;
			params1[1] = playerToStart;
			params1[2] = randomBordBoolean;

			String[] params2 = new String[TWO_PARAMETERS];
			params2[0] = newGameIDString;
			params2[1] = randomBordBoolean;

			if (!playerToStart.equals("1")) {
				// Execute query
				dC.updateInsertDelete(

						"INSERT INTO spel (idspel, beurt_idspeler, israndomboard, eersteronde) VALUES (?, ?, ?, 1)",
						params1);

			} else {
				// Execute query
				dC.updateInsertDelete(
						"INSERT INTO spel (idspel, beurt_idspeler, israndomboard, eersteronde) VALUES (?, null, ?, 1)",
						params2);

			}
			String[] params_speler = { Integer.toString(playerId), newGameIDString, username, "rood", "uitdager", "0",
					"1" };

			dC.updateInsertDelete(
					"INSERT INTO speler (idspeler, idspel, username, kleur, speelstatus, shouldrefresh, volgnr) VALUES (?, ?, ?, ?, ?, ?, ?) ",
					params_speler);
		} catch (Exception e) {
			e.printStackTrace();
		}

		this.getPlayerToStart(Integer.toString(newGameID));

		return newGameID;

	}

	public ArrayList<String> getAllUsers(String username) {
		ArrayList<String> users = new ArrayList<>();
		String query = "SELECT username FROM account WHERE username <> ?";
		String[] params = { username };
		try {
			ResultSet result = this.dC.select(query, params);
			while (result.next()) {
				users.add(result.getString(1));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return users;
	}

	public int getFirstEmptyID() {
		// ArrayList to save the ids the query will return
		ArrayList<Integer> IDS = new ArrayList<Integer>();

		// Get all gameID's
		try {

			ResultSet result = dC.select("SELECT idspel FROM spel", null);

			while (result.next()) {
				if (result != null) {
					IDS.add(Integer.parseInt(result.getString(ID_GAME)));
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		// Return int
		int resultInt = 0;
		boolean numberExists = false;

		for (int j = 1; j < IDS.size() + 1; j++) {

			numberExists = false;
			for (int a = 0; a < IDS.size(); a++) {

				if (j == IDS.get(a)) {
					numberExists = true;
				}

			}
			// Save the number if it not exist yet
			if (!numberExists) {
				resultInt = j;
				break;
			}
		}
		int counter = 1;
		while (resultInt == 0) {
			String[] params = { Integer.toString(counter) };
			
			// Check if gameID exists
			ResultSet result = dC.select("SELECT EXISTS(SELECT * FROM spel WHERE idspel = ?)", params);

			try {
				while (result.next()) {
					String resultString;

					resultString = result.getString(BOOLEAN_POSITION);

					if (resultString.equals(FALSE)) {
						resultInt = counter;
					}
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			counter++;
		}

		return resultInt;

	}

	public int getPlayerToStart(String newGameID) {
		// Set the turn id to the player with the "speelstatus" --> "Uitdager"
		String[] params_Challanger = { newGameID };

		// Result int
		int firstTurnID = 1;

		try {
			ResultSet result;
			// Select player with "Uitdager" status
			result = dC.select("SELECT idspeler FROM speler WHERE idspel = ? AND speelstatus = 'uitdager'",
					params_Challanger);

			while (result.next()) {
				firstTurnID = Integer.parseInt(result.getString(ID_PLAYER));
			}

			// Set turn id if its not set set a default value
			if (firstTurnID != NOT_SET) {
				String[] params_turnID = { Integer.toString(firstTurnID), newGameID };
				dC.updateInsertDelete("UPDATE spel SET beurt_idspeler = ? WHERE idspel = ?", params_turnID);
			} else {

			}

		} catch (Exception e) {
			System.out.println("Warning [GameCreate Model] - Setting the first turn ID has failed");
			e.printStackTrace();
		}

		return firstTurnID;
	}
}
