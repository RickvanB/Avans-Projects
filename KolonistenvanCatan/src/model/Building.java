package model;

public class Building {
	
	private String pieceKind; // stuksoort in the db. city, village or street
	private int owner; // volgnummer in the db
	private int ownerid;
	
	// posNaar isn't empty if the building is a street
	private Location posFrom;
	private Location posTo;
	
	public Building(String pieceKind, int owner, Location posFrom, Location posTo, int ownerid) {
		this.pieceKind = pieceKind;
		this.owner = owner;
		this.posFrom = posFrom;
		this.posTo = posTo;
		this.ownerid = ownerid;
	}

	public String getPieceKind() {
		return pieceKind;
	}

	public int getOwner() {
		return owner;
	}

	public int getOwnerid() {
		return ownerid;
	}
	
	public Location getPosFrom() {
		return posFrom;
	}

	public Location getPosTo() {
		return posTo;
	}
}