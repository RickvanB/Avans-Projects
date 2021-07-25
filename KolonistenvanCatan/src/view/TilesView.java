package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.geom.Rectangle2D;

import javax.swing.JPanel;

import controller.enums.Material;
import model.BoardModel;
import model.Location;

public class TilesView extends JPanel {

	private Material[] materialTypes;
	private static final int TILES_AMOUNT = 19;
	private static final int[] XPOSITIONS_TILES = { 2, 3, 4, 3, 4, 5, 6, 4, 5, 6, 7, 8, 6, 7, 8, 9, 8, 9, 10 };
	private static final int[] YPOSITIONS_TILES = { 4, 6, 8, 3, 5, 7, 9, 2, 4, 6, 8, 10, 3, 5, 7, 9, 4, 6, 8 };

	private static final int[] FICHES = { 9, 12, 10, 8, 11, 6, 2, 5, 3, 0, 4, 9, 6, 4, 3, 10, 11, 5, 8 };
	private static final int FICHESIZE = 30;
	private static final int FICHESTEXT_SIZE = 15;

	private static final double TILE_WIDTH = 130;
	private static final double TILE_HEIGHT = 160;
	private static final int TILES_POINTS = 6;
	private static final double PADDING = 50;
	private static final int WIDTH = (int) ((5 * TILE_WIDTH) + (2 * PADDING));
	private static final int HEIGHT = (int) ((4 * TILE_HEIGHT) + (2 * PADDING));

	public TilesView(Material[] materialTypes) {
		this.materialTypes = materialTypes;
		this.setPreferredSize(new Dimension(WIDTH, HEIGHT));
	}

	public static double translateYPos(int xPos, int yPos) {
		return (560 + PADDING) - (yPos * TILE_HEIGHT / 2) + (xPos * TILE_HEIGHT / 4);
	}

	public static double translateXPos(int xPos) {
		return ((TILE_WIDTH / 2) * xPos - (TILE_WIDTH / 2)) + PADDING;
	}

	public static int getXCoordinate(int xP) {
		return (int) Math.round((xP - PADDING + (TILE_WIDTH / 2)) / (TILE_WIDTH / 2));
	}

	public static int getYCoordinate(int yP, int xP) {
		return (int) -Math
				.round((2 * (yP - (560 + PADDING) - (TilesView.getXCoordinate(xP) * TILE_HEIGHT / 4))) / TILE_HEIGHT);
	}

	public Color getColor(Material materialType) {
		Color c = null;
		switch (materialType.toString()) {
		case "brick":
			c = new Color(204, 102, 0);
			break;

		case "ore":
			c = new Color(128, 128, 128);
			break;

		case "grain":
			c = new Color(255, 255, 26);
			break;

		case "wood":
			c = new Color(42, 111, 42);
			break;

		case "wool":
			c = new Color(153, 255, 102);
			break;

		case "desert":
			c = new Color(251, 203, 106);
			break;

		default:
			c = new Color(128, 128, 0);
		}
		return c;
	}

	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		for (int i = 0; i < TILES_AMOUNT; i++) {
			double xPos = TilesView.translateXPos(XPOSITIONS_TILES[i]);
			double yPos = TilesView.translateYPos(XPOSITIONS_TILES[i], YPOSITIONS_TILES[i]);

			int xpoints[] = { (int) xPos, (int) (xPos + TILE_WIDTH / 2), (int) (xPos + TILE_WIDTH / 2), (int) xPos,
					(int) (xPos - TILE_WIDTH / 2), (int) (xPos - TILE_WIDTH / 2) };
			int ypoints[] = { (int) (yPos - TILE_HEIGHT / 2), (int) (yPos - TILE_HEIGHT / 4),
					(int) (yPos + TILE_HEIGHT / 4), (int) (yPos + TILE_HEIGHT / 2), (int) (yPos + TILE_HEIGHT / 4),
					(int) (yPos - TILE_HEIGHT / 4) };

			g.setColor(this.getColor(materialTypes[i]));
			g.fillPolygon(xpoints, ypoints, TILES_POINTS);
			g.setColor(Color.BLACK);
			g.drawPolygon(xpoints, ypoints, TILES_POINTS);

			// drawing the fiches
			if (FICHES[i] != 0) {
				g.setColor(Color.getHSBColor(31, 32, 30));
				g.fillOval((int) xPos - FICHESIZE / 2, (int) yPos - FICHESIZE / 2, FICHESIZE, FICHESIZE);
				if (FICHES[i] == 6 || FICHES[i] == 8) {
					g.setColor(Color.RED);
				} else {
					g.setColor(Color.BLACK);
				}
				g.setFont(new Font(Font.SANS_SERIF, Font.BOLD, FICHESTEXT_SIZE));
				FontMetrics fm = g.getFontMetrics();
				Rectangle2D fontWidth = fm.getStringBounds(Integer.toString(FICHES[i]), g);
				g.drawString(Integer.toString(FICHES[i]), (int) (xPos - fontWidth.getWidth() / 2),
						(int) yPos + FICHESTEXT_SIZE / 2);
			}
		}
	}
}