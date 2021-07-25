package model;

import java.awt.Color;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GebouwOverviewModel {
	
	private DatabaseCommunicator dc;
	
	public GebouwOverviewModel() {
		dc = DatabaseCommunicator.getInstance();
	}

	public Color getColorPlayer(int userID, int gameID) {
		int volgnr = 0;
		Color playerColor = null;
		ResultSet result;
		
		String[] params = new String[2];
		params[0] = userID + "";
		params[1] = gameID + "";
		
		result = dc.select("SELECT volgnr FROM speler WHERE idspeler = ? AND idspel = ?", params);
		
		try {
			while(result.next()) {
				volgnr = result.getInt(1);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		switch(volgnr) {
		case 1 : playerColor = Color.RED;
		break;
		case 2 : playerColor = Color.WHITE;
		break;
		case 3 : playerColor = Color.BLUE;
		break;
		case 4 : playerColor = Color.ORANGE;
		break;
		default : playerColor = Color.BLACK;
		break;
		}
		
		return playerColor;
	}
	
	public String getLeftoverPieces(String type, int userID) { //Type = r for road, d for dorp and s for stad
		String amountLeft = null;
		int value = 0;
		ResultSet result;
		
		String[] params = new String[2];
		params[0] = userID + "";
		params[1] = type + "";
		
		result = dc.select("SELECT count(x_van) FROM spelerstuk WHERE idspeler = ? AND idstuk LIKE '?%' AND x_van IS NOT NULL", params);
		
		try {
			while(result.next()) {
				value = result.getInt(1);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		switch(type) {
		case "r" : amountLeft = (15 - value) + "";
		break;
		case "d" : amountLeft = (5 - value) + "";
		break;
		case "s" : amountLeft = (4 - value) + "";
		break;
		default : amountLeft = "ERROR";
		break;
		}
		
		return amountLeft;
	}

}
