package controller;

import java.util.ArrayList;

import javax.swing.JTextArea;
import javax.swing.JTextField;

import model.Chat;
import view.ChatBox;

/**
 * This class will control the update process of the ChatBox and forms the
 * connection between Chat and ChatBox
 * 
 * @author Jip van Heugten
 *
 */
public class ChatUpdater {

	// Variables
	private final static int TIMESTAMP_INDEX = 3;
	private final static int MESSAGE_INDEX = 1;
	private final static int USERID_INDEX = 2;
	private final static int AMOUNT_OF_PLAYERS = 4;

	// Objects
	private JTextArea text;
	private JTextField textInput;
	private ChatBox chatboxclass;

	// Second Thread
	private ChatThread chatUpdateThread;

	// Chat model class
	private Chat chatmodel;

	// Constructor
	public ChatUpdater(JTextArea chatbox, JTextField chatInput, ChatBox chatboxClass, int gameID) {
		// Instantiating objects
		text = chatbox;
		textInput = chatInput;

		this.chatboxclass = chatboxClass;

		// Creating Chat classes To update and add/get message
		chatmodel = new Chat();

		// Get players who are in the game
		String[] players = new String[AMOUNT_OF_PLAYERS];
		players = chatmodel.playerInGame(gameID);

		chatUpdateThread = new ChatThread(chatmodel, this, players);

		// Start second Thread
		this.updateChat();

	}

	// Getter
	public ChatThread getChatUpdateThread() {
		return chatUpdateThread;
	}

	// Methods
	/**
	 * This method will activate the chat input
	 */
	public void chatInput(int userID) {
		// Get message from input
		String input = textInput.getText();
		input = input.trim();

		// Check if the input is not only a blankspace
		if (input.length() > 0) {
			this.addNewChatMessage(input, userID);
			// Reset the text field
			textInput.setText(null);
		}

	}

	/**
	 * This method will put the message to the model class
	 * 
	 * @param message
	 * @param userID
	 */
	public void addNewChatMessage(String message, int userID) {

		chatmodel.addmessagetoDatabase(message, userID);

		// Show warning to prevent the database for being spammed
		if (chatmodel.getWarning() != null) {
			text.append(chatmodel.getWarning() + "\n");
		}

	}

	/**
	 * This method will activate the chatUpdater Thread
	 */
	public void updateChat() {
		chatUpdateThread.start();

	}

	/**
	 * This method will fill the ChatBox with message
	 */
	public void fillChatBox() {
		// To save the chat components
		ArrayList<String> chats = new ArrayList<>();

		chats = chatUpdateThread.getChats();

		for (int i = (chats.size()); i > 0; i -= 3) {
			// Final message
			String chatmessage;

			String timeStamp = chats.get(i - TIMESTAMP_INDEX);
			String userID = chats.get(i - USERID_INDEX);
			String message = chats.get(i - MESSAGE_INDEX);

			String correctedTimeStamp = timeStamp.substring(2, 16); // Delete mile-Seconds
			String year = correctedTimeStamp.substring(0, 2); // Year
			String month = correctedTimeStamp.substring(3, 5); // Month
			String day = correctedTimeStamp.substring(6, 8); // Day
			String time = correctedTimeStamp.substring(9); // Time

			String europTimeStamp = time + " " + day + "-" + month + "-" + year;

			// Set username
			String username = chatmodel.getUsername(userID);
			if (username == null) {
				username = "Annoniem";
			}

			// Make notification that there's a new message
			this.chatboxclass.gotNewMessage();

			chatmessage = europTimeStamp + " - " + username + ": - " + message + "\n";

			text.append(chatmessage);
		}
	}

}
