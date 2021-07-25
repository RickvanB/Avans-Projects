package model;

import java.sql.ResultSet;

public class VictoryPointsModel {

	// Variables
	private final static int FIRST_RETURN_VALUE = 1;
	private final static int SECOND_RETURN_VALUE = 2;
	private static final int VICOTORY_POINT = 1;

	// Objects
	private DatabaseCommunicator dC;

	// Constructor
	public VictoryPointsModel() {
	this.dC = DatabaseCommunicator.getInstance();
	}

	/**
	 * This method will find out how many buildings a player has
	 * @param userID
	 * @param firstChar
	 * @return
	 */
	public int getAmountOfBuildings(int userID, String firstChar) {
		// Return Integer
		int amountOfBuildings = 0;

		// ResultSet
		ResultSet result;

		// Parameters Array
		String[] params = {Integer.toString(userID)};

		try {
			result = dC.select("SELECT COUNT(idstuk) FROM spelerStuk WHERE idspeler = ? AND idstuk LIKE '" + firstChar + "%' AND x_van IS NOT NULL;", params);
			
			while(result.next()) {
				amountOfBuildings = Integer.parseInt(result.getString(FIRST_RETURN_VALUE));
			}
			
		} catch (Exception e) {
			System.out.println("Warning [VictoryPointsModel] - Getting the amount of buildings has failed");
			e.printStackTrace();
		}

		return amountOfBuildings;
	}
	
	/**
	 * This method will return the amount of buildingcarts a player has
	 * @param userID
	 * @return
	 */
	public int getAmountOfBuildingCarts(int userID) {
		// Return Integer
		int amountOfBuildingCarts = 0;

		// ResultSet
		ResultSet result;

		// Parameters Array
		String[] params = {Integer.toString(userID)};

		try {
			result = dC.select("SELECT COUNT(idontwikkelingskaart) FROM spelerontwikkelingskaart WHERE idspeler = ? AND idontwikkelingskaart LIKE '%g'", params);
			while(result.next()) {
				amountOfBuildingCarts = Integer.parseInt(result.getString(FIRST_RETURN_VALUE));
			}
			
		} catch (Exception e) {
			System.out.println("Warning [VictoryPointsModel] - Getting the amount of buildingcarts has failed");
			e.printStackTrace();
		}

		return amountOfBuildingCarts;
	}

	public int getL_K(int userID, int gameID) {
		// Return int
		int amountOfPoints = 0;
		
		ResultSet result;
		
		int userID_L = 0;
		int userID_K = 0;
		
		// Parameters
		String[] params = {Integer.toString(gameID)};
		
		try {
			result = dC.select("SELECT grootste_rm_idspeler, langste_hr_idspeler FROM spel WHERE idspel = ?", params);
			
			while(result.next()) {
				if(result.getString(SECOND_RETURN_VALUE) != null) {
					userID_L = Integer.parseInt(result.getString(SECOND_RETURN_VALUE));

				}
				if(result.getString(FIRST_RETURN_VALUE) != null) {
					userID_K = Integer.parseInt(result.getString(FIRST_RETURN_VALUE));
				}

			}
		} catch (Exception e) {
			System.out.println("Warning: [VictoryPoint Model] - Getting the L & K has failed");
			e.printStackTrace();
		}
		

		if(userID_L ==  userID) {
			amountOfPoints = amountOfPoints + VICOTORY_POINT;
		}
		if(userID_K ==  userID) {
			amountOfPoints = amountOfPoints + VICOTORY_POINT;
		}

		
		return amountOfPoints;
	}

	/**
	 * This method will stop the game
	 * @param gameID
	 */
	public void playerHasWon(int gameID) {
		
		// Parameters
		String[] params = {Integer.toString(gameID)};		
		
		try {
			dC.updateInsertDelete("UPDATE speler SET speelstatus = 'uitgespeeld' WHERE idspel = ?", params);
		} catch (Exception e) {
			System.out.println("Warning: [VictoryPoints Model] - Closing game has failed");
			e.printStackTrace();
		}
	}

}
