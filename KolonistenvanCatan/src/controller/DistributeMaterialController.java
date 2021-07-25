package controller;

import java.util.ArrayList;
import java.util.HashMap;

import model.DistributeMateriallModel;

/**
 * The responsibility of this class is to distribute an amount of materials.
 * 
 * @author Jip van Heugten
 *
 */
public class DistributeMaterialController {

	// Variables
	private boolean tradeSuccesfullFinshed;
	private final static int AMOUNT_OF_PLAYERS = 4;

	private final static int FIRST_VALUE = 0;
	private final static int SECOND_VALUE = 1;

	private final static int FIRST_POSITION = 0;
	private final static int SECOND_POSITION = 1;

	private final static int DOUBLE = 2;

	private HashMap<Integer, Integer> x_van;
	private HashMap<Integer, Integer> y_van;



	// Error Message
	private String errorMessage;
	

	// Objects
	DistributeMateriallModel dMM;
	
	// Constructor
	public DistributeMaterialController() {
		// Instantiating objects
		dMM = new DistributeMateriallModel();

		tradeSuccesfullFinshed = false;

		// Logical Code: Search all points around the tile
		x_van = new HashMap<>();
		y_van = new HashMap<>();
	}

	/**
	 * this method is responsible for calling all the methods that are needed for
	 * distributing materials. Eventually the method will give the command to
	 * distribute an amount of materials
	 * 
	 * @param gameID
	 * @param kindOfTile
	 * @param y_as
	 * @param x_as
	 */
	public void distributeMaterialAfterThrownDice(int gameID, char kindOfTile, int y_as, int x_as) {
		ArrayList<String> useableMaterial;

		// Convert int to String
		String gameIDString = Integer.toString(gameID);

		// Get the players who are in the game
		String[] userIDS = dMM.playerInGame(gameIDString);

		// Set logical HashMaps for checking tiles
		this.setHashMaps(x_as, y_as);

		// Get how many materials there need to be distributed for every player
		for (int i = 0; i < AMOUNT_OF_PLAYERS; i++) {
			// Check if there are building around the tile
			ArrayList<String> tileCodes = dMM.checkTileOnBuildings(userIDS[i], y_van, x_van);

			// Check if there is a building
			if (tileCodes.size() > 0) {
				int[] kindOfBuilding = this.kindOfBuildings(tileCodes);

				// Amount of city's and villages around the tile to check
				int amount_Citys = kindOfBuilding[FIRST_POSITION];
				int amount_Vilages = kindOfBuilding[SECOND_POSITION];

				int amount_To_Distribute = amount_Vilages + (amount_Citys * DOUBLE);

				if (amount_To_Distribute > 0) {

					// Distribute Matrials for a x count of times
					for (int counter = 0; counter < amount_To_Distribute; counter++) {
						// Get material code
						String tileCode = Character.toString(kindOfTile);
						if (tileCode.length() < 2) {
							// Lowercase the tileCode
							tileCode = tileCode.toLowerCase();

							// Get a list of the useable materials
							useableMaterial = dMM.findUnusedMaterials(gameIDString, tileCode, true, null);
						} else {
							tradeSuccesfullFinshed = false;
							errorMessage = "ERROR: Alle grondstoffen zijn op van deze soort";
							return;
						}
						try {
							// Convert to int
							int userID = Integer.parseInt(userIDS[i]);

							// Distribute materials
							this.playerToBank_BankToPlayer(gameID, userID, useableMaterial.get(counter), false);
							
							String material = "grondstoffen";

							if (tileCode.equals("g")) {
								material = "graan";
							} else if (tileCode.equals("b")) {
								material = "baksteen";
							} else if (tileCode.equals("e")) {
								material = "erts";
							} else if (tileCode.equals("h")) {
								material = "hout";
							} else if (tileCode.equals("w")) {
								material = "wol";
							}
							
							Log log = new Log(userID, gameID);
							log.defaultLog("distribution", userID + "", material, amount_To_Distribute, null, null);
							
						} catch (Exception e) {
							e.printStackTrace();
							errorMessage = "ERROR: Er is iets mis gegaan bij het uitdelen van de grondstoffen of bij het vinden van het userID";
						}

					}
				}

			}

		}
	}

	/**
	 * this method will activate the model class to write a material cart to the
	 * bank or to a player
	 * 
	 * @param gameID
	 * @param userID
	 * @param idGrondstofkaart
	 */
	public void playerToBank_BankToPlayer(int gameID, int userID, String idGrondstofkaart, boolean takeFrom) {

		// Convert from int to String
		String gameIDString = Integer.toString(gameID);
		String userIDString = Integer.toString(userID);

		// Excute operation and save the boolean that the method will return
		tradeSuccesfullFinshed = dMM.distributeToPlayerOrFromPalyer(gameIDString, userIDString, idGrondstofkaart, takeFrom);

	}

	/**
	 * this method will activate the model class to write a material cart from a
	 * player to another player
	 * 
	 * @param gameID
	 * @param userIDTakeFrom
	 * @param userIDGiveTo
	 * @param idGrondstofkaart
	 */
	public boolean playerToPlayer(int gameID, int userIDTakeFrom, int userIDGiveTo, String idGrondstofkaart) {
		// Return Boolean
		boolean retBoolean;

		// Convert from int to String
		String gameIDString = Integer.toString(gameID);
		String userIdGiveToString = Integer.toString(userIDGiveTo);
		String userIDTakeFromString = Integer.toString(userIDTakeFrom);

		// Excute operation and save the boolean that the method will return
		retBoolean = dMM.distributeFromPlayerToPlayer(gameIDString, userIDTakeFromString, userIdGiveToString,
				idGrondstofkaart);

		return retBoolean;
	}

	/**
	 * If the trade was successful the view can be changed
	 * 
	 * @param tradeSuccesfullFinshed
	 */
	public void changeView(boolean tradeSuccesfullFinshed) {

		if (tradeSuccesfullFinshed) {
			// TODO: Change view
		}

	}

	/**
	 * This method is responsible for setting some default values into a HashMap. In
	 * the document you can find in our Drive you can read the logica behind the
	 * HashMaps. In short: every record is a point to check around the tile
	 * 
	 * @param xPos
	 * @param yPos
	 */
	public void setHashMaps(int xPos, int yPos) {

		// Setting X_van HashMap with logics

		x_van.put(1, xPos);
		x_van.put(2, xPos - 1);
		x_van.put(3, xPos - 1);
		x_van.put(4, xPos);
		x_van.put(5, xPos + 1);
		x_van.put(6, xPos + 1);

		y_van.put(1, yPos - 1);
		y_van.put(2, yPos);
		y_van.put(3, yPos + 1);
		y_van.put(4, yPos + 1);
		y_van.put(5, yPos + 1);
		y_van.put(6, yPos);

	}

	/**
	 * this method will return the amount and kind of building that are placed
	 * around the tile that is just checked
	 * 
	 * @param tileCodes
	 * @return
	 */
	public int[] kindOfBuildings(ArrayList<String> tileCodes) {

		int[] tileKinds = new int[2];
		// Default values
		int amount_Citys = 0;
		int amount_Villages = 0;

		for (int i = 0; i < tileCodes.size(); i++) {
			String checkString;

			checkString = tileCodes.get(i);
			checkString = checkString.toLowerCase();

			// Checks what kind of building it is
			if (checkString.startsWith("c")) {
				amount_Citys = amount_Citys + 1;
			} else if (checkString.startsWith("d")) {
				amount_Villages = amount_Villages + 1;
			}
		}
		// Save the values in the Array
		tileKinds[FIRST_VALUE] = amount_Citys;
		tileKinds[SECOND_VALUE] = amount_Villages;

		return tileKinds;

	}

	/**
	 * This method will find out which materials are available for user
	 * 
	 * @param userID
	 * @param kind
	 * @return
	 */
	public ArrayList<String> getAvailableMaterials(int gameID, int userID, String kind, boolean findUnusedMaterials) {
		// Return Array
		ArrayList<String> results = dMM.findUnusedMaterials(Integer.toString(gameID), kind, findUnusedMaterials , Integer.toString(userID));
		
		return results;
	}

	// This method will get the kind of Tile
	public String[] getKindOfTile(int throwAmount, int gameID) {
		//Return String
		String kind[] = dMM.getkindOfTile(throwAmount, gameID);
		
		return kind;
		
	}
	
	public String[] getPlayerInGame(String gameID) {
		return dMM.playerInGame(gameID);
	}
}
