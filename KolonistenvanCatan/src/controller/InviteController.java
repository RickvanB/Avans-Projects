package controller;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.sql.SQLException;

import model.Invite;

/**
 * 
 * @author Rick & Ferran
 *
 */
public class InviteController {

	private Invite iM;

	public InviteController() {
		this.iM = new Invite();
	}

	/**
	 * Invites a player for a lobby
	 * 
	 * @param username
	 * @param gameID
	 * @param accepted
	 */
	public void invitePlayer(String username, int gameID) {
		this.iM.invitePlayer(gameID, username);
	}

	/**
	 * Gets invites that belong to a player
	 * @param myusername
	 * @return
	 */
	public ResultSet getInvites(String myusername) {
		return this.iM.getInvite(myusername);
	}
	
	/**
	 * Decline invite
	 * @param gameID
	 * @param myusername
	 */
	
	public void declineInvite(int gameID, String myusername) {
		this.iM.declineInvite(gameID, myusername);
	}
	
	/**
	 * Gets all players
	 * @param username
	 * @return ArrayList
	 */
	public ArrayList getAllPlayers(String username)
	{
		return this.iM.getAllPlayers(username);
	}
	
	public ArrayList getAllAccounts(String username, int gameID)
	{
		return this.iM.getAllAccounts(username);
	}
	
	/**
	 * Gets all games
	 * @return ArrayList
	 */
	public ArrayList getAllGames(String username)
	{
		return this.iM.getAllGames(username);
	}
	
	/**
	 * Accepts invite
	 * @param gameID
	 * @param myusername
	 * @return boolean
	 */
	public boolean acceptInvite(int gameID, String myusername) {
		try {
			if (this.iM.acceptInvite(gameID, myusername)) {
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	
		return false;

	}

	public void re_invitePlayer(String username, int gameID) {
		this.iM.re_invitePlayer(username, gameID);
		
	}

	public boolean isAlreadyInGame(String username, int gameID) {
		return this.iM.isAlreadyInGame(username, gameID);
	}

}
