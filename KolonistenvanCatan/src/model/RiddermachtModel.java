package model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Observable;

import model.DatabaseCommunicator;

public class RiddermachtModel {

	// Objects
		private DatabaseCommunicator dc;
		private GameRefreshModel gRM;

		public RiddermachtModel() {
			dc = DatabaseCommunicator.getInstance();
			gRM = new GameRefreshModel();
		}
		
		/**
		 * assigns the riddermacht to a player
		 * @param userID
		 * @param gameID
		 */
		public void UpdateRiddermacht(int userID, int gameID) {
			String query = "UPDATE spel SET grootste_rm_idspeler = ? WHERE idspel = ?";
			String[] params = { Integer.toString(userID), Integer.toString(gameID) };
			dc.updateInsertDelete(query, params);
		}
		
		/**
		 * get the biggest riddermacht
		 * @param idSpel
		 * @return
		 */
		public int getRiddermachtPlayer(int idSpel) {
			int riddermachtPlayerID = 0;
			String query = "SELECT grootste_rm_idspeler FROM spel WHERE idspel = ?";
			String[] params = { Integer.toString(idSpel) };
			ResultSet result = dc.select(query, params);
			try {
				while (result.next()) {
					riddermachtPlayerID = result.getInt(1);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return riddermachtPlayerID;
		}
		
		/**
		 * get username from idspeler
		 * @param userID
		 * @return
		 */
		public String getUsername(int userID, int gameID) {
			if (userID == 0) {
				return "Niemand";
			} else {
				this.gRM.setRefreshValue(true, gameID);
				
			}
			String username = "";
			String query = "SELECT username FROM speler WHERE idspeler = ? AND idspel = ?";
			String[] params = { Integer.toString(userID), Integer.toString(gameID) };
			ResultSet result = dc.select(query, params);
			try {
				while (result.next()) {
					username = result.getString(1);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			if (username== null || username == "") {
				username= "---";
			}
			return username;
		}
		
		/**
		 * get the amount of cards from the biggest riddermacht
		 * @param idSpeler
		 * @return
		 */
		public int getAmountOfKnights(int idSpeler, int idSpel) {
			int amount = 0;
			String query = "SELECT COUNT(idontwikkelingskaart) FROM spelerontwikkelingskaart WHERE idspeler = ? AND idspel = ? AND idontwikkelingskaart LIKE '%r' AND gespeeld = 1";
			String[] params = { Integer.toString(idSpeler), Integer.toString(idSpel) };
			ResultSet result = dc.select(query, params);
			try {
				while (result.next()) {
					amount = result.getInt(1);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return amount;
		}
		
		public int checkFirstRm(int idSpel) {
			String query = "SELECT idspeler FROM spelerontwikkelingskaart WHERE idspel = ? AND idontwikkelingskaart LIKE '%r' AND gespeeld = 1 HAVING COUNT(idontwikkelingskaart) >2";
			int idPlayer = 0;
			String[] params = {Integer.toString(idSpel)};
			ResultSet result = dc.select(query, params);
			try {
				while (result.next()) {
					idPlayer = result.getInt(1);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return idPlayer;
		}
		
		public int getPlayerWithMostKnights(int gameID) {
			String query = "SELECT idspeler FROM spelerontwikkelingskaart WHERE idspel = ? AND idontwikkelingskaart LIKE '%r' AND gespeeld = 1 ORDER BY COUNT(idontwikkelingskaart) DESC LIMIT 1";
			String[] params = { Integer.toString(gameID) };
			int idPlayer = 0;
			
			ResultSet result = dc.select(query, params);
			try {
				while (result.next()) {
					idPlayer = result.getInt(1);
				}
			} catch (SQLException e) {
				e.printStackTrace(); 
			}
			
			return idPlayer;
		}
}