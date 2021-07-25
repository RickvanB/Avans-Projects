package view;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JLayeredPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;

import controller.CreateBordController;
import controller.GebouwController;

import model.Building;
import model.Location;

public class BordView extends JLayeredPane {

	// Variables
	private static final int PANEL_WIDTH = 900;
	private static final int PANEL_HEIGT = 900;

	private TilesView tiles;
	private GebouwView buildings;
	private CreateBordController creator;
	private GebouwController gc;

	private HarborView hv;

	public BordView(int gameid, GebouwController gc, GebouwView gv, int userID) {
		this.setDoubleBuffered(false);
		creator = new CreateBordController();
		tiles = new TilesView(creator.getNewBord(gameid));
		this.setPreferredSize(new Dimension(900, 900));
		tiles.setBounds(0, 0, (int) tiles.getPreferredSize().getWidth(), (int) tiles.getPreferredSize().getHeight());
		buildings = gv;
		this.gc = gc;
		hv = new HarborView(gameid, userID, gc);

		this.setPreferredSize(new Dimension(PANEL_WIDTH, PANEL_HEIGT));
		tiles.setBounds(0, 0, PANEL_WIDTH, PANEL_HEIGT);
		buildings.setBounds(0, 0, PANEL_WIDTH, PANEL_HEIGT);
		hv.setBounds(0, 0, PANEL_WIDTH, PANEL_HEIGT);
		tiles.setOpaque(false);
		buildings.setOpaque(false);
		hv.setOpaque(false);
		this.add(hv);
		this.add(tiles);
		this.add(buildings);
		this.setLayer(buildings, 1);
		this.addMouseListener(new MyMouseAdapter());
		gc.drawBuildings();
	}

	private class MyMouseAdapter extends MouseAdapter {

		@Override
		public void mouseClicked(MouseEvent e) {
			gc.handleClickEvent(e);
			setLayer(hv, 2);
			gc.drawBuildings();
		}
	}
}