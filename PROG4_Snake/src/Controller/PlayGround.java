package Controller;

import java.util.ArrayList;
import java.util.Random;

import Model.BodyPart;
import Model.Direction;
import Model.Game;
import Model.Marker;
import Model.Snake;
import Model.Spot;
import View.GameScene;

public class PlayGround {

	private final static int AMOUTOFMICETOADD = 4;
	
	private Snake snake;
	private BodyPart head;
	private Game game;
	private GameScene gameScene;
	
	private Random rand;
	private int[] xPositions;
	private int[] yPositions;
	
	private ArrayList<Spot> obstacles;
	private ArrayList<Spot> mice;
	private Marker[] markerObstacles;
	
	/**
	 * Constructor
	 * @param snake
	 * @param game
	 */
	public PlayGround(Snake snake, Game game)
	{
		this.snake = snake;
		this.game = game;
		head = snake.getHead();
		this.xPositions = game.getXPositionsGrid();
		this.yPositions = game.getYPositionsGrid();
		markerObstacles = new Marker[]{Marker.BEAR, Marker.FIRE};
		rand = new Random();
		obstacles = new ArrayList<>();
		mice = new ArrayList<>();
	}
	
	/**
	 * Set GameScene
	 * @param gs
	 */
	public void setGameScene(GameScene gs)
	{
		this.gameScene = gs;
	}
	
	/**
	 * Check if we hit one of the obstacles
	 * @return boolean
	 */
	public void checkCollision()
	{	
		int headX, headY, helpX, helpY;
		
		headX = head.getX();
		headY = head.getY();
		
		// checks if snake hit itself
		for(int i = 1; i < snake.getSize(); i++) {
			
			helpX = snake.getBodyPart(i).getX();
			helpY = snake.getBodyPart(i).getY();
			
			if(helpX == headX && helpY == headY) {
				game.setGameOver(true);
			}
		}
		
		//Check if we hit obstacles
		for(int i = 0; i < obstacles.size(); i++) {
			
			Spot obstacle = obstacles.get(i);
			
			helpX = obstacles.get(i).getX();
			helpY = obstacles.get(i).getY();
			
			if(helpX == headX && helpY == headY) {
				
				// If obstacle equals fire, game is over
				// If equals Bear, below 5 is game over, otherwise cut snake in half
				if(obstacle.getMarker().equals(Marker.FIRE)) {
					game.setGameOver(true);
				} else if(obstacle.getMarker().equals(Marker.BEAR)) { 
					if(snake.getSize() < 5) {
						game.setGameOver(true);
					} else {
						for(int j = (int) Math.floor(snake.getSize() / 2); j > 0; j--) {
							snake.removeBodyPart(snake.getSize() - 1);
						}
					}
				}
			}
		}
	}
	
	/**
	 * Looks for a x and y position on the board to add new obstacle.
	 */
	public void addObstacles() 
	{
		int spotX = 0 , spotY = 0, helpX, helpY;
		//helpS if doesn't crash with snake, helpM for mice
		boolean crash = true, helpS, helpM;

		while(crash) {
			
			helpS = helpM = false;
			spotX = xPositions[rand.nextInt(xPositions.length)];
			spotY = yPositions[rand.nextInt(yPositions.length)];
		
			// to not crash with snake
			for(int i = 0; i < snake.getSize(); ++i) {
				
				helpX = snake.getBodyPart(i).getX();
				helpY = snake.getBodyPart(i).getY();
	
				// if crashes, start while again and generate new spot
				if(helpX == spotX && helpY == spotY) {
					break;
				}
				
				// if doesn't crash with any snake part, go over to check mouse
				if(i == snake.getSize() - 1) {
					helpS = true;
				}
			}
			// to not crash with mice
			if(helpS) {
				
				// if there are no mice on the field
				if(mice.size() == 0) {
					helpM = true;
				}
				else {
					
					for(int i = 0; i < mice.size(); ++i) {
						
						helpX = mice.get(i).getX();
						helpY = mice.get(i).getY();
			
						// back to while to generate new spot, and check everything again
						if(helpX == spotX && helpY == spotY) {
							break;
						}
						
						// doesn't crash with mice
						if(i == mice.size() - 1) {
							helpM = true;
						}	
					}
				}
				
				// point for obstacle doesn't crash with any snake part or mice
				if(helpM) {
					crash = false;
				}
			}
		}
		
		// add new obstacle
		addObstacle(spotX, spotY, this.markerObstacles[rand.nextInt(this.markerObstacles.length)]);
	}
	
	/**
	 * Adds a new mouse to the array
	 */
	public void addMice()
	{
		int helpX, helpY, mouseX, mouseY;
		boolean helpS, helpO;
		boolean crash = true;
		
		while(crash) {
			
			helpS = helpO = false;
			mouseX = xPositions[rand.nextInt(xPositions.length)];
			mouseY = yPositions[rand.nextInt(yPositions.length)];
			
			// To not crash with snake
			for(int i = 0; i < snake.getSize(); i++) {
				
				helpX = snake.getBodyPart(i).getX();
				helpY = snake.getBodyPart(i).getY();
				
				// If crash, start loop again and find a new spot inside the grid
				if(helpX == mouseX && helpY == mouseY) {
					break;
				}
				
				// If there are no crashes, go over to check obstacles
				if(i == snake.getSize() - 1) {
					helpS = true;
				}
			}
			
			if(helpS) {
				// If there are no obstacles on the field
				if(obstacles.size() == 0) {
					helpO = true;
				} else {
					
					for(int i = 0; i < obstacles.size(); i++) {
						
						helpX = obstacles.get(i).getX();
						helpY = obstacles.get(i).getY();
						
						// If crash, start loop again and find a new spot inside the grid
						if(mouseX == helpX && mouseY == helpY) {
							break;
						}
						
						// No crash with any of the obstacles
						if(i == obstacles.size() -1) {
							helpO = true;
						}
					}
				}
				
				// The spot in the grid doesn't crash with any snake part or mice
				if(helpO) {
					crash = false;
				}
			}
			
			//Add a new mouse
			this.addMice(mouseX, mouseY, Marker.MOUSE);
		}
	}
	
	/**
	 * Check if we eat a mouse
	 */
	public void checkIfEatenMouse()
	{
		int headX, headY, mouseX, mouseY;
		headX = head.getX();
		headY = head.getY();
		
		for(int i = 0; i < mice.size(); i++) {
			mouseX = mice.get(i).getX();
			mouseY = mice.get(i).getY();
			
			if(mouseX == headX && mouseY == headY) {
				removeMouse(i);
				for(int b = 0; b < AMOUTOFMICETOADD; b++) {
					addExtraBodyPart();
				}
			}
		}
	}

	/**
	 * Returns ArrayList of obstacles
	 * @return ArrayList
	 */
	public ArrayList<Spot> getObstacles()
	{
		return this.obstacles;
	}
	
	/**
	 * Returns ArrayList of mice
	 * @return ArrayList
	 */
	public ArrayList<Spot> getMice()
	{
		return this.mice;
	}
	
	/**
	 * Adding extra body parts after eating a mouse
	 */
	public void addExtraBodyPart() {
		
		BodyPart bp = snake.getBodyPart(snake.getSize()-1);
		
		if(snake.getDirection().equals(Direction.UP)) {
			snake.addBodyPart(bp.getX(), bp.getY() - bp.SIZE);
		} else if(snake.getDirection().equals(Direction.DOWN)) {
			snake.addBodyPart(bp.getX(), bp.getY() + bp.SIZE);
		} else if(snake.getDirection().equals(Direction.LEFT)) {
			snake.addBodyPart(bp.getX() - bp.SIZE, bp.getY());
		} else if(snake.getDirection().equals(Direction.RIGHT)) {
			snake.addBodyPart(bp.getX() + bp.SIZE, bp.getY());
		}
		
		gameScene.setNewListener(snake.getSize() - 1);
	}
	
	/**
	 * Remove mouse
	 * @param i
	 */
	private void removeMouse(int i) {
		mice.remove(i);
	}
	
	/**
	 * Add new obstacle to array
	 * @param x coordinate
	 * @param y coordinate
	 * @param type Enum
	 */
	private void addObstacle(int x, int y, Marker type) 
	{
		obstacles.add(new Spot(x, y, type));
	}
	
	/**
	 * Add new mouse to array
	 * @param x coordinate
	 * @param y coordinate
	 * @param type Enum
	 */
	private void addMice(int x, int y, Marker type)
	{
		mice.add(new Spot(x, y, type));
	}
	
}
