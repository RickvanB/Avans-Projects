package controller;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

public class Player {

	// Objects
	private model.Player s;
	
	// Variables
	private ResultSet rawMaterials;
	private int gameID;
	private int userID;
	
	
	public Player(int gameId, int userId)
	{
		this.s = new model.Player();
		this.gameID = gameId;
		this.userID = userId;
	}
	
	/**
	 * Get's all raw materials that belong to a player
	 * @return ResultSet rawMaterials
	 */
	public ResultSet getRawMaterials(int userID)
	{
		rawMaterials = null;
		this.rawMaterials = this.s.getRawMaterials(this.gameID, userID);
		return this.rawMaterials;
	}

	public int getSpelerId() {
		return userID;
	}
	
	/**
	 * Returns a string array with raw materials that belongs to a player
	 * @return String array
	 */
	public String[] getRawMaterialsArray()
	{
		ArrayList<String> materials = new ArrayList<>();
		this.rawMaterials = this.s.getRawMaterials(this.gameID, this.userID);
		try {
			while(this.rawMaterials.next()) {
				materials.add(this.rawMaterials.getString(1));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Object[] objectList = materials.toArray();
		String[] stringArray =  Arrays.copyOf(objectList,objectList.length,String[].class);
		
		return stringArray;
	}
	
	/**
	 * Returns a string array with raw materials that belongs to a player
	 * @return String array
	 */
	public String[] getRawMaterialsAllArray()
	{
		ArrayList<String> materials = new ArrayList<>();
		this.rawMaterials = this.s.getRawMaterialsAll();
		try {
			while(this.rawMaterials.next()) {
				materials.add(this.rawMaterials.getString(1));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Object[] objectList = materials.toArray();
		String[] stringArray =  Arrays.copyOf(objectList,objectList.length,String[].class);
		
		return stringArray;
	}
	
	
	
}
