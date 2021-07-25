package model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * This class is responsible for communication with the database by sending data
 * about the bandit
 * 
 * @author Jip van Heugten
 *
 */
public class BanditModel {

	// Variables
	private int gameID;
	private final static int BANDIT_POSITION = 1;
	private final static int MATERIALSCODE_RETURN_POSITION = 1;
	private final static int USERID_RETURN_POSITION = 1;
	private final static int TILEPOS_RETURN_POSITION = 1;

	// Objects
	private DatabaseCommunicator dC;

	// Constructor
	public BanditModel(int gameID) {
		// Instatiating objects
		this.dC = DatabaseCommunicator.getInstance();

		this.gameID = gameID;

	}

	// Methods
	public boolean replaceBandit(int tileID) {
		// Return boolean
		boolean placementSuccesfull = false;

		// Parameters
		String[] params = { Integer.toString(tileID), Integer.toString(gameID) };

		try {

			dC.updateInsertDelete("UPDATE spel SET struikrover_idtegel = ? WHERE idspel = ?", params);
			placementSuccesfull = true;
		} catch (Exception e) {
			System.out.println("Warning: [Bandit Model] - Replacement has failed");
			e.printStackTrace();
		}

		return placementSuccesfull;
	}

	/**
	 * This method will get the location of the bandit
	 * 
	 * @return
	 */
	public int getBanditPosition() {
		// Return int
		int banditPostion = 10;

		ResultSet result;

		// Parameters
		String[] params = { Integer.toString(gameID) };

		try {
			result = dC.select("SELECT struikrover_idtegel FROM spel WHERE idspel = ?", params);

			if (result.next()) {
				// Save the results
				if(result.getString(BANDIT_POSITION) != null) {
					banditPostion = Integer.parseInt(result.getString(BANDIT_POSITION));		
				}
			}

		} catch (Exception e) {
			System.out.println("Warning: [Bandit Model] - Get the location of the bandit failed");
			e.printStackTrace();
		}

		return banditPostion;
	}

	public ArrayList<String> getMaterials(int userID) {
		// Return ArrayList
		ArrayList<String> materials = new ArrayList<>();

		ResultSet result;

		// Parameters
		String[] params = { Integer.toString(gameID), Integer.toString(userID) };

		try {

			result = dC.select("SELECT idgrondstofkaart FROM spelergrondstofkaart WHERE idspel = ? AND idspeler = ?",
					params);

			while (result.next()) {
				materials.add(result.getString(MATERIALSCODE_RETURN_POSITION));
			}
		} catch (Exception e) {
			System.out.println("Warning: [Bandit Model] - Gettings materials of player has failed");
			e.printStackTrace();
		}

		return materials;
	}

	public int getUserID(String username) {
		// Return integer
		int userID = 0;

		ResultSet result;

		// Parameters
		String[] params = { username, Integer.toString(gameID) };

		try {
			result = dC.select("SELECT idspeler FROM speler WHERE username = ? AND idspel = ?", params);

			while (result.next()) {
				userID = Integer.parseInt(result.getString(USERID_RETURN_POSITION));
			}
		} catch (Exception e) {
			System.out.println("Warning: [Bandit Model] - Getting the userID has failed");
			e.printStackTrace();
		}

		return userID;
	}
	
	public String getUsername(int userID) 
	{
		String username = null;
		ResultSet result;
		
		String query = "SELECT DISTINCT username FROM speler WHERE idspeler = ?";
		String[] params = {Integer.toString(userID)};
		
		try {
			result = this.dC.select(query, params);
			while(result.next()) {
				username = result.getString(1);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return username;
	}

	/**
	 * This method will check if there are buildings from a specified player on a
	 * tile
	 * 
	 * @param userID
	 * @param y_van
	 * @param x_van
	 * @return
	 */
	public ArrayList<String> checkUserOnBuildings(int userID, HashMap<Integer, Integer> y_van,
			HashMap<Integer, Integer> x_van) {
		DistributeMateriallModel dMM = new DistributeMateriallModel();

		// Check Tile on Buildings
		ArrayList<String> buildings = dMM.checkTileOnBuildings(Integer.toString(userID), y_van, x_van);

		return buildings;

	}

	public int getPositionOfTile(String x_Or_y, int idTile) {
		// Return int
		int position = 0;
		String query;
		
		ResultSet result;

		String x_OR_Y;
		if (x_Or_y.equals("x")) {
			x_OR_Y = "x";
			query = "SELECT x FROM tegel WHERE idtegel = ? AND idspel = ?";
		} else {
			query = "SELECT y FROM tegel WHERE idtegel = ? AND idspel = ?";
			x_OR_Y = "y";
		}

		// Parameters
		String[] params = { Integer.toString(idTile), Integer.toString(gameID) };

		try {
			result = dC.select(query, params);
			
			// Translate data
			while (result.next()) {
				position = Integer.parseInt(result.getString(TILEPOS_RETURN_POSITION));
			}
		} catch (Exception e) {
			System.out.println("Warning: [Bandit Model] - getting X or Y Pos has failed");
			e.printStackTrace();
		}

		return position;
	}

	public int getTileId(int x, int y) {
		int tileid = 0;
		String query = "SELECT idtegel FROM tegel WHERE x = ? AND y = ? AND idspel = ?";
		String[] params = { Integer.toString(x), Integer.toString(y), Integer.toString(gameID) };
		ResultSet result = dC.select(query, params);
		try {
			result.next();
			tileid = result.getInt(1);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return tileid;
	}

	public int[] getCordsFromId(int tileId) {
		int[] returnArray = {0, 0};
		String query = "SELECT x, y FROM tegel WHERE idtegel = ? and idspel = ?";
		String[] params = {Integer.toString(tileId), Integer.toString(gameID)};
		ResultSet result = dC.select(query, params);
		try {
			result.next();
			returnArray[0] = result.getInt(1);
			returnArray[1] = result.getInt(2);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return returnArray;
	}

}
