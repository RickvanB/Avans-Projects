package model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

/**
 * This class will put and get the chats out of the database
 * 
 * @author Jip van Heugten
 *
 */
public class Chat {

	// Variables
	protected final static int MESSAGE_INDEX = 2;
	protected final static int USER_ID_INDEX = 1;
	protected final static int TIMESTAMP_INDEX = 0;

	private final static int MESSAGE_GETINDEX = 3;
	private final static int USER_ID_GETINDEX = 2;
	private final static int TIMESTAMP_GETINDEX = 1;

	private final static int ONE_PARAMETER_ARRAY = 1;
	private final static int FIVE_PARAMETER_ARRAY = 5;
	private final static int USERNAME_COLUM = 1;
	private final static int USER_ID_POSTION = 0;
	private final static int GAME_ID_POSTION = 0;

	private final static int SECOND_POSITION = 1;
	private final static int THIRTH_POSITION = 2;
	private final static int FOURTH_POSITION = 3;
	private final static int FIFTH_POSITION = 4;

	private final static int AMOUNT_OF_PLAYERS = 4;

	protected String timeStampLastMessage;
	private String warning;

	// String Array Last refreshed message
	private String[] lastChatMessage = new String[1];

	// Objects
	protected DatabaseCommunicator dC;

	// Constructor
	public Chat() {
		dC = DatabaseCommunicator.getInstance();

		lastChatMessage[TIMESTAMP_INDEX] = "0000-00-00 00:00:00";
		timeStampLastMessage = "0000-00-00 00:00:00";

	}

	// Getters
	public String getWarning() {
		return warning;
	}

	// Methods
	/**
	 * This method will refresh the chat
	 */
	public ArrayList<String> refreshChat(String[] players) {

		ResultSet result;
		int i = 0;

		// In this ArrayList we will save the messages
		ArrayList<String> chatMessages = new ArrayList<String>();

		// Array of parameters for the query
		String[] params = new String[FIVE_PARAMETER_ARRAY];
		params[TIMESTAMP_INDEX] = lastChatMessage[TIMESTAMP_INDEX];
		params[SECOND_POSITION] = players[0];
		params[THIRTH_POSITION] = players[1];
		params[FOURTH_POSITION] = players[2];
		params[FIFTH_POSITION] = players[3];

		// Check if the user doesn't sent more than one message in a second
		try {

			// Query to get the chat messages
			result = dC.select("SELECT * FROM chatregel WHERE tijdstip > ? AND (idspeler = ? OR idspeler = ? OR idspeler = ? OR idspeler = ?)", params);

			// The message will be saved in the ArraList in three seperated peaces
			while (result.next()) {
				chatMessages.add(i, result.getString(TIMESTAMP_GETINDEX));
				chatMessages.add(i + 1, result.getString(USER_ID_GETINDEX));
				chatMessages.add(i + 2, result.getString(MESSAGE_GETINDEX));

				// Save the last updated message
				lastChatMessage[TIMESTAMP_INDEX] = result.getString(TIMESTAMP_GETINDEX);
			}

		} catch (SQLException e) {
			System.out.println("Warning: [Chat Model] - Get chas message has failed");
			e.printStackTrace();
		}

		return chatMessages;
	}

	/**
	 * This method will throw a chat to the database
	 * 
	 * @param message
	 * @param username
	 */
	public void addmessagetoDatabase(String message, int userID) {

		// Reset Warning String
		this.warning = null;

		// Time Format
		String timeStamp = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(Calendar.getInstance().getTime());

		String[] params = new String[3];
		// Parameters array

		params[USER_ID_INDEX] = userID + "";
		params[TIMESTAMP_INDEX] = timeStamp;
		params[MESSAGE_INDEX] = message;

		if (!(this.timeStampLastMessage.equals(timeStamp))) {
			try {
				// Query to insert a chatregel
				dC.updateInsertDelete("INSERT IGNORE INTO chatregel (tijdstip, idspeler , bericht) VALUES (?, ?, ?)", params);

			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			// Set warning String
			this.warning = "Systeem - Het is niet toegestaan om de database te spammen!";
		}

		this.timeStampLastMessage = timeStamp;
	}

	public String getUsername(String userID) {

		ResultSet result;
		String resultString = null;

		// Parameters array
		String[] params = new String[ONE_PARAMETER_ARRAY];
		params[USER_ID_POSTION] = userID;

		try {
			// Query to insert a chatregel
			result = dC.select("SELECT username FROM speler WHERE idspeler = ?", params);

			while (result.next()) {
				resultString = result.getString(USERNAME_COLUM);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return resultString;

	}

	/**
	 * This method will get the players who are in the game that is playing at the
	 * moment
	 * 
	 * @param gameID
	 * @return
	 */
	public String[] playerInGame(int gameID) {
		String[] players = new String[AMOUNT_OF_PLAYERS];

		ResultSet result;

		// Array with parameters
		String[] params = new String[ONE_PARAMETER_ARRAY];
		params[GAME_ID_POSTION] = Integer.toString(gameID);

		try {
			// Execute query
			result = dC.select("SELECT idspeler FROM speler WHERE idspel = ?", params);

			// Save result in String[]
			int counter = 0;
			while (result.next()) {
				players[counter] = result.getString(USER_ID_INDEX);
				counter++;
			}
		} catch (Exception e) {
			e.printStackTrace();

		}

		return players;
	}

}
