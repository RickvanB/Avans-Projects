package model;

import java.sql.ResultSet;

public class Bank {

	private DatabaseCommunicator dc;
	
	public Bank()
	{
		this.dc = DatabaseCommunicator.getInstance();
	}
	
	/**
	 * 
	 * @param spelId
	 * @return
	 */
	public ResultSet getAllRawMaterials(int spelId)
	{
		String query = "SELECT grondstofsoort.soort, COUNT(grondstofsoort.soort) AS aantal FROM spelergrondstofkaart JOIN grondstofkaart ON spelergrondstofkaart.idgrondstofkaart = grondstofkaart.idgrondstofkaart JOIN grondstofsoort ON grondstofkaart.idgrondstofsoort = grondstofsoort.idgrondstofsoort WHERE idspel = ? AND spelergrondstofkaart.idspeler IS NULL GROUP BY grondstofsoort.soort";
		String[] params = {Integer.toString(spelId)};
		ResultSet result = null;
		try {
			result = this.dc.select(query, params);
		} catch(Exception e) {
			System.out.println("Warning: [Bank Model] - Get materials failed");
			e.printStackTrace();
		}
		
		return result;
	}
	
	
}
