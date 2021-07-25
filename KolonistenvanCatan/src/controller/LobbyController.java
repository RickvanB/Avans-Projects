package controller;

import java.util.ArrayList;

import model.GameCreateModel;
import model.Lobby;
import model.PanelToShowModel;
import view.LobbyOverview;
import view.LobbyView;

/**
 * The responsibility of this class is to change some values into a viewObject
 * 
 * @author Jip van Heugten
 *
 */
public class LobbyController {

	// Varaibles
	private final static int USERID_POS = 0;
	private final static int TURNPLAYER_POS = 5;
	
	private final static int AMOUNT_OF_PLAYERS = 4;
	private String username;

	// Objects
	private ArrayList<String> lobbiesInfo;
	private ArrayList<LobbyView> lobbies;

	// Lobby Model
	private Lobby lobbyModel;
	private GameCreateModel gcm;
	private PanelToShowModel pTSM;

	// Lobby View
	private LobbyOverview lo;

	// Constructor
	public LobbyController(LobbyOverview lo, String userName) {
		// Instantiating objects
		lobbyModel = new Lobby(this);
		gcm = new GameCreateModel();
		lobbies = new ArrayList<>();
		pTSM = new PanelToShowModel();
		this.lo = lo;
		this.username = userName;
		
		//Start Instantiatin procces
		this.startInstantiating(userName);
	}

	/**
	 * 
	 * This method will activate the import process
	 * 
	 * @param userName
	 */
	public void startInstantiating(String userName) {
		lobbyModel.getLobbies(userName);
		this.getLobbiesFromDatabase();

	}

	// Methods
	/**
	 * This method will instantiatie lobbies out of data that will be returned from
	 * the method getLobbies.
	 * 
	 * @param userID
	 */
	public void instantiateLobbies(ArrayList<String> lobbies) {

		this.lobbiesInfo = lobbies;

		int gameIDToCheck;
		String gameIDString;
		String[] players = new String[AMOUNT_OF_PLAYERS];
		String turnPlayer;
		String[] playerColors = new String[AMOUNT_OF_PLAYERS];

		// Collect Game ID
		gameIDString = lobbiesInfo.get(USERID_POS);
		gameIDToCheck = Integer.parseInt(gameIDString);

		// Collect player Names
		for (int i = 1; i < 5; i++) {
			players[i - 1] = lobbiesInfo.get(i);
		}

		// Collect BeurtPlayer
		turnPlayer = lobbiesInfo.get(TURNPLAYER_POS);
		
		// Check if it is null
		if(turnPlayer == null) {

			int userID = gcm.getPlayerToStart(gameIDString);
				turnPlayer = pTSM.getUsername(userID);
	
			
		}

		// Collect Collors
		int counter = 0;
		for (int i = 6; i < 10; i++) {
			playerColors[counter] = lobbiesInfo.get(i);
			counter++;
		}

		// Add lobby to ArrayList
		this.lobbies.add(new LobbyView(gameIDToCheck, players, turnPlayer, playerColors, lo, this));
	}

	/**
	 * This method will return the lobby ArraList
	 * 
	 * @return
	 */
	public void returnLobbies() {
		lo.getLobbiesArray(lobbies);
	}

	/**
	 * This method will print the lobbies in the lobbyOverview
	 */
	public void printLobbies() {
		lo.printLobbies();
	}

	/**
	 * This method will get the lobbies out of the database
	 */
	public void getLobbiesFromDatabase() {

		this.returnLobbies();
		this.printLobbies();
	}
	
	public int returnPlayerCountAccepted(int gameID)
	{
		return lobbyModel.checkIfEveryoneHaveAccepted(gameID);
	}

	public boolean gameWon(int gameID) {
	
		
		boolean gameIsWon = this.lobbyModel.gameIsWon(this.username, gameID);
		
		return gameIsWon;
	}

}
