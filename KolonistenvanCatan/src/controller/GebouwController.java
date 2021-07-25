package controller;

import java.awt.event.MouseEvent;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.BoardModel;
import model.Building;
import model.BuildingModel;
import model.DistributeMateriallModel;
import model.GameRefreshModel;
import model.PanelToShowModel;
import model.PassTurnModel;
import model.Player;

import view.TilesView;
import view.GebouwView;

public class GebouwController {

	private DistributeMateriallModel dMM;
	private BuildingModel bm;
	private Player s;
	private GebouwView gv;
	private GameRefreshModel gRM;
	private PanelToShowModel pTSM;
	private PassTurnModel pTM;
	private Bandit bandit;

	private static final int[] XPOSITIONS_TILES = { 2, 3, 4, 3, 4, 5, 6, 4, 5, 6, 7, 8, 6, 7, 8, 9, 8, 9, 10 };
	private static final int[] YPOSITIONS_TILES = { 4, 6, 8, 3, 5, 7, 9, 2, 4, 6, 8, 10, 3, 5, 7, 9, 4, 6, 8 };
	private String buildingType;
	private int gameId;
	private String[] players;
	private String[] idStukCities = { "c01", "c02", "c03", "c04" };
	private String[] idStukVillages = { "d01", "d02", "d03", "d04", "d05" };
	private String[] idStukRoads = { "r01", "r02", "r03", "r04", "r05", "r06", "r07", "r08", "r09", "r10", "r11", "r12",
			"r13", "r14", "r15" };
	private int savedX = 0;
	private int savedY = 0;
	private int owner;
	private int ownerid;
	private boolean placementSuccesfull;

	public GebouwController(int gameId, GebouwView gv, int userID) {
		this.gameId = gameId;
		this.dMM = new DistributeMateriallModel();
		this.s = new Player();
		this.gv = gv;
		this.bm = new BuildingModel();
		this.players = this.dMM.playerInGame(Integer.toString(this.gameId));
		this.bm = new BuildingModel();
		this.gRM = new GameRefreshModel();
		this.pTSM = new PanelToShowModel();
		this.pTM = new PassTurnModel();
		this.owner = pTSM.getIdentificatonNumber(userID);
		this.ownerid = userID;
		this.bandit = new Bandit(gameId, ownerid);

		this.players = this.dMM.playerInGame(Integer.toString(this.gameId));

		this.buildingType = "";
		this.placementSuccesfull = false;
		if (!this.checkGameExists()) {
			this.VillagesToDb();
			this.CitiesToDb();
			this.RoadstoDb();
		}
	}

	// Getters and setters
	public boolean isPlacementSuccesfull() {
		return placementSuccesfull;
	}

	public void setPlacementSuccesfull(boolean placementSuccesfull) {
		this.placementSuccesfull = placementSuccesfull;
	}

	/**
	 * creates cities for all the players in the db
	 */
	private void CitiesToDb() {
		for (int j = 0; j < this.players.length; j++) {
			for (int i = 0; i < idStukCities.length; i++) {
				String[] fillArray = { idStukCities[i], players[j] };
				bm.setupBuildings(fillArray);
			}
		}
	}

	/**
	 * creates roads for all the players in the db
	 */
	private void RoadstoDb() {
		for (int j = 0; j < this.players.length; j++) {
			for (int i = 0; i < idStukRoads.length; i++) {
				String[] fillArray = { idStukRoads[i], players[j] };
				bm.setupBuildings(fillArray);
			}
		}
	}

	/**
	 * creates villages for all the players in the db
	 */
	private void VillagesToDb() {
		for (int j = 0; j < this.players.length; j++) {
			for (int i = 0; i < idStukVillages.length; i++) {
				String[] fillArray = { idStukVillages[i], players[j] };
				bm.setupBuildings(fillArray);
			}
		}
	}

	/**
	 * Check if the game already exists in the db
	 * 
	 * @param String
	 *            playerId
	 * @return boolean true/false
	 */
	private boolean checkGameExists() {
		ResultSet result;
		boolean exists = false;
		try {
			result = this.s.gameExists(this.players[0]);
			while (result.next()) {
				if (result.getInt(1) > 0) {
					exists = true;
				}
			}
		} catch (Exception e) {
			e.getStackTrace();
		}
		return exists;
	}

	/**
	 * when player buys building, player chooses where to place the building
	 * 
	 * @param building
	 */
	public void placeBuilding(String buildingType) {
		this.buildingType = buildingType;
		this.savedX = 0;
		this.savedY = 0;
	}

	public String getBuildingType() {
		return this.buildingType;
	}

	public void handleClickEvent(MouseEvent e) {
		// Check Boolean

		placementSuccesfull = false;

		int xPos = TilesView.getXCoordinate(e.getX());
		int yPos = TilesView.getYCoordinate(e.getY(), e.getX());
		System.out.println("Message: [Gebouw Controller] - Postions: " + e.getX() + " " + e.getY());
		System.out.println("Message: [Gebouw Controller] - Postions: " + xPos + " " + yPos);

		if (!this.buildingType.equals("") && xPos >= 1 && xPos <= 11 && yPos >= 1 && yPos <= 11) {
			for (int i = 0; i < XPOSITIONS_TILES.length; i++) {
				if (xPos == XPOSITIONS_TILES[i] && yPos == YPOSITIONS_TILES[i]) {
					System.out.println("center of tile");
					if (buildingType.equals("bandit")) {
						if (bandit.getTileId(xPos, yPos) != bandit.getBanditPosition()) {
							System.out.println("Message: [Gebouw Controller] - Moving the bandit");
							bandit.replaceBandit(xPos, yPos);
							// Set the refresh value to 1
							this.gRM.setRefreshValue(true, this.gameId);
						} else {
							System.out.println("Message: [Gebouw Controller] - The bandit needs to be moved");
						}
					} else {
						return;
					}
				}
			}
			if (this.buildingType.equals("straat")) {
				System.out.println("building a street");
				if (this.savedX == 0) {
					this.savedX = xPos;
					this.savedY = yPos;
				} else if (!(this.savedX == xPos && this.savedY == yPos)
						&& (xPos == this.savedX - 1 || xPos == this.savedX || xPos == this.savedX + 1)
						&& (yPos == this.savedY - 1 || yPos == this.savedY || yPos == this.savedY + 1)) {
					Building building = new Building("straat", this.owner, BoardModel.getLocation(savedX, savedY),
							BoardModel.getLocation(xPos, yPos), this.ownerid);
					String pieceid = this.placementAllowed(building);
					if (!pieceid.equals("")) {
						this.addBuildingToDb(building, pieceid);
						System.out.println("Message: [Gebouw Controller] - Street has been placed");
						this.placeBuilding("");
						// Set the refresh value to 1
						this.gRM.setRefreshValue(true, this.gameId);
						this.savedX = 0;
						this.savedY = 0;

						placementSuccesfull = true;
					}
					this.savedX = 0;
					this.savedY = 0;
				} else {
					System.out.println("Message: [Gebouw Controller] - Can't build street at one spot");
					this.savedX = 0;
					this.savedY = 0;
				}
			} else if (this.buildingType.equals("dorp") || this.buildingType.equals("stad")) {
				System.out.println("Message: [Gebouw Controller] - Building a normal building");
				Building building = new Building(this.buildingType, this.owner, BoardModel.getLocation(xPos, yPos),
						null, this.ownerid);
				String pieceid = this.placementAllowed(building);
				if (!pieceid.equals("")) {
					this.addBuildingToDb(building, pieceid);
					System.out.println("Message: [Gebouw Controller] - Building should be added");
					this.placeBuilding("");
					// Set the refresh value to 1
					this.gRM.setRefreshValue(true, this.gameId);

					placementSuccesfull = true;

				}
			}
			this.drawBuildings();
		}
	}

	public void drawBuildings() {
		System.out.println("Message: [Gebouw Controller] - Game is drawing buildigns for game: " + gameId);
		gv.resetBuildings();
		ResultSet result;
		for (String player : players) {
			result = bm.getBuildingsPlayer(player);
			try {
				while (result.next()) {
					Building building = new Building(result.getString(5), result.getInt(6),
							BoardModel.getLocation(result.getInt(1), result.getInt(2)),
							BoardModel.getLocation(result.getInt(3), result.getInt(4)), Integer.parseInt(player));
					gv.addBuilding(building);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		int[] banditCords = bandit.getCordsFromId(bandit.getBanditPosition());
		gv.moveBandit(banditCords[0], banditCords[1]);
		gv.repaint();
	}

	public String placementAllowed(Building building) {
		if (building.getPieceKind().equals("straat")) {
			System.out.println("Message: [Gebouw Controller] - Looking if the placement of a street is correct");
			if (streetIsConnected(building.getPosFrom().getxPos(), building.getPosFrom().getyPos())
					|| streetIsConnected(building.getPosTo().getxPos(), building.getPosTo().getyPos())
					|| bm.getBuildingType(building.getPosFrom().getxPos(), building.getPosFrom().getyPos(), ownerid)
							.equals("dorp")
					|| bm.getBuildingType(building.getPosTo().getxPos(), building.getPosTo().getyPos(), ownerid)
							.equals("dorp")) {
				System.out.println("Message: [Gebouw Controller] - It is the fisrt round with a village connected or a street is connected");
				if (this.streetIsEmpty(building.getPosFrom().getxPos(), building.getPosFrom().getyPos(),
						building.getPosTo().getxPos(), building.getPosTo().getyPos())) {
					System.out.println("Message: [Gebouw Controller] - The spot is empty");
					for (int i = 1; i <= 15; i++) {
						String pieceid = "r" + String.format("%02d", i);
						if (bm.unplacedBuilding(pieceid, building.getOwnerid())) {
							return pieceid;
						}
					}
				}
			}
		} else if (building.getPieceKind().equals("dorp")) {
			if (bm.emptyCrossing(building.getPosFrom().getxPos(), building.getPosFrom().getyPos(), gameId)) {
				System.out.println("Message: [Gebouw Controller] - The crossing is empty");
				if (pTM.inFirstRound(gameId)
						|| streetIsConnected(building.getPosFrom().getxPos(), building.getPosFrom().getyPos())) {
					System.out.println("Message: [Gebouw Controller] - There is a street connected");
					if (!buildingNearby(building.getPosFrom().getxPos(), building.getPosFrom().getyPos())) {
						System.out.println("Message: [Gebouw Controller] - There is no building nearby");
						for (int i = 1; i <= 5; i++) {
							String pieceid = "d0" + i;
							if (bm.unplacedBuilding(pieceid, building.getOwnerid())) {
								return pieceid;
							}
						}
					}
				}
			}
		} else if (building.getPieceKind().equals("stad")) {
			if (bm.getBuildingType(building.getPosFrom().getxPos(), building.getPosFrom().getyPos(), ownerid)
					.equals("dorp")) {
				if (streetIsConnected(building.getPosFrom().getxPos(), building.getPosFrom().getyPos())) {
					for (int i = 1; i <= 4; i++) {
						String pieceid = "c0" + i;
						if (bm.unplacedBuilding(pieceid, building.getOwnerid())) {
							return pieceid;
						}
					}
				}
			}
		}
		return "";
	}

	public boolean streetIsEmpty(int xFrom, int yFrom, int xTo, int yTo) {
		if (bm.getStreetOwner(xFrom, yFrom, xTo, yTo, ownerid) == 0) {
			return true;
		} else {
			return false;
		}
	}

	public boolean streetIsConnected(int x, int y) {
		int[] xPositions = { 0, 1, 1, 0, -1, -1 };
		int[] yPositions = { 1, 1, 0, -1, -1, 0 };
		for (int i = 0; i < xPositions.length; i++) {
			if (bm.getStreetOwner(x, y, x + xPositions[i], y + yPositions[i], gameId) == ownerid) {
				return true;
			} else if (bm.getStreetOwner(x + xPositions[i], y + yPositions[i], x, y, gameId) == ownerid) {
				return true;
			}
		}
		return false;
	}

	public boolean buildingNearby(int x, int y) {
		int[] xPositions = { 0, 1, 1, 0, -1, -1 };
		int[] yPositions = { 1, 1, 0, -1, -1, 0 };
		for (int i = 0; i < xPositions.length; i++) {
			if (!bm.emptyCrossing(x + xPositions[i], y + yPositions[i], gameId)) {
				return true;
			}
		}
		return false;
	}

	public void addBuildingToDb(Building building, String pieceid) {
		if (building.getPieceKind().equals("straat")) {
			bm.placeStreet(pieceid, building.getPosFrom().getxPos(), building.getPosFrom().getyPos(),
					building.getPosTo().getxPos(), building.getPosTo().getyPos(), building.getOwnerid());
		} else if (building.getPieceKind().equals("stad")) {
			bm.removeBuilding(building.getPosFrom().getxPos(), building.getPosFrom().getyPos(), building.getOwnerid());
			bm.placeBuilding(pieceid, building.getPosFrom().getxPos(), building.getPosFrom().getyPos(),
					building.getOwnerid());
		} else {
			bm.placeBuilding(pieceid, building.getPosFrom().getxPos(), building.getPosFrom().getyPos(),
					building.getOwnerid());
		}
	}
	
	public boolean harborIsOwned(int x, int y) {
		String building = bm.getBuildingType(x, y, ownerid);
		if(building.equals("dorp") || building.equals("stad")) {
			return true;
		}
		return false;
	}
}