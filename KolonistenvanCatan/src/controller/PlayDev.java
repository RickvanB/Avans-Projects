package controller;

import java.util.ArrayList;

import javax.swing.JFrame;
import javax.swing.JOptionPane;

import model.DevelopmentCardStack;
import model.DistributeMateriallModel;
import model.Ontwikkelingskaart;
import view.SingleDevCardView;
import view.BordView;
import view.GebouwView;

public class PlayDev {
	JFrame popup;
	
	private Log log;
	private int userID;
	private int gameID;
	private GebouwController gb;
	private DevelopmentCardStack dcs;
	private DistributeMateriallModel dMM;
	private BuyBuildingController bbC;
	private BordView bV;

	private OntwikkelingskaartController oc;
	private Ontwikkelingskaart o;

	private GebouwView gv;
	
	public int counter = 0;
	private final static String BANDIT_MESSAGE = "Je moet de struikrover verzetten en mag een speler aanvallen!";
	
	/**
	 * This class is responsible for playing a developmentcard
	 * 
	 * @author Fritz Wierper, Tim Noordhoorn
	 *
	 */
	public PlayDev(OntwikkelingskaartController oc, DevelopmentCardStack dcs, GebouwController gb, int userID, int gameID) {
		this.gameID = gameID;
		this.userID = userID;
		this.dcs = dcs;
		this.oc = oc;
		popup = new JFrame();
		log = new Log(this.userID, this.gameID);
		gv = new GebouwView();
		this.gb = gb;
		bbC = new BuyBuildingController(dcs, oc, gameID, userID, this.gb);
		dMM = new DistributeMateriallModel();
	}
	
	//this method checks what kind of dev card it is and which function it has
	
	public void chooseWhichPlay(SingleDevCardView sdcv, Ontwikkelingskaart o) {
		this.o = o;
		if (o.getCardName().equals("ridder")) {
			this.playKnight();
		}
		
		else if (o.getCardName().equals("monopolie")) {
			this.playMonopoly();
		}
		
		
		else if (o.getCardName().equals("uitvinding")) {
			this.playInvention();
		}
		
		else if (o.getCardName().equals("stratenbouw")) {
			this.playRoadBuild();
			counter++;
			
		}
		
		else if (o.getCardName().equals("bibliotheek") || o.getCardName().equals("parlement") || o.getCardName().equals("markt")|| o.getCardName().equals("universiteit") || o.getCardName().equals("kathedraal")) {
		}
		
		else { System.out.println("couldn't find devcard");}
	}
	public void playKnight() {
		System.out.println("ridder spelen");
		int result = JOptionPane.showConfirmDialog(null, BANDIT_MESSAGE, BANDIT_MESSAGE,
				JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
		if (result == JOptionPane.OK_OPTION) {
			gb.placeBuilding("bandit");
		}
		//Confirmation
		this.dcs.setCardPlayed(this.o.getCardId());
		
		this.oc.drawPlayersDevCards(dcs, userID);
	}
	
	public void playMonopoly() {
		System.out.println("monopolie spelen");
		
		//Option dialog with 5 choices
		log.defaultLog("development", this.userID + "", null, 0, "monopolie", null);
		
		Object[] options = {"hout", "baksteen", "graan", "wol", "erts"};
		String s = (String)JOptionPane.showInputDialog(this.popup,
                "Kies een grondstof. \n "
                + "Alle spelers geven je van deze grondstof \\n"
                + "alle kaarten die ze bezitten.",
                "Kies een grondstof", JOptionPane.PLAIN_MESSAGE,
                null, options,
                "kies een grondstof");
		
		//Start monopoly
		dMM.monopoly(s, this.userID, this.gameID);
		
		//Confirmation
		this.dcs.setCardPlayed(this.o.getCardId());
		
		this.oc.drawPlayersDevCards(dcs, userID);
		
		JOptionPane.showMessageDialog(popup,
				"Je hebt van iedereen alle grondstofkaarten gekregen \n"
				+ " van het type " + s +".");
	}
	
	
	public void playInvention() {
		System.out.println("uitvinding spelen");
		
		Object[] options = {"hout", "baksteen", "graan", "wol", "erts"};
		//grondstof 1
		String g1 = null;
		String g2 = null;
		g1 = (String)JOptionPane.showInputDialog(this.popup,
                "Je krijgt twee grondstoffen naar keuze van de bank \n "
                + "Kies de eerste grondstof.",
                "Kies een grondstof", JOptionPane.PLAIN_MESSAGE,
                null, options,
                "kies een grondstof");
		if (g1 != null) {
			g2 = (String)JOptionPane.showInputDialog(this.popup,
	                "Kies een grondstof. "
	                + "Kies de tweede grondstof.",
	                "Kies een grondstof", JOptionPane.PLAIN_MESSAGE,
	                null, options,
	                "kies een grondstof");
		}
		
		if (g2 != null) {
			
			//method to check if there are resources left
			String material = null;
			boolean success = false;
			
			switch(g1) {
			case "erts" : material = "e";
			break;
			case "wol" : material = "w";
			break;
			case "baksteen" : material = "b";
			break;
			case "graan" : material = "g";
			break;
			case "hout" : material = "h";
			break;
			}
			
			String material2 = null;
			boolean success2 = false;
			
			switch(g2) {
			case "erts" : material2 = "e";
			break;
			case "wol" : material2 = "w";
			break;
			case "baksteen" : material2 = "b";
			break;
			case "graan" : material2 = "g";
			break;
			case "hout" : material2 = "h";
			break;
			}
			
			ArrayList<String> unusedMat = dMM.findUnusedMaterials(this.gameID + "", material, true, this.userID + "");
			ArrayList<String> unusedMat2 = dMM.findUnusedMaterials(this.gameID + "", material2, true, this.userID + "");
			
			if(unusedMat.size() == 0) {
				
				JOptionPane.showMessageDialog(popup,
						"De bank heeft geen " + g1 + " meer in voorraad.");
			}
			else if(unusedMat.size() > 0) {
				if(unusedMat2.size() == 0) {
					
					JOptionPane.showMessageDialog(popup,
							"De bank heeft geen " + g2 + " meer in voorraad.");
				}
				else {
					success = dMM.distributeToPlayerOrFromPalyer(this.gameID + "", this.userID + "", unusedMat.get(0), false);
					unusedMat2 = dMM.findUnusedMaterials(this.gameID + "", material2, true, this.userID + "");
					success2 = dMM.distributeToPlayerOrFromPalyer(this.gameID + "", this.userID + "", unusedMat2.get(0), false);
					
					this.dcs.setCardPlayed(this.o.getCardId());
					
					this.oc.drawPlayersDevCards(dcs, userID);
					
					if (g1 == g2) {
						JOptionPane.showMessageDialog(popup,
								"Je hebt twee " + g1 + " gekregen van de bank.");
					}
					else {
						JOptionPane.showMessageDialog(popup,
								"Je hebt " + g1 +" en "+ g2 + " gekregen van de bank.");
					}
				}
				
			}
			
		}
		
	}
	
	public void playRoadBuild() {
		System.out.println("wegenbouw spelen");
		
		if(counter == 0) {
			log.defaultLog("development", this.userID + "", null, 0, "stratenbouw", null);
		
		JOptionPane.showMessageDialog(popup,
				"Plaats twee straatjes. \n Na het plaatsen van het eerste straatje klik op de [Speel kaart] knop om te bevestigen, \n plaats daarna het tweede straatje.");
		}
		
		bbC.buildBuilding("straat");
		
		if(counter == 1) {
			this.dcs.setCardPlayed(this.o.getCardId());
			
			this.oc.drawPlayersDevCards(dcs, userID);
			
			counter = -1;
		}
		
	}
	
	
	public int getCounter() {
		return counter;
	}

}
