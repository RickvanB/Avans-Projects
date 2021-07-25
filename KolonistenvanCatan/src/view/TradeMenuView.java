package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Icon;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

import controller.GameCreateController;
import model.GameRefreshModel;
import model.PanelToShowModel;

public class TradeMenuView extends JPanel {

	// Variables
	private final static int BUTTON_WIDTH = 100;
	private final static int BUTTON_HEIGHT = 25;

	private final static int DICE_HEIGHT = 65;
	private final static int PANEL_WIDTH = 350;

	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 16);
	// Color
	private final static Color HEADERCOLOR = Color.ORANGE;
	private final static Color BACKGROUNDCOLOR = new Color(217, 217, 217);

	private final static String HEADER_STRING = "Handelsverzoeken";
	private final static String NEW_TRADE = "Handelsverzoek indienen";
	private final static String TRADE_OVERVIEW = "Handelsverzoeken weergeven";
	private final static String TRADE_PLAYERONTURN = "Handelsverzoek van speler die aan zet is";
	private static final String TRADE_WITHBANK = "Handelen met bank";

	// Player Variables
	private int userID;
	private int gameID;

	// Objects
	private TradeWindow tw;
	private JPanel header;
	private JLabel headerText;

	private JButton newTrade;
	private JButton showAllTrades;
	private JButton showTradePlayerOnTurn;
	private JButton tradeWithBank;


	// Model
	private PanelToShowModel pTSM;

	public TradeMenuView(int gameID, int userID, String username) {
		this.userID = userID;
		this.gameID = gameID;

		this.tw = new TradeWindow(this.gameID, this.userID, username);
		this.pTSM = new PanelToShowModel();


		this.newTrade = new JButton(NEW_TRADE);
		this.showAllTrades = new JButton(TRADE_OVERVIEW);
		this.showTradePlayerOnTurn = new JButton(TRADE_PLAYERONTURN);
		this.tradeWithBank = new JButton(TRADE_WITHBANK);

		this.header = new JPanel();
		this.headerText = new JLabel();
		
		// Alignment
		headerText.setHorizontalAlignment(SwingConstants.CENTER);
		
		// Layout Manager
		this.setLayout(new GridBagLayout());
		GridBagConstraints gbc = new GridBagConstraints();
		gbc.fill = GridBagConstraints.VERTICAL;

		// Header Layout
		gbc.gridx = 0;
		gbc.gridy = 0;
		gbc.ipadx = PANEL_WIDTH;
		this.add(header, gbc);

		gbc.gridx = 0;
		gbc.gridy = 1;
		this.newTrade.setPreferredSize(new Dimension(BUTTON_WIDTH, BUTTON_HEIGHT));
		this.newTrade.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				tw.createNewTradeRequest();
			}
		});

		this.add(this.newTrade, gbc);

		gbc.gridx = 0;
		gbc.gridy = 2;
		this.showAllTrades.setPreferredSize(new Dimension(BUTTON_WIDTH, BUTTON_HEIGHT));
		this.showAllTrades.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				if (pTSM.playerOnTurn(gameID) == userID) {
					tw.showTradeRequests();
				}
			}
		});

		this.add(this.showAllTrades, gbc);

		gbc.gridx = 0;
		gbc.gridy = 3;
		this.showTradePlayerOnTurn.setPreferredSize(new Dimension(BUTTON_WIDTH, BUTTON_HEIGHT));
		this.showTradePlayerOnTurn.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				tw.showTradeRequestPlayerOnTurn();
			}
		});

		this.add(this.showTradePlayerOnTurn, gbc);

		// Header settings
		header.setBackground(HEADERCOLOR);
		headerText.setText(HEADER_STRING);
		headerText.setFont(HEADER_FONT);
		header.add(headerText);
	}

}
