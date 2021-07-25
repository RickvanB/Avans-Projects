package model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SignInModel {
	
	//Variables
	private final static int USERNAME_COLUM = 1;
	private final static int PASSWORD_COLUM = 2;
	
	private final static int POSITION_ZERO = 0;
	private final static int POSITION_ONE = 1;

	// Objects
	DatabaseCommunicator dc;

	// Constructor
	public SignInModel() {

		// Instantiating objects
		dc = DatabaseCommunicator.getInstance();
	}

	// Methods
	/**
	 * This method will return an Array with the password and username from am user.
	 * 
	 * @return
	 */
	public String[] getLoginCredentials(String username) {

		// Return values
		String[] uP = new String[2];

		// Username
		String[] parms = new String[1];
		parms[0] = username;

		try {
			ResultSet result = dc.select("SELECT *  FROM account WHERE username = ?", parms);
			// This while statement will get all of the values out of the resultset
					while(result.next()) {
						uP[POSITION_ZERO] = result.getString(USERNAME_COLUM);
						uP[POSITION_ONE] = result.getString(PASSWORD_COLUM);
					}



		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Warning: [SignIn Model] - Login not succesfull");

		}

		return uP;
	}
}
