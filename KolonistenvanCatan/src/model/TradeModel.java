package model;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;

public class TradeModel {

	// Variables
	private final static String WOOD = "wood";
	private final static String ORE = "ore";
	private final static String WOOL = "wool";
	private final static String BRICK = "brick";
	private final static String GRAIN = "grain";
	private final static String FALSE = "0";
	private final static String TRUE = "1";

	private final static String ACCEPTED = "accepted";
	private final static String DENIED = "denied";
	private final static String COUNTERBID = "counterbid";

	private final static int USERID = 1;
	private final static int AMOUNT_OF_PLAYERS = 4;
	private static final int AMOUNT_OF_RETURNVALUES = 10;

	// Objects
	private DatabaseCommunicator dC;

	// Constructor
	public TradeModel() {
		dC = DatabaseCommunicator.getInstance();
	}

	/**
	 * This method will create a trade request in the database
	 * 
	 * @param userIDTrader
	 * @param give
	 * @param wanted
	 */
	public void insertTradeRequest(int userIDTrader, HashMap<String, Integer> give, HashMap<String, Integer> wanted, boolean accepted) {

		String[] params;
		
		if(accepted) {
			params = new String[]{ Integer.toString(userIDTrader), Integer.toString(give.get(BRICK)),
					Integer.toString(give.get(WOOL)), Integer.toString(give.get(ORE)), Integer.toString(give.get(GRAIN)),
					Integer.toString(give.get(WOOD)), Integer.toString(wanted.get(BRICK)),
					Integer.toString(wanted.get(WOOL)), Integer.toString(wanted.get(ORE)),
					Integer.toString(wanted.get(GRAIN)), Integer.toString(wanted.get(WOOD)), TRUE };
		} else {
			params = new String[]{ Integer.toString(userIDTrader), Integer.toString(give.get(BRICK)),
					Integer.toString(give.get(WOOL)), Integer.toString(give.get(ORE)), Integer.toString(give.get(GRAIN)),
					Integer.toString(give.get(WOOD)), Integer.toString(wanted.get(BRICK)),
					Integer.toString(wanted.get(WOOL)), Integer.toString(wanted.get(ORE)),
					Integer.toString(wanted.get(GRAIN)), Integer.toString(wanted.get(WOOD)), FALSE };
		}

		String query = "INSERT INTO ruilaanbod (idspeler, geeft_baksteen, geeft_wol, geeft_erts, geeft_graan, geeft_hout, vraagt_baksteen, vraagt_wol, vraagt_erts, vraagt_graan, vraagt_hout, geaccepteerd) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

		// Execute query
		try {
			dC.updateInsertDelete(query, params);

		} catch (Exception e) {
			System.out.println("Warning: [Trade Model] - Inserting a trade request failed");
			e.printStackTrace();
		}
	}

	/**
	 * This method will find out if the trade request is accepted or not
	 * 
	 * @param userIDS
	 * @param give
	 * @param wanted
	 */
	public HashMap<Integer, String> isTradeAccepted(String[] userIDS, HashMap<String, Integer> give,
			HashMap<String, Integer> wanted) {
		// Return boolean
		HashMap<Integer, String> userID = new HashMap<>();

		// In the default situation everybody does a counterbid
		for (int i = 0; i < AMOUNT_OF_PLAYERS; i++) {
			userID.put(Integer.parseInt(userIDS[i]), COUNTERBID);
		}

		ResultSet result;

		String[] params = { Integer.toString(wanted.get(BRICK)), Integer.toString(wanted.get(WOOL)),
				Integer.toString(wanted.get(ORE)), Integer.toString(wanted.get(GRAIN)),
				Integer.toString(wanted.get(WOOD)), Integer.toString(give.get(BRICK)), Integer.toString(give.get(WOOL)),
				Integer.toString(give.get(ORE)), Integer.toString(give.get(GRAIN)), Integer.toString(give.get(WOOD)),

				userIDS[0], userIDS[1], userIDS[2], userIDS[3]

		};

		// First Query is to check if someone has accepted the request
		try {
			result = dC.select(
					"SELECT idspeler FROM ruilaanbod WHERE (geeft_baksteen = ? AND geeft_wol = ? AND geeft_erts = ? AND geeft_graan = ? AND geeft_hout = ? AND vraagt_baksteen = ? AND vraagt_wol = ? AND vraagt_erts = ? AND vraagt_graan = ? AND vraagt_hout = ? AND geaccepteerd = 1 AND (idspeler = ? OR idspeler = ? OR idspeler = ? OR idspeler = ?))",
					params);

			while (result.next()) {
				userID.replace(Integer.parseInt(result.getString(USERID)), ACCEPTED);
			}

		} catch (Exception e) {
			System.out.println("Warning: [Trade Model] - Checking if trade request is accepted has failed");
			e.printStackTrace();
		}

		// Second query is to check if someone has denied the request
		String[] params2 = { userIDS[0], userIDS[1], userIDS[2], userIDS[3] };
		result = null;
		try {
			result = dC.select(
					"SELECT idspeler FROM ruilaanbod WHERE (geeft_baksteen = 0 AND geeft_wol = 0 AND geeft_erts = 0 AND geeft_graan = 0 AND geeft_hout = 0 AND vraagt_baksteen = 0 AND vraagt_wol = 0 AND vraagt_erts = 0 AND vraagt_graan = 0 AND vraagt_hout = 0 AND geaccepteerd = 0 AND (idspeler = ? OR idspeler = ? OR idspeler = ? OR idspeler = ?))",
					params2);

			while (result.next()) {
				userID.replace(Integer.parseInt(result.getString(USERID)), DENIED);

			}
		} catch (Exception e) {
			System.out.println("Warning: [Trade Model] - Checking if trade request is accepted has failed");
			e.printStackTrace();
		}

		return userID;

	}

	/**
	 * This method will get the TradeResults from the database
	 * 
	 * @param playerIDS
	 * @param userID2
	 * @return
	 */
	public String[] getTradeRequests(int userID) {
		// ResultString
		String[] retString = new String[AMOUNT_OF_RETURNVALUES];

		ResultSet result;

		// Parameters
		String[] params = { Integer.toString(userID) };

		try {
			result = dC.select(
					"SELECT geeft_baksteen, geeft_erts, geeft_graan, geeft_hout, geeft_wol, vraagt_baksteen, vraagt_erts, vraagt_graan, vraagt_hout, vraagt_wol FROM ruilaanbod WHERE idspeler = ?",
					params);

			while (result.next()) {
				for (int i = 0; i < AMOUNT_OF_RETURNVALUES; i++) {
					retString[i] = result.getString(i + 1);
				}
			}
		} catch (Exception e) {

			System.out.println("Warning: [Trade Model] - No Awnser Found:" + userID);
			e.printStackTrace();
		}

		return retString;
	}

	/**
	 * This method will clear the database
	 * 
	 * @param userID
	 */
	public void clearDatabase(String[] userIDS) {

		String[] params = userIDS;

		try {

			dC.updateInsertDelete(
					"DELETE FROM ruilaanbod WHERE idspeler = ? OR idspeler = ? OR idspeler = ? OR idspeler = ?",
					params);

		} catch (Exception e) {
			System.out.println("Warning: [Trade Model] - Can't clear the database");
			e.printStackTrace();
		}

	}

}
