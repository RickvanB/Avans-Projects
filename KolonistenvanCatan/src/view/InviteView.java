package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

import controller.InviteController;
import controller.LobbyController;
import model.Invite;
import model.PanelToShowModel;

public class InviteView extends JPanel {

	// Variables
	private JButton invites;

	// Button values
	private final static int BUTTON_WIDTH = 150;
	private final static int BUTTON_HEIGHT = 30;
	private static final int INVITE_BUTTON_WIDTH = 100;
	private static final int INVITE_BUTTON_HEIGHT = 100;

	// Color
	private final static Color HEADERCOLOR = Color.ORANGE;
	// Font
	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 16);

	// Integers
	private final static int HEADER_HEIGHT = 25;
	private final static int ROWS = 0;
	private final static int COLUMNS = 1;

	// Layout
	private final static BorderLayout LAYOUT = new BorderLayout();
	private final static GridLayout GRID_LAYOUT = new GridLayout(ROWS, COLUMNS);

	// Strings
	private static final String ACCEPT = "Toe treden";
	private static final String DECLINE = "Afwijzen";
	private static final String GAME = "Spel: ";
	private static final String HOST_GAME = "Host: ";


	private String username;

	// Objects
	private JPanel inviteHeader;
	private JPanel inviteOverview;
	private JLabel headerText;
	
	private Invite iM;
	private LobbyController lC;
	private InviteController iC;
	private PanelToShowModel ptsm;
	private MainPanel mp;

	// Constructor
	public InviteView(MainPanel mp, String userName) {

		this.mp = mp;
		this.iM = new Invite();
		this.ptsm = new PanelToShowModel();
		this.iC = new InviteController();
		this.username = userName;
		this.setPreferredSize(new Dimension((mp.getWidth() - 350), mp.getHeight()));

		// Layout Default Manager
		this.setLayout(LAYOUT);

		// Invite overview
		this.inviteOverview = new JPanel();
		this.inviteOverview.setLayout(GRID_LAYOUT);

		// Header invite settings
		inviteHeader = new JPanel();
		inviteHeader.setPreferredSize(new Dimension(this.getWidth(), HEADER_HEIGHT));
		inviteHeader.setBackground(HEADERCOLOR);

		// HeaderText Settings
		headerText = new JLabel();
		headerText.setText("Uitnodigingen: Versturen en Ontvangen");
		headerText.setFont(HEADER_FONT);

		// Add Component to JPanel
		inviteHeader.add(headerText);

		// Add JPanel to canvas
		this.add(inviteHeader, LAYOUT.PAGE_START);
		this.createInvitesButton();
		this.add(this.inviteOverview, LAYOUT.PAGE_END);

	}

	/**
	 * 
	 */

	public void createInvitesButton() {
		JPanel inviteButtonPanel = new JPanel();
		invites = new JButton("Refresh");
		invites.setPreferredSize(new Dimension(BUTTON_WIDTH, BUTTON_HEIGHT));
		inviteButtonPanel.add(invites);
		inviteButtonPanel.setPreferredSize(new Dimension(INVITE_BUTTON_WIDTH, INVITE_BUTTON_HEIGHT));
		this.add(inviteButtonPanel, LAYOUT.CENTER);

		
		invites.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				removePanels();
				getInvites();
				lC = new LobbyController(mp.getLobby(), username);
				// Refresh lobbies
				lC.getLobbiesFromDatabase();
				revalidate();
				repaint();
			}

		});

	}

	/**
	 * Get invites that belongs to a player
	 * 
	 * @return void
	 */

	public void getInvites() {
		
		ResultSet result = this.iM.getInvite(this.username);
		
		try {
			while (result.next()) {
				String gameHost = result.getString(3);
				this.inviteOverview.add(this.getPanel(result.getInt(2), gameHost));
			}
		} catch (SQLException e) {

			e.printStackTrace();
		}
	}

	/**
	 * Creates a new panel for each invite
	 * 
	 * @param idGame
	 * @param host
	 * @return JPanel
	 */
	private JPanel getPanel(int idGame, String host) {
		JPanel panel = new JPanel();

		JLabel game = new JLabel(GAME + Integer.toString(idGame));
		JLabel gameHost = new JLabel(HOST_GAME + host);

		JButton accept = new JButton(ACCEPT);
		JButton decline = new JButton(DECLINE);

		accept.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				
				boolean result = iC.acceptInvite(idGame, username);
				if(result) {
					removePanels();
					revalidate();
					repaint();
				}
				else if(!result) {
					accept.setForeground(Color.RED);
				}

			}
		});

		decline.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				iC.declineInvite(idGame, username);
				removePanels();
				revalidate();
				repaint();
			}
		});

		panel.add(game);
		panel.add(gameHost);

		panel.add(accept);
		panel.add(decline);

		return panel;
	}
	
	/**
	 * Removes all panels inviteOverview
	 * 
	 * @return void
	 */
	private void removePanels()
	{
		this.inviteOverview.removeAll();
	}
}
