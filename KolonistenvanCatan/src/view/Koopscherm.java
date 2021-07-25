package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

import controller.BuyBuildingController;
import controller.GebouwController;
import controller.Log;
import controller.OntwikkelingskaartController;
import model.DevelopmentCardStack;
import model.PanelToShowModel;

public class Koopscherm extends JPanel {
	private final static Color HEADERCOLOR = Color.ORANGE;
	private final static Color CONTENTCOLOR = new Color(217, 217, 217);
	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 16);

	private static final String FAILED = "Het kopen is mislukt";
	private static final String SUCCES = "Gelukt! Klik om te plaatsen";
	private static final String SUCCESDEVCARD = "Gelukt!";
	private static final String CANCEL = "Annuleer";
	protected static final String CANCEL_MESSAGE = "Kopen afgebroken";

	private static final boolean SECOND_VIEW = false;
	private static final int AMOUNT_OF_OBJECTS = 4;

	private int userID;
	private int gameID;

	// Objects
	private JPanel header;
	private JPanel content;
	private JLabel headerText;
	private BuildObjectView street;
	private BuildObjectView village;
	private BuildObjectView city;
	private BuildObjectView devcard;
	private OntwikkelingskaartController oc;
	private BuyBuildingController bbc;
	private MenuGame mg;
	private PanelToShowModel pTSM;
	private Log logModel;
	private DevelopmentCardStack dcs;
	private JButton cancel;

	public Koopscherm(SideMenu sm, int gameID, int userID, MenuGame mg, GebouwController gc,
			OntwikkelingskaartController oc) {
		// buildobjects
		dcs = new DevelopmentCardStack(gameID);
		this.oc = oc;
		this.cancel = new JButton(CANCEL);

		// User credentials
		this.gameID = gameID;
		this.userID = userID;

		street = new BuildObjectView(this.userID, this.gameID, sm, this.dcs, "Straat", 0, 1, 1, 0, 0, 0, this);
		village = new BuildObjectView(this.userID, this.gameID, sm, this.dcs, "Dorp", 1, 1, 1, 1, 1, 0, this);
		city = new BuildObjectView(this.userID, this.gameID, sm, this.dcs, "Stad", 2, 0, 0, 2, 0, 3, this);
		devcard = new BuildObjectView(this.userID, this.gameID, sm, this.dcs, "Ontwikkelingskaart", 3, 0, 0, 1, 1, 1,
				this);
		bbc = new BuyBuildingController(dcs, oc, gameID, userID, gc);
		this.mg = mg;
		this.logModel = new Log(userID, gameID);
		this.pTSM = new PanelToShowModel();

		// this panel
		this.setPreferredSize(new Dimension(350, 453));
		this.setLayout(new BorderLayout());

		// header
		header = new JPanel();
		header.setBackground(HEADERCOLOR);

		headerText = new JLabel("Bouwkosten");
		header.add(headerText);
		headerText.setFont(HEADER_FONT);
		this.add(header, BorderLayout.PAGE_START);

		// content
		content = new JPanel();
		this.add(content, BorderLayout.CENTER);

		this.buildContent();

		// Actionlistner
		cancel.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				// Give back materials and cancel building
				bbc.re_GiveMaterials();
				mg.drawPlayerInfo(false, CANCEL_MESSAGE);
			}
		});
	}

	public void buildContent() {
		content.setBackground(CONTENTCOLOR);
		content.add(street);
		content.add(village);
		content.add(city);
		content.add(devcard);
		content.add(cancel);

		// Check Able to Buy
		this.checkAbleToBuy();

	}

	/**
	 * This method will activate the buying process
	 * 
	 * @param name
	 * @param wood
	 * @param stone
	 * @param grain
	 * @param wool
	 * @param ore
	 */
	public boolean buyBuilding(String name, int wood, int stone, int grain, int wool, int ore,
			boolean automaticBuyCheck) {
		boolean possible = bbc.buyBuildings(name, wood, stone, grain, wool, ore, automaticBuyCheck);

		if (possible && !automaticBuyCheck) {
			// Set success message
			if (name.contains("O")) {
				this.mg.drawPlayerInfo(false, SUCCESDEVCARD);
			} else {
				this.mg.drawPlayerInfo(false, SUCCES);
			}
			// Activate drawBuilding method
			this.bbc.buildBuilding(name);

			// Add log message
			this.logModel.defaultLog("build", pTSM.getUsername(this.userID), null, 0, name, null);

			this.mg.drawVictoryPoints(userID, gameID, SECOND_VIEW);

		} else if (!possible && !automaticBuyCheck) {
			// Set failed message
			if (bbc.getMessage() != null) {
				this.mg.drawPlayerInfo(false, this.bbc.getMessage());
			} else {
				this.mg.drawPlayerInfo(false, FAILED);
			}
		}
		// Reset values
		bbc.resetvalues();
		
		return possible;
	}

	/**
	 * This method will check if a player is able to buy a kind of building
	 */
	public void checkAbleToBuy() {
		ArrayList<BuildObjectView> buildobjects = new ArrayList<>();
		buildobjects.add(city);
		buildobjects.add(village);
		buildobjects.add(street);
		buildobjects.add(devcard);

		for (int i = 0; i < AMOUNT_OF_OBJECTS; i++) {
			buildobjects.get(i).checkAbleToBuy();
		}
	}

}
