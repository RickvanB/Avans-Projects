package model;

import java.sql.ResultSet;

public class Worp {

	// Variables
	private final static int AMOUNT_OF_DICE = 2;
	private final static int DICE1 = 1;
	private final static int DICE2 = 2;
	private static final int DEFAULT = 1;

	// Objects
	private DatabaseCommunicator db;

	public Worp() {
		this.db = DatabaseCommunicator.getInstance();
	}

	/**
	 * Update last worp
	 * 
	 * @param int
	 *            worp1
	 * @param int
	 *            worp2
	 * @param boolean
	 *            gedobbeld
	 * @param int
	 *            idSpel
	 */
	public void insert(int throw1, int throw2, boolean thrown, int gameID) {
		int truefalse = 0;
		if (thrown) {
			truefalse = 1;
		}

		String[] params = { Integer.toString(truefalse), Integer.toString(throw1), Integer.toString(throw2),
				Integer.toString(gameID) };

		try {
			this.db.updateInsertDelete(
					"UPDATE spel SET gedobbeld=?, laatste_worp_steen1=?, laatste_worp_steen2=? WHERE idspel=?", params);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * This method will get the last thrown results
	 */
	public int[] refreshDies(int gameID) {
		// Return array
		int[] results = new int[AMOUNT_OF_DICE];

		ResultSet result;

		// Array with parameters
		String[] params = { Integer.toString(gameID) };

		try {
			result = db.select("SELECT laatste_worp_steen1, laatste_worp_steen2 FROM spel WHERE idspel = ?", params);

			int counter = 0;

			while (result.next()) {
				if (result.getString(DICE1) != null && result.getString(DICE2) != null) {
					results[counter] = Integer.parseInt(result.getString(DICE1));
					results[counter + 1] = Integer.parseInt(result.getString(DICE2));
				} else {
					// Check if dice result == null
					results[counter] = DEFAULT;
					results[counter + 1] = DEFAULT;
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return results;
	}

}
