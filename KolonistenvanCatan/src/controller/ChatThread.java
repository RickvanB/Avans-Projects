package controller;

import java.util.ArrayList;

import model.Chat;

/**
 * This class is responisble for running the second thread which will check
 * every second if there are new chat messages
 * 
 * @author Jip van Heugten
 *
 */
public class ChatThread extends Thread {

	// Variables
	private boolean gameIsRunning;
	private final static long SLEEP_TIME = 1;
	private ArrayList<String> chats;
	
	String[] players;

	// Objects
	private Chat chatModel;
	private ChatUpdater chatUpdater;

	// Constructor
	public ChatThread(Chat chat, ChatUpdater chatupdater, String[] players) {
		this.chatModel = chat;
		this.chatUpdater = chatupdater;
		this.players = players;

		chats = new ArrayList<>();

		gameIsRunning = true;
	}

	// Getters and Setters
	public ArrayList<String> getChats() {
		return chats;
	}
	
	// To stop the thread 
	public void setGameIsRunning(boolean gameIsRunning) {
		this.gameIsRunning = gameIsRunning;
	}

	public void setChats(ArrayList<String> chats) {
		this.chats = chats;
	}

	// Methods
	@SuppressWarnings("static-access")
	@Override
	/**
	 * Will run the second thread
	 */
	public void run() {
		super.run();

		while (this.gameIsRunning) {
			this.setChats(this.chatModel.refreshChat(this.players));
			this.chatUpdater.fillChatBox();
			try {
				this.sleep(SLEEP_TIME);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}

	}

}
