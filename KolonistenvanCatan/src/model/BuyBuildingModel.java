package model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BuyBuildingModel {

	// Variables
	private int userID;
	private int gameID;

	private String message;

	private static final int FIRST_POSITION = 1;
	private static final int FIRST_CHAR = 0;
	private static final String NOT_ENOUGH_MATERIALS = "Onvoldoende grondstoffen";
	private static final String NOT_ENOUGH_BUILDINGS = "Onvoldoende gebouwen";
	private static final Object VILLAGE = "d";
	private static final Object STREET = "r";
	private static final int ONE_PARAMETER_ARRAY = 1;
	private static final int FIRST_PARAMETER = 0;
	private static final int FIRST_RETURN_VALUE = 1;
	private static final int AMOUNT_OF_BUILDING_BEFORE_ROUND_TWO_R = 2;
	private static final int AMOUNT_OF_BUILDING_BEFORE_ROUND_TWO_D = 2;

	// Objects
	private PassTurnModel pTM;
	private DatabaseCommunicator dC;

	// Constructor
	public BuyBuildingModel(int userID, int gameID) {
		this.dC = DatabaseCommunicator.getInstance();
		this.pTM = new PassTurnModel();

		this.userID = userID;
		this.gameID = gameID;
	}

	// Getter
	public String getMessage() {
		return message;
	}

	/**
	 * This method will check if the player has enough materials and if there are
	 * buildings in stock. If not it will return false. If true it will update the
	 * database and take back the materials
	 * 
	 * @param kind
	 * @param wood
	 * @param brick
	 * @param grain
	 * @param wool
	 * @param ore
	 * @return
	 */
	public boolean buyBuilding(String kind, int wood, int brick, int grain, int wool, int ore,
			boolean automaticBuyCheck) {
		// Check if player has enough materials
		boolean buyBuilding = this.hasEnoughMaterials(wood, brick, grain, wool, ore);
		if (!pTM.inFirstRound(this.gameID)) {
			ResultSet result;

			if (buyBuilding) {
				result = null;
				// Boolean buildings in stock
				boolean inStock = false;

				// Kind of building
				char toCheck = kind.charAt(FIRST_CHAR);

				// Parameter Array
				String[] params2 = { Integer.toString(userID) };

				// Buildings in stock
				try {
					// Select pieces
					result = dC.select(
							"SELECT * FROM spelerstuk WHERE x_van IS NULL AND y_van IS NULL AND idspeler = ? AND idstuk LIKE '"
									+ toCheck + "%'",
							params2);

					if (result != null) {
						while (result.next()) {
							inStock = true;
						}
					}

				} catch (Exception e) {
					System.out.println("Warning: [BuyBuilding Model] - Check buildings has failed");
					e.printStackTrace();
				}

				// Buy Buildings
				if (inStock && !automaticBuyCheck) {
					// Take materials from player
					this.takeMaterials(wood, brick, grain, wool, ore);

				} else {
					this.message = NOT_ENOUGH_BUILDINGS;
				}
			}

		} else {
			// Check if building is Village or Road
			if (kind.equals(VILLAGE) || kind.equals(STREET)) {
				ResultSet result;
				int resultInt = 0;

				String[] params = { Integer.toString(userID) };

				try {
					result = dC.select(
							"SELECT COUNT(idstuk) FROM spelerstuk WHERE idspeler = ? AND idstuk LIKE '" + kind + "%'",
							params);

					while (result.next()) {
						resultInt = Integer.parseInt(result.getString(FIRST_POSITION));
					}
				} catch (Exception e) {
					System.out.println("Warning: [BuyBuilding Model] - Buy building for free :P has failed");
					e.printStackTrace();
				}

				// Check if it is the first or second part of first round
				if (this.checkBuildings(kind)) {
					buyBuilding = true;
				} else {
					buyBuilding = false;
				}

			} else {
				buyBuilding = false;
			}
		}

		return buyBuilding;
	}

	public boolean checkBuildings(String buildingType) {
		// Boolean
		boolean returnValue = false;
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
		// check if the placement is allowed
		if (buildingType.equals(VILLAGE) && village_count < AMOUNT_OF_BUILDING_BEFORE_ROUND_TWO_D) {
			if (village_count == 0 || (village_count == road_count && allPlayersHaveBuilt())) {
				returnValue = true;
			}
		} else if (buildingType.equals(STREET) && road_count < AMOUNT_OF_BUILDING_BEFORE_ROUND_TWO_R) {
			if((road_count == 0 && village_count == 1) || (road_count < village_count && allPlayersHaveBuilt())) {
				returnValue = true;
			}
		} else {
			returnValue = false;
		}
		return returnValue;
	}

	private boolean allPlayersHaveBuilt() {
		int[] users = pTM.getuserIDS(gameID);
		String query = "SELECT COUNT(*) FROM spelerstuk WHERE x_van IS NOT NULL AND y_van IS NOT NULL AND idspeler = ?";
		String[] params = new String[1];
		ResultSet result;
		for (int i = 0; i < users.length; i++) {
			params[0] = Integer.toString(users[i]);
			result = dC.select(query, params);
			try {
				result.next();
				if (result.getInt(1) < 2) {
					return false;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return true;
	}

	/**
	 * This method will check if a player has enough materials to buy an object
	 * 
	 * @param wood
	 * @param brick
	 * @param grain
	 * @param wool
	 * @param ore
	 * @return
	 */
	public boolean hasEnoughMaterials(int wood, int brick, int grain, int wool, int ore) {
		boolean buyBuilding = true;

		// Array of materials
		int[] materials = { wood, brick, grain, wool, ore };
		String[] materialCodes = { "h", "b", "g", "w", "e" };

		ResultSet result;

		// Parameter Array
		String[] params1 = { Integer.toString(userID), Integer.toString(gameID) };

		for (int i = 0; i < materials.length; i++) {
			String toCheck = materialCodes[i];
			try {

				// Get amount of materials
				result = dC.select(
						"SELECT COUNT(idgrondstofkaart) FROM spelergrondstofkaart WHERE idspeler = ? AND idspel = ? AND idgrondstofkaart LIKE '"
								+ toCheck + "%'",
						params1);

				if (result != null) {
					while (result.next()) {
						int amountInStock = Integer.parseInt(result.getString(FIRST_POSITION));

						if (amountInStock < materials[i]) {
							buyBuilding = false;
							this.message = NOT_ENOUGH_MATERIALS;
						}
					}
				} else {
					buyBuilding = false;
					this.message = NOT_ENOUGH_MATERIALS;
				}

			} catch (Exception e) {
				System.out.println("Warning: [BuyBuilding Model] - Check materials has failed");
				e.printStackTrace();
			}
		}
		return buyBuilding;
	}

	/**
	 * This method will take materials from players if they want to build an object
	 * 
	 * @param wood
	 * @param brick
	 * @param grain
	 * @param wool
	 * @param ore
	 */
	public void takeMaterials(int wood, int brick, int grain, int wool, int ore) {
		// Array of materials
		int[] materials = { wood, brick, grain, wool, ore };
		String[] materialCodes = { "h", "b", "g", "w", "e" };

		// Parameter Array
		String[] params1 = { Integer.toString(userID), Integer.toString(gameID) };

		ResultSet result;

		for (int i = 0; i < materials.length; i++) {
			String toUpdate = materialCodes[i];
			String toTake = "";
			for (int amountToSpread = 0; amountToSpread < materials[i]; amountToSpread++) {

				try {
					result = null;
					// Get materials
					result = dC.select(
							"SELECT idgrondstofkaart FROM spelergrondstofkaart WHERE idspeler = ? AND idspel = ? AND idgrondstofkaart LIKE '"
									+ toUpdate + "%'",
							params1);

					while (result.next()) {
						toTake = result.getString(FIRST_POSITION);
					}

					// Update
					dC.updateInsertDelete(
							"UPDATE spelergrondstofkaart SET idspeler = NULL WHERE idspeler = ? AND idspel = ? AND idgrondstofkaart = '"
									+ toTake + "'",
							params1);

				} catch (Exception e) {
					System.out.println("Warning: [BuyBuilding Model] - Buy building has failed");
					e.printStackTrace();
				}
			}
		}
	}

	public void returnMaterials(String[] materialCodes, int[] materials) {
		String[] params1 = { Integer.toString(gameID) };
		String[] params2 = { Integer.toString(userID), Integer.toString(gameID) };

		for (int i = 0; i < materialCodes.length; i++) {
			for (int amountOfMaterials = 0; amountOfMaterials < materials[i]; amountOfMaterials++) {

				ResultSet result;

				String toUpdate = materialCodes[i];
				String toTake = "";
				for (int amountToSpread = 0; amountToSpread < materials[i]; amountToSpread++) {

					try {
						result = null;
						// Get materials
						result = dC.select(
								"SELECT idgrondstofkaart FROM spelergrondstofkaart WHERE idspeler IS NULL AND idspel = ? AND idgrondstofkaart LIKE '"
										+ toUpdate + "%'",
								params1);

						while (result.next()) {
							toTake = result.getString(FIRST_POSITION);
						}

						// Update
						dC.updateInsertDelete(
								"UPDATE spelergrondstofkaart SET idspeler = ? WHERE idspeler IS NULL AND idspel = ? AND idgrondstofkaart = '"
										+ toTake + "'",
								params2);

					} catch (Exception e) {
						System.out.println("Warning: [BuyBuilding Model] - Buy building has failed");
						e.printStackTrace();
					}
				}

			}
		}
	}

}
