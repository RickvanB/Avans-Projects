package controller;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import model.DistributeMateriallModel;
import model.TradeModel;

/*
 * This class will manage the trade between two players or between a player and the tradeport
 */
public class TradeController {

	// Variabels
	private final static int KIND_RETURN_POSITION = 1;
	private final static int AMOUNT_RETURN_POSITION = 2;

	private int gameID;
	private int userID;

	// Materials
	private final static String BRICK = "Baksteen";
	private final static String WOOD = "Hout";
	private final static String ORE = "Erts";
	private final static String WOOL = "Wol";
	private final static String GRAIN = "Graan";
	private static final int AMOUNT_OF_MATERIALS = 5;
	private static final int AMOUNT_OF_PLAYERS = 4;
	private static final Object BANK = "bank";
	private static final Object HARBOR_NORMAL = "harbor_normal";
	private static final Object HARBOR_SPECIAL = "harbor_special";
	private static final int CHECKBANK = 0;
	private static final boolean FIND_PLAYER = false;
	private static final boolean FIND_BANK = true;

	// Objects
	private DistributeMaterialController dMC;
	private Player playerModel;
	private TradeModel tm;
	private DistributeMateriallModel dMM;
	private Bank bankModel;

	// Constructor
	public TradeController(int gameID, int userID) {
		this.dMC = new DistributeMaterialController();
		this.playerModel = new Player(gameID, userID);
		this.tm = new TradeModel();
		this.bankModel = new Bank(gameID);
		this.dMM = new DistributeMateriallModel();

		this.userID = userID;
		this.gameID = gameID;
	}

	// Methods
	/**
	 * This method will execute the trade between two players
	 * 
	 * @param amountOf_Brick
	 * @param amountOf_Wood
	 * @param amountOf_Grain
	 * @param amountOf_Ore
	 * @param amountOf_Wool
	 * @return tradeSuccesfull
	 */

	public boolean tradeMaterialsPlayer_to_Player(int userIDReceiver, int userIDTrader, int amountOf_Brick,
			int amountOf_Wood, int amountOf_Grain, int amountOf_Ore, int amountOf_Wool) {

		// Return boolean
		boolean tradeSuccesfull = false;

		// Check if player has enough materials
		boolean everythingInStock = this.checkMaterials(userIDTrader, amountOf_Brick, amountOf_Wood, amountOf_Grain,
				amountOf_Ore, amountOf_Wool);

		// If everything is in stock the trade goes on
		if (everythingInStock) {

			// Array with materials
			final String[] materialCodes = { "b", "e", "g", "h", "w" };
			final int[] materialcounts = { amountOf_Brick, amountOf_Ore, amountOf_Grain, amountOf_Wood, amountOf_Wool };

			for (int i = 0; i < AMOUNT_OF_MATERIALS; i++) {

				// Get materials
				ArrayList<String> result = dMC.getAvailableMaterials(gameID, userIDTrader, materialCodes[i],
						FIND_PLAYER);

				// Distribute materials

				if (materialcounts[i] > 0) {
					for (int count = 0; count < materialcounts[i]; count++) {
						dMC.playerToPlayer(gameID, userIDTrader, userIDReceiver, result.get(count));

					}
				}

				tradeSuccesfull = true;
			}

		} else {
			return tradeSuccesfull;
		}

		return tradeSuccesfull;
	}

	/**
	 * This method will check if an player has enhough materials to trade
	 * 
	 * @return
	 */
	private boolean checkMaterials(int userID, int amountOf_Brick, int amountOf_Wood, int amountOf_Grain,
			int amountOf_Ore, int amountOf_Wool) {
		// Return boolean
		boolean playerHasEnoughMaterials = false;
		int amountOfMaterials = 0;
		int totalAmountOfMaterials = amountOf_Brick + amountOf_Wood + amountOf_Grain + amountOf_Ore + amountOf_Wool;

		ResultSet result;
		// Execute Query
		if (userID != CHECKBANK) {
			result = playerModel.getRawMaterials(userID);
		} else {
			result = bankModel.getRawMaterials();
		}

		HashMap<String, Integer> materials = new HashMap<>();
		try {
			while (result.next()) {

				// Save results
				int amount = Integer.parseInt(result.getString(AMOUNT_RETURN_POSITION));
				materials.put(result.getString(KIND_RETURN_POSITION), amount);

			}
		} catch (Exception e) {
			System.out.println("Warning: [Trade Controller] - Fill HashMap has failed " + userID);
			e.printStackTrace();
		}

		// Check if there are enough materials
		if (amountOf_Brick > 0) {
			try {
				// Get amount
				int amount = materials.get(BRICK);

				if (amount >= amountOf_Brick) {
					amountOfMaterials += amountOf_Brick;
				}
				
			} catch (Exception e) {
				System.out.println("Warning: [Trade Controller] - Trade has been stopped " + userID);
				return playerHasEnoughMaterials;

			}
		}
		if (amountOf_Wood > 0) {
			try {
				// Get amount
				int amount = materials.get(WOOD);

				if (amount >= amountOf_Wood) {
					amountOfMaterials += amountOf_Wood;
				}
				
			} catch (Exception e) {
				System.out.println("Warning: [Trade Controller] - Trade has been stopped " + userID);
				return playerHasEnoughMaterials;
			}
		}
		if (amountOf_Wool > 0) {
			try {
				// Get amount
				int amount = materials.get(WOOL);

				if (amount >= amountOf_Wool) {
					amountOfMaterials += amountOf_Wool;
				}

			} catch (Exception e) {
				System.out.println("Warning: [Trade Controller] - Trade has been stopped " + userID);
				return playerHasEnoughMaterials;
			}
		}
		if (amountOf_Ore > 0) {
			try {
				// Get amount
				int amount = materials.get(ORE);

				if (amount >= amountOf_Ore) {
					amountOfMaterials += amountOf_Ore;
				}
				
			} catch (Exception e) {
				System.out.println("Warning: [Trade Controller] - Trade has been stopped " + userID);
				return playerHasEnoughMaterials;
			}
		}
		if (amountOf_Grain > 0) {
			try {
				// Get amount
				int amount = materials.get(GRAIN);

				if (amount >= amountOf_Grain) {
					amountOfMaterials += amountOf_Grain;
				}

			} catch (Exception e) {
				System.out.println("Warning: [Trade Controller] - Trade has been stopped " + userID);
				return playerHasEnoughMaterials;
			}
		}
		
		// Check if every material is in stock of the player
		if (amountOfMaterials == totalAmountOfMaterials) {
			playerHasEnoughMaterials = true;
		}

		return playerHasEnoughMaterials;
	}

	/**
	 * This method will create a trade request
	 * 
	 * In the HashMap the key will be the material name WARNING: IF AN AMOUNT OF
	 * MATERIALS IS NULL YOU NEED TO SET IT ON "0"!!
	 * 
	 * @param userIDTrader
	 * @param give
	 * @param wanted
	 * @return
	 */
	public HashMap<Integer, String> makeOrGetTradeRequest(int userIDTrader, boolean tradeAlreadyMade,
			HashMap<String, Integer> give, HashMap<String, Integer> wanted) {
		// Return Boolean
		HashMap<Integer, String> requestAnswers = new HashMap<>();

		// Model to get players in game
		String[] userIDS = dMM.playerInGame(Integer.toString(this.gameID));

		// Check if the trade is already in the database
		if (!tradeAlreadyMade) {
			tm.insertTradeRequest(userIDTrader, give, wanted, false);
		} else {
			requestAnswers = tm.isTradeAccepted(userIDS, give, wanted);
			tm.insertTradeRequest(userIDTrader, give, wanted, true);
		}

		return requestAnswers;
	}

	/**
	 * This method will return the results of the trade request
	 * 
	 * Return value [0 - 9] Player 1 Return value [10-19] Player 2 Return value [20-
	 * 29] Player 3
	 * 
	 * @param userID
	 * @return String[]
	 */
	public String[] getCounterbids(int userID, int gameID) {
		// Return String
		String[] retString = new String[30];

		// Get players in Game
		String[] playerIDS = dMM.playerInGame(Integer.toString(gameID));

		int array_counter = 0;

		// Get result for all of the players
		for (int i = 0; i < AMOUNT_OF_PLAYERS; i++) {
			// Check if the player to check is not the player who wants to trade

			if (!(playerIDS[i].equals(Integer.toString(userID)))) {
				String[] materialResult = tm.getTradeRequests(userID);

				// Insert results in return array
				for (int j = 0; j < materialResult.length; j++) {
					retString[array_counter] = materialResult[j];
					array_counter++;
				}
			}

		}

		return retString;

	}

	/**
	 * This method will clear the database
	 * 
	 * @param userID2
	 */
	public void clearDatabase(int userID) {
		String[] userIDS = dMM.playerInGame(Integer.toString(userID));

		tm.clearDatabase(userIDS);

	}

	/**
	 * This method will activate a trade proces with the bank
	 * 
	 * @param give
	 * @param wanted
	 */
	public boolean tradeWithBank(HashMap<String, Integer> give, HashMap<String, Integer> wanted, String kind,
			String materialsSpecialHarbor) {
		// Return boolean
		boolean validInput = false;
		boolean tradeSuccesfull = false;

		// Check trade request
		int amountWantend = 0;
		int amountGiving = 0;

		// Check if materials is from one kind
		int amountOfKind_G = 0;
		int amountOfKind_W = 0;

		// Check kind of materials
		String kindOfMaterials_G = null;

		final String[] materials = { "baksteen", "hout", "graan", "erts", "wol" };

		// Get give amount
		for (int i = 0; i < give.size(); i++) {
			for(int j = 0; j < materials.length; j++) {
				if (give.containsKey(materials[j]) && give.get(materials[j]) > 0) {
					amountGiving = amountGiving + give.get(materials[j]);
	
					amountOfKind_G++;
					kindOfMaterials_G = materials[j];
				}
			}
		}

		// Get wanted amount
		for (int i = 0; i < wanted.size(); i++) {
			for(int j = 0; j < materials.length; j++) {
				if (wanted.containsKey(materials[j]) && wanted.get(materials[j]) > 0) {
					amountWantend = amountWantend + wanted.get(materials[j]);
	
					amountOfKind_W++;
	
				}
			}
		}

		// Check if trade is valid by checking if there's only one kind asked and if the
		// scale is correct
		if (amountOfKind_G == 1 && amountOfKind_W == 1) {
			if (kind.equals(BANK)) {
				// 4 : 1
				if (amountGiving == 4 && amountWantend == 1) {

					validInput = true;
				}

			} else if (kind.equals(HARBOR_NORMAL)) {
				// 3 : 1
				if (amountGiving == 3 && amountWantend == 1) {
					validInput = true;
				}

			} else if (kind.equals(HARBOR_SPECIAL)) {
				// 2 : 1
				if (amountGiving == 2 && amountWantend == 1) {
					validInput = true;
				}
			}
		}
		
		// Check if user input is valid
		if (validInput) {
			// Check if bank and player both got enough materials { "brick", "wood", "ore",
			// "grain", "wool" }
			boolean materialsInStock_B = this.checkMaterials(userID, wanted.containsKey(materials[0]) ? wanted.get(materials[0]):0,
					wanted.containsKey(materials[1]) ? wanted.get(materials[1]):0, wanted.containsKey(materials[3]) ? wanted.get(materials[3]):0, wanted.containsKey(materials[2]) ? wanted.get(materials[2]):0,
					wanted.containsKey(materials[4]) ? wanted.get(materials[4]):0);
			boolean materialsInStock_P = this.checkMaterials(CHECKBANK, give.containsKey(materials[0]) ? give.get(materials[0]):0, give.containsKey(materials[1]) ? give.get(materials[1]):0,
					give.containsKey(materials[3]) ? give.get(materials[3]):0, give.containsKey(materials[2]) ? give.get(materials[2]):0, give.containsKey(materials[4]) ? give.get(materials[4]):0);
			
			// Check if both are true
			if (materialsInStock_B && materialsInStock_P) {
				tradeSuccesfull = true;
			}

			// Check if trade has concent if true --> Trade else Return
			if (tradeSuccesfull) {
				// Array with materials
				final String[] materialCodes = { "b", "h", "e", "g", "w" };

				// Array's with amount of materials to check what needs to be distributed
				final int[] materialsWanted = { wanted.containsKey(materials[0]) ? wanted.get(materials[0]):0,
						wanted.containsKey(materials[1]) ? wanted.get(materials[1]):0, wanted.containsKey(materials[3]) ? wanted.get(materials[3]):0, wanted.containsKey(materials[2]) ? wanted.get(materials[2]):0,
								wanted.containsKey(materials[4]) ? wanted.get(materials[4]):0 };
				final int[] materialsGiving = { give.containsKey(materials[0]) ? give.get(materials[0]):0, give.containsKey(materials[1]) ? give.get(materials[1]):0,
						give.containsKey(materials[3]) ? give.get(materials[3]):0, give.containsKey(materials[2]) ? give.get(materials[2]):0, give.containsKey(materials[4]) ? give.get(materials[4]):0 };

				// Trade materials from bank to user
				for (int i = 0; i < AMOUNT_OF_MATERIALS; i++) {
					// Get materials from player and bank
					ArrayList<String> result_Player = dMC.getAvailableMaterials(gameID, userID, materialCodes[i],
							FIND_PLAYER);
					ArrayList<String> result_Bank = dMC.getAvailableMaterials(gameID, userID, materialCodes[i],
							FIND_BANK);

					// Trade from bank to player
					if (materialsWanted[i] > 0) {
						for (int a = 0; a < materialsWanted[i]; a++) {
							// Trade materials from bank to player
							this.dMM.distributeToPlayerOrFromPalyer(Integer.toString(gameID), Integer.toString(userID),
									result_Bank.get(a), false);
						}

					}
					if (materialsGiving[i] > 0) {
						for (int a = 0; a < materialsGiving[i]; a++) {
							// Trade materials from player to bank
							this.dMM.distributeToPlayerOrFromPalyer(Integer.toString(gameID), Integer.toString(userID),
									result_Player.get(a), true);
						}
					}

				}

			}

		}
		return tradeSuccesfull;

	}

}
