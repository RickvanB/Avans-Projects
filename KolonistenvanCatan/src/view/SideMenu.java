package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;

import javax.swing.Icon;
import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JScrollPane;

import controller.GebouwController;
import controller.Log;
import controller.OntwikkelingskaartController;
import model.Chat;
import model.PanelToShowModel;

/**
 * This class is responsible for setting up the side menu
 * 
 * @author Jip van Heugten
 *
 */
public class SideMenu extends JPanel {

	// Variables
	private final static Color BACKGROUNDCOLOR = new Color(217, 217, 217);
	private final static String BUTTON_TEXT = "Volgend Menu";

	private final static int FIRST_MENU = 1;
	private final static int SECOND_MENU = 2;
	private final static int TIRTH_MENU = 3;
	private final static int FOURTH_MENU = 4;
	protected static final int FIFTH_MENU = 5;

	private int menuCount;
	private int gameID;
	private int userID;

	// Button sizes
	private final static int BUTTON_HEIGHT = 20;
	private final static int PANEL_WIDTH = 450;
	
	// Oponents positions
	private static final int FIRST = 0;
	private static final int SECOND = 1;
	private static final int THIRTH = 2;
	private static final String ATTACK_BANDIT = "Struikrover aanvallen";

	// Layout
	private BorderLayout layout;

	// Objects
	private ChatBox cB;
	private Grondstofoverzicht gO;
	private BankOverview bO;
	private DobbelMenuView dMV;
	
	private JButton switchMenu;
	private JButton attackBandit;

	// KOOPSCHERM TEST
	private Ontwikkelingskaartoverzicht oO;
	private Koopscherm k1;
	private OntwikkelingskaartController O1;
	private Chat modelClass;
	private TradeMenuView tmv;
	private PanelToShowModel ptsm;
	private LongestTradeRouteView lTRV;
	private RiddermachtView rv;
	private MaterialOverviewView materialOverview;
	private BanditMenu bm;
	private JPanel menuComponents;
	private JScrollPane scroll;

	// Constructor
	public SideMenu(int userID, int gameID, Log log, String username, PanelToShow pts, GebouwController gc) {
		this.gameID = gameID;
		this.userID = userID;
		
		// Instantiating objects
		modelClass = new Chat();
		
		// Get players in games and insert the overview of DEV cards
		String[] playerIDS = modelClass.playerInGame(gameID);
		
		ArrayList<Integer> opponents = new ArrayList<Integer>();
		for(int i = 0; i < playerIDS.length; i++) {
			if(!(playerIDS[i].equals(Integer.toString(userID)))) {
				try {
					opponents.add(Integer.parseInt(playerIDS[i]));
				} catch (Exception e) {
					e.printStackTrace();
				}
				
			}
		}
		

//		oko = new Ontwikkelingskaartoverzicht(gameID,opponents.get(FIRST),opponents.get(SECOND),opponents.get(THIRTH));
		cB = new ChatBox(userID, gameID);
		gO = new Grondstofoverzicht(gameID, userID);
		bO = new BankOverview(gameID);
		lTRV = new LongestTradeRouteView(this, gameID);
		rv = new RiddermachtView(gameID, userID);
		materialOverview = new MaterialOverviewView(gameID);
		bm = new BanditMenu(gameID, userID);
		oO = new Ontwikkelingskaartoverzicht(gameID, userID);
		// KOOPSCHERM TEST
		O1 = new OntwikkelingskaartController(gameID, userID, gc);
		//O1 = new OntwikkelingskaartView(gameID, userID);
		k1 = new Koopscherm(this, gameID, userID, pts.getmG(), pts.getGc(), O1);
		dMV = new DobbelMenuView(gameID, userID, log, bm, pts);
		this.tmv = new TradeMenuView(gameID, userID, username);
		this.ptsm = new PanelToShowModel();
		switchMenu = new JButton(BUTTON_TEXT);
		
		menuComponents = new JPanel();
		layout = new BorderLayout();

		// Set default menu count
		menuCount = 1;

		// Background
		cB.setBackground(BACKGROUNDCOLOR);
		gO.setBackground(BACKGROUNDCOLOR);
		bO.setBackground(BACKGROUNDCOLOR);
		dMV.setBackground(BACKGROUNDCOLOR);
		
		// LayoutManager
		this.setLayout(new BorderLayout());
		// Layout settings
		this.setLayout(layout);
		menuComponents.setLayout(new BorderLayout());

		// Button Settings
		switchMenu.setMaximumSize(new Dimension(this.getWidth(), BUTTON_HEIGHT));

		// Size of panel
		this.setPreferredSize(new Dimension(PANEL_WIDTH, this.getHeight()));
		this.setMaximumSize(this.getPreferredSize());

		// Add components
		menuComponents.add(cB);
		menuComponents.add(gO);
		menuComponents.add(bO);

		// Scroll Settings
		scroll = new JScrollPane(menuComponents);
		scroll.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
		scroll.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);

		this.add(scroll, BorderLayout.CENTER);
		this.add(switchMenu, BorderLayout.PAGE_END);

		switchMenu.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				if (menuCount == 1) {
					switchMenu(SECOND_MENU);
					menuCount = 2;
				} else if (menuCount == 2) {
					switchMenu(TIRTH_MENU);
					menuCount = 3;
				} else if (menuCount == 3) {
					switchMenu(FOURTH_MENU);
					menuCount = 4;

				} else if (menuCount == 4) {
					switchMenu(FIFTH_MENU);
					menuCount = 5;
				} else if (menuCount == 5) {

					switchMenu(FIRST_MENU);
					menuCount = 1;
				}

			}
		});
	}
	
	public ChatBox getcB() {
		return cB;
	}

	// Getters
	public DobbelMenuView getdMV() {
		return dMV;
	}

	public Koopscherm getK1() {
		return k1;
	}

	public MaterialOverviewView getMaterialOverview() {
		return materialOverview;
	}
	
	public OntwikkelingskaartController getOController() {
		// include validation, logic, logging or whatever you like here
		return this.O1;
	}
	
	public Ontwikkelingskaartoverzicht getDevOpponents() {
		return oO;
	}
	
	public int getUserId() {
		return this.userID;
	}

	public RiddermachtView getRv() {
		return rv;
	}
	
	public LongestTradeRouteView getlTRV() {
		return lTRV;
	}
	
	// Methods 
	
	/**
	 * Switch between different menu's
	 * 
	 * @param menuNumber
	 */
	public void switchMenu(int menuNumber) {
		if (menuNumber == 1) {
			// Remove Components
			menuComponents.removeAll();

			// Add components
			menuComponents.add(cB, BorderLayout.PAGE_START);
			menuComponents.add(gO, BorderLayout.CENTER);
			menuComponents.add(bO, BorderLayout.PAGE_END);

		} else if (menuNumber == 2) {
			// Remove
			menuComponents.removeAll();

			// Add components

			menuComponents.add(dMV, BorderLayout.PAGE_START);
			menuComponents.add(this.tmv, BorderLayout.CENTER);
			menuComponents.add(this.lTRV, BorderLayout.PAGE_END);

		} else if (menuNumber == 3) {
			// Remove componenents
			menuComponents.removeAll();

			// Add comonents
			menuComponents.add(this.k1, BorderLayout.CENTER);

		} else if (menuNumber == 4) {
			// Remove componenents
			menuComponents.removeAll();

			// Add comonents

			menuComponents.add(this.O1.getOView(), BorderLayout.CENTER);

		} else if (menuNumber == 4) {
			// Remove componenents
			menuComponents.removeAll();

			// Add comonents

		} else if (menuNumber == 5) {
			// Remove componenents
			menuComponents.removeAll();

			// Add comonents
			menuComponents.add(materialOverview, BorderLayout.PAGE_START);
			menuComponents.add(this.rv, BorderLayout.CENTER);
			menuComponents.add(oO, BorderLayout.PAGE_END);

		}
		this.validate();
		this.repaint();
	}
}
