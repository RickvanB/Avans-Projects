package controller.enums;

public enum Material {
	WOOD("wood", "hout"),
	WOOL("wool", "wol"),
	ORE("ore", "erts"),
	BRICK("brick", "baksteen"),
	GRAIN("grain", "graan"),
	DESERT("desert", "woestijn");
	
	private String text;
	private String textDutch;
	
	private Material(String type, String typeDutch) {
		this.text = type;
		this.textDutch = typeDutch;
	}
	
	@Override
	public String toString() {
		return this.text;
	}
	
	public String toDutchString() {
		return this.textDutch;
	}
}
