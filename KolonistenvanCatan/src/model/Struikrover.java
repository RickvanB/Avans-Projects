package model;

import java.sql.ResultSet;

/**
 * This class gets the bandit from the database
 * @author Tim Noordhoorn
 *
 */

public class Struikrover {
	
	//Objects
	private DatabaseCommunicator db;
	
	//Variables
	private static final int LOCATION_VALUES = 2;
	private static final int QUERY_LENGTH = 2;
	private static final int X_INDEX = 1;
	private static final int Y_INDEX = 2;
	private static final int POS1 = 0;
	private static final int POS2 = 1;
	
	//Constructor
	public Struikrover() {
		db = DatabaseCommunicator.getInstance();
	}
	
	//Methods
	/**
	 * This method gets the x and y value of the tile with the bandit on it.
	 * 
	 * @param gameID
	 */
	public int[] getLocation(int gameID) {
		int[] location = new int[LOCATION_VALUES];
		
		ResultSet result;
		
		String[] params = new String[QUERY_LENGTH];
		params[0] = gameID + "";
		params[1] = gameID + "";
		
		try {
			result = db.select("SELECT x, y FROM tegel WHERE idtegel = (SELECT struikrover_idtegel FROM spel WHERE idspel = ?) AND idspel = ?", params);
			
			int counter = 0;
			while (result.next()) {
				location[counter] = Integer.parseInt(result.getString(X_INDEX));
				location[counter + 1] = Integer.parseInt(result.getString(Y_INDEX));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return location;
	}
	
	/**
	 * This method gives a string with the location of the bandit defined as x,y
	 *
	 *@param gameID
	 */
	public String getCoordinates(int gameID) {
		int[] coor = this.getLocation(gameID);
		String coordinates = coor[POS1] + "," + coor[POS2];
		return coordinates;
	}
	
}
