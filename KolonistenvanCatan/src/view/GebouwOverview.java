package view;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.Line2D;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.swing.JButton;
import javax.swing.JPanel;

import model.DatabaseCommunicator;
import model.GebouwOverviewModel;

@SuppressWarnings("serial")
public class GebouwOverview extends JPanel{
	
	private static final int X_STRAAT = 325;
	private static final int Y_STRAAT = 75;
	private static int X_DORP = 200;
	private static int Y_DORP = 75;
	private static int X_STAD = 50;
	private static int Y_STAD = 75;
	
	private final static int CITYWIDTH = 32;
	private final static int CITYHEIGHT = 16;
	private final static int ROOFWIDTH = 20;
	private final static int ROOFHEIGHT = 10;
	private final static int SETTLEMENTWIDTH = 20;
	private final static int SETTLEMENTHEIGHT = 16;
	
	private JPanel panel;
	private JButton button;
	
	private boolean openWindow = false;
	
	private GebouwOverviewModel gom;
	
	private int UserID;
	private int gameID;
	
	public GebouwOverview(int GameID, int UserID) {
		this.UserID = UserID;
		this.gameID = GameID;
		
		panel = new JPanel();
		panel.setPreferredSize(new Dimension(450, 100));
		panel.setVisible(false);
		panel.setOpaque(true);
		
		button = new JButton("Beschikbare gebouwen");
		button.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				openClose();
				if(openWindow == false) {
					openWindow = true;
				}
				else {
					openWindow = false;
				}
				
			}
			
		});
		
		this.setPreferredSize(new Dimension(450, 100));
		
		this.add(button);
		this.add(panel);
		
	}
	
	private void openClose() {
		if(openWindow == true) {
			panel.setVisible(false);
			this.setSize(new Dimension(450, 50));
		}
		else {
			panel.setVisible(true);
			this.setSize(new Dimension(450, 100));
		}
	}
	
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		
				int xpos2 = 375;
				int ypos2 = 75;
				
				Graphics2D g2 = (Graphics2D) g;
				g2.setColor(Color.BLACK);
				g2.setStroke(new BasicStroke(12));
				g2.draw(new Line2D.Float(X_STRAAT, Y_STRAAT, xpos2, ypos2));
				g2.setColor(gom.getColorPlayer(this.UserID, this.gameID)); 											
				g2.setStroke(new BasicStroke(4));
				g2.draw(new Line2D.Float(X_STRAAT, Y_STRAAT, xpos2, ypos2));
				
				g.setColor(Color.BLACK);
				g.setFont(new Font("TimesRoman", Font.BOLD, 16));
				g.drawString(gom.getLeftoverPieces("r", this.UserID), 395, 80);
				
			
				X_STAD -= CITYWIDTH / 2;
				Y_STAD -= CITYHEIGHT / 2;
				g.setColor(gom.getColorPlayer(this.UserID, this.gameID)); 												
				// RECT
				g.fillRect(X_STAD, Y_STAD, CITYWIDTH, CITYHEIGHT);
				// ROOF
				g.fillPolygon(new int[] { X_STAD, (X_STAD + ROOFWIDTH / 2), X_STAD + ROOFWIDTH },
						new int[] { Y_STAD, Y_STAD - ROOFHEIGHT, Y_STAD }, 3);
				g.setColor(Color.BLACK);
				// LINE AROUND ROOF & RECT
				g.drawPolygon(
						new int[] { X_STAD, (X_STAD + ROOFWIDTH / 2), X_STAD + ROOFWIDTH, X_STAD + CITYWIDTH,
								X_STAD + CITYWIDTH, X_STAD },
						new int[] { Y_STAD, Y_STAD - ROOFHEIGHT, Y_STAD, Y_STAD, Y_STAD + CITYHEIGHT,
								Y_STAD + CITYHEIGHT },
						6);
				
				g.setColor(Color.BLACK);
				g.setFont(new Font("TimesRoman", Font.BOLD, 16));
				g.drawString(gom.getLeftoverPieces("s", this.UserID), 80, 80);
				
				X_STAD = 50;
				Y_STAD = 75;
				
				
				X_DORP -= SETTLEMENTWIDTH / 2;
				Y_DORP -= SETTLEMENTHEIGHT / 2;
				g.setColor(gom.getColorPlayer(this.UserID, this.gameID)); 													
				// RECT
				g.fillRect(X_DORP, Y_DORP, SETTLEMENTWIDTH, SETTLEMENTHEIGHT);
				// ROOF
				g.fillPolygon(new int[] { X_DORP, (X_DORP + ROOFWIDTH / 2), X_DORP + ROOFWIDTH },
						new int[] { Y_DORP, Y_DORP - ROOFHEIGHT, Y_DORP }, 3);
				g.setColor(Color.BLACK);
				// LINE AROUND RECT & ROOF
				g.drawRect(X_DORP, Y_DORP, SETTLEMENTWIDTH, SETTLEMENTHEIGHT);
				g.drawPolygon(new int[] { X_DORP, X_DORP + (ROOFWIDTH / 2), X_DORP + ROOFWIDTH },
						new int[] { Y_DORP, Y_DORP - ROOFHEIGHT, Y_DORP }, 3);
				
				g.setColor(Color.BLACK);
				g.setFont(new Font("TimesRoman", Font.BOLD, 16));
				g.drawString(gom.getLeftoverPieces("d", this.UserID), 230, 80);
				
				X_DORP = 200;
				Y_DORP = 75;
		
	}

}
