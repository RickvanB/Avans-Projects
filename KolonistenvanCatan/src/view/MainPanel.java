package view;

import java.awt.BorderLayout;
import java.awt.Dimension;

import javax.swing.JPanel;

import model.PanelToShowModel;

@SuppressWarnings("serial")
public class MainPanel extends JPanel {

	// Variables

	private int screenWidth;
	private int screenHeight;
	private String userName;

	private final static int HGAP = 15;
	private final static int VGAP = 15;
	private static final boolean STOP_THREAD = false;

	private boolean usernameSet;

	// LayoutManager
	private BorderLayout layout;

	// Save the current JPanel that will be removed later
	JPanel currentPanel;

	// Objects
	private InlogOfRegistratieView iOR;
	private PanelToShowModel pTSM;
	private JPanel contentPaneToSet;
	private PanelToShow pTS;
	private LobbyOverview lo;
	private InviteView iV;
	private MenuGame eG;

	// Constructor
	public MainPanel(MainFrame myFrame) {
		screenWidth = myFrame.getSCREEN_WIDTH();
		screenHeight = myFrame.getSCREEN_HEIGHT();

		// Instantiating objects
		contentPaneToSet = null;
		usernameSet = false;

		// Set LayoutManager
		layout = new BorderLayout();
		this.setLayout(layout);
		layout.setHgap(HGAP);
		layout.setVgap(VGAP);

		// Setting the size of the panel
		this.setPreferredSize(new Dimension(screenWidth, screenHeight));

		iOR = new InlogOfRegistratieView(this);
		eG = new MenuGame(this);
		pTSM = new PanelToShowModel();

		// This (Login) is the default screen
		this.add(iOR);
	}
	// Getters and Setters

	public int getScreenWidth() {
		return screenWidth;
	}

	public int getScreenHeight() {
		return screenHeight;
	}

	public String getUserName() {
		return userName;
	}

	public boolean isUsernameSet() {
		return usernameSet;
	}

	public JPanel getContentPaneToSet() {
		return contentPaneToSet;
	}

	public void setContentPaneToSet(JPanel contentPaneToSet) {
		this.contentPaneToSet = contentPaneToSet;
	}

	public MenuGame geteG() {
		return eG;
	}

	public LobbyOverview getLobby() {
		return lo;
	}

	public PanelToShow getpTS() {
		return pTS;
	}

	// Methods
	/**
	 * This method will change the screen if the login was successful
	 * 
	 * @param loginIssuccessfull
	 */

	public void loginsuccessfull(Boolean loginIssuccessfull, String userName) {
		if (loginIssuccessfull) {

			// Set the username of the player to open up the right Lobby
			this.userName = userName;
			this.iV = new InviteView(this, this.userName);

			// Draw Player Info welcome menu
			eG.drawPlayerInfo(true, null);

			// Lobby object that will show all the games where the player is in
			lo = new LobbyOverview(this, userName);

			// This will open up the lobby menu
			this.add(eG, BorderLayout.PAGE_START);
			this.add(lo, BorderLayout.LINE_START);
			this.add(iV, BorderLayout.CENTER);

			this.eG.setUsername(this.userName);
			this.iV.getInvites();
			// This will remove the other window

			this.remove(contentPaneToSet);

			this.validate();
			this.repaint();

		} else {
			// Login is not successful so this method will be stopped
			return;
		}

	}

	/**
	 * This method will change the contentpane
	 * 
	 * @param panel
	 */
	public void ContentPaneSet(JPanel panel) {

		// If the current JPanel is equal to null it will be set to iOR
		if (this.contentPaneToSet == null) {
			currentPanel = this.iOR;
		} else {
			currentPanel = this.contentPaneToSet;
		}

		// Save the JPanel that needs to be added
		contentPaneToSet = iOR.changeContentPane(panel);

		this.add(contentPaneToSet);
		this.remove(currentPanel);
		this.validate();
		this.repaint();
	}

	/**
	 * This method will open the class which will open the windows
	 * 
	 * @param gameID
	 */
	public void activateGame(int gameID, boolean inisializeBoard) {
		if (!inisializeBoard) {
			// Remove invite buttons
			this.eG.removeOrSet_InviteButtons(true);
		}
			// Instantiating the object which will open the other windows
			pTS = new PanelToShow(gameID, this.userName, this, eG, inisializeBoard);

		if (!inisializeBoard) {
			// Activate pass button
			eG.drawPassButton(true);

			// Add the window to the contentpane
			this.add(pTS);

			// Remove the old one
			this.remove(lo);
			this.remove(iV);

			this.validate();
			this.repaint();
		}
	}

	/**
	 * This method will let the player return to the main menu
	 */
	public void signOut() {
		this.removeAll();
		this.add(iOR);

		this.repaint();
		this.validate();

	}

	public boolean passTurn() {

		// Return boolean
		boolean retBoolean = false;

		retBoolean = pTS.passTurn();

		return retBoolean;
	}

	/**
	 * This method will set a message when new player is on turn
	 * 
	 * @param playerOnTurn
	 */
	public void setTurnMessage(String username) {

		eG.drawPlayerInfo(false, username + " is aan de beurt");
	}

	public void leaveBattle() {
		this.removeAll();
		this.loginsuccessfull(true, this.getUserName());
		this.validate();

	}

	/**
	 * This method will stop all the threads that are running
	 */
	public void stopThreads() {
		try {
			if (pTS != null) {
				pTS.getgT().setGameIsRunning(STOP_THREAD);

				if (pTS.getsM().getcB().getcU().getChatUpdateThread() != null) {
					pTS.getsM().getcB().getcU().getChatUpdateThread().setGameIsRunning(STOP_THREAD);
					;
				}
			}
		} catch (Exception e) {
			System.out.println("Warning: There where no threads running");
		}
		

	}
}
