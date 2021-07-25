package model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Random;

//constructor for developcardstack
public class DevelopmentCardStack {
	DatabaseCommunicator communicator;
	private final static int numberOfDevCards = 25;
	private int gameId;
	
	private Ontwikkelingskaart[] devCardStack = new Ontwikkelingskaart[numberOfDevCards];
	
	/**
	 * This class is responsible for the model for the collection of development cards
	 * 
	 * @author Fritz Wierper
	 *
	 */
	public DevelopmentCardStack(int gameId) {
		this.gameId = gameId;
		communicator = DatabaseCommunicator.getInstance();
		
	}
	
	//this checks if the game is new so it can add all the cards to the database
	public boolean checkIfGameIsNew() {
		ResultSet result;
		boolean isGameNew = true;
		
		String query = "SELECT COUNT(idspel) FROM spelerontwikkelingskaart WHERE idspel = ? ";
		String[] params = {Integer.toString(this.gameId)};
		
		try {
			result = this.communicator.select(query, params);
			while(result.next()) {
				if(result.getInt(1) > 0) {
					isGameNew = false;
				}
			}
		} catch(Exception e) {
			
		}
		
		return isGameNew;
	}
	
	public void FirstTimeDatabaseFiller(String idDev) {
		String query = "INSERT INTO spelerontwikkelingskaart (idspel, idontwikkelingskaart, idspeler, gespeeld) VALUES (?, ?, NULL, 0)";
		String[] params = {Integer.toString(this.gameId), idDev};
		
		try {
			this.communicator.updateInsertDelete(query, params);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
//this method gets all cards from the database and puts them in an array	
	public void UpdateCardsFromDatabase() {
		
		for (int i = 0; i < numberOfDevCards; i++) {
				devCardStack[i] = new Ontwikkelingskaart(getCardFromDB(i), gameId);
		}
	}
	
//this method generates a random card number from 1 to numberOfDecCards	
	public int generateRandomCardNr() {
		Random rnd = new Random();
		int numberOfFreeCards = 0;
		int randomNr;
		UpdateCardsFromDatabase();
		for (int i = 0; i < numberOfDevCards; i++) {
			if (devCardStack[i] != null) {
				if (devCardStack[i].getPlayerID() == 0) {
					numberOfFreeCards++;
				}
			}
		}
		
		
		randomNr = (rnd.nextInt(numberOfFreeCards) + 1);
		
		return randomNr;
	}
	
	//this method is used when a player buys a DevCard / no costs
	public String getUnassignedDevCard() {
		String cardId = null;
		int cardNr = this.generateRandomCardNr();
		
		String queryType = "SELECT * FROM spelerontwikkelingskaart WHERE idspel LIKE "+ this.gameId +" AND idspeler is null LIMIT "+ cardNr +",1";
		
		try {
			ResultSet result = communicator.select(queryType, null);
			while(result.next()) {
			
				if (result.getString(1) != null) {
					cardId = result.getString(2);
				}
				else {
					cardId = null;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();

		}
		if (cardId == null) {
			System.out.println("Helaas, de stapel is leeg. Je kunt geen ontwikkelingskaarten meer kopen.");
		}
		return cardId;
	}
	
	
	
	//Transfers a card from the bank to a player
	public void transferCardInDB(int player, String cn) {
		try {
			
			String[] params = new String[3];
			params[0] = Integer.toString(player);
			params[1] = Integer.toString(this.gameId);
			params[2] = cn;
			
			communicator.updateInsertDelete("UPDATE spelerontwikkelingskaart SET idspeler = ? WHERE idspel LIKE ? AND idontwikkelingskaart = ?", params);
			// This while statement will get all of the values out of the resultset
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}
	
	public void setCardPlayed(String ci) {
		try {
			String[] params = new String[1];
			params[0] = ci;
			
			communicator.updateInsertDelete("UPDATE spelerontwikkelingskaart SET gespeeld = 1 WHERE idontwikkelingskaart = ?", params);
			// This while statement will get all of the values out of the resultset

		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public void resetAllCardsInDB(int gameId) {
		try {
			String[] params = new String[1];
			params[0] = Integer.toString(gameId);
			
			communicator.updateInsertDelete("UPDATE spelerontwikkelingskaart SET idspeler = null, gespeeld = 0 WHERE idspel = ?", params);
			// This while statement will get all of the values out of the resultset

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	

	//Get a card from the database for testing
	public String getCardFromDB(int nr) {
		String cardId = "";
		String queryType = "SELECT * FROM spelerontwikkelingskaart WHERE idspel = ? LIMIT "+ nr +",1";
		String[] params = {Integer.toString(this.gameId)};
		
		try {
			ResultSet result = communicator.select(queryType, params);
			while(result.next()) {
				cardId = result.getString(2);
			}
		} catch (SQLException e) {
			e.printStackTrace();

		}
		
		return cardId;
	}


	public ArrayList<Ontwikkelingskaart> getPlayerDevCards (int player){
		ArrayList<Ontwikkelingskaart> playerDevCards = new ArrayList<Ontwikkelingskaart>();
		for (int i = 0; i < numberOfDevCards; i++) {
			if (devCardStack[i] != null) {
				if (devCardStack[i].getPlayerID() == player) {
					playerDevCards.add(devCardStack[i]);
				}
			}
		}
		return playerDevCards;
	}
	
	
	public static int getNumberofdevcards() {
		return numberOfDevCards;
	}
	
	public Ontwikkelingskaart[] getDevCardStack() {
		return devCardStack;
	}
}
