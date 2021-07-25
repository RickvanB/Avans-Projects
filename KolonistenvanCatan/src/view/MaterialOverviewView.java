package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.util.Map;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

import controller.MaterialOverviewController;
import model.DistributeMateriallModel;

public class MaterialOverviewView extends JPanel {

	private final static int WIDTH = 450;
	private final static int HEIGHT = 200;
	private final static Color BACKGROUNDCOLOR = new Color(217, 217, 217);
	
	private final static int HEADER_HEIGT = 25;
	private final static int HEADER_WIDTH = 450;
	private final static Color HEADER_COLOR = Color.ORANGE;
	
	private final static String HEADER_TEXT = "Grondstof Overzicht";

	private final static Font STRING_FONT = new Font("Arial", Font.PLAIN, 16);
	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 18);

	private JLabel headerText;
	private JPanel headerPanel;
	
	private JLabel playerText;
	
	private int gameID;
	private MaterialOverviewController moc;
	
	public MaterialOverviewView(int gameID) {
		this.gameID = gameID;
		this.moc = new MaterialOverviewController(gameID);
		this.setPreferredSize(new Dimension(WIDTH, HEIGHT));
		this.setBackground(BACKGROUNDCOLOR);
		playerText = new JLabel();
		
		this.setHeaderInfo();
		this.setPlayerInfo(true);
	}
	
	private void setHeaderInfo() {
		this.headerPanel = new JPanel();
		this.headerPanel.setPreferredSize(new Dimension(HEADER_WIDTH, HEADER_HEIGT));		
		this.headerPanel.setBackground(HEADER_COLOR);
		
		this.headerText = new JLabel(HEADER_TEXT);
		this.headerText.setFont(HEADER_FONT);
		this.headerText.setHorizontalAlignment(SwingConstants.CENTER);
		
		this.headerPanel.add(headerText);
		this.add(headerPanel);
	}
	
	public void setPlayerInfo(boolean firstView) {
		if(!firstView) {
			this.removeAll();
			this.setHeaderInfo();
		}
		for (String key : this.moc.getRawMaterials().keySet()) {
			playerText = new JLabel(key + ": " + this.moc.getRawMaterials().get(key));
			
			
			JPanel playerPanel = new JPanel();
			playerPanel.setPreferredSize(new Dimension(HEADER_WIDTH, HEADER_HEIGT));
			playerText.setHorizontalAlignment(SwingConstants.CENTER);
			playerText.setFont(STRING_FONT);

			playerPanel.add(playerText);
			add(playerPanel);
			
		}
		this.repaint();
		this.validate();
	}
	
}
