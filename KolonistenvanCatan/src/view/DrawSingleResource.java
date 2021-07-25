package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.BorderFactory;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

public class DrawSingleResource extends JPanel {
	
	private BufferedImage resourceImage;
	
	
	public DrawSingleResource(String grondstof) {
		loadImage(grondstof);
		this.setPreferredSize(new Dimension(60, 60));
		
		
	}
	
	
	  private void loadImage(String grondstof) {
	        try {
				resourceImage = ImageIO.read(new File("src/images/" + grondstof + ".png"));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    }
	  
	  
		protected void paintComponent(Graphics g1) {
			// TODO Auto-generated method stub
			super.paintComponent(g1);
			int imageWidth = 43;
			int imageHeight = 50;
			int xpos = this.getWidth() / 2 - imageWidth / 2;
			int ypos = this.getHeight() / 2 - imageHeight / 2;
			// polygon
			g1.setColor(Color.decode("#cbac1d"));
			g1.drawImage(resourceImage, xpos, ypos, imageWidth, imageHeight, null);

			this.repaint();
		}
	
}
