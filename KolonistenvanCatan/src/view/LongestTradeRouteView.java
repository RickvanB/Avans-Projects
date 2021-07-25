package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

import model.LangsteRouteModel;
import model.PanelToShowModel;

public class LongestTradeRouteView extends JPanel {

	// Variables
	private final static int PANEL_HEIGT = 200;
	private final static int HEADER_HEIGT = 25;

	private final static String DEFAULT_MESSAGE = "Langste Handelsroute";
	private static final String TRADE_MESSAGE = "In het bezit van: ";
	private static final String TRADE_AMOUNT_MESSAGE = "Lengte: ";

	private final static Color HEADER_COLOR = Color.ORANGE;
	private final static Color BACKGROUNDCOLOR = new Color(217, 217, 217);

	private final static Font STRING_FONT = new Font("Arial", Font.PLAIN, 16);
	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 18);
	private static final int HEADER_WIDTH = 450;

	// Objects
	private LangsteRouteModel lRM;
	private SideMenu sm;
	private PanelToShowModel pTSM;
	private JLabel headerText;
	private JPanel header;

	private JLabel longestRouteText;
	private JPanel longestRoute;

	private JLabel amountLongestRouteText;
	private JPanel amountLongestRoute;

	// Constructor
	public LongestTradeRouteView(SideMenu sm, int gameID) {
		this.lRM = new LangsteRouteModel();
		this.header = new JPanel();
		this.headerText = new JLabel();

		this.longestRoute = new JPanel();
		this.longestRouteText = new JLabel();

		this.amountLongestRoute = new JPanel();
		this.amountLongestRouteText = new JLabel();

		// Set preffered size
		this.setPreferredSize(new Dimension(sm.getWidth(), PANEL_HEIGT));

		// Set layout manager

		// Set background
		this.setBackground(BACKGROUNDCOLOR);

		// Add Header
		this.setInfo();
		this.setLongestRouteInfo();
		this.setAmoutLongestRouteInfo();

		this.refreshInfo(gameID);

	}

	/**
	 * This method will set the header text
	 */
	private void setInfo() {
		// Set the size of the panels
		this.header.setPreferredSize(new Dimension(HEADER_WIDTH, HEADER_HEIGT));
		this.header.setMaximumSize(this.header.getPreferredSize());
		this.headerText.setMaximumSize(this.header.getPreferredSize());

		// Set background and font
		this.header.setBackground(HEADER_COLOR);
		this.headerText.setFont(HEADER_FONT);

		// Alignment
		headerText.setHorizontalAlignment(SwingConstants.CENTER);

		// Set layout
		this.header.setLayout(new BorderLayout());

		// Set default text
		this.headerText.setText(DEFAULT_MESSAGE);

		// Add components
		this.header.add(headerText, BorderLayout.CENTER);
		this.add(header);
	}

	/**
	 * This method will set the player name of the one with the longest route
	 */
	private void setLongestRouteInfo() {
		// Set the size of the pannels
		this.longestRoute.setPreferredSize(new Dimension(HEADER_WIDTH, HEADER_HEIGT));
		this.longestRoute.setMaximumSize(this.longestRoute.getPreferredSize());
		this.longestRouteText.setMaximumSize(this.longestRoute.getPreferredSize());

		// Set background and font
		this.longestRouteText.setFont(STRING_FONT);

		// Alignment
		longestRouteText.setHorizontalAlignment(SwingConstants.CENTER);

		// Set layout
		this.longestRoute.setLayout(new BorderLayout());

		// Set default text
		this.longestRouteText.setText(TRADE_MESSAGE + "---");

		// Add components
		this.longestRoute.add(longestRouteText, BorderLayout.CENTER);
		this.add(longestRoute);
	}

	/**
	 * This method will set the amount of the longest route
	 */
	private void setAmoutLongestRouteInfo() {
		// Set the size of the pannels
		this.amountLongestRoute.setPreferredSize(new Dimension(HEADER_WIDTH, HEADER_HEIGT));
		this.amountLongestRoute.setMaximumSize(this.amountLongestRoute.getPreferredSize());
		this.amountLongestRouteText.setMaximumSize(this.amountLongestRoute.getPreferredSize());

		// Set background and font
		this.amountLongestRouteText.setFont(STRING_FONT);

		// Alignment
		amountLongestRouteText.setHorizontalAlignment(SwingConstants.CENTER);

		// Set layout
		this.amountLongestRoute.setLayout(new BorderLayout());

		// Set default text
		this.amountLongestRouteText.setText(TRADE_AMOUNT_MESSAGE + "---");

		// Add components
		this.amountLongestRoute.add(amountLongestRouteText, BorderLayout.CENTER);
		this.add(amountLongestRoute);
	}

	/**
	 * This method will set the player info
	 */
	public void refreshInfo(int gameID) {
		
		lRM.checkPlayerAndRoute(gameID);

		String amountLongestRoute = lRM.getLongestRoute() + "";
		String playerNameLongestRoute = lRM.getPlayerName();

		// Check if the values are not null
		if (amountLongestRoute != null && playerNameLongestRoute != null) {
			
			try {
				this.longestRouteText.setText(TRADE_MESSAGE + playerNameLongestRoute );
				this.amountLongestRouteText.setText(TRADE_AMOUNT_MESSAGE + amountLongestRoute);
			} catch (Exception e) {
				e.printStackTrace();
			}
			

			this.validate();
			this.repaint();
		} else {
			System.out.println("Warning: [LongestTradeRouteView] Refreshing the info has failed because nobody has the longste trade route");
			return;

		}
	}
}
