package controller.enums;

public enum DevCardType {
	// knight card
	KNIGHT("ridder", "cardExplanation"),
	
	// progress cards
	MONOPOLY("monopolie", "cardExplanation"),
	INVENTION("uitvinding", "cardExplanation"),
	ROADBUILDING("stratenbouw", "cardExplanation"),
	
	// victory points
	LIBRARY("bibliotheek", "cardExplanation"),
	CATHEDRAL("kathedraal", "cardExplanation"),
	MARKET("markt", "cardExplanation"),
	PARLIAMENT("parlement", "cardExplanation"),
	UNIVERSITY("universiteit", "cardExplanation");
	
	private String type;
	private String cardExplanation;
	
	private DevCardType(String type, String cardExplanation) {
		this.type = type;
		this.cardExplanation = cardExplanation;
	}
	
	@Override
	public String toString() {
		return this.type;
	}
	
	public String getExplanation() {
		return this.cardExplanation;
	}

	public static DevCardType getTypeByName(String string) {
		for (DevCardType d : DevCardType.values()) {
			if (string != null) {
				if (d.toString().equals(string)) {
					return d;
				}
			}
		}
		return null;
	}
}
