package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;

import javax.swing.JLabel;
import javax.swing.JPanel;

import controller.CreateBordController;
import controller.GameCreateController;
import controller.GameProces;
import controller.GameThread;
import controller.GebouwController;
import controller.Log;
import controller.OntwikkelingskaartController;
import controller.PassTurnController;
import model.GameRefreshModel;
import model.InstertMaterialsModel;
import model.PanelToShowModel;
import model.PassTurnModel;

/**
 * This class will open the windows which are needed for playing the game
 * 
 * @author Jip van Heugten
 *
 */
public class PanelToShow extends JPanel {

	// Variables
	private int gameID;
	private String username;
	private int userID;

	private final static int VGAP = 15;
	private final static int HGAP = 15;

	private final static String HEADER_TEXT = "Menu - Extra opties";
	private final static String NEED_TO_THROW = "Dobbel voordat je de beurt doorgeeft";
	private final static String NOT_YOUR_TURN = "Het is niet jouw beurt";
	private final static String DEFAULT = "Niks te melden";

	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 16);
	// Color
	private final static Color HEADERCOLOR = Color.ORANGE;
	private final static Color MAIN_BACKGROUND = new Color(77, 136, 255);
	private static final boolean FIRSTVIEW = true;

	// Objects
	private PanelToShowModel pTSM;
	private SideMenu sM;
	private PassTurnController pTTC;
	private BorderLayout layout;
	private BorderLayout layoutHeader;
	private JPanel sideMenuFrame;
	private JLabel sideMenuHeaderText;
	private JPanel sideMenuHeader;
	private MenuGame mG;
	private JPanel mainPanelWindow;
	private Log logController;
	private GameRefreshModel gRM;
	private GameProces gp;
	private GebouwController gc;
	private InstertMaterialsModel iMM;

	// Threads and components
	private GameCreateController gCC;
	private GameThread gT;

	private BordView bV;
	private CreateBordController cBC;
	private MainPanel mainPanel;
	private GebouwView gv;
	private PassTurnModel pTM;

	// Contstructor
	public PanelToShow(int gameID, String username, MainPanel mainPanel, MenuGame eg, boolean inisializeboard) {
		// Instantiating variables
		this.gameID = gameID;
		this.username = username;

		this.mG = eg;
		this.gRM = new GameRefreshModel();
		this.mainPanel = mainPanel;
		this.gCC = new GameCreateController();
		pTSM = new PanelToShowModel();
		userID = pTSM.getUserID(username, gameID);
		gv = new GebouwView();
		iMM = new InstertMaterialsModel();
		this.gc = new GebouwController(gameID, gv, userID);
		this.pTM = new PassTurnModel();

		mainPanelWindow = new JPanel();

		// Set up or load the gameBoard
		this.setUpGameBoard();
		// Insert Bandit position
		
		if(inisializeboard) {
			this.pTSM.insertBandit(gameID);
		}
		

		if (!inisializeboard) {
			// Insert materials if needed
			iMM.insertMaterials(gameID);

			sideMenuFrame = new JPanel();
			sideMenuHeaderText = new JLabel();
			sideMenuHeader = new JPanel();
			layoutHeader = new BorderLayout();
			layout = new BorderLayout();
			this.logController = new Log(userID, gameID);

			sM = new SideMenu(userID, gameID, logController, username, this, gc);

			// Thread settings
			gT = new GameThread(gameID, this.userID, this, sM);
			// Start Thread
			gT.start();

			// Instatiate gameProces
			this.gp = new GameProces(gameID, userID, username);

			// Layout manager
			this.setLayout(layout);
			layout.setHgap(HGAP);

			// MainPanel Window Settings
			mainPanelWindow
					.setPreferredSize(new Dimension((int) (this.getWidth() - sM.getWidth()), (int) this.getHeight()));
			mainPanelWindow.setBackground(MAIN_BACKGROUND);

			// Add the game board if exists (Security Check)
			if (bV != null) {
				// Add the game board
				mainPanelWindow.add(bV);
			} else {
				System.out.println("Warning [PanelToShow] - MAJOR Error - Game board can't be loaded");
			}

			// Pass turn controller
			pTTC = new PassTurnController(gameID, userID, mainPanel);

			// SideMenu
			sideMenuHeaderText.setText(HEADER_TEXT);
			sideMenuHeaderText.setFont(HEADER_FONT);
			sideMenuHeader.setBackground(HEADERCOLOR);

			// Set layout manager of the Header
			sideMenuFrame.setLayout(layoutHeader);
			layoutHeader.setVgap(VGAP);

			// Add components
			sideMenuHeader.add(sideMenuHeaderText);
			sideMenuFrame.add(sideMenuHeader, BorderLayout.PAGE_START);
			sideMenuFrame.add(sM, BorderLayout.CENTER);

			// Set the preferredsize
			this.setPreferredSize(new Dimension(mainPanel.getWidth(), mainPanel.getHeight()));

			this.addComponents();

			// Add message window in menuBar
			mG.drawMessagePanel();
			mG.drawVictoryPoints(this.userID, gameID, FIRSTVIEW);
		}
	}

	// Getters and Setters
	public int getGameID() {
		return gameID;
	}

	public String getUsername() {
		return username;
	}

	public GameThread getgT() {
		return gT;
	}

	public SideMenu getsM() {
		return sM;
	}

	public GameProces getGp() {
		return gp;
	}

	public MenuGame getmG() {
		return mG;
	}

	public GebouwController getGc() {
		return gc;
	}

	// Methods
	/**
	 * This method will add and remove components
	 */
	public void add_remove_Compontent(JPanel toRemove, JPanel toAdd) {

		if (toRemove == null) {
			this.add(toAdd);
		} else if (toAdd == null) {
			this.remove(toRemove);
		} else {
			this.add(toAdd);
			this.remove(toRemove);
		}

		this.validate();
		this.repaint();
	}

	/**
	 * From this method you can call the add_remove_Components method
	 */
	public void addComponents() {
		this.add(sideMenuFrame, BorderLayout.LINE_START);
		this.add(mainPanelWindow, BorderLayout.CENTER);

	}

	/**
	 * This method will the passTurn method
	 * 
	 * @return
	 */
	public boolean passTurn() {
		// Return boolean
		boolean passTurnSuccesfull = false;
		boolean playerOnTurn = false;

		// Check if player is on turn
		int playerOnTurnID = pTSM.playerOnTurn(gameID);
		if (playerOnTurnID == userID) {
			playerOnTurn = true;
		}

		// Check if player has already thrown
		if (pTSM.hasPlayerThrown(gameID) || pTM.inFirstRound(gameID)) {
			passTurnSuccesfull = pTTC.passTurnTo(this.gameID, this.userID);

			if (passTurnSuccesfull) {
				mG.setMessage(DEFAULT);
				gRM.setRefreshValue(true, this.gameID);

				this.setPlayerOnTurnInfo();

			} else {
				mG.setMessage(pTTC.getMessage());
			}
		} else if (playerOnTurn) {

			mG.setMessage(NEED_TO_THROW);
		} else {
			mG.setMessage(NOT_YOUR_TURN);
		}

		return passTurnSuccesfull;
	}

	/**
	 * This method will draw the player info in the gameMenu
	 */
	public void setPlayerOnTurnInfo() {
		// Set message in window who is on turn
		String username = pTSM.getUsername(pTSM.playerOnTurn(gameID));
		mainPanel.setTurnMessage(username);
	}

	/**
	 * This method will set up a new game board or will load an exitisting one
	 */
	public void setUpGameBoard() {

		// Instantiating controller
		this.cBC = new CreateBordController();

		try {
			// Check if gameboard exists
			if (pTSM.gameBoardExists(gameID)) {
				// Try to load an exiting board
				this.bV = new BordView(gameID, gc, gv, userID);
			} else {
				// Import game Values
				gCC.importGame(gameID);

				// Create new board
				this.cBC.createBord(gameID, gCC.isRandombord()); 
				this.bV = new BordView(gameID, gc, gv, userID);

				System.out.println(
						"Message: [Panel To Show] - Board doesn't exits yet. There will be created a new board");
			}

		} catch (Exception e) {
			System.out.println("Warning: [Panel To Show] - Board doesn't exits and can't be created at the moment");
		}

	}

}
