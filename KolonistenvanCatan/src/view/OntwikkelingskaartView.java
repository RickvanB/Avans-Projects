package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridLayout;
import javax.swing.JLabel;
import javax.swing.JPanel;

import controller.GebouwController;
import controller.OntwikkelingskaartController;
import model.DevelopmentCardStack;
import model.Ontwikkelingskaart;

public class OntwikkelingskaartView extends JPanel{
	private final static Color HEADERCOLOR = Color.ORANGE;
	private final static Color CONTENTCOLOR = new Color(217, 217, 217);
	private final static int PANEL_WIDTH = 350;
	
	/**
	 * This class is responsible for the view of all the cards a player owns
	 * 
	 * @author Fritz Wierper
	 *
	 */
	
	
	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 16);
	DevelopmentCardStack dcs;
	private JPanel header;
	public JPanel content;
	private JLabel headerText;
	private int gameId;
	private int player;
	OntwikkelingskaartController oc;
	private GebouwController gb;
	GridLayout cardLayout;
	
	public OntwikkelingskaartView(DevelopmentCardStack dcs, int gi, int player, OntwikkelingskaartController oc, GebouwController gb) {
		this.setLayout(new BorderLayout());
		this.setPreferredSize(new Dimension(350, 200));
		this.gameId = gi;
		this.player = player;
		this.oc = oc;
		this.gb = gb;
		this.dcs = dcs;
		//header
		header = new JPanel();
		content = new JPanel();
		header.setBackground(HEADERCOLOR);
		content.setPreferredSize(new Dimension(350, 150));
		cardLayout = new GridLayout(4, 4);
		content.setLayout(cardLayout);
		this.add(header, BorderLayout.PAGE_START);
		this.add(content, BorderLayout.CENTER);
		
		
		headerText = new JLabel("Ontwikkelingskaarten");
		headerText.setFont(HEADER_FONT);
		header.add(headerText);

	}
		
		//this method adds a single development card to the view of the player
		public void addCard(Ontwikkelingskaart o) {
			//1
		System.out.println("addcard: "+ this.oc);
			content.add(new DevCardContainer(this.dcs, this.oc, gb, gameId,o, this.player), 0, 0);
			repaint();
			validate();
		}
		
		public OntwikkelingskaartController getOC() {
			return this.oc;
			
		}
		
	}
