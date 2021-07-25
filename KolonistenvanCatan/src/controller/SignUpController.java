package controller;

import model.SignUpModel;

public class SignUpController {
	
	private SignUpModel model;
	
	// Variables
	private final static int MIN_LENGTH_PASSWORD = 4;
	private final static int MAX_LENGTH_PASSWORD = 25;
	
	private final static int MIN_LENGTH_USERNAME = 3;
	private final static int MAX_LENGTH_USERNAME = 25;
	
	private boolean playername_Exists;
	
	public SignUpController() {
		model = new SignUpModel();
		this.playername_Exists = false;
	}

	
	public boolean isPlayername_Exists() {
		return playername_Exists;
	}


	public boolean addAcount(String username, String password) {
		// Reset boolean
		this.playername_Exists = false;
		
		//check if the username already exists
		if(model.countUsername(username) != 0) {
			this.playername_Exists = true;
			return false;
		}
		
		//check if the username and password have the correct length for the database and for password safety
		if(username.length() >= MIN_LENGTH_USERNAME && username.length() <= MAX_LENGTH_USERNAME && password.length() >= MIN_LENGTH_PASSWORD && password.length() <= MAX_LENGTH_PASSWORD) {
			//let the model class add the account
			model.addAccount(username, password);
			return true;
		}else {
			return false;
		}
	}
}
