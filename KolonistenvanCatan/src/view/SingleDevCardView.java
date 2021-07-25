package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

import controller.OntwikkelingskaartController;
import controller.PlayDev;
import model.DevelopmentCardStack;
import model.Ontwikkelingskaart;

public class SingleDevCardView extends JPanel{
	private DevelopmentCardStack dcs;
	private JButton playCardButton;
	private JLabel vicPointLabel;
	private BufferedImage resourceImage;
	private final static Color CONTENTCOLOR = new Color(217, 217, 217);
	public Ontwikkelingskaart o;
	public PlayDev pd;
	
	/**
	 * This class is responsible for creating the view of a development card
	 * 
	 * @author Fritz Wierper
	 *
	 */
	
	public SingleDevCardView(OntwikkelingskaartController oc, int gameId, Ontwikkelingskaart o, int userId) {
		this.o = o;
		loadImage(o.getCardName());
		this.setBorder(BorderFactory.createEmptyBorder(120,0,0,0));
		this.setPreferredSize(new Dimension(100, 150));
		
		if (o.getCardType().equals("gebouw")) {
			this.setToolTipText(o.getCardName());
		}
		
		else {
			this.setToolTipText(o.getCardExplanation());
			
		}
		
		this.dcs = new DevelopmentCardStack(gameId);
	
	}
	
	//Loading the image
	  private void loadImage(String ct) {
	        try {
				resourceImage = ImageIO.read(new File("src/images/" + ct + ".png"));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    }
	  
	  
		protected void paintComponent(Graphics g1) {
			// TODO Auto-generated method stub
			super.paintComponent(g1);
			int imageWidth = 100;
			int imageHeight = 106;
			int xpos = this.getWidth() / 2 - imageWidth / 2;
			int ypos = this.getHeight() / 2 - imageHeight / 2;
			// polygon
			g1.drawImage(resourceImage, xpos, ypos, imageWidth, imageHeight, null);
			this.repaint();
		}
		

		

}
