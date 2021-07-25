package model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Spelbord {
	private DatabaseCommunicator communicator;
	public Spelbord() {
		communicator = DatabaseCommunicator.getInstance();
	}

	public void addTileToDb(int idspel, int idtegel, int x, int y, char idgrondstofsoort, int idgetalfiche) {
		String query = "INSERT INTO tegel (idspel, idtegel, x, y, idgrondstofsoort, idgetalfiche) VALUES (?, ?, ?, ?, ?, ?)";
		String[] params;
		if (idgetalfiche == 0) {
			query = "INSERT INTO tegel (idspel, idtegel, x, y, idgrondstofsoort, idgetalfiche) VALUES (?, ?, ?, ?, ?, NULL)";
			params = new String[]{ Integer.toString(idspel), Integer.toString(idtegel), Integer.toString(x),
					Integer.toString(y), Character.toString(idgrondstofsoort)};
		} else {
			params = new String[]{ Integer.toString(idspel), Integer.toString(idtegel), Integer.toString(x),
					Integer.toString(y), Character.toString(idgrondstofsoort), Integer.toString(idgetalfiche) };
		}
		communicator.updateInsertDelete(query, params);
	}

	public String getMaterialAtTile(int idspel, int idtegel) {
		String query = "SELECT idgrondstofsoort FROM tegel WHERE idspel = ? AND idtegel = ?";
		String[] params = {Integer.toString(idspel), Integer.toString(idtegel)};
		String material = "";
		try {
			ResultSet result = communicator.select(query, params);
			result.next();
			material = result.getString(1);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return material;
	}
}
