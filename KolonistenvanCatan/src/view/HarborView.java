package view;

import java.awt.Color;
import java.awt.Component;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.Rectangle;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.HashMap;

import javax.swing.BorderFactory;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

import controller.Bank;
import controller.TradeController;
import controller.GebouwController;
import controller.enums.Material;
import model.BoardModel;
import model.Location;

@SuppressWarnings("serial")
public class HarborView extends JPanel {

	private final static int HARBORWIDTH = 16;
	private final static int HARBORHEIGHT = 16;
	private final static Color HARBOR2FOR1 = Color.BLUE;
	private final static Color HARBOR3FOR1 = Color.RED;

	private final static Color LABELBACKGROUND = Color.WHITE;
	private final static Color BORDER = Color.BLACK;

	private ArrayList<Location> harborLocations2For1;
	private ArrayList<Location> harborLocations3For1;

	// private final Location[] HARBORLOCATIONS = { new Location(3, 9, null), new
	// Location(7, 11, Material.GRAIN),
	// new Location(10, 11, Material.ORE), new Location(12, 9, null), new
	// Location(10, 5, Material.WOOL),
	// new Location(7, 2, null), new Location(3, 0, null), new Location(1, 2,
	// Material.BRICK),
	// new Location(1, 5, Material.WOOD) };

	private double xPos;
	private double yPos;
	private HarborTradeView htv;
	private GebouwController gc;

	public HarborView(int gameID, int userID, GebouwController gc) {
		this.gc = gc;
		this.harborLocations2For1 = BoardModel.getHarborLocations2For1();
		this.harborLocations3For1 = BoardModel.getHarborLocations3For1();
		this.addMouseListener(new MyMouseAdapter());
		this.htv = new HarborTradeView(gameID, userID);
	}

	@Override
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		for (Location l : this.harborLocations2For1) {
			xPos = TilesView.translateXPos(l.getxPos());
			yPos = TilesView.translateYPos(l.getxPos(), l.getyPos());

			g.setColor(HARBOR2FOR1);
			g.fillOval((int) (xPos - (HARBORWIDTH / 2)), (int) (yPos - (HARBORHEIGHT / 2)), HARBORWIDTH, HARBORHEIGHT);
			g.setColor(BORDER);
			g.drawOval((int) (xPos - (HARBORWIDTH / 2)), (int) (yPos - (HARBORHEIGHT / 2)), HARBORWIDTH, HARBORHEIGHT);

		}
		for (Location l : this.harborLocations3For1) {
			xPos = TilesView.translateXPos(l.getxPos());
			yPos = TilesView.translateYPos(l.getxPos(), l.getyPos());

			g.setColor(HARBOR3FOR1);
			g.fillOval((int) (xPos - (HARBORWIDTH / 2)), (int) (yPos - (HARBORHEIGHT / 2)), HARBORWIDTH, HARBORHEIGHT);
			g.setColor(BORDER);
			g.drawOval((int) (xPos - (HARBORWIDTH / 2)), (int) (yPos - (HARBORHEIGHT / 2)), HARBORWIDTH, HARBORHEIGHT);
		}
		// for (Location l : this.HARBORLOCATIONS) {
		// xPos = TilesView.translateXPos(l.getxPos());
		// yPos = TilesView.translateYPos(l.getxPos(), l.getyPos());
		//
		// g.setColor(Color.GREEN);
		// g.fillOval((int) (xPos - (HARBORWIDTH / 2)), (int) (yPos - (HARBORHEIGHT /
		// 2)), HARBORWIDTH, HARBORHEIGHT);
		// }
	}

	private class MyMouseAdapter extends MouseAdapter {
		private JLabel myLabel;

		@Override
		public void mouseClicked(MouseEvent e) {
			gc.handleClickEvent(e);
			removeAll();

			for (Location l : harborLocations2For1) {
				xPos = TilesView.translateXPos(l.getxPos());
				yPos = TilesView.translateYPos(l.getxPos(), l.getyPos());
				if (e.getX() > (xPos - (HARBORWIDTH / 2)) && e.getX() < (xPos + (HARBORWIDTH / 2))
						&& e.getY() > (yPos - (HARBORHEIGHT / 2)) && e.getY() < (yPos + (HARBORHEIGHT / 2))) {
					myLabel = new JLabel("2 : 1 - " + l.getMaterialType().toDutchString());
					myLabel.setOpaque(true);
					myLabel.setBackground(LABELBACKGROUND);
					myLabel.setHorizontalAlignment(SwingConstants.CENTER);
					myLabel.setBorder(BorderFactory.createLineBorder(BORDER, 1));
					myLabel.setBounds(new Rectangle(e.getX() + 15, e.getY() - 10, 100, 20));
					add(myLabel);

					if (gc.harborIsOwned(l.getxPos(), l.getyPos())) {
						htv.showTradePopup2to1(l);
					}
				}
			}

			for (Location l : harborLocations3For1) {
				xPos = TilesView.translateXPos(l.getxPos());
				yPos = TilesView.translateYPos(l.getxPos(), l.getyPos());
				if (e.getX() > (xPos - (HARBORWIDTH / 2)) && e.getX() < (xPos + (HARBORWIDTH / 2))
						&& e.getY() > (yPos - (HARBORHEIGHT / 2)) && e.getY() < (yPos + (HARBORHEIGHT / 2))) {
					myLabel = new JLabel("3 : 1 - willekeurig");
					myLabel.setOpaque(true);
					myLabel.setBackground(LABELBACKGROUND);
					myLabel.setHorizontalAlignment(SwingConstants.CENTER);
					myLabel.setBorder(BorderFactory.createLineBorder(BORDER, 1));
					myLabel.setBounds(new Rectangle(e.getX() + 15, e.getY() - 10, 125, 20));
					add(myLabel);

					if (gc.harborIsOwned(l.getxPos(), l.getyPos())) {
						htv.showTradePopup3to1(l);
					}
				}
			}
			repaint();

		}

	}

}
