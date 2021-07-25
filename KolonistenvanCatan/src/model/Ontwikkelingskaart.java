package model;

import java.sql.ResultSet;
import java.sql.SQLException;


public class Ontwikkelingskaart {
	DatabaseCommunicator communicator;
	
	//Database columns for query
	private final static int NAME_COLUMN = 1;
	private final static int TYPE_COLUMN = 2;
	private final static int EXPLANATION_COLUMN = 3;
	private final static int GAME_COLUMN = 6;
	private final static int PLAYER_COLUMN = 8;
	private final static int CARDPLAYED_COLUMN = 9;
	
	
	
	private final String cardId;
	//id from ontwikkelingskaart, like o03g or 022r
	
	private String cardType;
	// 14x Ridder
	// 6x Vooruitgang
	// 5x Gebouw
	
	private String cardName;
	//Ridder:
	//14x ridder
	
	//Vooruitgang:
	//2x monopolie
	//2x uitvinding
	//2x stratenbouw
	
	//Overwinningspunt:
	//1x bibliotheek
	//1x kathedraal
	//1x markt
	//1x parlement
	//1x universiteit

	
	private String cardExplanation;
	//explanation of the card. sometimes null
	
	private int gameID;
	//unique game ID
	
	private int playerID;
	//unique player ID
	
	private boolean cardPlayed;
	//is the card played, 
	
	//Extra explanation per card. Not every card has this
	
	/* Creates a development card. 
	 * @param ct the main type of the Card (ridder, vooruitgang, overwinningspunt)
	 * @param cn the name of the card (subtype)
	 */
	
	/**
	 * This class is responsible for communication with the database per development card
	 * 
	 * @author Fritz Wierper
	 *
	 */
	public Ontwikkelingskaart(String ci, int gameID) {
		communicator = DatabaseCommunicator.getInstance();
		
		this.cardId = ci;
		this.setCardInfo(ci, gameID );
		
		// test in console
		
	}
	

	//sets the info per card
	public void setCardInfo(String ci, int gameID) {
		String queryType = "SELECT * FROM kaarttype k JOIN ontwikkelingskaart o ON k.naam = o.naam JOIN spelerontwikkelingskaart s ON o.idontwikkelingskaart = s.idontwikkelingskaart WHERE o.idontwikkelingskaart = ? AND idspel = ?";
		String[] params = new String[2];
		params[0] = ci;
		params[1] = Integer.toString(gameID);
		
		try {
			ResultSet result = communicator.select(queryType, params);
			// This while statement will get all of the values out of the resultset
			while(result.next()) {
				this.cardName = result.getString(NAME_COLUMN);
				this.cardType = result.getString(TYPE_COLUMN);
				this.cardExplanation = result.getString(EXPLANATION_COLUMN);
				this.gameID = result.getInt(GAME_COLUMN);
				this.playerID = result.getInt(PLAYER_COLUMN);
				
				if (result.getInt(CARDPLAYED_COLUMN) == 0) {
					this.cardPlayed = false;
				}
				
				else {
					this.cardPlayed = true;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();

		}
	} 

 public String getCardId() {
 		return cardId;
 	}
 
	public String getCardType() {
		return cardType;
	}

 
	public String getCardName() {
		return cardName;
	}

	public String getCardExplanation() {
		return cardExplanation;
	}

 	public int getGameID() {
 		return gameID;
 	}
 	
	public int getPlayerID() {
		return playerID;
	}
	
	public boolean isCardPlayed() {
		return cardPlayed;
	}
 }

