package controller;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

public class Bank {

	// Objects
	private model.Bank b;
	
	// Variables
	private ResultSet rawMaterials;
	private int gameID;

	public Bank(int gameID) {
		this.b = new model.Bank();
		this.gameID = gameID;
	}

	/**
	 * Get's all raw materials that belong to a player
	 * 
	 * @return ResultSet rawMaterials
	 */
	public ResultSet getRawMaterials() {
		this.rawMaterials = this.b.getAllRawMaterials(this.gameID);
		return this.rawMaterials;
	}
	
	public String[] getRawMaterialsArray()
	{
		this.rawMaterials = this.b.getAllRawMaterials(this.gameID);
		ArrayList<String> materials = new ArrayList<>();
		try {
			while(this.rawMaterials.next()) {
				materials.add(this.rawMaterials.getString(1));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		Object[] objectList = materials.toArray();
		String[] stringArray = Arrays.copyOf(objectList, objectList.length, String[].class);
		
		return stringArray;
	}

}
