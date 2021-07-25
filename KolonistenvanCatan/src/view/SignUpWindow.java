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
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;

import controller.SignUpController;

public class SignUpWindow extends JPanel {
	private final static int USERNAME_WIDTH = 250;
	private final static int USERNAME_HEIGTH = 25;

	private final static int PASSWORD_WIDTH = 250;
	private final static int PASSWORD_HEIGTH = 25;

	private final static int DEFAULT_POS = 0;

	private final static String OK_BUTTON = "OKE";
	private final static String USERNAME = "Gebruikersnaam";
	private final static String PASSWORD = "Wachtwoord";
	private final static String GOBACK_BUTTON = "Terug";

	private JTextField username;
	private JTextField password;
	private JOptionPane popup;
	private SignUpController controller;
	private boolean succes;

	private JLabel usernameText;
	private JLabel passwordText;
	private JPanel signUpanel; 
	private GridBagConstraints c;
	private MainPanel mp;

	// Header
	private JPanel signUpHeader;
	private JLabel signUpHeaderText;

	private final static int HEADER_WIDTH = 250;
	private final static int HEADER_HEIGTH = 25;

	private final static Insets SPACE = new Insets(0, 0, 10, 0);

	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 16);
	private final static Color DEFAULT_COLOR = Color.ORANGE;
	private final static String HEADER_STRING_TEXT = "Registreer je hieronder";
	private final static String INCORRECT_INPUT = "Ongeldige invoer!";
	private final static String PLAYERNAME_EXISTS = "Naam al in gebruik";

	// Buttons
	private JButton ok;
	private JButton goback;

	// Constructor
	public SignUpWindow(MainPanel mainPanel, InlogOfRegistratieView iOR) {
		// Instantiating variables
		username = new JTextField();
		password = new JTextField();
		popup = new JOptionPane();
		controller = new SignUpController();
		this.mp = mainPanel;

		// Buttons
		ok = new JButton(OK_BUTTON);

		// Instantiating layout components
		goback = new JButton(GOBACK_BUTTON);
		usernameText = new JLabel(USERNAME);
		passwordText = new JLabel(PASSWORD);
		c = new GridBagConstraints();
		signUpHeader = new JPanel();
		signUpHeaderText = new JLabel();
		signUpanel = new JPanel();

		// Some default settings
		username.setPreferredSize(new Dimension(USERNAME_WIDTH, USERNAME_HEIGTH));
		password.setPreferredSize(new Dimension(PASSWORD_WIDTH, PASSWORD_HEIGTH));

		// Set layout
		this.setLayout(new GridBagLayout());
		signUpanel.setLayout(new GridBagLayout());

		c.gridwidth = GridBagConstraints.REMAINDER;
		signUpanel.setBorder(BorderFactory.createLineBorder(Color.BLACK));
		signUpanel.setOpaque(true);

		// Add header to sign in window
		signUpHeader.setBackground(DEFAULT_COLOR);
		signUpHeader.setPreferredSize(new Dimension(HEADER_WIDTH, HEADER_HEIGTH));
		signUpHeader.setMaximumSize(signUpHeader.getPreferredSize());

		signUpHeaderText.setFont(HEADER_FONT);
		signUpHeaderText.setText(HEADER_STRING_TEXT);
		signUpHeader.add(signUpHeaderText);

		// Add the content
		c.anchor = GridBagConstraints.WEST;
		signUpanel.add(usernameText, c);
		signUpanel.add(username, c);
		signUpanel.add(passwordText, c);
		signUpanel.add(password, c);
		signUpanel.add(goback);
		c.anchor = GridBagConstraints.EAST;
		signUpanel.add(ok, c);

		// Add component
		c.anchor = GridBagConstraints.NORTH;
		c.insets = SPACE;
		this.add(signUpHeader, c);
		this.add(signUpanel, c);

		ok.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				succes = controller.addAcount(username.getText(), password.getText());
				changeView(controller.isPlayername_Exists());
				
				// Reset values of the textField
				username.setText("");
				password.setText("");
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

	private void changeView(boolean exists) {
		if(this.succes) {
			// Player has registraded
			this.mp.loginsuccessfull(true, username.getText());
			
		} else if(exists){
			// Playername already exists
			this.signUpHeaderText.setText(PLAYERNAME_EXISTS);
			this.username.setText("");
			this.password.setText("");
			this.repaint();
			
		}	else {
				// Set message [Wrong input]
				this.signUpHeaderText.setText(INCORRECT_INPUT);
				this.username.setText("");
				this.password.setText("");
				this.repaint();
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
		g.drawImage(image, DEFAULT_POS, DEFAULT_POS, this.getWidth(), this.getHeight(), this);
	}
}
