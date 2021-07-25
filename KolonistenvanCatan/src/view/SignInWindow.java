package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Image;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

import controller.SignInController;

@SuppressWarnings("serial")
public class SignInWindow extends JPanel {

	// Variables
	private String userName;

	private final static int USERNAME_WIDTH = 250;
	private final static int USERNAME_HEIGTH = 25;

	private final static int PASSWORD_WIDTH = 250;
	private final static int PASSWORD_HEIGTH = 25;

	// Button Text
	private final static String OK_BUTTON = "Login";
	private final static String GOBACK_BUTTON = "Terug";
	
	// Header
	private JPanel loginHeader;
	private JLabel loginHeaderText;
	
	private final static int HEADER_WIDTH = 250;
	private final static int HEADER_HEIGTH = 25;
	
	private final static int DEFAULT_POS = 0;


	private final static Insets SPACE = new Insets(0, 0, 10, 0);
	
	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 16);
	private final static Color DEFAULT_COLOR = Color.ORANGE;
	private final static String HEADER_STRING_TEXT = "Login om door te gaan";

	// Boolean to check if the login is successful
	private boolean loginsuccessfull;

	// Colors
	private final static Color wrongInput = Color.RED;
	private final static Color rightInput = null;

	// Objects
	private JTextField username;
	private JTextField password;
	private JPanel loginPanel;
	private GridBagConstraints c;

	// Labels
	private JLabel usernameText;
	private JLabel passwordText;

	// Login Controller
	private SignInController iC;

	// Buttons
	private JButton ok;
	private JButton goback;

	// Constructor
	public SignInWindow(MainPanel mainPanel, InlogOfRegistratieView iOR) {
		// Instantiating variables
		username = new JTextField();
		password = new JTextField();
		usernameText = new JLabel();
		passwordText = new JLabel();
		c = new GridBagConstraints();
		loginHeader = new JPanel();
		loginHeaderText = new JLabel();

		ok = new JButton(OK_BUTTON);
		goback = new JButton(GOBACK_BUTTON);

		loginsuccessfull = false;

		iC = new SignInController(this);
		// Some default settings
		username.setPreferredSize(new Dimension(USERNAME_WIDTH, USERNAME_HEIGTH));
		password.setPreferredSize(new Dimension(PASSWORD_WIDTH, PASSWORD_HEIGTH));

		// Set the text on the labels
		usernameText.setText("Gebruikersnaam:");
		passwordText.setText("Wachtwoord:");

		// Add the loginPanel
		loginPanel = new JPanel();

		// Set layout
		this.setLayout(new GridBagLayout());
		loginPanel.setLayout(new GridBagLayout());
		
		c.gridwidth = GridBagConstraints.REMAINDER;
		loginPanel.setBorder(BorderFactory.createLineBorder(Color.BLACK));
		loginPanel.setOpaque(true);
		
		// Add header to sign in window
		loginHeader.setBackground(DEFAULT_COLOR);
		loginHeader.setPreferredSize(new Dimension(HEADER_WIDTH, HEADER_HEIGTH));
		loginHeader.setMaximumSize(loginHeader.getPreferredSize());
		
		loginHeaderText.setFont(HEADER_FONT);
		loginHeaderText.setText(HEADER_STRING_TEXT);
		loginHeader.add(loginHeaderText);

		// Add the content
		c.anchor = GridBagConstraints.WEST;
		loginPanel.add(usernameText, c);
		loginPanel.add(username, c);
		loginPanel.add(passwordText, c);
		loginPanel.add(password, c);
		loginPanel.add(goback);
		c.anchor = GridBagConstraints.EAST;
		loginPanel.add(ok, c);
		
		// Add component
		c.anchor = GridBagConstraints.NORTH;
		c.insets = SPACE;
		this.add(loginHeader, c);
		this.add(loginPanel, c);

		// Setting the size of the window
		int inlogscreenWidth = mainPanel.getScreenWidth();
		int inlogscreenHeight = mainPanel.getScreenHeight();


		this.setPreferredSize(new Dimension(inlogscreenWidth, inlogscreenHeight));

		// ActionListeners
		ok.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent arg0) {
				// If the user press the button the game will check the combination of the
				// username and password
				checkLogin(username, password);
				mainPanel.loginsuccessfull(isLoginsuccessfull(), userName);

			}

		});
		goback.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				// This button gives the user the opportunity to go back to the main screen
				mainPanel.ContentPaneSet(iOR);
			}
		});
	}

	// Getters and Setters
	public boolean isLoginsuccessfull() {
		return loginsuccessfull;
	}

	public void setLoginsuccessfull(boolean loginsuccessfull) {
		this.loginsuccessfull = loginsuccessfull;
	}

	// Methods
	/**
	 * This method will check the combination of the password and the username. If
	 * it is correct it will give the user access to his or her account
	 */
	public void checkLogin(JTextField username, JTextField password) {

		String usernameInput = username.getText();
		String passwordInput = password.getText();

		// Save username for game Properties
		userName = usernameInput;

		boolean inputIsCorrect = false;

		inputIsCorrect = iC.checkUsernamePassword(usernameInput, passwordInput);

		if (inputIsCorrect) {
			this.setLoginsuccessfull(true);
			
			// Reset values of the JTextField
			username.setText("");
			password.setText("");
			
			username.setBackground(rightInput);
			password.setBackground(rightInput);
		} else {
			username.setBackground(wrongInput);
			password.setBackground(wrongInput);
		}
	}

	
	
	// Draw Background
	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);
		
		Image image = null; 
		try {
			image = ImageIO.read(new File("src/images/loginBackground.jpeg"));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		g.drawImage(image, DEFAULT_POS, DEFAULT_POS, this.getWidth(), this.getHeight() ,this);
	}

	/**
	 * This method will sent a notification to the user
	 * @param inputInvallidMessage
	 */
	public void setMessage(String message) {
		loginHeaderText.setText(message);
		this.repaint();
		
	}

	



}
