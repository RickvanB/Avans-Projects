package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.LayoutManager;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Icon;
import javax.swing.JButton;
import javax.swing.JPanel;

import model.DatabaseCommunicator;

/**
 * This class is responsible for the switch between registration and login
 * 
 * @author Jip van Heugten
 *
 */
@SuppressWarnings("serial")
public class InlogOfRegistratieView extends JPanel {

	// Variables

	private final static String LOGIN_BUTTON = "Login";
	private final static String REGISTRATION_BUTTON = "Registreren";

	// Welcome String variables
	private final static String WELCOME_TEXT = "Welkom - Klaar voor een potje Kolonisten van Catan?";
	private final static Color WELCOME_COLOR = Color.BLACK;
	private final static Font WELCOME_FONT = new Font("Arial", Font.BOLD, 26);
	private final static Color WELCOME_BACKGROUND = Color.ORANGE;

	// LayoutManager
	private final static LayoutManager PANEL_LAYOUT = new FlowLayout();

	// Button Sizes
	private final static int BUTTON_WIDTH = 100;
	private final static int BUTTON_HEIGHT = 25;
	private final static Dimension BUTTON_DIMENSION = new Dimension(BUTTON_WIDTH, BUTTON_HEIGHT);
	private static final String EXIT = "Afsluiten";

	// Objects
	private JButton login;
	private JButton registration;
	private JButton exit;

	// ContentPane
	private SignInWindow iS;
	private SignUpWindow rS;

	// Constructor
	public InlogOfRegistratieView(MainPanel mainPanel) {
		// JPanel variables
		@SuppressWarnings("static-access")
		final Dimension PANELDIMENSION = this.getToolkit().getDefaultToolkit().getScreenSize();

		// LayoutManager
		this.setLayout(PANEL_LAYOUT);

		// Instantiating objects
		login = new JButton(LOGIN_BUTTON);
		registration = new JButton(REGISTRATION_BUTTON);
		exit = new JButton(EXIT);

		iS = new SignInWindow(mainPanel, this);
		rS = new SignUpWindow(mainPanel, this);

		// Setting some sizes
		this.setPreferredSize(PANELDIMENSION);
		login.setPreferredSize(BUTTON_DIMENSION);
		registration.setPreferredSize(BUTTON_DIMENSION);

		// Add content
		this.add(login);
		this.add(registration);
		this.add(exit);
		
		// ActionLisners
		login.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				// Reset contentpane to set
				mainPanel.setContentPaneToSet(null);
				
				mainPanel.ContentPaneSet(iS);
				validate();
				repaint();
			}
		});
		registration.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				// Reset contentpane to set
				mainPanel.setContentPaneToSet(null);
				mainPanel.ContentPaneSet(rS);
				validate();
				repaint();

			}
		});
		exit.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				// Exit
				DatabaseCommunicator dc = DatabaseCommunicator.getInstance();
				dc.closeConnection();
				System.exit(0);
				
			}
		});

	}
	// Methods
	/**
	 * This method will give you the opportunity to switch from contentpane
	 * 
	 * @param panel
	 * @return
	 */
	public JPanel changeContentPane(JPanel panel) {

		JPanel choosenPanel = panel;

		return choosenPanel;

	}

	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);

		FontMetrics fm = g.getFontMetrics(WELCOME_FONT);

		int stringWidth = fm.stringWidth(WELCOME_TEXT);

		// Get the position of the leftmost character in the baseline
		int xCoordinate = getWidth() / 2 - stringWidth / 2;
		int yCoordinate = 100;

		// Background Variables
		int backgroundHeight = 50;
		int backgroundWidth = this.getWidth();
		int xPos_Background = 0;
		int yPos_Background = (yCoordinate / 2) + 15;

		g.setColor(WELCOME_BACKGROUND);
		g.fillRect(xPos_Background, yPos_Background, backgroundWidth, backgroundHeight);
		// Draw String

		g.setColor(WELCOME_COLOR);
		g.setFont(WELCOME_FONT);
		g.drawString(WELCOME_TEXT, xCoordinate, yCoordinate);

	}

}
