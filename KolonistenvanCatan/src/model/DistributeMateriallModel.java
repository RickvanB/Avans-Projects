package model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * This class is responsible for distributing the material carts
 * 
 * @author Jip van Heugten
 *
 */
public class DistributeMateriallModel {

	// Variables
	private final static int THREE_PARAMETER_ARRAYSIZE = 3;
	private final static int ONE_PARAMETER_ARRAYSIZE = 1;
	private final static int FIRST_PARAMETER_POSITION = 0;
	private final static int SECOND_PARAMETER_POSITION = 1;
	private final static int THIRTH_PARAMETER_POSITION = 2;
	private final static int FIRST_RETURN_VALUE = 1;

	private final static int PLAYERS_ARRAY_LENGHT = 4;
	private final static int RETURN_VALUE_PLAYERID = 1;
	private final static int AMOUNT_OF_VALUES = 13;
	private static final int FOURTH_PARAMETER_POSITION = 3;
	private static final int FOUR_PARAMETER_ARRAYSIZE = 4;
	private static final int TWO_PARAMETER_ARRAYSIZE = 2;
	private static final int SECOND_RETURN_VALUE = 2;
	private static final int THIRTH_RETURN_VALUE = 3;

	// Error Message
	private String errorMessage;

	// Objects
	private DatabaseCommunicator dC;

	// Constructor
	public DistributeMateriallModel() {
		// Instantiate object
		dC = DatabaseCommunicator.getInstance();
	}

	// Methods
	/**
	 * This method will add materials to a player or take them from a player
	 * 
	 * userID has to be "0" if you want to return a material back to the bank
	 */
	public boolean distributeToPlayerOrFromPalyer(String gameID, String userID, String idGrondstofkaart, boolean takeFrom) {
		boolean distributionSuccesfull = false;

		// Parameter Array
		


		try {
			// Execute query to update the spelerID in the database
			if(takeFrom) {
				String[] params = new String[TWO_PARAMETER_ARRAYSIZE];
				params[FIRST_PARAMETER_POSITION] = idGrondstofkaart;
				params[SECOND_PARAMETER_POSITION] = gameID;
				dC.updateInsertDelete(
						"UPDATE spelergrondstofkaart SET idspeler = null WHERE idgrondstofkaart = ? AND idspel = ?", params);
			} else {
				String[] params = new String[THREE_PARAMETER_ARRAYSIZE];
				params[FIRST_PARAMETER_POSITION] = userID;
				params[SECOND_PARAMETER_POSITION] = idGrondstofkaart;
				params[THIRTH_PARAMETER_POSITION] = gameID;
				
				dC.updateInsertDelete(
						"UPDATE spelergrondstofkaart SET idspeler = ? WHERE idgrondstofkaart = ? AND idspel = ?", params);
			}

			distributionSuccesfull = true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Warning: [Distriubution Model] - The distribution of materials has failed");
			errorMessage = "ERROR: Het daadwerkelijk uitdelen van grondstoffen is mislukt";
		}

		return distributionSuccesfull;
	}

	/**
	 * This method will give a material from a player to another player
	 * 
	 * @param gameID
	 * @param userIDTakeFrom
	 * @param userIDGiveTo
	 * @param idGrondstofkaart
	 * @return
	 */
	public boolean distributeFromPlayerToPlayer(String gameID, String userIDTakeFrom, String userIDGiveTo,
			String idGrondstofkaart) {
		boolean distributionSuccesfull = false;

		// Add parameters to array
		String[] params = new String[FOUR_PARAMETER_ARRAYSIZE];
		params[FIRST_PARAMETER_POSITION] = userIDGiveTo;
		params[SECOND_PARAMETER_POSITION] = userIDTakeFrom;
		params[THIRTH_PARAMETER_POSITION] = gameID;
		params[FOURTH_PARAMETER_POSITION] = idGrondstofkaart;

		// Execute Query
		try {
			dC.updateInsertDelete("UPDATE spelergrondstofkaart SET idspeler = ?  WHERE idspeler = ? AND idspel = ? AND idgrondstofkaart = ?",
					params);
			distributionSuccesfull = true;
		} catch (Exception e) {
			e.printStackTrace();
			errorMessage = "ERROR: Alle grondstoffen zijn op van deze soort";
		}

		return distributionSuccesfull;
	}

	/**
	 * This method will return a String[] with playerID's
	 * 
	 * @param gameID
	 * @return
	 */
	public String[] playerInGame(String gameID) {
		String[] players = new String[PLAYERS_ARRAY_LENGHT];

		ResultSet result;

		// Add parameters to the array
		String[] params = new String[ONE_PARAMETER_ARRAYSIZE];
		params[FIRST_PARAMETER_POSITION] = gameID;

		try {
			result = dC.select("SELECT idspeler FROM speler WHERE idspel = ?", params);

			// Save results
			int counter = 0;
			while (result.next()) {
				players[counter] = result.getString(RETURN_VALUE_PLAYERID);
				counter++;
			}
		} catch (Exception e) {
			e.printStackTrace();
			errorMessage = "ERROR: Het is op dit moment niet mogelijk om de spelers uit dit spel op te halen";
		}

		return players;
	}

	/**
	 * This method will return a arraylist from Strings with material carts whick
	 * are owned by the bank
	 * 
	 * @param gameID
	 * @return
	 */
	public ArrayList<String> findUnusedMaterials(String gameID, String kindOfMaterial, boolean findUnusedMaterials, String userID) {
		ArrayList<String> unusedMaterials = new ArrayList<>();

		ResultSet result;

		// Add parameters to Array
		String[] params = new String[ONE_PARAMETER_ARRAYSIZE];
		params[FIRST_PARAMETER_POSITION] = gameID;
		kindOfMaterial = "'" + kindOfMaterial + "%'";

		try {
			if (findUnusedMaterials) {
				result = dC.select(
						"SELECT idgrondstofkaart FROM spelergrondstofkaart WHERE idspel = ? AND idgrondstofkaart LIKE"
								+ kindOfMaterial + "AND idspeler IS NULL",
						params);
			} else {
				result = dC.select(
						"SELECT idgrondstofkaart FROM spelergrondstofkaart WHERE idspel = ? AND idgrondstofkaart LIKE"
								+ kindOfMaterial + "AND idspeler =" + userID,
						params);
			}

			while (result.next()) {
				unusedMaterials.add(result.getString(FIRST_RETURN_VALUE));
			}

		} catch (Exception e) {
			e.printStackTrace();
			errorMessage = "ERROR: Het ophalen van nog ongebruikte grondstoffen is niet gelukt";
		}

		return unusedMaterials;

	}

	/**
	 * This method will check if there are buildings around the tile from a
	 * specified player. And will return the codes from the building
	 * 
	 * @param userID
	 * @param y_van
	 * @param x_van
	 * @return
	 */
	public ArrayList<String> checkTileOnBuildings(String userID, HashMap<Integer, Integer> y_van,
			HashMap<Integer, Integer> x_van) {

		// Return Array
		ArrayList<String> tileCodes = new ArrayList<>();

		ResultSet result;

		// Save Array Values. First the X_van and than an Y_van
		String[] params = new String[AMOUNT_OF_VALUES];

		// Set userID in parameter Array
		params[FIRST_PARAMETER_POSITION] = userID;

		int size = 13;
		int counter = 1;
		for (int i = 1; i < size; i = i + 2) {
			String resultString = Integer.toString(x_van.get(counter));
			params[i] = resultString;
			resultString = null;
			resultString = Integer.toString(y_van.get(counter));
			params[i + 1] = resultString;

			counter++;
		}

		try {
			// Execute Query
			result = dC.select(
					"SELECT sp.idstuk FROM spelerstuk sp WHERE (sp.idspeler = ? AND x_naar IS NULL AND y_naar IS NULL) AND ((x_van = ? AND y_van = ?) OR  (x_van = ? AND y_van = ?) OR  (x_van = ? AND y_van = ?) OR  (x_van = ? AND y_van = ?) OR (x_van = ? AND y_van = ?) OR  (x_van = ? AND y_van = ?))",
					params);

			// Save result
			while (result.next()) {
				tileCodes.add(result.getString(FIRST_RETURN_VALUE));
			}

		} catch (Exception e) {
			e.printStackTrace();
			errorMessage = "ERROR: Het controleren op gebouwen om en nabij de tegel is niet gelukt";
		}
		return tileCodes;
	}

	public String[] getkindOfTile(int numberId, int gameID) {
		// Return String
		String[] kind = new String[THREE_PARAMETER_ARRAYSIZE];
		
		ResultSet result;
		
		// Parameters
		String[] params = {Integer.toString(gameID), Integer.toString(numberId)}; 
		
		try {
			result = dC.select("SELECT x, y , idgrondstofsoort FROM tegel WHERE idspel = ? AND idgetalfiche = ?" , params);
			
			while(result.next()) {
				kind[FIRST_PARAMETER_POSITION] = result.getString(FIRST_RETURN_VALUE);
				kind[SECOND_PARAMETER_POSITION] =  result.getString(SECOND_RETURN_VALUE);
				kind[THIRTH_PARAMETER_POSITION] =  result.getString(THIRTH_RETURN_VALUE);
				
			}
		} catch (Exception e) {
			System.out.println("Warning: [Distribution Model] - Get kind has failed");
			e.printStackTrace();
		}
		
		
		return kind;
	}
	
	public void monopoly(String type, int userID, int gameID) {
		String material = null;
		
		switch(type) {
		case "erts" : material = "'e%'";
		break;
		case "wol" : material = "'w%'";
		break;
		case "baksteen" : material = "'b%'";
		break;
		case "graan" : material = "'g%'";
		break;
		case "hout" : material = "'h%'";
		break;
		}
		
		String query = "UPDATE spelergrondstofkaart SET idspeler = ? WHERE idgrondstofkaart LIKE " + material + " AND idspel = ? AND idspeler IS NOT NULL";
		String[] params = new String[TWO_PARAMETER_ARRAYSIZE];
		params[FIRST_PARAMETER_POSITION] = userID + "";
		params[SECOND_PARAMETER_POSITION] = gameID + "";
		
		try {
			dC.updateInsertDelete(query, params);
			
		} catch (Exception e) {
			e.printStackTrace();
			errorMessage = "ERROR: Monopolization failed";
			System.out.println(errorMessage);
		}
		
	}

}
