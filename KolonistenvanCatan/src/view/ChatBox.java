package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.border.Border;
import javax.swing.text.DefaultCaret;

import controller.ChatUpdater;

/**
 * This class is responsible for the view of the ChatBox
 * 
 * @author Jip van Heugten
 *
 */
@SuppressWarnings("serial")
public class ChatBox extends JPanel {

	// Variables
	private int userIdentification;

	// Button text
	private final static String OPENCHAT = "Open Chat";
	private final static Font TEXT_FONT = new Font("Arial", Font.PLAIN, 14);
	
	// ChatBox Style
	private final static Color BACKGROUNDCOLOR = new Color(217, 217, 217);
	

	// New messages count
	private int newMessages;
	private final static int DEFAULTMESSAGECOUNT = 0;

	// Size when the chatbox is closed
	private final static int CLOSEDSIZECHAT_WIDTH = 110;
	private final static int CLOSEDSIZECHAT_HEIGHT = 40;
	private final static Dimension CLOSEDDIMENSION = new Dimension(CLOSEDSIZECHAT_WIDTH, CLOSEDSIZECHAT_HEIGHT);

	// Size when the chatbox is open
	private final static int OPENSIZECHAT_WIDTH = 450;
	private static int OPENEDSIZECHAT_HEIGHT = 620;
	private final static Dimension OPENDIMENSION = new Dimension(OPENSIZECHAT_WIDTH, OPENEDSIZECHAT_HEIGHT);

	// Colors
	private final static Color NEWMESSAGE = new Color(255, 165, 0);
	private final static Color DEFAULTCOLOR = null;
	

	// Size for the JTextarea
	private final static int CHAT_WIDTH = 422;
	private final static int CHAT_HEIGHT = 300;

	private final static int CHAT_COLUMS = 37;
	private final static int CHAT_ROWS = 32;

	// Size for the JTextField
	private final static int CHAT_INPUT_HEIGHT = 20;

	// This boolean will answers the question if the ChatBox is open or closed
	private boolean chatIsOpen;

	// Objects
	private JButton openChat;
	private JScrollPane scrollPane;
	private JTextArea chat;
	private JTextField chatInput;
	private ChatUpdater cU;
	private JPanel chatBox;

	// Constructor
	public ChatBox(int userID, int gameID) {
		// Instantiating objects and variables
		this.setChatIsOpen(false);
		openChat = new JButton(OPENCHAT);
		this.setNewMessages(DEFAULTMESSAGECOUNT);
		
		this.userIdentification = userID;

		// Some default settings for the textarea
		chat = new JTextArea(CHAT_ROWS, CHAT_COLUMS);
		chat.setMinimumSize(new Dimension(CHAT_WIDTH, CHAT_HEIGHT));
		chat.setEditable(false);
		this.styleChat();
		
		
		// To break lines automatically
		chat.setLineWrap(true);
		chat.setWrapStyleWord(true);

		// Set the viewpoint of the chat to the bottom
		DefaultCaret caret = (DefaultCaret) chat.getCaret();
		caret.setUpdatePolicy(DefaultCaret.ALWAYS_UPDATE);

		// Creating the JScrollPane
		scrollPane = new JScrollPane(chat);
		scrollPane.setVisible(false);
		scrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
		scrollPane.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);

		chatInput = new JTextField();

		chatInput.setPreferredSize(new Dimension(CHAT_WIDTH, CHAT_INPUT_HEIGHT));

		// Chat updater
		cU = new ChatUpdater(chat, chatInput, this, gameID);

		// Some default settings for the JPanel ChatBox
		chatBox = new JPanel();
		chatBox.setPreferredSize(OPENDIMENSION);
		chatBox.add(scrollPane);
		chatBox.add(chatInput);
		chatBox.setVisible(false);

		// Some default settings
		this.setPreferredSize(OPENDIMENSION);

		// Add components
		this.add(openChat);
		this.add(chatBox);

		// Actionlisteners
		openChat.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				// This actionlistener will open the ChatBox
				openCloseChatBox();

			}
		});
		chatInput.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent arg0) {
				// Activate the message sender
				cU.chatInput(userIdentification);
			}
		});

	}

	// Getters and Setters
	public boolean isChatIsOpen() {
		return chatIsOpen;
	}

	private void setChatIsOpen(boolean chatIsOpen) {
		this.chatIsOpen = chatIsOpen;
	}

	public int getNewMessages() {
		return newMessages;
	}

	public void setNewMessages(int newMessages) {
		this.newMessages = newMessages;
	}
	public ChatUpdater getcU() {
		return cU;
	}

	// Methods

	/**
	 * This method will open the ChatBox if the user press the button
	 */
	public void openCloseChatBox() {

		if (!this.isChatIsOpen()) {

			// Will set the size of the chat
			this.setSize(OPENDIMENSION);

			// Will open the chatbox
			chatBox.setVisible(true);
			scrollPane.setVisible(true);
			this.setChatIsOpen(true);

			// Will reset the button "OPEN CHAT"
			this.resetButton();
		} else {

			// Will set the size of the chat
			this.setSize(CLOSEDDIMENSION);

			// Will close the chatbox
			chatBox.setVisible(false);
			scrollPane.setVisible(false);
			this.setChatIsOpen(false);

		}

	}

	/**
	 * This method will change the name of the open button and will change the color
	 * if there are some new messages
	 */
	public void gotNewMessage() {

		if (!this.isChatIsOpen()) {
			this.setNewMessages(newMessages + 1);
			openChat.setText(OPENCHAT + " (" + newMessages + ")");
			openChat.setBackground(NEWMESSAGE);
		}

	}

	/**
	 * This method will reset the JButton to it's default settings
	 */
	public void resetButton() {
		if (this.getNewMessages() > 0) {
			// This will reset the new messages counter
			this.setNewMessages(DEFAULTMESSAGECOUNT);
			openChat.setText(OPENCHAT);
			openChat.setBackground(DEFAULTCOLOR);
		}
	}
	public void styleChat() {
		// Set font
		chat.setFont(TEXT_FONT);
//		// Set margin
//
//		
//		Border border = BorderFactory.createLineBorder(BACKGROUNDCOLOR);
//		chat.setBorder(border);
	}
}
