package controller;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

import model.BanditModel;
import model.Chat;
import model.GameRefreshModel;
import model.Player;
import view.BanditMenu;

/**
 * This class is responsible for the logica behind the 'Struikrover'
 * 
 * @author Jip van Heugten
 *
 */
public class Bandit {

	// Variables
	private int gameID;
	private int userID;

	private final static int AMOUNT_RETURN_POSITION = 2;
	private final static int MAXIMUM_AMOUNT_OF_MATERIALS = 7;
	private static final int AMOUNT_OF_PLAYERS = 4;
	private static final int NULL_MATERIALS = 0;

	private static final int NULL_BUILDINGS = 0;

	private final static String X_POS = "x";
	private final static String Y_POS = "y";

	private HashMap<Integer, Integer> x_van;
	private HashMap<Integer, Integer> y_van;

	// Objects
	private BanditModel bm;
	private Player player;
	private DistributeMaterialController dMC;
	private Log logController;
	private Chat modelClass;
	private GameRefreshModel rm;
	private BanditMenu bMenu;

	// Constructor
	public Bandit(int gameID, int userID) {
		// Instatiating objects
		this.bm = new BanditModel(gameID);
		this.player = new Player();
		this.dMC = new DistributeMaterialController();
		this.logController = new Log(userID, gameID);
		this.modelClass = new Chat();
		this.rm = new GameRefreshModel();
		this.gameID = gameID;
		this.userID = userID;
		
		this.x_van = new HashMap<>();
		this.y_van = new HashMap<>();
	}

	// Methods

	/**
	 * This method will replace the bandit on the gameBoard or place it if it hasn't
	 * been set yet
	 * 
	 * @return
	 */
	public boolean replaceBandit(int x, int y) {
		// Return boolean
		boolean placementSuccesfull = false;
		int tileID = bm.getTileId(x, y);
		placementSuccesfull = bm.replaceBandit(tileID);

		// Add log message
		this.logController.addLogMessage("[LOG] - De struikrover is verplaatst naar " + tileID);
		this.bMenu = new BanditMenu(this.gameID, this.userID);
		this.bMenu.showBanditAttackPopup();
		
		return placementSuccesfull;
	}

	/**
	 * Returns an ArrayList of players that can be attacked by the bandit
	 * @param gameID
	 * @return ArrayList
	 */
	public ArrayList getPlayersThatCanBeAttacked(int gameID)
	{
		ArrayList<String> attackablePlayers = new ArrayList<>();
		String[] players = this.dMC.dMM.playerInGame(Integer.toString(gameID));
		int tileID = this.getBanditPosition();

		for(int i = 0; i < players.length; i++) {
			if(this.playerCanBeAttacked(tileID, Integer.parseInt(players[i]))) {
				String playerName = this.bm.getUsername(i);
				attackablePlayers.add(playerName);
			}
		}
		
		return attackablePlayers;
	}
	
	
	/**
	 * This method will get the location of the bandit
	 * 
	 * @return
	 */
	public int getBanditPosition() {
		// Return int
		int banditPosition = 0;
		banditPosition = bm.getBanditPosition();
		return banditPosition;
	}

	// This method will take materials from the player
	private void banditAttacks(int userIDToCheck) {
		int amountOfMaterials = 0;
		int amountToGiveAway = 0;

		Random rn = new Random();
		ResultSet result;

		// Geen grondstoffen

		// Get amount of materials
		result = this.player.getRawMaterials(this.gameID, userIDToCheck);

		// Get the total amount of materials
		try {
			while (result.next()) {
				amountOfMaterials += Integer.parseInt(result.getString(AMOUNT_RETURN_POSITION));
			}
		} catch (SQLException e) {
			System.out.println("Warning: [Bandit Controller] - Getting materials has failed");
			e.printStackTrace();
		}

		// Check if amount is higher than 7
		if (amountOfMaterials > MAXIMUM_AMOUNT_OF_MATERIALS) {
			// Round the amount of materials to give away
			amountToGiveAway = (int) Math.ceil(amountOfMaterials / 2);

			// Get materials
			ArrayList<String> materials = bm.getMaterials(userIDToCheck);

			// Give away some materials
			for (int i = 0; i < amountToGiveAway; i++) {
				// Needs to be refreshed every time
				int size = materials.size();

				// Get random Rersult
				int randomResult = rn.nextInt(size);

				// Distribute materials
				dMC.playerToBank_BankToPlayer(this.gameID, userIDToCheck, materials.get(randomResult), true);
			}
			// Sent Log message
			this.logController
					.addLogMessage("[LOG] - Oh Oh... " + this.modelClass.getUsername(Integer.toString(userIDToCheck))
							+ " Jij verliest " + amountToGiveAway + " grondstoffen");

		}

	}

	/**
	 * This methow will check if players need to give away there materials
	 */
	public void TakeMeterials() {
		String[] players = modelClass.playerInGame(gameID);

		for (int i = 0; i < AMOUNT_OF_PLAYERS; i++) {
			try {
				this.banditAttacks(Integer.parseInt(players[i]));
			} catch (Exception e) {
				System.out.println("Warning: [Bandit Controller] - Getting player ID out of the array has failed");
				e.printStackTrace();
			}

		}
	}

	/**
	 * This method will attack an opponent
	 * 
	 * @param playerToAttack
	 */
	public boolean attack(int playerToAttack) {
		Random rn = new Random();
		boolean attack = false;
		
		// Get materials
		ArrayList<String> ids = this.bm.getMaterials(playerToAttack);

		// Choose a material
		if (ids.size() > NULL_MATERIALS) {
			int RandomResult = rn.nextInt(ids.size());

			// Distribute meterials
			attack = this.dMC.playerToPlayer(this.gameID, playerToAttack, this.userID, ids.get(RandomResult));

			// Get type of material
			String result = ids.get(RandomResult);
			String meterialType = null;
			if (result.equals("g")) {
				meterialType = "Graan";
			} else if (result.equals("b")) {
				meterialType = "baksteen";
			} else if (result.equals("e")) {
				meterialType = "erts";
			} else if (result.equals("h")) {
				meterialType = "hout";
			}
			if (result.equals("w")) {
				meterialType = "wol";
			}

			// Add log message
			this.logController.defaultLog("struikrover3", modelClass.getUsername(Integer.toString(this.userID)),
					meterialType, 0, null, modelClass.getUsername(Integer.toString(playerToAttack)));

			// Set Refresh message
			rm.shouldRefresch(playerToAttack);
		}
		
		return attack;
	}

	/**
	 * This method will return the userID out of an username
	 * @param username
	 * @return
	 */
	public int getUserID(String username) {

		int userID = bm.getUserID(username);

		return userID;
	}

	/**
	 * This method is responsible for setting some default values into a HashMap. In
	 * the document you can find in our Drive you can read the logica behind the
	 * HashMaps. In short: every record is a point to check around the tile
	 * 
	 * @param xPos
	 * @param yPos
	 */
	private void setHashMaps(int xPos, int yPos) {

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
	 * This method will find out if a player can be attack
	 * 
	 * @return
	 */
	public boolean playerCanBeAttacked(int tileID, int userToAttack) {
		// Return boolean
		boolean attackPossible;

		// Instantiate HashMaps
		int xPos = bm.getPositionOfTile(this.X_POS, tileID);
		int yPos = bm.getPositionOfTile(this.Y_POS, tileID);

		this.setHashMaps(xPos, yPos);

		ArrayList<String> buildings = bm.checkUserOnBuildings(userToAttack, y_van, x_van);

		// Check if the player can be attacked
		if (buildings.size() > NULL_BUILDINGS) {
			attackPossible = true;
		} else {
			attackPossible = false;
		}

		return attackPossible;
	}
	
	public int getTileId(int x, int y) {
		return bm.getTileId(x, y);
	}
	
	public int[] getCordsFromId(int tileId) {
		return bm.getCordsFromId(tileId);
	}

}
