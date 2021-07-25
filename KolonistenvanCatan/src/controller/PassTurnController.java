package controller;

import model.Lobby;
import model.PanelToShowModel;
import model.PassTurnModel;
import view.MainPanel;

/**
 * This class is responsible for regulating the passing of the turn to a new
 * player
 * 
 * @author Jip van Heugten
 *
 */
public class PassTurnController {


	// Variables
	private int gameID;
	private int userID;
	private String message;
	private static final boolean SECOND_VIEW = false;
	private static final int AMOUNT_OF_PLAYERS = 4;
	private static final int AMOUNT_OF_TILES = 19;
	private static final int KIND = 0;
	private static final int YPOS = 1;
	private static final int XPOS = 2;
	private static final int FIRST = 0;

	private PanelToShowModel pTSM;
	private PassTurnModel pTM;
	private MainPanel mp;
	private DistributeMaterialController dMC;
	private Lobby modelClass;

	// Constructor
	public PassTurnController(int gameID, int userID, MainPanel mp) {

		this.gameID = gameID;
		this.userID = userID;

		// Instantiating objects
		this.pTSM = new PanelToShowModel();
		this.pTM = new PassTurnModel();
		this.mp = mp;
		this.modelClass = new Lobby(userID);
		this.dMC = new DistributeMaterialController();

	}

	// Getters and Setters
	public String getMessage() {
		return message;
	}

	// Methods
	/**
	 * This method will check if the player is able to pass the turn
	 */
	private boolean passTurn() {

		// Return Boolean
		boolean ableToPassTurn = false;

		int playerOnTurn;

		// Get the playerID who is on turn
		playerOnTurn = pTSM.playerOnTurn(gameID);

		// Check if the ID is equal to the playerID
		try {
			if (playerOnTurn == this.userID && modelClass.gameIsWon(pTSM.getUsername(userID), gameID)) {
				this.message = "Het is niet jou beurt";
				ableToPassTurn = true;
			}
		} catch (Exception e) {
			if (playerOnTurn == this.userID) {
				ableToPassTurn = true;
			}
		}


		return ableToPassTurn;
	}

	/**
	 * This method will pass the turn to the next player
	 */
	public boolean passTurnTo(int gameID, int userID) {
		boolean ableToPass = this.passTurn();

		// Return boolean
		boolean passFinished = false;
		boolean enoughBuilding = pTM.placedBuildings(pTM.inFirstRound(gameID), userID);

		// Check if the player is able to pass
		if (ableToPass && pTM.inFirstRound(gameID)) {
			// Player to pass to

			if (enoughBuilding) {
				int playerToPassTo = pTM.playerToPassTo(gameID, userID);

				// Execute query to pass the turn
				pTM.passTurnTo(playerToPassTo, gameID);

				passFinished = true;

			} else {
				this.message = "Er staan onvoldoende spelstukken op het bord";
			}
			
			boolean everyOneHasPlaced = true;
			// Get userID's
			int[] players = pTM.getuserIDS(gameID);
			for(int i = 0;  i < AMOUNT_OF_PLAYERS; i++) {
				
				if(!(pTM.placedBuildings(false, players[i]))) {
					everyOneHasPlaced = false;
				}
			}
			
			// Check if everybody has placed their buildings
			if(everyOneHasPlaced) {
				
				
				for(int i = 1; i <= AMOUNT_OF_TILES; i++) {				
					// Get tile
					String[] tile = pTM.getTile(i, gameID);
					
					// check if robber is not on this tile
					if (!tile[3].equals("1")) {
						try {
							this.dMC.distributeMaterialAfterThrownDice(gameID, tile[KIND].charAt(FIRST), Integer.parseInt(tile[YPOS]), Integer.parseInt(tile[XPOS]));
						} catch (Exception e) {
							e.printStackTrace();
						}						
					}
				}
			}

		} else {
			int playerToPassTo = pTM.playerToPassTo(gameID, userID);

			// Execute query to pass the turn
			pTM.passTurnTo(playerToPassTo, gameID);

			passFinished = true;
		}
		
		// Refresh VictoryPoints Model
		this.mp.geteG().drawVictoryPoints(userID, gameID, SECOND_VIEW);
		
		return passFinished;
	}
}
