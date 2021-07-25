package model;

import controller.enums.Material;

public class Tegel {

	private int idTile; // idtegel in the db

	private Material materialType;
	
	public Tegel(Material materialType) {
		this.materialType = materialType;
		
	}
	
}
