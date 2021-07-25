package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;

import javax.swing.JPanel;

import controller.DobbelsteenController;
import model.PassTurnModel;

public class DobbelView extends JPanel {

	private DobbelsteenController dbc;

	/** Side of a dice in pixels */
	private static final int SIDE = 64;
	private static final int SPOT_DIAMETER = 10;
	private Image image;
	private boolean drawDice;
	private PassTurnModel pTM;
	
	private int total;
	private int gameID;
	
	// Panel Size
	private final static int PANEL_WIDTH = 165;
	private final static int PANEL_HEIGHT = 65;

	public DobbelView(int gameID, BanditMenu bm, PanelToShow pts, int userID) {
		this.dbc = new DobbelsteenController(gameID, bm, pts, userID);
		this.image = new BufferedImage(SIDE, SIDE, BufferedImage.TYPE_INT_RGB);
		
		this.setPreferredSize(new Dimension(PANEL_WIDTH, PANEL_HEIGHT));
		this.setVisible(true);
		
		this.pTM = new PassTurnModel();
		this.gameID = gameID;
	}
	
	//Getters and Setters
	public boolean isDrawDice() {
		return drawDice;
	}
	
	

	private int getTotal() {
		return total;
	}

	public void setDrawDice(boolean drawDice) {
		this.drawDice = drawDice;
	}


	public void throwDobbelsteen() {
		int[] values = this.dbc.throwDobbelsteen();
	}
	
	

	@Override
	protected void paintComponent(Graphics g) {
		
		super.paintComponent(g);
		if(this.isDrawDice() && !(pTM.inFirstRound(gameID))) {
			int[] values = this.dbc.throwDobbelsteen();
			g.drawImage(this.draw(values[1]), 0, 0, null);
			g.drawImage(this.draw(values[2]), 100, 0, null);
			
			this.total = values[0];
			
		} else {
			// Get last thrown results
			dbc.getDiceResults();
			g.drawImage(this.draw(dbc.getD1()), 0, 0, null);
			g.drawImage(this.draw(dbc.getD2()), 100, 0, null);
			this.drawDice = false;
		}
		
	}

	/**
	 * Draw dice image
	 * @param int count
	 * @return Image
	 */
	public Image draw(int count) {
		int w = image.getWidth(null);
		int h = image.getHeight(null);

		Graphics g = image.getGraphics();

		drawBorder(g, w, h);
		drawBackground(g, w, h);
		drawSpots(g, w, h, count);

		g.dispose();
		return image;
	}
	
	/**
	 * Draw border of dice
	 * @param Graphics g
	 * @param int w
	 * @param int h
	 */
	private void drawBorder(Graphics g, int w, int h) {
		g.setColor(Color.BLACK);
		g.fillRect(0, 0, w, h);
	}

	/**
	 * Draw background of dice
	 * @param Grahpics g
	 * @param int w
	 * @param int h
	 */
	private void drawBackground(Graphics g, int w, int h) {
		g.setColor(Color.WHITE);
		g.fillRect(3, 3, w - 6, h - 6);
	}
	
	/**
	 * Determines which side of the dice needs to be drawed
	 * @param Grahpics g
	 * @param int w
	 * @param int h
	 * @param int count
	 */
	private void drawSpots(Graphics g, int w, int h, int count) {
		g.setColor(Color.BLACK);

		switch (count) {
		case 1:
			drawSpot(g, w / 2, h / 2);
			break;
		case 3:
			drawSpot(g, w / 2, h / 2);
			// Fall thru to next case
		case 2:
			drawSpot(g, w / 4, h / 4);
			drawSpot(g, 3 * w / 4, 3 * h / 4);
			break;
		case 5:
			drawSpot(g, w / 2, h / 2);
			// Fall thru to next case
		case 4:
			drawSpot(g, w / 4, h / 4);
			drawSpot(g, 3 * w / 4, 3 * h / 4);
			drawSpot(g, 3 * w / 4, h / 4);
			drawSpot(g, w / 4, 3 * h / 4);
			break;
		case 6:
			drawSpot(g, w / 4, h / 4);
			drawSpot(g, 3 * w / 4, 3 * h / 4);
			drawSpot(g, 3 * w / 4, h / 4);
			drawSpot(g, w / 4, 3 * h / 4);
			drawSpot(g, w / 4, h / 2);
			drawSpot(g, 3 * w / 4, h / 2);
			break;
		}
	}
	
	/**
	 * Draw side of dice
	 * @param Graphics g
	 * @param int x
	 * @param int y
	 */
	private void drawSpot(Graphics g, int x, int y) {
		g.fillOval(x - SPOT_DIAMETER / 2, y - SPOT_DIAMETER / 2, SPOT_DIAMETER, SPOT_DIAMETER);
	}

}
