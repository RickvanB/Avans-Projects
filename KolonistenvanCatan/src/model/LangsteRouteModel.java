package model;
import java.util.Collections;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import model.DatabaseCommunicator;
import model.Location;

/**This class checks the database for the longest road of every player and determines the player with the longest road
 * @author Tim Noordhoorn
 *
 */
/**
 * @author tanoo
 *
 */
public class LangsteRouteModel {
	
	//Variables
	private static final int SINGLE_ARRAY = 1;
	private static final int FIRST = 0;
	private static final int AMOUNT_PLAYERS = 4;
	private static final int GET_FIRST = 1;
	private static final int GET_SECOND = 2;
	private static final int GET_THIRD = 3;
	private static final int GET_FOURTH = 4;
	
	//Objects
	private DatabaseCommunicator dC;
	private String[] spelers;
	private HashMap<String, Integer> playerRoute;
	
	private String playerName;
	private int longestRoute;
	
	//Constructor
	public LangsteRouteModel() {
		dC = DatabaseCommunicator.getInstance();
		playerRoute = new HashMap<String, Integer>();
		spelers = new String[AMOUNT_PLAYERS];
	}
	
	//Methods
	/**This method checks which player from the 4 players has the longest trade route
	 * @param gameID
	 */
	public void checkPlayerAndRoute(int gameID) {
		this.getLongestRoute(gameID);
		
		Map.Entry<String, Integer> entryMax = null;
		
		for(Map.Entry<String, Integer> entry : playerRoute.entrySet()) {
			if(entryMax == null || entry.getValue().compareTo(entryMax.getValue()) > 0) {
				entryMax = entry;
			}
		}
		if(entryMax != null) {
			if(entryMax.getValue() >= 5 && entryMax.getValue() != this.longestRoute) {
				this.longestRoute = entryMax.getValue();
				for (String s : playerRoute.keySet()) {
					if (playerRoute.get(s).equals(entryMax.getValue())) {
						this.playerName = s;
						this.transferToDatabase(Integer.parseInt(s), gameID, false);
					}
				}
			}
			else {
				this.longestRoute = 0;
				this.playerName = null;
				this.transferToDatabase(Integer.parseInt(spelers[0]), gameID, true);
			}
			
		}
		else {
			System.out.println("Warning: [LangsteRoute Model] - Het berekenen van de langste handelsroute is niet voltooid. First start-up of nog geen bezit door speler");
		}

	}
	
	/**These methods get the player and the longest route of said player
	 * @param spelID
	 */
	public String getPlayerName() {
		return playerName;
	}
	
	public int getLongestRoute() {
		return longestRoute;
	}
	
	/**This method checks if the player has the longest route
	 * @param spelID
	 * 
	 */
	public void getLongestRoute(int spelID) {
		ResultSet result;
		
		String[] params = new String[SINGLE_ARRAY];

		try {
			//Get player id's from the game
			params[FIRST] = Integer.toString(spelID);
			result = dC.select("SELECT idspeler FROM speler WHERE idspel = ?", params);

			// Save results in an array
			int counter = 0;
			while (result.next()) {
				spelers[counter] = result.getString(GET_FIRST);
				counter++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//Reset resultset
		result = null;
		
		//Initialize arraylists with the class location to contain x and y values of the roads
		String[] params2 = new String[SINGLE_ARRAY];
		ArrayList<Location> xy_van = new ArrayList<Location>();
		ArrayList<Location> xy_naar = new ArrayList<Location>();

		//Check the longest road for every player
		for(int i = 0; i < AMOUNT_PLAYERS; i++) {
			params2[FIRST] = spelers[i];
			
			try {
				// Get all roads and their location
				result = dC.select("SELECT x_van, y_van, x_naar, y_naar FROM spelerstuk WHERE idspeler = ? AND idstuk LIKE 'r%' AND x_van IS NOT NULL;",
						params2);
				
				//Save the x and y values in the class location and add the location to the arraylists
				while(result.next()) {
					xy_van.add(BoardModel.getLocation(result.getInt(GET_FIRST), result.getInt(GET_SECOND)));
					xy_naar.add(BoardModel.getLocation(result.getInt(GET_THIRD), result.getInt(GET_FOURTH)));
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			//Initialize the arraylist which contains strings of a roads xy values to and xy values from locations.
			ArrayList<String> roads = new ArrayList<String>();
			
			//Check for every x,y from
			for(int j = 0; j < xy_van.size(); j++) {
				
				//Check for every x,y to
				for(int k = 0; k < xy_naar.size(); k++) {
					
					//If x to equals the x from and y to equals the y from locations
					if(xy_naar.get(j).getxPos() == xy_van.get(k).getxPos() && xy_naar.get(j).getyPos() == xy_van.get(k).getyPos()) {
						
						//Put the locations as xy_from,xy_to in string
						String value = xy_van.get(j).getxPos() + "," + xy_van.get(j).getyPos() + " " + xy_naar.get(j).getxPos() + "," + xy_naar.get(j).getyPos();
						//System.out.println(value);
						
						//Check if the string array doesn't already contain the road
						if(!roads.contains(value)) {
							roads.add(value);
						}
						
						//System.out.println(j + " = " + xy_van.get(j).getXpos() + "," + xy_van.get(j).getYpos() + " " + xy_naar.get(j).getXpos() + "," + xy_naar.get(j).getYpos() + " ~ " + k + " = " + xy_van.get(k).getXpos() + "," + xy_van.get(k).getYpos() + " " + xy_naar.get(k).getXpos() + "," + xy_naar.get(k).getYpos());
					}
					
					//Check if the xy_from equals the xy_to
					if(xy_van.get(j).getxPos() == xy_naar.get(k).getxPos() && xy_van.get(j).getyPos() == xy_naar.get(k).getyPos()) {
						String value = xy_van.get(j).getxPos() + "," + xy_van.get(j).getyPos() + " " + xy_naar.get(j).getxPos() + "," + xy_naar.get(j).getyPos();
						//System.out.println(value);
						
						if(!roads.contains(value)) {
							roads.add(value);
						}
						
						//System.out.println(j + " = " + xy_van.get(j).getXpos() + "," + xy_van.get(j).getYpos() + " " + xy_naar.get(j).getXpos() + "," + xy_naar.get(j).getYpos() + " ~ " + k + " = " + xy_van.get(k).getXpos() + "," + xy_van.get(k).getYpos() + " " + xy_naar.get(k).getXpos() + "," + xy_naar.get(k).getYpos());
					}
					
				}
				
			}
			
			//This list will contain all roads connected in chronological order
			List<String> roadsInOrder = new ArrayList<String>();
			
			//These arraylists will contain the temporary to and from coordinates to determine whether the road can be connected or not
			ArrayList<String> temp_van = new ArrayList<String>();
			ArrayList<String> temp_naar = new ArrayList<String>();
			
			//The counter int causes the loop to repeat itself to make sure all roads in the roads arraylist are accounted for
			int counter = 0;
			
			//The loop int causes the loop to repeat itself with the next road in the road arraylist to check every available longest route
			int loop = 0;
			
			//This array collects all possible longest route candidates
			ArrayList<Integer> allRoadSizes = new ArrayList<Integer>();
			
			//The loop for finding the longest route
			for(int y = 0; y < roads.size(); y++) {
				
				//If the list is empty put in a single road to start looking for all corresponding roads
				if(roadsInOrder.size() == 0) {
					
					//Put the selected road in the list
					roadsInOrder.add(0, roads.get(y));
					
					//Insert the to and from coordinates of the road in the temporary arraylists
					temp_van.add(roads.get(y).substring(0, roads.get(y).indexOf(" ")));
					temp_naar.add(roads.get(y).substring(roads.get(y).indexOf(" ") + 1));
					
				}
				
				//Check if the road's "to" coordinate corresponds with the available from coordinates that are already in the temporary array
				//but only if it's not a road that's already in the roadsInOrder list
				//and the "to" coordinate may not be used again to connect the roads to filter out stray roads
				if(temp_van.contains(roads.get(y).substring(roads.get(y).indexOf(" ") + 1)) 
						&& !roadsInOrder.contains(roads.get(y)) 
						&& !temp_naar.contains(roads.get(y).substring(roads.get(y).indexOf(" ") + 1))) {
					
					roadsInOrder.add(0, roads.get(y));
					
					temp_van.add(roads.get(y).substring(0, roads.get(y).indexOf(" ")));
					temp_naar.add(roads.get(y).substring(roads.get(y).indexOf(" ") + 1));
				}
				
				//Same as above but the "to" and "from" coordinates have switched
				if(temp_naar.contains(roads.get(y).substring(0, roads.get(y).indexOf(" "))) 
						&& !roadsInOrder.contains(roads.get(y)) 
						&& !temp_van.contains(roads.get(y).substring(0, roads.get(y).indexOf(" ")))) {
					
					roadsInOrder.add(roads.get(y));
					
					temp_van.add(roads.get(y).substring(0, roads.get(y).indexOf(" ")));
					temp_naar.add(roads.get(y).substring(roads.get(y).indexOf(" ") + 1));
				}
				
				//When the roads arraylist has been run through
				if(y == roads.size() - 1) {
					
					//Restart the loop with the same starting road to check all unused roads for corresponding roads again, 
					//because new coordinates have been added.
					if(counter < 10) {
						counter++;
						y = 0;
					}
					
					//After 10 such loops add the total connected roads from this trial to the list allRoadSizes
					else if(counter == 10) {
						int roadSize = roadsInOrder.size();
						loop++;
						allRoadSizes.add(roadSize);
						
						//If not all roads have been used as the first road in the loop, restart the loop with the next road as its starting point
						if(loop < roads.size()) {
							roadsInOrder.clear();
							roadsInOrder.removeAll(roadsInOrder);
							
							temp_van.clear();
							temp_naar.clear();
							roads.clear();
							result = null;
							counter = 0;
							y = 0 + loop;
						}
						
					}
					
				}
				
			}
			
			if(allRoadSizes.size() >= 1) {
				playerRoute.put(spelers[i], Collections.max(allRoadSizes));
				allRoadSizes.clear();
				xy_van.clear();
				xy_naar.clear();
			} else {
				System.out.println("Message: [LangsteRoute Model] - Langste handelsroute nog niet toegekent ");
			}
			
		}
		
	}
	
	private void transferToDatabase(int userID, int gameID, boolean setToNull) {
		// Parameters

		String[] params1 = {Integer.toString(gameID)};
		String[] params2 = {Integer.toString(userID), Integer.toString(gameID)};
		
		// Update longestetraderoute ID
		if(!setToNull) {
			dC.updateInsertDelete("UPDATE spel SET langste_hr_idspeler = ? WHERE idspel = ? ", params2);
		} else {
			dC.updateInsertDelete("UPDATE spel SET langste_hr_idspeler = null WHERE idspel = ? ", params1);

		}
		
	}

}