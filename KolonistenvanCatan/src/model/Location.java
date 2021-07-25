package model;

import controller.enums.Material;

public class Location {

	private int xPos;
	private int yPos;
	private boolean hasHarbor;
	private Material materialType;

	public Location(int xPos, int yPos, boolean hasHarbor, Material materialType) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.hasHarbor = hasHarbor;
		this.materialType = materialType;
	}
	
	/**
	 * to be used ONLY for visuals of harbors
	 * @param xPos
	 * @param yPos
	 */
	public Location(int xPos, int yPos, Material materialType) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.materialType = materialType;
	}

	public int getxPos() {
		return xPos;
	}

	public int getyPos() {
		return yPos;
	}

	public boolean hasHarbor() {
		return hasHarbor;
	}

	public Material getMaterialType() {
		return materialType;
	}

}
