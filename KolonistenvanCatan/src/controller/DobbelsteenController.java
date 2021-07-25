package controller;

import java.util.Random;

import javax.swing.JOptionPane;

import model.GameRefreshModel;
import model.PanelToShowModel;
import model.Worp;
import view.BanditMenu;
import view.PanelToShow;

public class DobbelsteenController {

	private int dobbelsteen1;
	private int dobbelsteen2;
	private int total;
	private int gameID;
	private int userID;

	private final static int DICE1 = 0;
	private final static int DICE2 = 1;

	private final static String BANDIT_MESSAGE = "Je moet de struikrover verzetten en mag een speler aanvallen!";
	private static final int BANDIT_AMOUNT = 7;

	private int d1;
	private int d2;

	// Objects
	private Random r;
	private Worp w;
	private GameRefreshModel gRM;
	private BanditMenu bm;
	private PanelToShow pTS;
	private PanelToShowModel pTSM;
	private Log logController;
	private GebouwController gc;
	private Bandit b;

	public DobbelsteenController(int gameID, BanditMenu bm, PanelToShow pTS, int userID) {
		this.r = new Random();
		this.w = new Worp();
		this.gameID = gameID;
		this.userID = userID;
		this.bm = bm;
		this.logController = new Log(userID, gameID);
		this.pTS = pTS;
		this.pTSM = new PanelToShowModel();
		gRM = new GameRefreshModel();
		gc = pTS.getGc();
	}

	// Getters
	public int getD1() {
		return d1;
	}

	public int getD2() {
		return d2;
	}

	/**
	 * Throw dobbelsteen
	 * 
	 * @return int[] result
	 */
	public int[] throwDobbelsteen() {
		int min = 1;
		int max = 6;

		this.dobbelsteen1 = r.nextInt(max) + min;
		this.dobbelsteen2 = r.nextInt(max) + min;
		this.total = this.dobbelsteen1 + this.dobbelsteen2;

		// Struikrover
		if (this.total == BANDIT_AMOUNT) {
			bm.setSevenIsThrown(true);
			b.TakeMeterials();
			int result = JOptionPane.showConfirmDialog(null, BANDIT_MESSAGE, BANDIT_MESSAGE,
					JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
			if (result == JOptionPane.OK_OPTION) {
				gc.placeBuilding("bandit");
			}
		} else {
			pTS.getGp().normalTurn(total);

		}

		this.w.insert(this.dobbelsteen1, this.dobbelsteen2, true, gameID);
		// Return array with all values
		int[] result = { this.total, this.dobbelsteen1, this.dobbelsteen2 };

		// Set should refresh for other players to 1
		this.gRM.setRefreshValue(true, this.gameID);

		// Set log message
		String username = pTSM.getUsername(this.userID);
		
		
		boolean logHasBeenSent = false;
		while(!logHasBeenSent) {
			try {
				logController.defaultLog("dobbel", username, null, 0, null, null);
				logHasBeenSent = true;
				
			} catch (Exception e) {
				continue;
			}
		}
		

		return result;
	}

	/**
	 * This method will get the dice results that are thrown the last time
	 * 
	 * @return
	 */
	public void getDiceResults() {

		int[] results = this.w.refreshDies(gameID);
		this.d1 = results[DICE1];
		this.d2 = results[DICE2];
	}

}
