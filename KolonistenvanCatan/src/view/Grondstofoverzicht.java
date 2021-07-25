package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Rectangle;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

import controller.Player;

public class Grondstofoverzicht extends JPanel {

	private static final String OPENRM = "Open grondstofoverzicht";

	// Size when the overview is closed
	private final static int CLOSEDSIZE_M_OVERVIEW_WIDTH = 110;
	private final static int CLOSEDSIZE_M_OVERVIEW_HEIGHT = 40;
	private final static Dimension CLOSEDDIMENSION = new Dimension(CLOSEDSIZE_M_OVERVIEW_WIDTH,
			CLOSEDSIZE_M_OVERVIEW_HEIGHT);

	// Size when the overview is open
	private final static int OPENSIZE_M_OVERVIEW_WIDTH = 470;
	private final static int OPENEDSIZE_M_OVERVIEW_HEIGHT = 100;
	private final static Dimension OPENDIMENSION = new Dimension(OPENSIZE_M_OVERVIEW_WIDTH,
			OPENEDSIZE_M_OVERVIEW_HEIGHT);

	private final Font FONT = new JLabel().getFont();
	private int userID;
	
	private boolean overviewIsOpen;

	// Size Variables
	private final static int RACTANGLE_WIDHT = 50;
	private final static int RACTANGLE_HEIGHT = 60;
	private final static int RACTANGLE_X_POS = 67;
	private final static int RACTANGLE_Y_POS = 50;
	
	// Objects
	private JButton openOverview;
	private JPanel materialBox;

	private Player s;

	public Grondstofoverzicht(int gameID, int userID) {
		this.openOverview = new JButton(OPENRM);
		this.setOverviewIsOpen(false);
		this.userID = userID;

		this.materialBox = new JPanel();
		this.materialBox.setPreferredSize(OPENDIMENSION);
		this.materialBox.setVisible(false);
		this.materialBox.setOpaque(false);
		
		this.setPreferredSize(OPENDIMENSION);

		this.add(this.openOverview);
		this.add(materialBox);
		
		this.openOverview.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				openCloseOverview();
			}
		});

		this.s = new Player(gameID, userID);

	}
	
	/**
	 * Sets boolean if overview is open
	 * @param boolean isOpen
	 */
	public void setOverviewIsOpen(boolean isOpen) {
		this.overviewIsOpen = isOpen;
	}

	/**
	 * Returns boolean if overview is open
	 * @return boolean
	 */
	public boolean getOveriewIsOpen() {
		return this.overviewIsOpen;
	}

	/**
	 * Opens and closes the overview
	 */
	public void openCloseOverview() {
		if (!this.overviewIsOpen) {
			this.setSize(OPENDIMENSION);	
			this.materialBox.setVisible(true);
			this.setOverviewIsOpen(true);
		} else {
			this.setSize(CLOSEDDIMENSION);
			this.setOverviewIsOpen(false);
			this.materialBox.setVisible(false);
		}
	}

	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);
		
		if(this.getOveriewIsOpen()) {
			ResultSet result = this.s.getRawMaterials(this.userID);
			Color c = null;
			
			int counter = 0;
		
			try {
				while (result.next()) {
					counter++;
					String kind = result.getString(1);
					String number = result.getString(2);
					switch (kind.toLowerCase()) {
					case "baksteen":
						c = new Color(204, 102, 0);
						break;
	
					case "erts":
						c = new Color(128, 128, 128);
						break;
	
					case "graan":
						c = new Color(255, 255, 26);
						break;
	
					case "hout":
						c = new Color(42, 111, 42);
						break;
	
					case "wol":
						c = new Color(153, 255, 102);
						break;
	
					case "woestijn":
						c = new Color(251, 203, 106);
						break;
	
					default:
						break;
					}
	
					g.setColor(c);
					Rectangle r = new Rectangle(RACTANGLE_X_POS * counter, RACTANGLE_Y_POS, RACTANGLE_WIDHT, RACTANGLE_HEIGHT);
					g.fillRect((int) r.getX(), (int) r.getY(), (int) r.getWidth(), (int) r.getHeight()); 
					g.setColor(Color.BLACK);
					this.drawCenteredString(g, number, r, FONT);
	
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}			
		}		
	}
	
	/**
	 * Draw a String centered in the middle of a Rectangle.
	 *
	 * @param g The Graphics instance.
	 * @param text The String to draw.
	 * @param rect The Rectangle to center the text in.
	 */
	private void drawCenteredString(Graphics g, String text, Rectangle rect, Font font) {
		// Get the FontMetrics
		FontMetrics metrics = g.getFontMetrics(font);
		// Determine the X coordinate for the text
		int x = rect.x + (rect.width - metrics.stringWidth(text)) / 2;
		// Determine the Y coordinate for the text (note we add the ascent, as in java
		// 2d 0 is top of the screen)
		int y = rect.y + ((rect.height - metrics.getHeight()) / 2) + metrics.getAscent();
		// Set the font
		g.setFont(font);
		// Draw the String
		g.drawString(text, x, y);
	}

}
