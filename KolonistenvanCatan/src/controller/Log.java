
package controller;

import model.Chat;
import model.Struikrover;
import model.Worp;

/**
 * This class will insert some default log message into the database when a
 * player do a movement or throw the dice
 * 
 * @author Jip van Heugten and Tim Noordhoorn
 *
 */
public class Log {

	// Variables
	private int userID;
	private int gameID;

	// Objects
	private Chat chatModel;
	private Worp dobbel;
	private Struikrover bandit;

	// Constructor
	public Log(int userID, int gameID) {
		this.userID = userID;
		this.gameID = gameID;
		this.chatModel = new Chat();
		this.dobbel = new Worp();
		this.bandit = new Struikrover();
	}

	// Methods
	/**
	 * This method will add a log message to the chat
	 * 
	 * @param message
	 * @param userID
	 */
	public void addLogMessage(String message) {
		chatModel.addmessagetoDatabase(message, this.userID);
	}

	// Add an method were i can select a default log message. With as less
	// parameters as possible
	
	/**
	 * This method entails the possible log entries when playing the game.
	 * @param logType
	 * @param enemyID
	 * @param materialType
	 * @param amountToDistribute
	 * @param build = can be actual build pieces or development card types
	 */
	public void defaultLog(String logType, String username, String materialType, int amountToDistribute, String build, String enemyUsername) {
		
		switch(logType) {
		
		case "turn" : 
			this.addLogMessage("[LOG] - Speler " + username + " is aan de beurt.");
			
		case "dobbel" : 
			int[] rolled = dobbel.refreshDies(this.gameID);
			int total = rolled[0] + rolled[1]; 
			this.addLogMessage("[LOG] - Speler " + username + " rolt " + total + ".");
			
		case "struikrover" : 
			this.addLogMessage("[LOG] - Speler " + username + " moet de struikrover verplaatsen.");
			
		case "struikrover2" :
			String locale = bandit.getCoordinates(this.gameID);
			this.addLogMessage("[LOG] - De struikrover is verplaatst naar " + locale + ".");
			
		case "struikrover3" :
			this.addLogMessage("[LOG] - Speler " +username + " rooft een grondstof van speler " + enemyUsername + ".");
			
		case "struikrover4" :
			this.addLogMessage("[LOG] - Speler " + username + " rooft een " + materialType + " bij speler " + enemyUsername + ".");
			
		case "distribution" : 
			this.addLogMessage("[LOG] - Speler " + username + " ontvangt " + amountToDistribute + " " + materialType + ".");
			
		case "build" :
			this.addLogMessage("[LOG] - Speler " + username + " bouwt een " + build + ".");
			
		case "trade" : 
			this.addLogMessage("[LOG] - Speler " + username + " ruilt " + "met speler " + enemyUsername + ".");
			
		case "development" : 
			if(build == "stratenbouw") {
				this.addLogMessage("[LOG] - Speler " + username + " speelt de ontwikkelingskaart -stratenbouw- en mag 2 handelsrouten leggen.");
			}
			else if(build == "ridderkaart") {
				this.addLogMessage("[LOG] - Speler " + username + " speelt de ontwikkelingskaart -ridderkaart- en mag de struikrover verplaatsen.");
			}
			else if(build == "monopolie") {
				this.addLogMessage("[LOG] - Speler " + username + " speelt de ontwikkelingskaart -monopolie- en mag een grondstofsoort kiezen waarvan elke andere speler hun grondstoffen aan " + username + " moeten geven.");
			}
			else if(build == "ontdekking") {
				this.addLogMessage("[LOG] - Speler " + username + " speelt de ontwikkelingskaart -ontdekking- en ontvangt 2 grondstoffen naar keuze van de bank.");
			}
			else {
				
			}
			
		case "development2" : 
			this.addLogMessage("[LOG] - Speler " + username + " koopt een ontwikkelingskaart");
			
		}
		
	}
	
}
