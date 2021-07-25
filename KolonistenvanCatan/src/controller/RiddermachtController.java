package controller;

import model.PanelToShowModel;
import model.RiddermachtModel;
//import view.RiddermachtView;

public class RiddermachtController {
	private RiddermachtModel rm;
	private Log logController;
	private PanelToShowModel pTSM;
	
	private int gameID;
	private int userID;
	
	public RiddermachtController(int gameID, int userID) {
		rm = new RiddermachtModel();
		
		this.userID = userID;
		this.gameID = gameID;
		
		this.logController = new Log(userID, gameID);
		this.pTSM = new PanelToShowModel();
	}
	
	public int CalculateRiddermacht() {
		int riddermachtUserId = 0;

		int idPlayer= 0;
		
		if(rm.getRiddermachtPlayer(gameID) == 0) {
			idPlayer = rm.checkFirstRm(gameID);
			if(idPlayer != 0) {
				rm.UpdateRiddermacht(idPlayer, gameID);
				// Add log message
				logController.addLogMessage("[LOG] - speler: " + pTSM.getUsername(userID) + " bezit op dit moment de riddermacht");
			}
		}
		else {
			if(rm.getAmountOfKnights(rm.getRiddermachtPlayer(gameID), gameID) < rm.getAmountOfKnights(rm.getPlayerWithMostKnights(gameID), gameID)) {
				rm.UpdateRiddermacht(rm.getPlayerWithMostKnights(gameID), gameID);
				

			}
		}
		
		return riddermachtUserId;
	}
}