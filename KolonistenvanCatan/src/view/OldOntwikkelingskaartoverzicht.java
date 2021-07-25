package view;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.swing.JLabel;
import javax.swing.JPanel;

import model.DatabaseCommunicator;

// -------------------------------------------------------------------------- //
// Not quite MVC yet, can be easily done later if needed. (Not sure if needed)
//--------------------------------------------------------------------------- //

public class OldOntwikkelingskaartoverzicht extends JPanel {

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

	// When creating an instance of this object, it needs the id of the game, and
	// the id's of the other players to function.
	public OldOntwikkelingskaartoverzicht(int idspel, int idspeler1, int idspeler2, int idspeler3) {
		dc = DatabaseCommunicator.getInstance();

		
		this.idspel = idspel;
		this.idspeler1 = idspeler1;
		this.idspeler2 = idspeler2;
		this.idspeler3 = idspeler3;

		spelerids = new ArrayList<Integer>();
		cards = new ArrayList<Integer>();
		labels = new ArrayList<JLabel>();
		
		for (int i = 0; i < 3; i++) {
			labels.add(new JLabel());
		}
		
		
		setLabelText();

		// Syso's can be removed later
		System.out.println(labels.get(0).getText());
		System.out.println(labels.get(1).getText());
		System.out.println(labels.get(2).getText());

	}

	private void setLabelText() {

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

		// Second part, getting playername and filling in their amount of cards

		for (int i = 0; i < 3; i++) {
			try {

				String query = "SELECT username FROM speler WHERE idspel = ? AND idspeler = ?";
				String idspelString = Integer.toString(idspel);
				String spelerid = Integer.toString(spelerids.get(i));
				String[] params2 = { idspelString, spelerid };
				ResultSet result2;
				result2 = dc.select(query, params2);
				while (result2.next()) {
					if (amountOfCards == 1) {
						text = result2.getString(1) + " has " + Integer.toString(cards.get(i)) + " card.";
					} else {
						text = result2.getString(1) + " has " + Integer.toString(cards.get(i)) + " cards.";
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

}
