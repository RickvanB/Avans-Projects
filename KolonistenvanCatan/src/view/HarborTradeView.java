package view;

import java.awt.Component;
import java.awt.GridLayout;
import java.util.HashMap;

import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;

import controller.Bank;
import controller.Player;
import controller.TradeController;
import model.Location;

public class HarborTradeView extends JPanel {
	
	private static final String TRADE = "Handelen met de haven";
	private final static String RAW_MATERIALS = "Grondstoffen";
	private final static String RAW_MATERIALS_GIVE = "Grondstoffen die je wilt geven";
	private final static String RAW_MATERIALS_TRADE = "Grondstoffen die je wilt ruilen";
	private final static String HARBOR_NORMAL = "harbor_normal";
	private final static String HARBOR_SPECIAL = "harbor_special";
	private static final String TRADE_SUCCESSFULL = "Handel met de haven gelukt!";
	
	private final static int THREE = 3;
	private final static int TWO = 2;
	private final static int ONE = 1;
	
	private final static int ROWS = 1;
	private final static int COLUMNS = 0;
	
	
	
	private JTextField rawMaterial1;
	private JTextField rawMaterial2;
	private JTextField rawMaterial3;
	
	private JComboBox combo_materials1;
	private JComboBox combo_materials2;
	
	private HashMap<String, Integer> give;
	private HashMap<String, Integer> wanted;
	
	private Bank bC;
	private TradeController tC;
	private Player s;

	public HarborTradeView(int gameID, int userID)
	{
		this.s = new Player(gameID, userID);
		this.tC = new TradeController(gameID, userID);
		
		this.give = new HashMap<>();
		this.wanted = new HashMap<>();
	
		this.setLayout(new GridLayout(COLUMNS, ROWS));
	}
	
	public void showTradePopup2to1(Location l)
	{
		this.addComponents(l, false);
		
		// Show confirm dialog
		int result = JOptionPane.showConfirmDialog(null, this, TRADE, JOptionPane.OK_CANCEL_OPTION,
				JOptionPane.PLAIN_MESSAGE);

		// If user wants to trade
		if (result == JOptionPane.OK_OPTION) {
			String combo = this.combo_materials1.getSelectedItem().toString().toLowerCase();

			this.give.put(this.rawMaterial1.getText().toLowerCase(), TWO);
			this.wanted.put(combo, 1);
			boolean success = this.tC.tradeWithBank(this.give, this.wanted, HARBOR_SPECIAL, "");
			System.out.println("Gelukt" + success);
			if(success) {
				JOptionPane.showMessageDialog(new JPanel(),
					    TRADE_SUCCESSFULL);
			}
		}
	}
	
	public void showTradePopup3to1(Location l)
	{
		this.addComponents(l, true);
		
		// Show confirm dialog
		int result = JOptionPane.showConfirmDialog(null, this, TRADE, JOptionPane.OK_CANCEL_OPTION,
				JOptionPane.PLAIN_MESSAGE);

		// If user wants to trade
		if (result == JOptionPane.OK_OPTION) {
			String give = this.combo_materials1.getSelectedItem().toString().toLowerCase();
			String want = this.combo_materials2.getSelectedItem().toString().toLowerCase();

			this.give.put(give, THREE);
			this.wanted.put(want, ONE);
			boolean success = this.tC.tradeWithBank(this.give, this.wanted, HARBOR_NORMAL, "");
			if(success) {
				JOptionPane.showMessageDialog(new JPanel(),
					    TRADE_SUCCESSFULL);
			}
		}
	}
	
	private void addComponents(Location l, boolean threeto1)
	{
		this.removeAll();
		this.revalidate();
		this.repaint();
		
		if(!this.isThisComponentFoundInJPanel(this.rawMaterial1)) {
			
			String[] rawMaterials = this.s.getRawMaterialsArray();
			String[] rawMaterialsAll = this.s.getRawMaterialsAllArray();
			
			if(threeto1) {
				this.combo_materials1 = new JComboBox(rawMaterials);
				this.combo_materials2 = new JComboBox(rawMaterialsAll);
			} else {
				this.combo_materials1 = new JComboBox(rawMaterialsAll);
				this.rawMaterial1 = new JTextField();
				this.rawMaterial2 = new JTextField();
				
				this.rawMaterial1.setText(l.getMaterialType().toDutchString());
				this.rawMaterial2.setText(l.getMaterialType().toDutchString());
				
				this.rawMaterial1.setEditable(false);
				this.rawMaterial2.setEditable(false);
			}
			
			if(threeto1) {
				this.add(new JLabel(RAW_MATERIALS_GIVE));
				this.add(this.combo_materials1);
				this.add(new JLabel(RAW_MATERIALS_TRADE));
				this.add(this.combo_materials2);
			} else {
				this.add(new JLabel(RAW_MATERIALS_GIVE));
				this.add(this.rawMaterial1);
				this.add(this.rawMaterial2);
				this.add(new JLabel(RAW_MATERIALS_TRADE));
				this.add(this.combo_materials1);
			}
		}
	}
	
	/**
	 * Checks if component already exists
	 * 
	 * @param c
	 * @return boolean
	 */
	private boolean isThisComponentFoundInJPanel(Component c) {
		Component[] components = this.getComponents();
		for (Component component : components) {
			if (c.getParent() == this) {
				return true;
			}
		}

		return false;
	}
	
	
}
