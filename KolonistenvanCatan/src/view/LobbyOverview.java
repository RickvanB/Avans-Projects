package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridLayout;
import java.util.ArrayList;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;

import controller.LobbyController;

/**
 * This class is responsible for creating a list of game's where a player is
 * Participating to
 * 
 * @author Jip van Heugten
 *
 */
@SuppressWarnings("serial")
public class LobbyOverview extends JPanel {

	// Variables

	private final static int PANEL_WIDTH = 350;
	private final static int GRID_COLUMS = 1;
	private final static int HEIGHT_CORRECTION = 55;
	private final static int HEADER_HEIGHT = 25;

	// Header String variables
	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 16);
	private final static Color DEFAULT_COLOR = new Color(38, 38, 38);
	private final static String HEADER_STRING_TEXT = "Openstaande spellen";

	// Header Label
	private JLabel headerLabel;

	// Color
	private final static Color HEADERCOLOR = Color.ORANGE;

	// LayoutManager
	private final static BorderLayout PANEL_LAYOUT = new BorderLayout();

	// Default VGap margin
	private final static int VGAP_DEFAUL = 10;

	// Objects
	private JScrollPane scrollPane;
	private JPanel lobbyList;
	private MainPanel mp;

	private JPanel lobbyHeader;

	// Array to save Games
	private ArrayList<LobbyView> lobbies;
	// Lobby Controller
	private LobbyController lobbyController;

	// Constructor
	public LobbyOverview(MainPanel mainpanel, String username) {
		mp = mainpanel;
		// Setting the screen_height value
		int panel_Height = mainpanel.getHeight() - HEIGHT_CORRECTION;

		// Instantiating objects
		lobbyList = new JPanel();
		lobbies = new ArrayList<>();
		lobbyController = new LobbyController(this, username);

		// Header panel settings
		lobbyHeader = new JPanel();
		lobbyHeader.setPreferredSize(new Dimension(PANEL_WIDTH, HEADER_HEIGHT));
		lobbyHeader.setBackground(HEADERCOLOR);

		// Label settings
		headerLabel = new JLabel();
		headerLabel.setText(HEADER_STRING_TEXT);
		headerLabel.setFont(HEADER_FONT);
		lobbyHeader.add(headerLabel);

		// Setting the layoutmanager
		this.setLayout(PANEL_LAYOUT);
		PANEL_LAYOUT.setVgap(VGAP_DEFAUL);

		// JScrollpane Settings
		scrollPane = new JScrollPane(lobbyList);
		scrollPane.setPreferredSize(new Dimension(PANEL_WIDTH, panel_Height));
		scrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
		scrollPane.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
		scrollPane.setVisible(true);

		// Add components
		this.add(lobbyHeader, BorderLayout.PAGE_START);
		this.add(scrollPane, BorderLayout.CENTER);

	}
	
	
	// getters
	public MainPanel getMp() {
		return mp;
	}



	// Methods
	/**
	 * This method will set or reset the layoutmanager
	 * 
	 * @param rows
	 * @param colums
	 */
	public void setLayoutManager(int rows, int colums) {
		GridLayout lobbyList_Layout = new GridLayout(rows, colums);
		lobbyList.setLayout(lobbyList_Layout);
		lobbyList_Layout.setVgap(VGAP_DEFAUL);
	}

	/**
	 * This method will let the view draw the Lobbies
	 */
	public void printLobbies() {

		lobbyList.removeAll();
		LobbyView lv;

		// Getting the lobbies out of the ArrayList and add them to the LobbyList
		for (int i = 0; i < lobbies.size(); i++) {
			lv = lobbies.get(i);
			lv.setDrawLobby(true);
			lobbyList.add(lv);
			lv.repaint();

		}
	}

	/**
	 * This method will save the array with lobbies and reset the layoutmanager
	 * 
	 * @param lobbies
	 */
	public void getLobbiesArray(ArrayList<LobbyView> lobbies) {
		this.lobbies = lobbies;
		this.setLayoutManager(lobbies.size(), GRID_COLUMS);
	}

	/**
	 * This method will activate the game which the player want to play
	 * 
	 * @param gameid
	 */
	public void buttonIsPushed(int gameid) {
		mp.activateGame(gameid, false);
	}

}
