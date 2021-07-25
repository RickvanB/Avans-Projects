package controller;

import java.util.ArrayList;
import java.util.Arrays;

import model.GameCreateModel;

/**
 * This class is responsible for creating and importing from games
 * 
 * @author Jip van Heugten
 *
 */
public class GameCreateController {

	// Variables
	// Game values
	private int gameID;
	private int turn_idplayer;
	private int biggest_rm_idplayer;
	private int largest_hr_idplayer;
	private boolean thrown_dice;
	private int last_throw_Dice1;
	private int last_throw_Dice2;
	private boolean isRandombord;
	private boolean firstTurn;
	private int struikrover;

	// Return values to save in ArrayList
	private final static int IDSPEL_POSITION = 0;
	private final static int BEURT_SPELER_POSITION = 1;
	private final static int GROOTSTE_RM_IDSPELER_POSITION = 2;
	private final static int LANGSTE_HR_IDSPELER_POSITION = 3;
	private final static int GEDOBBELD_POSITION = 4;
	private final static int LAATSTE_WORP_STEEN1_POSITION = 5;
	private final static int LAATSTE_WORP_STEEN2_POSITION = 6;
	private final static int ISRANDOMBORD_POSITION = 7;
	private final static int EERSTERONDE_POSITION = 8;
	private final static int STRUIKROVER_IDTEGEL_POSITION = 9;

	// State Values
	private int lastTurn;
	private final static int DEFAULTVALUE = 0;
	private final static boolean DEFAULTBOOLEAN = false;

	// Objects
	private GameCreateModel gCM;
	private InviteController iC;

	// Constructor
	public GameCreateController() {
		// Instantiating objects
		gCM = new GameCreateModel();
		this.iC = new InviteController();

		lastTurn = 0;
	}

	// Getters and Setters

	public int getLastTurn() {
		return lastTurn;
	}

	public void setLastTurn(int lastTurn) {
		this.lastTurn = lastTurn;
	}

	public int getGameID() {
		return gameID;
	}

	public void setGameID(int gameID) {
		this.gameID = gameID;
	}

	public int getTurn_idplayer() {
		return turn_idplayer;
	}

	public void setTurn_idplayer(int turn_idplayer) {
		this.turn_idplayer = turn_idplayer;
	}

	public int getBiggest_rm_idplayer() {
		return biggest_rm_idplayer;
	}

	public void setBiggest_rm_idplayer(int biggest_rm_idplayer) {
		this.biggest_rm_idplayer = biggest_rm_idplayer;
	}

	public int getLargest_hr_idplayer() {
		return largest_hr_idplayer;
	}

	public void setLargest_hr_idplayer(int largest_hr_idplayer) {
		this.largest_hr_idplayer = largest_hr_idplayer;
	}

	public boolean isThrown_dice() {
		return thrown_dice;
	}

	public void setThrown_dice(boolean thrown_dice) {
		this.thrown_dice = thrown_dice;
	}

	public int getLast_throw_Dice1() {
		return last_throw_Dice1;
	}

	public void setLast_throw_Dice1(int last_throw_Dice1) {
		this.last_throw_Dice1 = last_throw_Dice1;
	}

	public int getLast_throw_Dice2() {
		return last_throw_Dice2;
	}

	public void setLast_throw_Dice2(int last_throw_Dice2) {
		this.last_throw_Dice2 = last_throw_Dice2;
	}

	public boolean isRandombord() {
		return isRandombord;
	}

	public void setRandombord(boolean isRandombord) {
		this.isRandombord = isRandombord;
	}

	public boolean isFirstTurn() {
		return firstTurn;
	}

	public void setFirstTurn(boolean firstTurn) {
		this.firstTurn = firstTurn;
	}

	public int getStruikrover() {
		return struikrover;
	}

	public void setStruikrover(int struikrover) {
		this.struikrover = struikrover;
	}

	// Methods
	/**
	 * This method will call a method in the model class that will create a new game
	 * 
	 * @param randomBoard
	 * @param playerID
	 */
	public int createGame(String[] users, boolean randomBoard, String username) {

		int gameId = gCM.createNewGame(randomBoard, username);
		for(int i = 0; i < users.length; i++) {
			this.iC.invitePlayer(users[i], gameId);
		}
		return gameId;
	}

	/**
	 * This method will import game values by calling a model class
	 * 
	 * @param GameID
	 */
	public boolean importGame(int GameIDToCheck) {
		ArrayList<String> results = new ArrayList<>();

		boolean turnValueChanged = false;

		// Executing import query
		results = gCM.importExistingGame(GameIDToCheck);

		// Add results to instance variables
		int resultInt;
		boolean resultBoolean;

		try {
			if (results.get(IDSPEL_POSITION) != null) {
				resultInt = Integer.parseInt(results.get(IDSPEL_POSITION)); // AT THIS LINE
				this.setGameID(resultInt);
			} else {
				this.setGameID(DEFAULTVALUE);
			}

			if (results.get(BEURT_SPELER_POSITION) != null) {
				resultInt = Integer.parseInt(results.get(BEURT_SPELER_POSITION));
				this.setTurn_idplayer(resultInt);
			} else {
				this.setTurn_idplayer(DEFAULTVALUE);
			}

			// Check if the turn has changed
			if (this.getLastTurn() == DEFAULTVALUE || this.getLastTurn() == this.getTurn_idplayer()) {
				turnValueChanged = false;

			} else if (this.getLastTurn() != this.getTurn_idplayer()) {

				turnValueChanged = true;
			}
			this.setLastTurn(this.getTurn_idplayer());

			if (results.get(GROOTSTE_RM_IDSPELER_POSITION) != null) {
				resultInt = Integer.parseInt(results.get(GROOTSTE_RM_IDSPELER_POSITION));
				this.setBiggest_rm_idplayer(resultInt);
			} else {
				this.setBiggest_rm_idplayer(DEFAULTVALUE);
			}

			if (results.get(LANGSTE_HR_IDSPELER_POSITION) != null) {
				resultInt = Integer.parseInt(results.get(LANGSTE_HR_IDSPELER_POSITION));
				this.setLargest_hr_idplayer(resultInt);
			} else {
				this.setLargest_hr_idplayer(DEFAULTVALUE);
			}

			if (results.get(GEDOBBELD_POSITION) != null) {
				resultBoolean = Boolean.valueOf(results.get(GEDOBBELD_POSITION));
				this.setThrown_dice(resultBoolean);
			} else {
				this.setThrown_dice(DEFAULTBOOLEAN);
			}

			if (results.get(LAATSTE_WORP_STEEN1_POSITION) != null) {
				resultInt = Integer.parseInt(results.get(LAATSTE_WORP_STEEN1_POSITION));
				this.setLast_throw_Dice1(resultInt);
			} else {
				this.setLast_throw_Dice1(DEFAULTVALUE);
			}

			if (results.get(LAATSTE_WORP_STEEN2_POSITION) != null) {
				resultInt = Integer.parseInt(results.get(LAATSTE_WORP_STEEN2_POSITION));
				this.setLast_throw_Dice2(resultInt);
			} else {
				this.setLast_throw_Dice2(DEFAULTVALUE);
			}

			if (results.get(ISRANDOMBORD_POSITION) != null) {
				resultBoolean = Boolean.valueOf(results.get(ISRANDOMBORD_POSITION));

				if (results.get(ISRANDOMBORD_POSITION).equals("1")) {
					this.setRandombord(true);
				} else {
					this.setRandombord(DEFAULTBOOLEAN);
				}

			}

			if (results.get(STRUIKROVER_IDTEGEL_POSITION) != null) {
				resultInt = Integer.parseInt(results.get(STRUIKROVER_IDTEGEL_POSITION));
				this.setStruikrover(resultInt);
			} else {
				this.setStruikrover(DEFAULTVALUE);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return turnValueChanged;

	}
	
	public String[] getAllUsers(String username)
	{
		ArrayList<String> accounts = this.gCM.getAllUsers(username);
		Object[] objectList = accounts.toArray();
		String[] users =  Arrays.copyOf(objectList,objectList.length,String[].class);
		
		return users;
	}
}
