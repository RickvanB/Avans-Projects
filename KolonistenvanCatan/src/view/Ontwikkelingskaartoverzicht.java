package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;

import javax.swing.BoxLayout;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

import model.DatabaseCommunicator;

public class Ontwikkelingskaartoverzicht extends JPanel {


	private String text = "";
	private int amountOfCards;
	private int playedKnights;
	private int idspel;
	
	private DatabaseCommunicator dc;
	
	private ArrayList<JLabel> labels, labels2;
	private ArrayList<Integer> cards;
	private ArrayList<Integer> spelerids;
	private JPanel header;
	private JLabel textHead;
	private JPanel panel1, panel2, panel3;
	

	// When creating an instance of this object, it needs the id of the game, and
	// the id's of the other players to function.
	public Ontwikkelingskaartoverzicht(int idspel, int userID) {
		this.idspel = idspel;
		spelerids = new ArrayList<Integer>();
		cards = new ArrayList<Integer>();
		labels = new ArrayList<JLabel>();
		labels2 = new ArrayList<JLabel>();
		dc = DatabaseCommunicator.getInstance();
		
		this.setPreferredSize(new Dimension(450, 200));
		this.setBackground(new Color(217, 217, 217));
		
		this.setHeaderInfo();
		
		this.addJLabels();
		this.getOpponentID(userID, idspel);
		setLabelText();
		
		this.addPanel();
		
		this.repaint();
		this.validate();
		//Syso's can be removed later
//		System.out.println(labels.get(0).getText());
//		System.out.println(labels.get(1).getText());
//		System.out.println(labels.get(2).getText());

	}
	
	private void addPanel() {
		panel1 = new JPanel();
		panel1.setPreferredSize(new Dimension(450, 50));
		
		labels.get(0).setFont(new Font("Arial", Font.PLAIN, 16));
		labels.get(0).setHorizontalAlignment(SwingConstants.CENTER);
		labels2.get(0).setFont(new Font("Arial", Font.PLAIN, 16));
		labels2.get(0).setHorizontalAlignment(SwingConstants.CENTER);
		
		panel1.add(labels.get(0));
		panel1.add(labels2.get(0));
		
		panel2 = new JPanel();
		panel2.setPreferredSize(new Dimension(450, 50));
		
		labels.get(1).setFont(new Font("Arial", Font.PLAIN, 16));
		labels.get(1).setHorizontalAlignment(SwingConstants.CENTER);
		labels2.get(1).setFont(new Font("Arial", Font.PLAIN, 16));
		labels2.get(1).setHorizontalAlignment(SwingConstants.CENTER);
		
		panel2.add(labels.get(1));
		panel2.add(labels2.get(1));
		
		panel3 = new JPanel();
		panel3.setPreferredSize(new Dimension(450, 50));
		
		labels.get(2).setFont(new Font("Arial", Font.PLAIN, 16));
		labels.get(2).setHorizontalAlignment(SwingConstants.CENTER);
		labels2.get(2).setFont(new Font("Arial", Font.PLAIN, 16));
		labels2.get(2).setHorizontalAlignment(SwingConstants.CENTER);
		
		panel3.add(labels.get(2));
		panel3.add(labels2.get(2));
		
		this.add(panel1);
		this.add(panel2);
		this.add(panel3);
		
		this.repaint();
		this.validate();
	}
	
	private void setHeaderInfo() {
		this.header = new JPanel();
		this.header.setPreferredSize(new Dimension(450, 25));
		this.header.setBackground(Color.ORANGE);

		this.textHead = new JLabel("Ontwikkelingskaarten tegenstanders");
		this.textHead.setFont(new Font("Arial", Font.CENTER_BASELINE, 18));
		this.textHead.setHorizontalAlignment(SwingConstants.CENTER);

		this.header.add(textHead);
		this.add(header);
	}

	private void setLabelText() {

		// First part, getting the amount of cards
		for (int i = 0; i < 3; i++) {

			String spelerid = Integer.toString(spelerids.get(i));
			String[] params1 = { spelerid };
			String query = "SELECT COUNT(idontwikkelingskaart) FROM spelerontwikkelingskaart WHERE idspeler = ? AND gespeeld = 0";
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

		// Second part, getting playername and filling in their amount of unplayed cards

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
						text = result2.getString(1) + " heeft " + Integer.toString(cards.get(i)) + " ongespeelde ontwikkelingskaart.";
					} else {
						text = result2.getString(1) + " heeft " + Integer.toString(cards.get(i)) + " ongespeelde ontwikkelingskaarten.";
					}
					labels.get(i).setText(text);
				}

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		//Third part is getting all the played knights from the opponents
		ArrayList<Integer> playedCards = new ArrayList<Integer>(); 
		for (int i = 0; i < 3; i++) {

			String spelerid = Integer.toString(spelerids.get(i));
			String[] params3 = { spelerid };
			String query = "SELECT COUNT(idontwikkelingskaart) FROM spelerontwikkelingskaart WHERE idspeler = ? AND gespeeld = 1 AND idontwikkelingskaart LIKE '%r'";
			ResultSet result3 = dc.select(query, params3);
			
			
			try {
				if (result3.next()) {
					playedKnights = result3.getInt(1);
					playedCards.add(playedKnights);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		//Fourth part is setting the text on the labels and the amount of played knights from the opponents
		
		for (int i = 0; i < 3; i++) {
			try {

				String query = "SELECT username FROM speler WHERE idspel = ? AND idspeler = ?";
				String idspelString = Integer.toString(idspel);
				String spelerid = Integer.toString(spelerids.get(i));
				String[] params4 = { idspelString, spelerid };
				ResultSet result4;
				result4 = dc.select(query, params4);
				while (result4.next()) {
					if (playedKnights == 1) {
						text = result4.getString(1) + " heeft " + Integer.toString(playedCards.get(i)) + " ridderkaart ingezet.";
					} else {
						text = result4.getString(1) + " heeft " + Integer.toString(playedCards.get(i)) + " ridderkaarten ingezet.";
					}
					labels2.get(i).setText(text);
				}

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	public void getOpponentID(int userID, int gameID) {
		ResultSet result;
		
		String query = "SELECT idspeler FROM speler WHERE NOT idspeler = ? AND idspel = ?";
		String[] params = new String[2];
		params[0] = Integer.toString(userID);
		params[1] = Integer.toString(gameID);

		result = dc.select(query, params);
		
		try {
			while (result.next()) {
				spelerids.add(result.getInt(1));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	private void addJLabels() {
		for (int i = 0; i < 3; i++) {
			labels.add(new JLabel());
			labels2.add(new JLabel());
		}
	}

}