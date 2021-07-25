package Model;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleLongProperty;

public class Game {

	private SimpleLongProperty playTime;
	private SimpleIntegerProperty speed;
	
	private boolean gameOver = false;
	private int[] yPositionsGrid = new int[]{50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550};
	private int[] xPositionsGrid = new int[]{50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700};
	
	/**
	 * Constructor
	 */
	public Game()
	{
		this.playTime = new SimpleLongProperty(this, "playTime");
		this.speed = new SimpleIntegerProperty(this, "speed");
		setSpeed(1);
	}
	
	/**
	 * Get current speed
	 * @return
	 */
	public int getSpeed() {
		return speed.get();
	}

	/**
	 * Set speed
	 * @param speed
	 */
	public void setSpeed(int speed) {
		this.speed.set(speed);
	}
	
	/**
	 * Returns if game is over yes or no
	 * @return boolean
	 */
	public boolean isGameOver() {
		return gameOver;
	}

	/**
	 * Set if game is over yes or no
	 * @param gameOver
	 */
	public void setGameOver(boolean gameOver) {
		this.gameOver = gameOver;
	}

	/**
	 * Get play time
	 * @return long
	 */
	public long getPlayTime() {
		return playTime.get();
	}
	
	/**
	 * Set play time
	 * @param playTime
	 */
	public void setPlayTime(long playTime) {
		this.playTime.set(playTime);
	}
	
	/**
	 * Returns speed property
	 * @return Property
	 */
	public IntegerProperty speedProperty() {
		return this.speed;
	}
	
	/**
	 * Return int array of x positions
	 * @return array
	 */
	public int[] getXPositionsGrid()
	{
		return xPositionsGrid;
	}
	
	/**
	 * Return int array of y positions
	 * @return array
	 */
	public int[] getYPositionsGrid()
	{
		return yPositionsGrid;
	}
}
