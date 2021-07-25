package controller;

import java.util.HashMap;

import model.MaterialOverviewModel;

public class MaterialOverviewController {
	private DistributeMaterialController dmc;
	private MaterialOverviewModel mom;
	
	public MaterialOverviewController(int gameID) {
		dmc = new DistributeMaterialController();
		mom = new MaterialOverviewModel(gameID);
		this.setPlayers(gameID);
	}
	
	private void setPlayers(int gameID) {
		mom.setSpelerArray(dmc.getPlayerInGame(Integer.toString(gameID)));
	}
	
	public HashMap<String, Integer> getRawMaterials() {
		return this.mom.getRawMaterials();
	}
	
	
}
