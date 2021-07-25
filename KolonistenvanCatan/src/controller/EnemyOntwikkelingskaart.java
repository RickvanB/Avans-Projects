package controller;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.swing.JLabel;
import javax.swing.JPanel;

import model.DatabaseCommunicator;

public class EnemyOntwikkelingskaart extends JPanel {

	private String text = "";
	private int amountOfCards;
	private DatabaseCommunicator dc;
	private ArrayList<JLabel> labels;
	private ArrayList<Integer> cards;
	private ArrayList<Integer> spelerids;
	private int idspel;
	private int idspeler1;
	private int idspeler2;
	private int idspeler3;

	public EnemyOntwikkelingskaart(int idspel, int idspeler1, int idspeler2, int idspeler3) {
		dc = DatabaseCommunicator.getInstance();

		this.idspel = idspel;
		this.idspeler1 = idspeler1;
		this.idspeler2 = idspeler2;
		this.idspeler3 = idspeler3;
		spelerids = new ArrayList<Integer>();
		cards = new ArrayList<Integer>();
		labels = new ArrayList<JLabel>();
		this.addJLabels();
		this.getAmountOfCards();
	}

	public ArrayList<Integer> getCards() {
		return cards;
	}

	public void getAmountOfCards() {

		// First part, getting the amount of cards
		this.addSpelers();

		for (int i = 0; i < 3; i++) {

			String spelerid = Integer.toString(spelerids.get(i));
			String[] params1 = { spelerid };
			String query = "SELECT COUNT(idontwikkelingskaart) FROM spelerontwikkelingskaart WHERE idspeler = ?";
			ResultSet result = dc.select(query, params1);
			try {
				if (result.next()) {
					amountOfCards = result.getInt(1);
					cards.add(amountOfCards);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

	}
	
	public void fillInAmount() {
		// Second part, getting playername and filling in their amount of cards

				for (int i = 0; i < 3; i++) {
					try {

						String query = "SELECT username FROM speler WHERE idspel = ? AND idspeler = ?";
						String idspelString = Integer.toString(idspel);
						String spelerid = Integer.toString(spelerids.get(i));
						String[] params2 = { idspelString, spelerid };
						ResultSet result2;
						result2 = dc.select(query, params2);
						if (result2.next()) {
							if (cards.get(i) == 1) {
								text = result2.getString(1) + " bezit " + Integer.toString(cards.get(i)) + " ontwikkelingskaart.";
							} else {
								text = result2.getString(1) + " bezit " + Integer.toString(cards.get(i)) + " ontwikkelingskaarten.";
							}
							labels.get(i).setText(text);
						}

					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
	
	private void addSpelers() {
		spelerids.add(idspeler1);
		spelerids.add(idspeler2);
		spelerids.add(idspeler3);
	}

	private void addJLabels() {
		for (int i = 0; i < 3; i++) {
			labels.add(new JLabel());
		}
	}

	public ArrayList<Integer> getSpelerids() {
		return spelerids;
	}
	
	public ArrayList<JLabel> getLabels(){
		return labels;
	}
	

}
