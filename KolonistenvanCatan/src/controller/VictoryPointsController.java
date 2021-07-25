package controller;

import model.PanelToShowModel;
import model.VictoryPointsModel;

import javax.swing.JOptionPane;

import model.GameRefreshModel;

/**
 * This class is responsible for counting the Victorypoints of a player
 * 
 * @author Jip van Heugten
 *
 */
public class VictoryPointsController {

	// Variables
	private int gameID;
	private int userID;
	private int amountOfPoints;

	private final static int AMOUNT_TO_WIN = 10;

	private final static String VILLAGE = "d";
	private final static String CITY = "c";
	private static final Object PLAYER_HAS_WON = "Er heeft een speler het spel gewonnen!";

	// Objects
	private VictoryPointsModel vPM;
	private Log logModel;
	private PanelToShowModel pTSM;
	private GameRefreshModel gRM;

	// Constructor
	public VictoryPointsController(int gameID) {
		this.gameID = gameID;
		this.vPM = new VictoryPointsModel();
		this.pTSM = new PanelToShowModel();
		this.gRM = new GameRefreshModel();
		
		this.amountOfPoints = 0;
	}

	// Methods
	/**
	 * This method will find out how many point a player has
	 * 
	 * @param userID
	 * @param doCountBuildingCarts
	 * @return
	 */
	public int getAmountOfVictoryPoints(int userID, boolean doCountBuildingCarts) {

		// Return integer
		int amountOfPoints = 0;

		// Results integers
		int amountOfVilages = 0;
		int amountOfCitys = 0;
		int amountOfBuildings = 0;

		// Check if the buildingcarts needs to be counted too
		if (doCountBuildingCarts) {
			// Get the amount of buildingscarts
			amountOfBuildings = vPM.getAmountOfBuildingCarts(userID);
		}
		// Get the amount of villages
		amountOfVilages = vPM.getAmountOfBuildings(userID, VILLAGE);
		// Get the amount of City
		amountOfCitys = vPM.getAmountOfBuildings(userID, CITY);

		// Calculate amount of victorypoints
		amountOfCitys = (amountOfCitys * 2);

		// Get longesttraderoute and biggest knight front
		int amountOfL_K = vPM.getL_K(userID, gameID);

		// Get total amount of points
		amountOfPoints = amountOfBuildings + amountOfCitys + amountOfVilages + amountOfL_K;
		
		this.amountOfPoints = amountOfPoints;

		if (this.playerHasWon(userID, true, false)) {

			// Add log message
			this.logModel = new Log(userID, gameID);
			this.logModel.addLogMessage("[LOG] - " + pTSM.getUsername(userID) + " is de winnaar!");

			// Set refresh value
			this.gRM.setRefreshValue(true, gameID);

			// Message
			JOptionPane.showMessageDialog(null, PLAYER_HAS_WON);

		}
		return amountOfPoints;
	}

	/**
	 * This method will check if a player has enough victorypoints to win the game
	 * 
	 * @param userID
	 * @param doCountBuildingCarts
	 * @return
	 */
	public boolean playerHasWon(int userID, boolean doCountBuildingCarts, boolean toCheck) {
		// Return boolean
		boolean playerHasWon = false;

		if (amountOfPoints >= AMOUNT_TO_WIN) {
			playerHasWon = true;

			// End the game
			vPM.playerHasWon(gameID);
		}

		return playerHasWon;
	}
}
