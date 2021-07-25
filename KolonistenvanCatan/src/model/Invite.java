package model;

import java.awt.Color;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Invite {

	private DatabaseCommunicator dc;

	private int gameID;
	private static final int ID_USER = 1;

	private static final int BOOLEAN_POSITION = 1;

	private static final String FALSE = "0";

	public Invite() {
		this.dc = DatabaseCommunicator.getInstance();
	}

	/**
	 * Invites a player for a lobby
	 * 
	 * @param gameID
	 * @param username
	 * @param accepted
	 */
	public void invitePlayer(int gameID, String username) {
		int playerId = this.getFirstFreeInteger();
		String status = "uitgedaagde";

		String query = "INSERT INTO speler (idspeler, idspel, username, kleur, speelstatus, shouldrefresh, volgnr) VALUES (?, ?, ?, ?, ?, ?, ?)";
		String[] params = { Integer.toString(playerId), Integer.toString(gameID), username, "rood", status, "0", "1" };

		try {
			this.dc.updateInsertDelete(query, params);
			this.setColorToPlayer(gameID, username);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public ResultSet getInvite(String myusername) {
		ResultSet result = null;
		String query = "SELECT * FROM speler WHERE speelstatus = 'uitgedaagde' AND username = ?";
		String[] params = { myusername };

		try {
			result = this.dc.select(query, params);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;

	}

	/**
	 * This method will get the first free integer from the playerIDS
	 * @return
	 */
	public int getFirstFreeInteger() {

		// ArrayList to save the ids the query will return
		ArrayList<Integer> IDS = new ArrayList<Integer>();

		// Get all gameID's
		try {

			ResultSet result = dc.select("SELECT idspeler FROM speler", null);

			while (result.next()) {
				IDS.add(Integer.parseInt(result.getString(ID_USER)));
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		// Return int
		int resultInt = 0;
		boolean numberExists = false;
		
		for (int j = 1; j < IDS.size() + 1; j++) {


			numberExists = false;
			for (int a = 0; a < IDS.size(); a++) {

				if (j == IDS.get(a)) {
					numberExists = true;
				}

			}
			// Save the number if it not exist yet
			if (!numberExists) {
				resultInt = j;
				break;
			}
		}
		int counter = 1;
		while (resultInt == 0) {
			String[] params = { Integer.toString(counter)};
			
			// Check if gameID exists
			ResultSet result = dc.select("SELECT EXISTS(SELECT * FROM speler WHERE idspeler = ?)", params);

			try {
				while (result.next()) {
					String resultString;

					resultString = result.getString(BOOLEAN_POSITION);

					if (resultString.equals(FALSE)) {
						resultInt = counter;
					}
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}

			counter++;
		}

		return resultInt;
	}

	public void declineInvite(int idspel, String myusername) {
		String query = "UPDATE speler SET speelstatus = 'geweigerd'	WHERE idspel = ? AND username = ?";
		String[] params = { Integer.toString(idspel), myusername };
		System.out.println(idspel);
		try {
			this.dc.updateInsertDelete(query, params);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public ArrayList getAllPlayers(String username) {
		ResultSet result;
		ArrayList<String> players = new ArrayList<>();
		String query = "SELECT DISTINCT username FROM speler WHERE username <> ? ";
		String[] params = { username };

		try {
			result = this.dc.select(query, params);
			while (result.next()) {
				players.add(result.getString(1));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return players;
	}

	public ArrayList<String> getAllGames(String username) {
		ResultSet result;
		ArrayList<String> games = new ArrayList<>();
		String query = "SELECT DISTINCT idspel FROM speler WHERE username = ? AND speelstatus = 'uitdager'";
		String[] params = { username };

		try {
			result = this.dc.select(query, params);
			while (result.next()) {
				games.add(result.getString(1))
				;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return games;
	}

	public boolean acceptInvite(int idspel, String myusername) throws SQLException {
		
		try {
			
			String query = "UPDATE speler SET speelstatus = 'geaccepteerd' WHERE idspel = ? AND username = ?";
			String[] params = { Integer.toString(idspel), myusername };

			this.dc.updateInsertDelete(query, params);
									
			return true;
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	private void setColorToPlayer(int gameID, String username) throws SQLException {
		int volgnr = 1;

		String query3 = "SELECT count(idspel) FROM speler WHERE idspel = ? AND speelstatus = 'uitgedaagde'";
		String[] params3 = { Integer.toString(gameID) };

		ResultSet result = this.dc.select(query3, params3);

		if (result.next()) {
			if (result.getInt(1) < 4) {
				try {
					if (result.getInt(1) == 1) {
						volgnr = 2;
					} else if (result.getInt(1) == 2) {
						volgnr = 3;
					} else if (result.getInt(1) == 3) {
						volgnr = 4;
					}

					String query = "UPDATE speler SET volgnr = ?, kleur = ? WHERE idspel = ? AND username = ?";
					String[] params = { Integer.toString(volgnr), this.volgnrToColor(volgnr), Integer.toString(gameID),
							username };

					this.dc.updateInsertDelete(query, params);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	private String volgnrToColor(int volgnr) {

		switch (volgnr) {
		case 2:
			return "wit";
		case 3:
			return "blauw";
		case 4:
			return "oranje";
		default:
			System.out.println("volgnr invalid.");
			return "zwart";
		}

	}

	/**
	 * This method will update a player who has declined the game for a new player
	 * @param username
	 * @param gameID2
	 */
	public void re_invitePlayer(String username, int gameID) {
	
		ResultSet result;
		
		// Parmaters
		String[] params = {username, Integer.toString(gameID)};
		
		try {
			dc.updateInsertDelete("UPDATE speler SET username = ?, speelstatus = 'uitgedaagde' WHERE speelstatus = 'geweigerd' AND idspel = ?", params);
			
		} catch (Exception e) {
			System.out.println("Warning: [Invite Model] - Re-inviteting player has failed");
			e.printStackTrace();
			
		}
		
	}

	/**
	 * Get all accounts
	 * @param username
	 * @return ArrayList
	 */
	public ArrayList getAllAccounts(String username) {
		
		ResultSet result;
		String query = "SELECT username FROM account WHERE username <> ?";
		String[] params = {username};
		ArrayList<String> accounts = new ArrayList<>();
		
		try {
			result = dc.select(query, params);
			while(result.next()) {
				accounts.add(result.getString(1));
			}
		} catch(Exception e) {
			System.out.println("Warning: [Invite Model] - Get all accounts has failed");
			e.printStackTrace();
		}
		
		return accounts;
	}

	public boolean isAlreadyInGame(String username, int gameID) {
		ResultSet result;
		boolean exists = false;
		
		String query = "SELECT * FROM speler WHERE username = ? AND idspel = ?";
		String[] params = {username, Integer.toString(gameID)};
		int counter = 0;
		try {
			result = this.dc.select(query, params);
			while(result.next()) {
				counter++;
			}
			
			if(counter > 0) {
				exists = true;
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return exists;
	}

}
