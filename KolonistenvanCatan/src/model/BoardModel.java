package model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import controller.enums.Material;

/**
 * This class contains all the locations
 * 
 * @author Xia
 *
 */
public class BoardModel {

	private static ArrayList<Location> locations;
	private DatabaseCommunicator dC;

	public BoardModel() {
		dC = DatabaseCommunicator.getInstance();
		BoardModel.locations = new ArrayList<Location>();
		this.setLocations();
	}

	private void setLocations() {
		String query = "SELECT * FROM locatie;";
		ResultSet result = dC.select(query, null);
		try {
			while (result.next()) {
				if (result.getString(4) == null) {
					BoardModel.locations.add(new Location(result.getInt(1), result.getInt(2),
							result.getBoolean(3), null));
				} else {
				BoardModel.locations.add(new Location(result.getInt(1), result.getInt(2),
						result.getBoolean(3), this.getMaterialfromString(result.getString(4))));
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private Material getMaterialfromString(String material) {
		switch (material) {
		case "B":
			return Material.BRICK;
		case "E":
			return Material.ORE;
		case "G":
			return Material.GRAIN;
		case "H":
			return Material.WOOD;
		default:
			return Material.WOOL;
		}
	}

	public static ArrayList<Location> getLocations() {
		return locations;
	}
	
	/*
	 * checks if player has a 2 for 1 harbor
	 */
	public boolean has2For1Harbor(int idspeler) {
		boolean hasHarbor = false;
		String query = "SELECT x_van, y_van FROM spelerstuk WHERE idspeler = ? AND x_van IS NOT NULL AND x_naar IS NULL;";
		String[] params = { Integer.toString(idspeler) };
		ResultSet result = dC.select(query, params);
		try {
			while (result.next()) {
				for (Location l : locations) {
					if (l.getxPos() == result.getInt(1) && l.getyPos() == result.getInt(2)) {
						if (l.hasHarbor() && l.getMaterialType() != null) {
							hasHarbor = true;
						}
					}
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return hasHarbor;
	}
	
	/*
	 * checks if player has a 3 for 1 harbor
	 */
	public boolean has3For1Harbor(int idspeler) {
		boolean hasHarbor = false;
		String query = "SELECT x_van, y_van FROM spelerstuk WHERE idspeler = ? AND x_van IS NOT NULL AND x_naar IS NULL;";
		String[] params = { Integer.toString(idspeler) };
		ResultSet result = dC.select(query, params);
		try {
			while (result.next()) {
				for (Location l : locations) {
					if (l.getxPos() == result.getInt(1) && l.getyPos() == result.getInt(2)) {
						if (l.hasHarbor() && l.getMaterialType() == null) {
							hasHarbor = true;
						}
					}
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return hasHarbor;
	}

	/**
	 * check if the player has a 2 for 1 harbor
	 * @return
	 */
	public static ArrayList<Location> getHarborLocations2For1() {
		ArrayList<Location> harborLocations = new ArrayList<Location>();
		for (Location l : BoardModel.getLocations()) {
			if (l.hasHarbor() && l.getMaterialType() != null) {
				harborLocations.add(l);
			}
		}
		return harborLocations;
	}
	
	/**
	 * check if the player has a 3 for 1 harbor
	 * @return
	 */
	public static ArrayList<Location> getHarborLocations3For1() {
		ArrayList<Location> harborLocations = new ArrayList<Location>();
		for (Location l : BoardModel.getLocations()) {
			if (l.hasHarbor() && l.getMaterialType() == null) {
				harborLocations.add(l);
			}
		}
		return harborLocations;
	}
	
	public static Location getLocation(int x, int y) {
		for (Location l : locations) {
			if (l.getxPos() == x && l.getyPos() == y) {
				return l;
			}
		}
		return null;
	}
	
	public static boolean checkIfLocationExists(int x, int y) {
		for (Location l : locations) {
			if (l.getxPos() == x && l.getyPos() == y) {
				return true;
			}
		}
		return false;
	}

}
