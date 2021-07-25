package controller;

import model.GameRefreshModel;
import model.PanelToShowModel;
import view.OntwikkelingskaartView;
import view.PanelToShow;
import view.SideMenu;
import view.RiddermachtView;

/**
 * This class will automatically update the game data
 * 
 * @author Jip van Heugten
 *
 */
public class GameThread extends Thread {

	// Variables
	private boolean gameIsRunning;
	private final static long SLEEP_TIME = 3;
	private int gameID;
	private int userID;


	// Objects

	private PanelToShow pts;
	private PanelToShowModel pTSM;
	private SideMenu sm;
	private GameRefreshModel gRM;
	private RiddermachtView rv;
	private VictoryPointsController vPC;

	// Constructor
	public GameThread(int gameID, int userID, PanelToShow pts, SideMenu sm) {
		this.gameID = gameID;
		this.userID = userID;
		gameIsRunning = true;
		this.pts = pts;
		this.sm = sm;
		this.pTSM = new PanelToShowModel();
		this.gRM = new GameRefreshModel();
		this.vPC = new VictoryPointsController(gameID);
		

	}
	
	// Setter to stop thread

	public void setGameIsRunning(boolean gameIsRunning) {
		this.gameIsRunning = gameIsRunning;
	}

	// Methods
	@SuppressWarnings("static-access")
	@Override
	/**
	 * Will run the third thread
	 */
	public void run() {
		super.run();

		while (this.gameIsRunning) {
			
			// Check if shouldRefresch is True
			if(gRM.shouldRefresch(this.userID)) {
				
				// Repaint the dice values
				sm.getdMV().repaintDice();
				pts.setPlayerOnTurnInfo();
				
				// Recount longest tradeRoute
				sm.getlTRV().refreshInfo(gameID);
				
				// Recount riddermacht
				sm.getRv().getRc().CalculateRiddermacht();
				// Repaint the riddermacht player and amount
				sm.getRv().setOwnerInfo(false);
				sm.getRv().setAmountInfo(false);
				// Re-Draw Buildings
				pts.getGc().drawBuildings();
				
				
				// Check if player is able to buy objects
				sm.getK1().checkAbleToBuy();
				
				// Check amount of materials from oponents
				sm.getMaterialOverview().setPlayerInfo(false);
		
				
				// Check if a player has won the game yet
				pts.getmG().drawVictoryPoints(userID, gameID, false);
				vPC.getAmountOfVictoryPoints(pTSM.playerOnTurn(gameID), true);
				
				
				//Reset ShouldRefresh
				gRM.setOwnRefreshValue(false, this.userID);
				
			}
			
			try {
				this.sleep(SLEEP_TIME);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	}


