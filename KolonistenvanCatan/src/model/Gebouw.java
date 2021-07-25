package model;

import java.awt.Color;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Gebouw {

	// MVC Difficulties. How van Gebouw and GebouwView stay seperated?

	private int id;
	private String spelerId;
	private DatabaseCommunicator dC;
	private String x1;
	private String x2;
	private String y1;
	private String y2;

	public Gebouw() {
		dC = DatabaseCommunicator.getInstance();
//		//Ferran test
//		Invite i = new Invite();
//		i.invitePlayer(770, "Jip");
	}

	public void placeSettlement(int x1, int y1, int spelerId) {
		ResultSet result;

		this.spelerId = Integer.toString(spelerId);
		this.x1 = Integer.toString(x1);
		this.y1 = Integer.toString(y1);

		String[] params = { this.spelerId };

		try {

			// Query to get the chat messages
			result = dC.select(
					"SELECT idstuk FROM catan.spelerstuk WHERE idstuk LIKE 'c%' AND idspeler = ? AND x_van IS NULL AND y_van IS NULL LIMIT 1",
					params);
			String stringResult = result.getString(1);
			String[] params2 = { this.x1, this.y1, stringResult, this.spelerId };
			// The message will be saved in the ArraList in three seperated peaces
			dC.updateInsertDelete("UPDATE spelerstuk SET x_van = ?, y_van = ? WHERE spelerstuk.idstuk = ? AND idspeler = ?", params2);

		} catch (SQLException e) {

			e.printStackTrace();
		}

	}
}
	// Place city
//	public String placeCity(int x1, int y1, int spelerId) throws SQLException {
//		ResultSet result;
//		ResultSet result2;
//		this.spelerId = Integer.toString(spelerId);
//		this.x1 = Integer.toString(x1);
//		this.y1 = Integer.toString(y1);
//
//		String[] params = { this.spelerId };
//		// Query to get the chat messages
//		result = dC.select(
//				"SELECT * FROM catan.spelerstuk WHERE idstuk LIKE 'c%' AND idspeler = ? AND x_van IS NULL AND y_van IS NULL",
//				params);
//		// ("SELECT * FROM chatregel WHERE tijdstip > ? ", cords);
//
//		// Array of parameters for the query
//		String stringResult = result.getString(1);
//		String[] params2 = { this.x1, this.y1, stringResult };
//
//		// Query to get the chat messages
//		dC.updateInsertDelete("UPDATE spelerstuk SET x_van = ?, y_van = ? WHERE spelerstuk.idstuk = ?", params2);
//		// ("SELECT * FROM chatregel WHERE tijdstip > ? ", cords);
//		return stringResult;

		// public void placeRoad(int x1, int x2, int y1, int y2) {
		//
		// this.x1 = Integer.toString(x1);
		// this.x2 = Integer.toString(x2);
		// this.y1 = Integer.toString(y1);
		// this.y2 = Integer.toString(y2);
		//
		// ResultSet result;
		//
		// // Array of parameters for the query
		// String[] cords = { this.x1, this.x2, this.y1, this.y2};
		//
		// try {
		//
		// // Query to get the chat messages
		// result = dC.updateInsertDelete("UPDATE spelerstuk SET x_van = ?, y_van = ?
		// WHERE spelerstuk.idstuk = ? AND idspeler = ?" , params);
		// // ("SELECT * FROM chatregel WHERE tijdstip > ? ", cords);
		//
		// } catch (SQLException e) {
		//
		// e.printStackTrace();
		// }