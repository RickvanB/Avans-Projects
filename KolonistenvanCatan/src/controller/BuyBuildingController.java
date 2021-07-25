package controller;

import model.BuyBuildingModel;
import model.DevelopmentCardStack;
import model.PanelToShowModel;
import model.PassTurnModel;
import view.GebouwView;

public class BuyBuildingController {

	private static final String CITY = "c";
	private static final String VILLAGE = "d";
	private static final String STREET = "r";
	private static final String DEVELOPMENTCARD = "DC";
	private static final String NOT_YOUR_TURN = "Het is niet jouw beurt";
	private static final int AMOUNT_OF_MATERIALS = 5;
	private static final String VILLAGE_TYPE = "dorp";
	private static final String CITY_TYPE = "stad";
	private static final String STREET_TYPE = "straat";

	// array with amount of costs
	// wood, brick, grain, wool, ore
	private final int[] VILLAGE_ARRAY = { 1, 1, 1, 1, 0 };
	private final int[] CITY_ARRAY = { 0, 0, 2, 0, 3 };
	private final int[] STREET_ARRAY = { 1, 1, 0, 0, 0 };

	private String message;
	private int gameID;
	private int userID;

	// Objects
	private BuyBuildingModel bbm;
	private GebouwController gc;
	private PanelToShowModel pTSM;
	private GebouwView gv;
	private PassTurnModel pTM;
	private DevelopmentCardStack dcs;
	private OntwikkelingskaartController oc;

	// Constructor
	public BuyBuildingController(DevelopmentCardStack dcs, OntwikkelingskaartController oc, int gameID, int userID,
			GebouwController gc) {

		this.bbm = new BuyBuildingModel(userID, gameID);
		this.gv = new GebouwView();
		this.gc = gc;
		this.pTSM = new PanelToShowModel();
		this.pTM = new PassTurnModel();

		this.oc = oc;
		this.gameID = gameID;
		this.userID = userID;
		this.dcs = dcs;
	}

	// Getter
	public String getMessage() {
		return message;
	}

	public DevelopmentCardStack getDcs() {
		return dcs;
	}
	// Methods

	/**
	 * This method will activate the buying proces
	 * 
	 * @param naam
	 * @param wood
	 * @param stone
	 * @param grain
	 * @param wool
	 * @param ore
	 * @return
	 */
	public boolean buyBuildings(String naam, int wood, int brick, int grain, int wool, int ore,
			boolean automaticBuyCheck) {
		boolean canBuy = false;

		if (pTSM.playerOnTurn(this.gameID) == this.userID) {
			String kind = "";

			if (naam.equals("Straat")) {
				kind = STREET;
			} else if (naam.equals("Dorp")) {
				kind = VILLAGE;
			} else if (naam.equals("Stad")) {
				kind = CITY;
			} else if (naam.equals("Ontwikkelingskaart")) {
				kind = DEVELOPMENTCARD;
			} else {
				return canBuy;
			}

			// Check what kind of card/object the player want to buy
			if (kind.equals(DEVELOPMENTCARD) && !automaticBuyCheck) {

				if (canBuy = bbm.hasEnoughMaterials(wood, brick, grain, wool, ore)) {
					this.bbm.takeMaterials(wood, brick, grain, wool, ore);
					this.oc.buyDev(dcs, userID);
				} else {
					this.message = bbm.getMessage();
				}

			} else {
				canBuy = bbm.buyBuilding(kind, wood, brick, grain, wool, ore, automaticBuyCheck);
				if (bbm.getMessage() != null) {
					this.message = bbm.getMessage();
				}
			}
		} else {
			this.message = NOT_YOUR_TURN;
		}

		return canBuy;
	}

	/**
	 * This method will activate the drawbuilding controller
	 * 
	 * @return
	 */
	public boolean buildBuilding(String buildingType) {
		String type = buildingType.toLowerCase();
		this.gc.placeBuilding(type);

		boolean placementSuccesfull = this.gc.isPlacementSuccesfull();

		return placementSuccesfull;

	}

	public void resetvalues() {
		this.gc.setPlacementSuccesfull(false);
	}

	/**
	 * This method will return the materials to a player that wants to cancel the
	 * building method
	 */
	public void re_GiveMaterials() {
		String buildingType = gc.getBuildingType();
		// wood, brick, grain, wool, ore
		String[] materialCodes = {"h", "b", "g", "w", "e"};
		int[] materials = new int[AMOUNT_OF_MATERIALS];

		switch (buildingType) {

		case VILLAGE_TYPE:
			materials = VILLAGE_ARRAY;
			break;

		case CITY_TYPE:
			materials = CITY_ARRAY;
			break;
			
		case STREET_TYPE:
			materials = STREET_ARRAY;
			break;
		}
		// Check if player is not in first round
		if(!pTM.inFirstRound(gameID)) {
			bbm.returnMaterials(materialCodes, materials);
			
			//Reset build value
			gc.placeBuilding("");
		}
		
		
		


	}

}
