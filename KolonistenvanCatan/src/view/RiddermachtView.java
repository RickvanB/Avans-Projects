package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

import controller.RiddermachtController;
import model.RiddermachtModel;

@SuppressWarnings("serial")
public class RiddermachtView extends JPanel {

	private final static int WIDTH = 450;
	private final static int HEIGHT = 200;
	private final static Color BACKGROUNDCOLOR = new Color(217, 217, 217);

	private final static int HEADER_HEIGT = 25;
	private final static int HEADER_WIDTH = 450;
	private final static Color HEADER_COLOR = Color.ORANGE;

	private final static String DEFAULT_MESSAGE = "Grootste riddermacht";
	private final static String MESSAGE = "In het bezit van: ";
	private final static String AMOUNT_MESSAGE = "Grootte: ";

	private final static Font STRING_FONT = new Font("Arial", Font.PLAIN, 16);
	private final static Font HEADER_FONT = new Font("Arial", Font.CENTER_BASELINE, 18);

	// Objects
	private JLabel headerText;
	private JPanel header;

	private JLabel ownerText;
	private JPanel ownerPanel;

	private JLabel amountText;
	private JPanel amountPanel;

	private RiddermachtModel rm;
	private RiddermachtController rc;

	private int gameID;

	public RiddermachtView(int gameID, int userID) {
		rm = new RiddermachtModel();
		rc = new RiddermachtController(gameID, userID);
		
		this.gameID = gameID;
		this.setPreferredSize(new Dimension(WIDTH, HEIGHT));
		this.setBackground(BACKGROUNDCOLOR);

		// Calculate riddermacht
		this.rc.CalculateRiddermacht();
		
		this.setHeaderInfo();
		this.setOwnerInfo(true);
		this.setAmountInfo(true);
		
		
		
	}
	
	
	// Getter
	public RiddermachtController getRc() {
		return rc;
	}



	private void setHeaderInfo() {
		this.header = new JPanel();
		this.header.setPreferredSize(new Dimension(HEADER_WIDTH, HEADER_HEIGT));
		this.header.setBackground(HEADER_COLOR);

		this.headerText = new JLabel(DEFAULT_MESSAGE);
		this.headerText.setFont(HEADER_FONT);
		this.headerText.setHorizontalAlignment(SwingConstants.CENTER);

		this.header.add(headerText);
		this.add(header);
	}

	public void setOwnerInfo(boolean firstView) {
		if (firstView) {
		this.ownerPanel = new JPanel();
		this.ownerText = new JLabel(MESSAGE + rm.getUsername(rm.getRiddermachtPlayer(gameID), gameID));

			this.ownerPanel.setPreferredSize(new Dimension(HEADER_WIDTH, HEADER_HEIGT));
			this.ownerText.setHorizontalAlignment(SwingConstants.CENTER);
			this.ownerText.setFont(STRING_FONT);

			this.ownerPanel.add(ownerText);
			this.add(ownerPanel);
		} else {
			this.ownerText.setText(MESSAGE + rm.getUsername(rm.getRiddermachtPlayer(gameID), gameID));
		}
		this.repaint();
		this.validate();

	}

	public void setAmountInfo(boolean firstView) {
		if (firstView) {
		this.amountPanel = new JPanel();
		this.amountText = new JLabel(AMOUNT_MESSAGE + rm.getAmountOfKnights(rm.getRiddermachtPlayer(gameID), gameID));
		
			this.amountPanel.setPreferredSize(new Dimension(HEADER_WIDTH, HEADER_HEIGT));
			this.amountText.setHorizontalAlignment(SwingConstants.CENTER);
			this.amountText.setFont(STRING_FONT);

			this.amountPanel.add(amountText);
			this.add(amountPanel);
		} else {
			this.amountText.setText(AMOUNT_MESSAGE + rm.getAmountOfKnights(rm.getRiddermachtPlayer(gameID), gameID));
		}
		this.repaint();
		this.validate();

	}
}