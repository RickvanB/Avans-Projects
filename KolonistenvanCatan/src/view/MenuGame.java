package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.SwingConstants;

import controller.VictoryPointsController;
import model.DatabaseCommunicator;

public class MenuGame extends JPanel {

	// Variables
	
	// Panel messages
	private final static String EXITBUTTON = "Afsluiten";
	private final static String SIGN_OUT = "Uitloggen";
	private final static String WELCOME_TEXT = "Welkom! Let's Play: ";
	private final static String DEFAULT_MESSAGE = "Nog niks te melden...";
	private final static String THROWTURN = "Eindig beurt";
	private static final String VICOTORYPOINT_MESSAGE_START = "Jij bezit: ";
	private static final String VICOTORYPOINT_MESSAGE_END = " overwinningspunten";
	private static final String LEAVEBATTLE = "Verlaat Spel";
	private static final String START_NEW_GAME = "Nieuw spel";
	private static final String INVITE_NEW = "Re-Invite";

	// Booleans
	private static final boolean DOCHECK_BUILDINGS = true;
	
	// Font
	private final static Font HEADER_FONT = new Font("Arial", Font.PLAIN, 16);

	// Sizes
	private final static int BUTTON_WIDHT = 100;
	private final static int BUTTON_MARGIN = 20;
	private final static int BUTTON_HEIGHT = 20;
	private final static int TEXT_WIDHT = 340;
	private final static int TEXT_HEIGTH = 20;
	private static final int VICTORY_WIDHT = 250;
	private final static int MENU_HEIGTH = 60;
	// Color
	private final static Color MENU_COLOR = Color.GRAY;
	private final static Color WELCOME_COLOR = Color.ORANGE;
	protected static final boolean INISIALIZE = true;

	// Objects
	// Buttons
	private JButton exit;
	private JButton sign_Out;
	private JButton throwTurn;
	private JButton leaveBattle;
	private JPanel scrollFrame;

	private JButton startNewGame;
	private JButton inviteNewPlayers;

	private JPanel welcome;
	private JLabel welcomeText;
	private JPanel vicotoryPoints;
	private JLabel vicotoryPointsText;
	private MainPanel mp;
	private VictoryPointsController vPC;
	private DatabaseCommunicator dc;
	private startGame sG;
	private JScrollPane scroll;
	private JPanel message;
	private JLabel message_Text;
	private String username;

	// Constructor
	public MenuGame(MainPanel mp) {
		this.mp = mp;
		this.dc = DatabaseCommunicator.getInstance();
		
		// Instantiating button
		exit = new JButton(EXITBUTTON);
		sign_Out = new JButton(SIGN_OUT);
		throwTurn = new JButton(THROWTURN);
		leaveBattle = new JButton(LEAVEBATTLE);
		startNewGame = new JButton(START_NEW_GAME);
		inviteNewPlayers = new JButton(INVITE_NEW);
		
		// Message settings
		welcome = new JPanel();
		welcomeText = new JLabel();
		message_Text = new JLabel();
		message = new JPanel();
		vicotoryPointsText = new JLabel();
		vicotoryPoints = new JPanel();

		// Settings
		this.setPreferredSize(new Dimension(mp.getWidth(), MENU_HEIGTH));
		exit.setPreferredSize(new Dimension(BUTTON_WIDHT, BUTTON_HEIGHT));
		this.setMaximumSize(this.getPreferredSize());
		sign_Out.setPreferredSize(new Dimension(BUTTON_WIDHT, BUTTON_HEIGHT));
		throwTurn.setPreferredSize(new Dimension(BUTTON_WIDHT + BUTTON_MARGIN, BUTTON_HEIGHT));
		leaveBattle.setPreferredSize(new Dimension(BUTTON_WIDHT + BUTTON_MARGIN, BUTTON_HEIGHT));
		startNewGame.setPreferredSize(new Dimension(BUTTON_WIDHT, BUTTON_HEIGHT));
		inviteNewPlayers.setPreferredSize(new Dimension(BUTTON_WIDHT, BUTTON_HEIGHT));
		this.leaveBattle.setVisible(false);

		// Color settings
		this.setBackground(MENU_COLOR);
		
		scrollFrame = new JPanel();
		// Add component
		scrollFrame.add(exit);
		scrollFrame.add(sign_Out);
		scrollFrame.add(leaveBattle);
		scrollFrame.add(welcome);
		scrollFrame.add(startNewGame);
		scrollFrame.add(inviteNewPlayers);
		
		// Scroll settings
		this.scroll = new JScrollPane(scrollFrame);
		scroll.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_NEVER);
		scroll.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		this.scroll.setBackground(MENU_COLOR);
		this.scroll.setVisible(true);
		this.add(scroll);
		
		// ActionListner
		exit.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				// Dispose System

				// Stop al the threads
				mp.stopThreads();
				dc.closeConnection();
				System.exit(0);
			}
		});
		sign_Out.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				mp.signOut();
				remove(throwTurn);
				// Remove components
				scrollFrame.remove(throwTurn);
				scrollFrame.remove(vicotoryPoints);
			}
		});

		throwTurn.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				boolean passSuccelfull = mp.passTurn();

				if (!passSuccelfull) {
					throwTurn.setForeground(Color.RED);
				} else {
					throwTurn.setForeground(Color.BLACK);
				}

			}
		});
		leaveBattle.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				leaveBattle.setVisible(false);
				mp.leaveBattle();
				
				// Add components
				scrollFrame.add(startNewGame);
				scrollFrame.add(inviteNewPlayers);
			
				// Remove components
				scrollFrame.remove(throwTurn);
				scrollFrame.remove(vicotoryPoints);
			}
		});

		startNewGame.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				
				sG = new startGame();
				sG.setUsername(username);
				String message = sG.setupNewGame();

				// Check if game is created before creating a gameboard
				if(sG.isCreateSuccesfull()) {
					mp.activateGame(sG.getGameID(), INISIALIZE);
					// If there is a message this will let it draw in the menu
					if(message != null) {
						drawPlayerInfo(false, message);
					}
				}
	
			}
		});

		inviteNewPlayers.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				
				sG = new startGame();
				sG.setUsername(username);
				sG.inviteNewPlayers();
			}
		});
	}

	/**
	 * This method will draw some info of the player on the screen
	 */
	public void drawPlayerInfo(boolean firstView, String message) {
		// Welcome settings
		welcome.setPreferredSize(new Dimension(TEXT_WIDHT, TEXT_HEIGTH));
		welcomeText.setHorizontalAlignment(SwingConstants.CENTER);
		welcomeText.setPreferredSize(welcome.getPreferredSize());
		welcome.setBackground(WELCOME_COLOR);
		welcome.setLayout(new BorderLayout());
		welcome.add(welcomeText, BorderLayout.CENTER);

		// WelcomeText setting
		if (firstView) {
			welcomeText.setText(WELCOME_TEXT + mp.getUserName());
			welcomeText.setFont(HEADER_FONT);
		} else {
			welcomeText.setText(message);
		}

	}

	/**
	 * This method will add the pass button to the game
	 */
	public void drawPassButton(boolean drawButton) {
		if (drawButton) {
			this.scrollFrame.add(throwTurn);
		}
	}

	/**
	 * This method will change the message of the messagePanel
	 */
	public void setMessage(String message) {
		// Change text
		this.message_Text.setText(message);

		// Repaint
		this.repaint();
		this.validate();
	}

	/**
	 * This method will add the message panel to the menubar
	 */
	public void drawMessagePanel() {
		// Default panel settings
		this.message.setPreferredSize(new Dimension(TEXT_WIDHT, TEXT_HEIGTH));
		this.message.setMaximumSize(message.getPreferredSize());
		this.message.setBackground(WELCOME_COLOR);

		// Label settings
		this.message_Text.setHorizontalAlignment(SwingConstants.CENTER);
		this.message_Text.setPreferredSize(message.getPreferredSize());
		this.message_Text.setText(DEFAULT_MESSAGE);
		this.message_Text.setFont(HEADER_FONT);

		// Add components
		message.setLayout(new BorderLayout());
		message.add(message_Text, BorderLayout.CENTER);

		this.leaveBattle.setVisible(true);
		this.scrollFrame.add(message);

	}

	public void drawVictoryPoints(int userID, int gameID, boolean firstView) {
		// Instantiating vicotoryPoints controller
		vPC = new VictoryPointsController(gameID);
		int amountOfPoints = vPC.getAmountOfVictoryPoints(userID, DOCHECK_BUILDINGS);

		// Default panel settings
		if (firstView) {
			this.vicotoryPoints.setPreferredSize(new Dimension(VICTORY_WIDHT, TEXT_HEIGTH));
			this.vicotoryPoints.setMaximumSize(vicotoryPoints.getPreferredSize());
			this.vicotoryPoints.setBackground(WELCOME_COLOR);

			// Label settings
			this.vicotoryPointsText.setHorizontalAlignment(SwingConstants.CENTER);
			this.vicotoryPointsText.setPreferredSize(vicotoryPoints.getPreferredSize());
		}
		this.vicotoryPointsText.setText(VICOTORYPOINT_MESSAGE_START + amountOfPoints + VICOTORYPOINT_MESSAGE_END);
		this.vicotoryPointsText.setFont(HEADER_FONT);

		// Add components
		if (firstView) {
			vicotoryPoints.setLayout(new BorderLayout());
			vicotoryPoints.add(vicotoryPointsText, BorderLayout.CENTER);

		this.scrollFrame.add(vicotoryPoints);

		}
		this.repaint();
	}

	public void setUsername(String user) {
		// TODO Auto-generated method stub
		this.username = user;
	}
	
	public void removeOrSet_InviteButtons(boolean remove) {
		
		if(remove){
			this.scrollFrame.remove(inviteNewPlayers);
			this.scrollFrame.remove(startNewGame);
		} else {
			scrollFrame.add(startNewGame);
			scrollFrame.add(inviteNewPlayers);
		}

	}
}
