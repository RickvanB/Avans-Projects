package model;

import java.sql.ResultSet;

/**
 * This class will check if a player should refresh or set the refresh value on
 * 1 or 0
 * 
 * @author Jip van Heugten
 *
 */
public class GameRefreshModel {

	private final static int FIRST_RETURN_VALUE = 1;

	private final static String TRUE = "1";

	// Objects
	private DatabaseCommunicator dC;

	public GameRefreshModel() {
		this.dC = DatabaseCommunicator.getInstance();
	}

	// Methods
	/**
	 * This method will set the value to 0 or 1.
	 * 
	 * @param setToOne
	 */
	public void setRefreshValue(boolean setToOne, int gameID) {

		String refreschvalue;
		if (setToOne) {
			refreschvalue = "1";
		} else {
			refreschvalue = "0";
		}

		// Array with paramaters
		String[] params = { refreschvalue, Integer.toString(gameID) };

		try {
			dC.updateInsertDelete("UPDATE speler SET shouldrefresh = ? WHERE idspel = ?", params);
		} catch (Exception e) {
			System.out.println("Warning: [GameRefresch Model] Refresh has failed");
			e.printStackTrace();
		}
	}

	/**
	 * This method will check if the player should refresh
	 * 
	 * @return
	 */
	public boolean shouldRefresch(int userID) {
		// Return Boolean
		boolean shouldRefresch = false;
		String resultString = "";

		ResultSet result;

		// Array with paramaters
		String[] params = { Integer.toString(userID) };

		try {

			result = dC.select("SELECT shouldrefresh FROM speler WHERE idspeler = ?", params);

			// Results
			while (result.next()) {
				resultString = result.getString(FIRST_RETURN_VALUE);
			}

			// Check if the boolean is true or false
			if (resultString.equals(TRUE)) {
				shouldRefresch = true;
			}

		} catch (Exception e) {
			System.out.println("Warning: [GameRefresch Model] Refresh has failed");
			e.printStackTrace();
		}

		return shouldRefresch;

	}

	public void setOwnRefreshValue(boolean setToOne, int userID) {

		String refreschvalue;
		if (setToOne) {
			refreschvalue = "1";
		} else {
			refreschvalue = "0";
		}

		// Array with paramaters
		String[] params = { refreschvalue, Integer.toString(userID) };

		try {
			dC.updateInsertDelete("UPDATE speler SET shouldrefresh = ? WHERE idspeler = ?", params);
		} catch (Exception e) {
			System.out.println("Warning: Refresh has failed");
			e.printStackTrace();
		}
	}
}
