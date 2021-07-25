package model;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * This class is responsible for placing building on the gameboard
 * 
 * @author Jip van Heugten
 *
 */
public class BuildingModel {

	// Variables
	private final static int FOUR_PARAMETER_ARRAY = 4;
	private final static int FIRST_POSTION = 0;
	private final static int SECOND_POSTION = 1;
	private final static int THIRTH_POSTION = 2;
	private final static int FOURTH_POSITION = 3;
	private final static int FIFTH_POSITION = 4;
	private final static int SIXTH_POSITION = 5;
	private final static int SIX_PARAMETER_ARRAY = 6;
	private final static int ONE_PARAMETER_ARRAY = 1;
	private final static int AMOUNT_OF_PLAYERS = 4;
	private final static int FIRST_RETURN_POSITION = 1;

	// Objects
	private DatabaseCommunicator dC;
	private DistributeMateriallModel dMM;

	// Constructor
	public BuildingModel() {
		dMM = new DistributeMateriallModel();
		dC = DatabaseCommunicator.getInstance();
	}

	// Methods
	/**
	 * This method will place a building on a xPos and yPos in the database and will
	 * return a boolean if the placement was succesfullD
	 * 
	 * @param idSpelStuk
	 * @param xPos
	 * @param yPos
	 * @return placementSuccesfull
	 */
	public void placeBuilding(String idSpelStuk, int xPos, int yPos, int userID) {
		String xPos_String = Integer.toString(xPos);
		String yPos_String = Integer.toString(yPos);
		String userID_String = Integer.toString(userID);

		// Array with parameters
		String[] params = new String[FOUR_PARAMETER_ARRAY];
		params[FIRST_POSTION] = xPos_String;
		params[SECOND_POSTION] = yPos_String;
		params[THIRTH_POSTION] = idSpelStuk;
		params[FOURTH_POSITION] = userID_String;

		try {
			// Execute query to place a building
			dC.updateInsertDelete("UPDATE spelerstuk SET x_van= ? , y_van = ? WHERE idstuk =  ? AND idspeler = ?",
					params);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void placeStreet(String idSpelStuk, int xPosFrom, int yPosFrom, int xPosTo, int yPosTo, int userID) {
		String xPosFrom_String = Integer.toString(xPosFrom);
		String yPosFrom_String = Integer.toString(yPosFrom);
		String xPosTo_String = Integer.toString(xPosTo);
		String yPosTo_String = Integer.toString(yPosTo);
		String userID_String = Integer.toString(userID);

		// Array with parameters
		String[] params = new String[SIX_PARAMETER_ARRAY];
		params[FIRST_POSTION] = xPosFrom_String;
		params[SECOND_POSTION] = yPosFrom_String;
		params[THIRTH_POSTION] = xPosTo_String;
		params[FOURTH_POSITION] = yPosTo_String;
		params[FIFTH_POSITION] = idSpelStuk;
		params[SIXTH_POSITION] = userID_String;

		try {
			// Execute query to place a building
			dC.updateInsertDelete(
					"UPDATE spelerstuk SET x_van = ? , y_van = ?, x_naar = ? , y_naar = ? WHERE idstuk =  ? AND idspeler = ?",
					params);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * This method will check which players are in the game and will check if the
	 * crossing is empty that needs to be checked
	 * 
	 * @param xPos
	 * @param yPos
	 * @param gameID
	 * @return
	 */
	public boolean emptyCrossing(int xPos, int yPos, int gameID) {
		// Return boolean
		boolean crossing_Is_Empty;

		// Get the players who are in the game
		String[] players = dMM.playerInGame(Integer.toString(gameID));

		// Array to save the parameters
		String[] params = new String[SIX_PARAMETER_ARRAY];

		// Convert int to String
		try {
			params[FIRST_POSTION] = Integer.toString(xPos);
			params[SECOND_POSTION] = Integer.toString(yPos);
			params[THIRTH_POSTION] = players[FIRST_POSTION];
			params[FOURTH_POSITION] = players[SECOND_POSTION];
			params[FIFTH_POSITION] = players[THIRTH_POSTION];
			params[SIXTH_POSITION] = players[FOURTH_POSITION];
		} catch (Exception e) {
			return false;
		}
		int resultCounter = 0;

		try {
			// Execute query to find out if the crossing is empty
			ResultSet result = dC.select(
					"SELECT * FROM spelerstuk WHERE (x_van = ? AND y_van = ?) AND (idspeler = ? OR idspeler = ? OR idspeler = ? OR idspeler = ?) AND idstuk NOT LIKE'r%'",
					params);
			// Count how many rows there are returned. If the amout is higher than 0 the
			// crossing is not empty
			while (result.next()) {
				resultCounter++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// Set the return boolean to true if the crossing is empty
		if (resultCounter < 1) {
			crossing_Is_Empty = true;
		} else {
			crossing_Is_Empty = false;
		}

		return crossing_Is_Empty;
	}

	public boolean emptyIsEmpty() {

		return false;
	}

	public boolean unplacedBuilding(String pieceid, int playerid) {
		String query = "SELECT COUNT(*) FROM spelerstuk WHERE idspeler = ? AND idstuk = ? AND x_van IS NOT NULL";
		String[] params = { Integer.toString(playerid), pieceid };
		ResultSet result = dC.select(query, params);
		int amount = 0;
		try {
			result.next();
			amount = result.getInt(1);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (amount == 1) {
			return false;
		} else {
			return true;
		}
	}

	public void setupBuildings(String[] fillArray) {
		try {
			dC.updateInsertDelete("INSERT INTO spelerstuk (idStuk, idspeler) VALUES (?, ?)", fillArray);
		} catch (Exception e) {
			System.out.println("Warning: [Building Model] - Add 'Speelstuk' has failed");
		}
	}

	public ResultSet getBuildingsPlayer(String idspeler) {
		String[] speler = { idspeler };
		return dC.select(
				"SELECT x_van, y_van, x_naar, y_naar, stuksoort, volgnr FROM spelerstuk JOIN stuk ON spelerstuk.idstuk = stuk.idstuk JOIN speler ON spelerstuk.idspeler = speler.idspeler WHERE spelerstuk.idspeler = ? AND x_van IS NOT null;",
				speler);
	}

	public String getBuildingType(int x, int y, int idplayer) {
		String buildingType = "";
		String query = "SELECT stuksoort FROM spelerstuk JOIN stuk ON spelerstuk.idstuk = stuk.idstuk WHERE spelerstuk.idspeler = ? AND x_van = ? AND y_van = ?";
		String[] params = { Integer.toString(idplayer), Integer.toString(x), Integer.toString(y) };
		ResultSet result = dC.select(query, params);
		try {
			if (result.next()) {
				buildingType = result.getString(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return buildingType;
	}

	public void removeBuilding(int x, int y, int idplayer) {
		String query = "UPDATE spelerstuk SET x_van = null , y_van = null WHERE x_van = ? AND y_van = ? AND idspeler = ?";
		String[] params = { Integer.toString(x), Integer.toString(y), Integer.toString(idplayer) };
		dC.updateInsertDelete(query, params);
	}

	public int getStreetOwner(int xFrom, int yFrom, int xTo, int yTo, int gameID) {
		// returns 0 if there is no street
		String[] players = dMM.playerInGame(Integer.toString(gameID));
		String query = "SELECT idspeler FROM spelerstuk JOIN stuk ON spelerstuk.idstuk = stuk.idstuk WHERE x_van = ? AND y_van = ? AND x_naar = ? AND y_naar = ? AND idspeler = ?";
		ResultSet result;
		for (int i = 0; i < players.length; i++) {
			String[] params = {Integer.toString(xFrom), Integer.toString(yFrom), Integer.toString(xTo), Integer.toString(yTo), players[i]};
			result = dC.select(query, params);
			try {
				if(result.next()) {
					return result.getInt(1);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}

}

