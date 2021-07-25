package model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import controller.Player;

public class MaterialOverviewModel {
	
	private ArrayList<Player> spelers;
	private DatabaseCommunicator dC;
	
	private int gameID;
	
	public MaterialOverviewModel(int gameID) {
		this.gameID = gameID;
		spelers = new ArrayList<Player>();
		dC = DatabaseCommunicator.getInstance();
	}
	
	public void setSpelerArray(String[] spelers) {
		for (String s : spelers) {
			int spelerID = Integer.parseInt(s);
			this.spelers.add(new Player(gameID, spelerID));
		}
	}
	
	public HashMap<String, Integer> getRawMaterials() {
		HashMap<String, Integer> overview = new HashMap<String, Integer>();
		for (Player s : this.spelers) {
			int amount = 0;
			ResultSet result = s.getRawMaterials(s.getSpelerId());
			try {
				while (result.next()) {
					amount = amount + result.getInt(2);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			overview.put(this.getUsername(s.getSpelerId()), amount);
		}
		return overview;
	}
	
	private String getUsername(int spelerid) {
		String query = "SELECT username FROM speler WHERE idspeler = ?;";
		String[] params = { Integer.toString(spelerid) };
		ResultSet result = dC.select(query, params);
		try {
			while (result.next()) {
				return result.getString(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return null;
	}
}
