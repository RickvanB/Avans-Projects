package model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Player {

	private DatabaseCommunicator dc;
	
	private final static int ONE_PARAMETER_ARRAY = 1;
	private final static int FIRST_VALUE_ARRAY = 0;
	
	private int currentGameId;
	

	public Player()

	{
		this.dc = DatabaseCommunicator.getInstance();
	}
	
	/**
	 * Gets all raw materials that belong to a player
	 * @param spelId
	 * @param spelerId
	 * @return ResultSet result
	 */
	public ResultSet getRawMaterials(int spelId, int spelerId)
	{
		String query = "SELECT grondstofsoort.soort, COUNT(grondstofsoort.soort) AS aantal FROM spelergrondstofkaart JOIN grondstofkaart ON spelergrondstofkaart.idgrondstofkaart = grondstofkaart.idgrondstofkaart JOIN grondstofsoort ON grondstofkaart.idgrondstofsoort = grondstofsoort.idgrondstofsoort WHERE idspel = ? AND idspeler = ? GROUP BY grondstofsoort.soort";
		String[] params = {Integer.toString(spelId), Integer.toString(spelerId)};
		ResultSet result = null;
		try {
			result = this.dc.select(query, params);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	public ResultSet getRawMaterialsAll()
	{
		String query = "SELECT DISTINCT soort FROM grondstofsoort";
		String[] params = {};
		ResultSet result = null;
		try {
			result = this.dc.select(query, params);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * Check in the database if the game already exists
	 * @param String playerId
	 * @return ResultSet
	 */
	public ResultSet gameExists(String playerId)
	{
		String query = "SELECT COUNT(idspeler) FROM spelerstuk WHERE idspeler = ?;";
		String[] params = { playerId };
		ResultSet result = null;
		try {
			result = this.dc.select(query, params);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * This method returns the current game Id
	 * 
	 * @param int spelerId
	 */
	public int getGameID(int spelerId) {

		// ResultSet to save the values the query will return
		ResultSet result;

		// Array of parameters
		String[] params = new String[ONE_PARAMETER_ARRAY];
		params[FIRST_VALUE_ARRAY] = Integer.toString(spelerId);

		try {
			result = this.dc.select(
					"SELECT DISTINCT spel.idspel FROM spel RIGHT JOIN speler ON spel.idspel = speler.idspel WHERE speler.idspeler = ?",
					params);

			int counter = 1;

			while (result.next()) {
				this.currentGameId = Integer.parseInt(result.getString(counter));

			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return this.currentGameId;

	}
	
}
