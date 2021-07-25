package controller;

import javax.swing.JFrame;

import javax.swing.JOptionPane;

import model.DevelopmentCardStack;

import model.Ontwikkelingskaart;
import view.OntwikkelingskaartView;
import view.PanelToShow;
import view.SideMenu;

public class OntwikkelingskaartController {

	private DevelopmentCardStack dCS;
	private String[] devIDs = { "o01g", "o02g", "o03g", "o04g", "o05g", "o06s", "o07s", "o08m", "o09m", "o10u", "o11u",
			"o12r", "o13r", "o14r", "o15r", "o16r", "o17r", "o18r", "o19r", "o20r", "o21r", "o22r", "o23r", "o24r",
			"o25r" };

	private JFrame popup;

	private OntwikkelingskaartView ov;
	/**
	 * This class is responsible for the control of the development cards
	 * 
	 * @author Fritz Wierper
	 *
	 */
	
	public OntwikkelingskaartController(int gameID, int playerID, GebouwController gb) {
		this.dCS = new DevelopmentCardStack(gameID);
		popup = new JFrame();
		ov = new OntwikkelingskaartView(this.dCS, gameID, playerID, this, gb);
		System.out.println("Message: [Ontwikkelingskaart Controller] - Creating oc: " + this);

		addCards();
		drawPlayersDevCards(dCS, playerID);
	}

	public boolean checkAllowed() {
		return this.dCS.checkIfGameIsNew();
	}

	public void addCards() {
		if (this.checkAllowed()) {
			for (int i = 0; i < devIDs.length; i++) {
				this.dCS.FirstTimeDatabaseFiller(devIDs[i]);
			}
		}
	}

	/**
	 * This method will give a player a dev card
	 * 
	 * @param d
	 * @param player
	 */
	public void buyDev(DevelopmentCardStack d, int player) {
		String kaart;
		kaart = d.getUnassignedDevCard();

		d.transferCardInDB(player, kaart);

		drawPlayersDevCards(d, player);

		JOptionPane.showMessageDialog(popup,
				"Je hebt een ontwikkelingskaart gekocht! Je kunt hem vinden in het ontwikkelingskaartmenu");

	}

	public OntwikkelingskaartView getOView() {
		return this.ov;
	}

	//This draws all devcards that a player has
	public void drawPlayersDevCards(DevelopmentCardStack d, int player) {

		d.UpdateCardsFromDatabase();

		if (this.ov != null) {
			this.ov.content.removeAll();
		}

		for (Ontwikkelingskaart o : d.getPlayerDevCards(player)) {
			this.ov.addCard(o);
		}
		this.ov.repaint();
		this.ov.revalidate();

	}

}