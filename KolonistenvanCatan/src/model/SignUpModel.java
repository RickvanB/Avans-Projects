package model;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * class responsible for adding an account to the database and checking if a username exists in the database
 * @author Thomas Maassen
 *
 */

public class SignUpModel {
	DatabaseCommunicator communicator;
	
	public SignUpModel() {
		communicator = DatabaseCommunicator.getInstance();
	}
	
	public void addAccount(String username, String wachtwoord) {
		String query = "INSERT INTO account (username, wachtwoord) VALUES (?, ?)";
		String[] params = {username, wachtwoord};
		communicator.updateInsertDelete(query, params);
	}
	
	public int countUsername(String username) {
		int counter = 0;
		String query = "SELECT COUNT(username) FROM account WHERE username = ?";
		String[] params = {username};
		ResultSet result = communicator.select(query, params);
		try {
			result.next();
			counter = result.getInt(1);
		} catch (SQLException e) {
			System.out.println("Warning: [Sign Up Model] - Signing up has failed");
			e.printStackTrace();
		}
		return counter;
	}
}
