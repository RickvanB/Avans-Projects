package model;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import javax.swing.JLabel;
import javax.swing.JPanel;

@SuppressWarnings("serial")
public class Fiche extends JPanel{
	
	//The size of the fiche
	private static final int SIZE = 100;
	
	private JLabel label;
	private String numberFiche;
	
	public Fiche(String number) {
		//Setting the size of the panel which is also the size of the fiche
		this.setPreferredSize(new Dimension(SIZE, SIZE));
		//Setting the layout to null for the absolute position of the label
		this.setLayout(null);
		
		//when initiating the panel also giving the wanted number for the fiche
		this.setNumber(number);
		
		//calling the label
		label = new JLabel("Number", JLabel.CENTER);
		//Giving the label the given number
		label.setText(numberFiche);
		//if the number is 6 or 8 then make the number red
		if(numberFiche == "6" || numberFiche == "8") {
			label.setForeground(Color.RED);
		}
		//Setting the fontsize
		label.setFont(label.getFont().deriveFont(64.0f));
		
		//Setting the size and absolute location of the label
		label.setSize(50, 50);
		label.setLocation(SIZE/2 - label.getWidth()/2, SIZE/2 - label.getHeight()/2);
		
		//Putting the label in the middle of the panel
		this.add(label);
	}
	
	//Drawing the fiche
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		
		//Giving the color and the size of the fiche
		g.setColor(Color.getHSBColor(31, 32, 30));
		g.drawString(numberFiche, 0, 0);
		g.fillOval(0, 0, SIZE, SIZE);
	}
	
	//Method to adjust the number of said fiche
	public void setNumber(String number) {
		this.numberFiche = number;
		
	}
	
	public void addFiches() {
		//Still have to make, but need to know how the tiles work
	}

}
