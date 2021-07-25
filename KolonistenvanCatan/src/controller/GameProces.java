package controller;

import java.util.HashMap;

public class GameProces {

	private static final int Y_AS = 1;
	private static final int X_AS = 0;
	private static final int KIND = 2;
	private static final int FIRST = 0;
	private DistributeMaterialController dMC;
	private int gameID;
	private String username;
	private HashMap<Integer, Integer> idToThrow;

	public GameProces(int gameID, int userID, String username) {
		dMC = new DistributeMaterialController();
		idToThrow = new HashMap<>();
		idToThrow.put(1, 2);
		idToThrow.put(2, 3);
		idToThrow.put(3, 3);
		idToThrow.put(4, 4);
		idToThrow.put(5, 4);
		idToThrow.put(6, 5);
		idToThrow.put(7, 5);
		idToThrow.put(8, 6);
		idToThrow.put(9, 6);
		idToThrow.put(10, 8);
		idToThrow.put(11, 8);
		idToThrow.put(12, 9);
		idToThrow.put(13, 9);
		idToThrow.put(14, 10);
		idToThrow.put(15, 10);
		idToThrow.put(16, 11);
		idToThrow.put(17, 11);
		idToThrow.put(18, 12);

		this.gameID = gameID;
		this.username = username;
	}

	/**
	 * This method will provide the service to distribute materials af an turn
	 * 
	 * @param throwAmount
	 */
	private void spreadMaterials(int throwAmount) {
		
		// Get kind of Tile
		int amountOfIDs;
		if (throwAmount == 2 || throwAmount == 12) {
			amountOfIDs = 1;
		} else {
			amountOfIDs = 2;
		}
		String[] kind = null;
		for (int i = 0; i < amountOfIDs; i++) {
			for (int j = 1; j <= idToThrow.size(); j++) {
				if(idToThrow.get(j) == throwAmount) {
					kind = dMC.getKindOfTile(j + i, gameID);
					break;
				}
			}
			String kindresult = kind[KIND].toLowerCase();
			char kindOfTile = kindresult.charAt(FIRST);

			// Distribute materials
			try {
				if (kind[Y_AS] != null && kind[X_AS] != null) {
					dMC.distributeMaterialAfterThrownDice(gameID, kindOfTile, Integer.parseInt(kind[Y_AS]),
							Integer.parseInt(kind[X_AS]));
				}
			} catch (Exception e) {
				System.out.println("Warning: [Game Proces] - converting has failed");
				e.printStackTrace();

			}
		}
	}

	/**
	 * This method will perform a normal turn in the game
	 * 
	 * @param thrownAmount
	 */
	public void normalTurn(int thrownAmount) {

		// Distribute materials
		this.spreadMaterials(thrownAmount);

		// Build

		// Play "Ontwikkleingskaart"

	}
}
