package controller;

import javax.swing.JLabel;

import model.SignInModel;
import view.SignInWindow;

public class SignInController {

	// Variables
	private final static int USERNAME_PASSWORD = 2;
	private final static int USERNAME_PASSWORD_COUNT = 1;

	private final static String INPUT_INVALLID_MESSAGE = "Combinatie is onjuist";
	
	// Objects
	private SignInModel lM;
	private SignInWindow siw;

	// Constructor
	public SignInController(SignInWindow siw) {
		lM = new SignInModel();
		
		this.siw = siw;
	}

	// Methods
	/**
	 * This method will check the combination of the username and password
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	public boolean checkUsernamePassword(String username, String password) {

		boolean inputIsValid = false;

		// Will stop the method directly if there's no input
		if (username.trim().length() > 0 && password.trim().length() > 0) {
			// Return Array
			String[] resultSet = new String[USERNAME_PASSWORD];

			// Values return from the method GetLoginCredtials
			String usernameReturned = null;
			String passwordReturned = null;

			resultSet = lM.getLoginCredentials(username);

			// This for loop will save the return values in the resultSet array
			for (int i = 0; i < USERNAME_PASSWORD_COUNT; i++) {
				usernameReturned = resultSet[i];
				passwordReturned = resultSet[i + 1];
			}
			if (usernameReturned != null && passwordReturned != null) {
				// This if statement will check the combination of the username and password
				if (passwordReturned.equals(password) && usernameReturned.equals(username)) {
					inputIsValid = true;
				}
			}
			if(!inputIsValid) {
				siw.setMessage(INPUT_INVALLID_MESSAGE);
			}
		}
		return inputIsValid;

	}
}
