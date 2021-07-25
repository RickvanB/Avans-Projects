package view;

import javax.swing.JFrame;

import model.DatabaseCommunicator;

public class MainFrame extends JFrame {

	// Variables
	private final int SCREEN_WIDTH = (int) this.getToolkit().getDefaultToolkit().getScreenSize().getWidth();
	private final int SCREEN_HEIGHT = (int) this.getToolkit().getDefaultToolkit().getScreenSize().getHeight();

	// Objects
	private MainPanel mp;

	// Getters and Setters
	public int getSCREEN_WIDTH() {
		return SCREEN_WIDTH;
	}

	public int getSCREEN_HEIGHT() {
		return SCREEN_HEIGHT;
	}

	// Constructor
	public MainFrame() {

		// Instantiate objects
		mp = new MainPanel(this);

		// Some default settings
		this.setTitle("Kolonisten van Catan - Groep I");
		this.setDefaultCloseOperation(DO_NOTHING_ON_CLOSE);
		this.setExtendedState(JFrame.MAXIMIZED_BOTH);
		this.setUndecorated(true);
		this.setResizable(false);

		// Add the contentpane
		this.setContentPane(mp);
	}


	// Methods
	/**
	 * This method will set some default settings for the mainFrame
	 */
	public void render() {
		this.pack();
		this.setVisible(true);
	}
}
