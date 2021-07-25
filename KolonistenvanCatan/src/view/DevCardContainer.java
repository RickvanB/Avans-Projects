package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.Border;

import controller.GebouwController;
import controller.OntwikkelingskaartController;
import controller.PlayDev;
import model.DevelopmentCardStack;
import model.Ontwikkelingskaart;


public class DevCardContainer extends JPanel{
	private DevelopmentCardStack dcs;
	private JButton playCardButton, whitespace;
	private JLabel vicPointLabel;
	Ontwikkelingskaart o;
	private SingleDevCardView sdcv;
	public PlayDev pd;
	private JPanel buttonpanel;
	
	/**
	 * This class is responsible for the container for the button and the card
	 * 
	 * @author Fritz Wierper
	 *
	 */
	
	//This is the container for the button and the card
	public DevCardContainer(DevelopmentCardStack dcs, OntwikkelingskaartController oc, GebouwController gb, int gameId, Ontwikkelingskaart o,int userId) {
		this.setLayout(new BorderLayout());
		this.dcs = dcs;
		this.o = o;
		this.setPreferredSize(new Dimension(100, 150));
		buttonpanel = new JPanel();
		this.sdcv = new SingleDevCardView(oc, gameId, o, userId);
		
		Border emptyBorder = BorderFactory.createEmptyBorder(0, 30, 0, 30);
		buttonpanel.setBorder(emptyBorder);
		
		whitespace = new JButton(" ");
		whitespace.setOpaque(false);
		whitespace.setContentAreaFilled(false);
		whitespace.setBorderPainted(false);
		buttonpanel.add(whitespace);
		
		this.add(sdcv, BorderLayout.CENTER);
		this.add(buttonpanel, BorderLayout.SOUTH);
		pd = new PlayDev(oc, this.dcs, gb, userId, gameId);

				vicPointLabel = new JLabel("+1 punt");
				
				playCardButton = new JButton("Speel kaart");
		
				this.cardPlayedOrNot();
				
				playCardButton.addActionListener(new ActionListener() {

					@Override
					public void actionPerformed(ActionEvent arg0) {
						playThisCard();
					}
					
				});		
	}

	// this happens when you click on 'speel kaart'
	private void playThisCard() {
		pd.chooseWhichPlay(this.sdcv, this.o);
	}
	
	// this method decides if a card is played or not and if the button has to appear or not
	public void cardPlayedOrNot() {
		
		buttonpanel.remove(whitespace);
		if (o.isCardPlayed() == false) {
			if (o.getCardType().equals("gebouw")) {
				buttonpanel.add(vicPointLabel);
			}
			else {
				buttonpanel.add(playCardButton);
			}
		}
		
		else {
			buttonpanel.add(whitespace);
		}
		repaint();
		validate();
		
	}
}
