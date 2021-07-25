package view;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.Line2D;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.swing.JPanel;

import model.Building;
import model.Location;

public class GebouwView extends JPanel {
	private final static int CITYWIDTH = 32;
	private final static int CITYHEIGHT = 16;
	private final static int ROOFWIDTH = 20;
	private final static int ROOFHEIGHT = 10;
	private final static int SETTLEMENTWIDTH = 20;
	private final static int SETTLEMENTHEIGHT = 16;

	private ArrayList<Building> buildings;
	private int banditX;
	private int banditY;
	private Sorter sorter;

	public GebouwView() {
		banditX = 6;
		banditY = 6;
		buildings = new ArrayList<>();
		sorter = new Sorter();

	}

	// method to add the building to an arraylist that gets painted everytime
	// something changes
	public void addBuilding(Building building) {
		this.buildings.add(building);
	}
	
	public void resetBuildings() {
		this.buildings.clear();
	}

	// method to get the right color for a certain player
	public Color getColor(int playerId) {
		Color c;
		switch (playerId) {
		case 1:
			c = Color.RED;
			return c;
		case 2:
			c = Color.WHITE;
			return c;

		case 3:
			c = Color.BLUE;
			return c;

		case 4:
			c = Color.ORANGE;
			return c;

		default:
			c = Color.BLACK;
		}

		return c;
	}

	public class Sorter implements Comparator<Building> {
		public int compare(Building arg0, Building arg1) {
			return -arg0.getPieceKind().compareTo(arg1.getPieceKind());
		}
	}

	public void moveBandit(int x, int y) {
		this.banditX = x;
		this.banditY = y;
		System.out.println(x + y);
	}

	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		System.out.println(buildings);
		// looping through every building in the arraylist
		buildings.sort(sorter);

		int xPos_C = (int) TilesView.translateXPos(banditX) - 10;
		int yPos_C = (int) TilesView.translateYPos(banditX, banditY) + 15;
		int height_C = 10;
		int width_C = 30;

		int xPos_M = xPos_C + 5;
		int yPos_M = yPos_C - 30;
		int height_M = height_C + 30;
		int width_M = width_C - 10;

		int xPos_U = xPos_C + 5;
		int yPos_U = yPos_M - 10;
		int height_U = height_C + 10;
		int width_U = width_C - 10;
		g.fillOval(xPos_C, yPos_C, width_C, height_C);
		g.fillOval(xPos_M, yPos_M, width_M, height_M);
		g.fillOval(xPos_U, yPos_U, width_U, height_U);
		for (int i = 0; i < buildings.size(); i++) {

			int xpos1 = (int) TilesView.translateXPos(buildings.get(i).getPosFrom().getxPos());
			int ypos1 = (int) TilesView.translateYPos(buildings.get(i).getPosFrom().getxPos(),
					buildings.get(i).getPosFrom().getyPos());
			if (buildings.get(i).getPieceKind().equals("straat")) {
				int xpos2 = (int) TilesView.translateXPos(buildings.get(i).getPosTo().getxPos());
				int ypos2 = (int) TilesView.translateYPos(buildings.get(i).getPosTo().getxPos(),
						buildings.get(i).getPosTo().getyPos());

				Graphics2D g2 = (Graphics2D) g;
				g2.setColor(Color.BLACK);
				g2.setStroke(new BasicStroke(6));
				g2.draw(new Line2D.Float(xpos1, ypos1, xpos2, ypos2));
				g2.setColor(getColor(buildings.get(i).getOwner()));
				g2.setStroke(new BasicStroke(4));
				g2.draw(new Line2D.Float(xpos1, ypos1, xpos2, ypos2));

			} else if (buildings.get(i).getPieceKind().equals("stad")) {
				xpos1 -= CITYWIDTH / 2;
				ypos1 -= CITYHEIGHT / 2;
				g.setColor(getColor(buildings.get(i).getOwner()));
				// RECT
				g.fillRect(xpos1, ypos1, CITYWIDTH, CITYHEIGHT);
				// ROOF
				g.fillPolygon(new int[] { xpos1, (xpos1 + ROOFWIDTH / 2), xpos1 + ROOFWIDTH },
						new int[] { ypos1, ypos1 - ROOFHEIGHT, ypos1 }, 3);
				g.setColor(Color.BLACK);
				// LINE AROUND ROOF & RECT
				g.drawPolygon(
						new int[] { xpos1, (xpos1 + ROOFWIDTH / 2), xpos1 + ROOFWIDTH, xpos1 + CITYWIDTH,
								xpos1 + CITYWIDTH, xpos1 },
						new int[] { ypos1, ypos1 - ROOFHEIGHT, ypos1, ypos1, ypos1 + CITYHEIGHT, ypos1 + CITYHEIGHT },
						6);

			} else if (buildings.get(i).getPieceKind().equals("dorp")) {
				xpos1 -= SETTLEMENTWIDTH / 2;
				ypos1 -= SETTLEMENTHEIGHT / 2;
				g.setColor(getColor(buildings.get(i).getOwner()));
				// RECT
				g.fillRect(xpos1, ypos1, SETTLEMENTWIDTH, SETTLEMENTHEIGHT);
				// ROOF
				g.fillPolygon(new int[] { xpos1, (xpos1 + ROOFWIDTH / 2), xpos1 + ROOFWIDTH },
						new int[] { ypos1, ypos1 - ROOFHEIGHT, ypos1 }, 3);
				g.setColor(Color.BLACK);
				// LINE AROUND RECT & ROOF
				g.drawRect(xpos1, ypos1, SETTLEMENTWIDTH, SETTLEMENTHEIGHT);
				g.drawPolygon(new int[] { xpos1, xpos1 + (ROOFWIDTH / 2), xpos1 + ROOFWIDTH },
						new int[] { ypos1, ypos1 - ROOFHEIGHT, ypos1 }, 3);

			} else {
				System.out.println("Not a type..");
			}
		}
	}
}