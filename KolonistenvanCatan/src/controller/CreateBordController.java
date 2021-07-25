package controller;

import java.util.Random;

import controller.enums.Material;
import model.BoardModel;
import model.Spelbord;

public class CreateBordController {
	private BoardModel boardModel;
	private Spelbord bord;

	private static final int TILES_AMOUNT = 19;
	private static final int[] XPOSITIONS_TILES = { 2, 3, 4, 3, 4, 5, 6, 4, 5, 6, 7, 8, 6, 7, 8, 9, 8, 9, 10 };
	private static final int[] YPOSITIONS_TILES = { 4, 6, 8, 3, 5, 7, 9, 2, 4, 6, 8, 10, 3, 5, 7, 9, 4, 6, 8 };
	private static final int[] FICHES = { 12, 18, 14, 10, 16, 8, 1, 6, 2, 0, 4, 13, 9, 5, 3, 15, 17, 7, 11 };

	public CreateBordController() {
		bord = new Spelbord();
		boardModel = new BoardModel();
	}

	/**
	 * Randomizes the order of the given tiles
	 * 
	 * @param ar
	 * @return
	 */
	public Material[] shuffleTiles(Material[] ar) {
		Random ran = new Random();
		for (int i = ar.length - 1; i > 0; i--) {
			int index = ran.nextInt(i + 1);
			Material a = ar[index];
			ar[index] = ar[i];
			ar[i] = a;
		}
		// switch the middle tiles for the Material.DESERT tile
		for (int j = 0; j < ar.length; j++) {
			if (ar[j] == Material.DESERT) {
				Material a = ar[j];
				ar[j] = ar[9];
				ar[9] = a;
				break;
			}
		}
		return ar;
	}

	private char getMaterialLetter(Material materialType) {
		char letter;
		switch (materialType.toString()) {
		case "brick":
			letter = 'B';
			break;

		case "ore":
			letter = 'E';
			break;

		case "grain":
			letter = 'G';
			break;

		case "wood":
			letter = 'H';
			break;

		case "wool":
			letter = 'W';
			break;

		case "desert":
			letter = 'X';
			break;

		default:
			letter = 'X';
		}
		return letter;
	}

	public Material getMaterialFromLetter(char letter) {
		Material material;
		switch (letter) {
		case 'B':
			material = Material.BRICK;
			break;
		case 'E':
			material = Material.ORE;
			break;
		case 'G':
			material = Material.GRAIN;
			break;
		case 'H':
			material = Material.WOOD;
			break;
		case 'W':
			material = Material.WOOL;
			break;
		case 'X':
			material = Material.DESERT;
			break;
		default:
			material = Material.DESERT;
		}
		return material;
	}

	public void createBord(int gameID, boolean random) {
		// We use an enum to reference our different material types
		Material[] materials = { Material.GRAIN, Material.GRAIN, Material.ORE, Material.WOOD, Material.WOOD,
				Material.BRICK, Material.WOOL, Material.BRICK, Material.ORE, Material.DESERT, Material.WOOL,
				Material.WOOD, Material.GRAIN, Material.GRAIN, Material.WOOD, Material.BRICK, Material.WOOL,
				Material.WOOL, Material.ORE };

		// random board
		if (random) {
			materials = shuffleTiles(materials);
		}

		// putting the board in the database
		for (int i = 0; i < TILES_AMOUNT; i++) {
			bord.addTileToDb(gameID, i + 1, XPOSITIONS_TILES[i], YPOSITIONS_TILES[i],
					this.getMaterialLetter(materials[i]), FICHES[i]);
		}
	}

	public Material[] getNewBord(int gameID) {
		Material[] materials = new Material[TILES_AMOUNT];
		for (int i = 0; i < TILES_AMOUNT; i++) {
			materials[i] = this.getMaterialFromLetter(bord.getMaterialAtTile(gameID, i + 1).charAt(0));
		}
		return materials;
	}
}