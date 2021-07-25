package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;

import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;



import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

import model.DevelopmentCardStack;


public class BuildObjectView extends JPanel {
		private int gameId;
		private int player;
		private JPanel header;
		private JPanel bottom;
		private JPanel bottomleft;
		private JPanel bottomright;
		private JLabel title;
		private JLabel points;
		private String pointsString;
		
		private SideMenu sm;

		private Koopscherm k;

		private final static Font BUTTONFONT = new Font("Arial", Font.CENTER_BASELINE, 14);
		private final static Font HEADERFONT = new Font("Arial", Font.CENTER_BASELINE, 16);
	
		private JButton buyButton;
	
		// Cost values
		private String name;
		private int wood;
		private int stone;
		private int grain;
		private int wool;
		private int ore;
		
		private static BufferedImage tileImage;

		private DevelopmentCardStack d;
		
	public BuildObjectView(int player, int gameId, SideMenu sm, DevelopmentCardStack d, String naam, int points, int wood, int stone, int grain, int wool, int ore, Koopscherm koopscherm) {
		this.d = d;
		this.gameId = gameId;
		this.player = player;
		this.sm = sm;
		this.setLayout(new BorderLayout());
		this.title = new JLabel(naam);
		this.pointsString = Integer.toString(points);
		setPoints(points);
		this.title.setFont(HEADERFONT);
		this.buyButton = new JButton("Koop");
		
		// Instantiating variables
		this.name = naam;
		this.wood = wood;
		this.stone = stone;
		this.grain = grain;
		this.wool = wool;
		this.ore = ore;
		
		
		this.k = koopscherm;
		
		
		buildHeader();
		buildBottom();
		buildResourcePanel();
		paintResources(wood, stone, grain, wool, ore);
		buildButtonPanel();
		
		//ActionListners
		this.buyButton.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				koopscherm.buyBuilding(naam, wood, stone, grain, wool, ore, false);
				
			}
		});
	
	}
	
	public void setPoints (int points) {
		if (points == 3) {
			this.points = new JLabel("? punten");
		}
		else {
			this.points = new JLabel(pointsString + " punten");
		}
	}
	
	public void buildHeader() {
		header = new JPanel();
		header.setLayout(new BorderLayout());
		header.setPreferredSize(new Dimension(440, 30));
		header.setBorder(new EmptyBorder(0, 0, 0 , 0));
		this.title.setBorder(new EmptyBorder(0, 15, 0 , 0));
		this.points.setBorder(new EmptyBorder(0, 0, 0 , 15));
		header.setBorder(new EmptyBorder(10, 0, 0 , 0));
		
		header.add(title, BorderLayout.LINE_START);
		header.add(points, BorderLayout.LINE_END);
		
		this.add(header, BorderLayout.PAGE_START);
		
	}
	
	public void buildBottom() {
		bottom = new JPanel();
		bottom.setPreferredSize(new Dimension(440, 70));
		bottom.setLayout(new BorderLayout());
		this.add(bottom, BorderLayout.CENTER);
	
		
	}
	
	public void buildResourcePanel() {
		bottomleft = new JPanel();
		GridLayout resourceLayout = new GridLayout(1,5);
		bottomleft.setBorder(new EmptyBorder(0, 10, 0 , 0));
		bottomleft.setLayout(resourceLayout);
		bottom.add(bottomleft, BorderLayout.CENTER);
		
	}	
	
	public void buildButtonPanel() {
		bottomright = new JPanel();
		bottomright.setPreferredSize(new Dimension(150, 60));
		bottomright.add(buyButton);
		buyButton.setPreferredSize(new Dimension(120, 50));
		buyButton.setFont(BUTTONFONT);
		bottomright.setBorder(new EmptyBorder(0, 20, 0 , 0));
		bottom.add(bottomright, BorderLayout.LINE_END);
		
	}

	
	public void paintResources(int wood, int stone, int grain, int wool, int ore) {
		int totalAmount = wood + stone + grain + wool + ore;
		
			if (wood != 0) {
				for (int i = 0; i < wood; i ++) {
				bottomleft.add(new DrawSingleResource("wood"));
				}
			}
			
			if (stone != 0) {
				for (int i = 0; i < stone; i ++) {
				bottomleft.add(new DrawSingleResource("stone"));
				}
			}
			if (grain != 0) {
				for (int i = 0; i < grain; i ++) {
				bottomleft.add(new DrawSingleResource("grain"));
				}
			}
			if (wool != 0) {
				for (int i = 0; i < wool; i ++) {
				bottomleft.add(new DrawSingleResource("wool"));
				}
			}
			if (ore != 0) {
				for (int i = 0; i < ore; i ++) {
				bottomleft.add(new DrawSingleResource("ore"));
				}
			} 
			
			for (int i = 0; i < 5 - totalAmount; i ++) {
				bottomleft.add(new JPanel());
			}
		}
	
	public void checkAbleToBuy() {
		boolean possible = k.buyBuilding(name, wood, stone, grain, wool, ore, true);
		
		// If in possible set button to RED else BLACK
		if(possible) {
			this.buyButton.setForeground(Color.BLACK);
		} else {
			this.buyButton.setForeground(Color.RED);
		}
		
	}
	
}