package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

import controller.LobbyController;

/**
 * This class is the view of a game an user can choose to play
 * 
 * @author Jip van Heugten
 *
 */
public class LobbyView extends JPanel {

	// Variables
	private final static int GAME_WIDTH = 350;
	private final static int GAME_HEIGHT = 250;

	private final static Color GAME_COLOR = new Color(224, 224, 235);
	private final static Color GAME_HEADER_COLOR = new Color(242, 196, 13);
	private final static Color DEFAULT_COLOR = new Color(38, 38, 38);

	// PaintComponentHeights
	private final static int HEADER_WIDTH = 350;
	private final static int HEADER_HEIGHT = 45;

	private final static int HEADER_DEFAULT_XPOS = 0;
	private final static int HEADER_DEFAULT_YPOS = 10;

	// DrawString values
	private String gameString;
	private final static Font STRING_FONT = new Font("Arial", Font.CENTER_BASELINE, 24);
	private final static int HEADERSTRING_DEV = 17;

	// Opponents values
	private final static int HEADER_OPPONENTS_WIDTH = 350;
	private final static int HEADER_OPPONENTS_HEIGHT = 20;

	private final static int HEADER_OPPONENTS_DEFAULT_XPOS = 0;
	private final static int HEADER_OPPONENTS_DEFAULT_YPOS = 60;

	private final static int STRING_OPPONENTS_DEFAULT_YPOS = 97;
	private final static int STRING_OPPONENTS_MARGIN_XPOS = 10;

	private final static String HEADER_STING_OPPONENTS = "Tegenstanders in dit spel";
	private final static Font OPPONENTS_FONT = new Font("Arial", Font.CENTER_BASELINE, 16);
	private final static int HEADERSTRING_OPPONENTS_DEV = 15;

	private String[] playerColors;
	private String[] names;
	private int gameID;
	private String Onturn;

	// Player on turn values
	private final static int HEADER_ONTURN_WIDTH = 350;
	private final static int HEADER_ONTURN_HEIGHT = 20;

	private final static int HEADER_ONTURN_DEFAULT_XPOS = 0;
	private final static int HEADER_ONTURN_DEFAULT_YPOS = 168;

	// Buttons Values
	private final static String PLAYBUTTON = "Speel dit spel";

	private final static int BUTTON_WIDTH = 150;
	private final static int BUTTON_HEIGHT = 30;

	private final static int BUTTON_YPOS = 200;
	protected static final Object GAME_INVALID = "Spel is uitgespeeld of niet alle spelers hebben geaccepteerd";

	// Draw Boolean
	private boolean drawLobby;

	// Objects
	private JButton playButton;
	
	private LobbyController lC;

	// Constructor
	public LobbyView(int gameID, String[] players, String turnPlayer, String[] playerColors, LobbyOverview lo, LobbyController lC) {
		this.setPreferredSize(new Dimension(GAME_WIDTH, GAME_HEIGHT));
		this.setBackground(GAME_COLOR);

		// Instantiating objects
		this.lC = lC;
		this.gameID = gameID;
		this.gameString = "Spel: " + gameID;
		this.names = players;
		this.playerColors = playerColors;
		this.Onturn = turnPlayer;
		this.playButton = new JButton(PLAYBUTTON);
		this.drawLobby = false;

		// JButton Settings
		int xpos = GAME_WIDTH / 2 - BUTTON_WIDTH / 2;
		int ypos = BUTTON_YPOS;

		// Placing the button on the right spot
		this.setLayout(null);
		playButton.setBounds(xpos, ypos, BUTTON_WIDTH, BUTTON_HEIGHT);
		this.add(playButton);
		
		// ActionListner Play button
		playButton.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				int playerCount = lC.returnPlayerCountAccepted(gameID);
				if(playerCount == 3 && !lC.gameWon(gameID)) {
					lo.buttonIsPushed(gameID);
				} else {
					JOptionPane.showMessageDialog(null, GAME_INVALID);
				}
			}
		});
	}

	// Getters and SettersS
	public boolean isDrawLobby() {
		return drawLobby;
	}

	public void setDrawLobby(boolean drawLobby) {
		this.drawLobby = drawLobby;
	}

	// Methods
	@Override
	/**
	 * Will draw the information on the screen
	 */
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);

		if (drawLobby) {

			// Draw a header field
			g.setColor(GAME_HEADER_COLOR);
			g.fillRect(HEADER_DEFAULT_XPOS, HEADER_DEFAULT_YPOS, HEADER_WIDTH, HEADER_HEIGHT);

			// Draw String on header field
			g.setColor(DEFAULT_COLOR);
			g.setFont(STRING_FONT);

			FontMetrics fm = g.getFontMetrics(STRING_FONT);

			int stringWidth = fm.stringWidth(gameString);

			// Get the position of the leftmost character in the baseline
			int xCoordinate = getWidth() / 2 - stringWidth / 2;
			int yCoordinate = HEADER_HEIGHT / 2 + HEADERSTRING_DEV;

			g.drawString(gameString, xCoordinate, yCoordinate);

			// Draw Opponents Header
			g.setColor(GAME_HEADER_COLOR);
			g.fillRect(HEADER_OPPONENTS_DEFAULT_XPOS, HEADER_OPPONENTS_DEFAULT_YPOS, HEADER_OPPONENTS_WIDTH,
					HEADER_OPPONENTS_HEIGHT);

			// Draw Opponents String Header Text
			g.setColor(DEFAULT_COLOR);
			g.setFont(OPPONENTS_FONT);

			fm = g.getFontMetrics(OPPONENTS_FONT);

			stringWidth = fm.stringWidth(HEADER_STING_OPPONENTS);

			// Get the position of the leftmost character in the baseline
			xCoordinate = getWidth() / 2 - stringWidth / 2;
			yCoordinate = HEADER_OPPONENTS_DEFAULT_YPOS + HEADERSTRING_OPPONENTS_DEV;

			g.drawString(HEADER_STING_OPPONENTS, xCoordinate, yCoordinate);

			// Draw Opponents String
			g.setColor(DEFAULT_COLOR);
			g.setFont(OPPONENTS_FONT);

			fm = g.getFontMetrics(STRING_FONT);

			stringWidth = fm.stringWidth(gameString);

			xCoordinate = STRING_OPPONENTS_MARGIN_XPOS;

			// TODO: For to long names there needs to be a scrollbar

			int counter = 0;
			for (int i = 0; i < names.length; i++) {

				yCoordinate = STRING_OPPONENTS_DEFAULT_YPOS + counter;
				g.drawString(names[i] + " - (" + playerColors[i] + ")", xCoordinate, yCoordinate);
				counter += 20;

			}

			// Draw Opponents Header
			g.setColor(GAME_HEADER_COLOR);
			g.fillRect(HEADER_ONTURN_DEFAULT_XPOS, HEADER_ONTURN_DEFAULT_YPOS, HEADER_ONTURN_WIDTH,
					HEADER_ONTURN_HEIGHT);

			// Draw On Turn String Header Text
			g.setColor(DEFAULT_COLOR);
			g.setFont(OPPONENTS_FONT);

			fm = g.getFontMetrics(OPPONENTS_FONT);

			// Set the sting to draw
			String playerOnturnString = "Speler: " + this.Onturn + " is aan zet";
			String playerhasWonString = "Dit spel is uitgespeeld";

			stringWidth = fm.stringWidth(playerOnturnString);

			// Get the position of the leftmost character in the baseline
			xCoordinate = getWidth() / 2 - stringWidth / 2;
			yCoordinate = HEADER_ONTURN_DEFAULT_YPOS + HEADERSTRING_OPPONENTS_DEV;
			// Check if game is allready won
			if(!this.lC.gameWon(this.gameID)) {
				g.drawString(playerOnturnString, xCoordinate, yCoordinate);
			} else {
				g.drawString(playerhasWonString, xCoordinate, yCoordinate);
			}
			

		}
	}

}
