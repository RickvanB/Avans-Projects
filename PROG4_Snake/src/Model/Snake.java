package Model;

import java.util.ArrayList;

public class Snake {

	public final int START_SIZE = 5;
	
	private int size;
	
	private Direction direction;
	private BodyPart position; // Head
	
	//Array that holds the entire body
	private ArrayList<BodyPart> body;
	
	/**
	 * Constructor
	 */
	public Snake()
	{
		body = new ArrayList<>();
		position = new BodyPart(350, 150);
		size = 0;
		this.setStart();
	}
	
	/**
	 * Create snake
	 */
	public void setStart()
	{
		if(size == 0) {
			body.add(position);
			size++;
			
			for(int i = 1; i < START_SIZE; i++) {
				int x = 0;
				x = (body.get(i - 1).getX() - 50);
				this.addBodyPart(x, 150);
			}
		}
	}
	
	/**
	 * Returns the head
	 * @return BodyPart
	 */
	public BodyPart getHead()
	{
		return this.position;
	}
	
	/**
	 * Adds a new BodyPart
	 * @param x
	 * @param y
	 */
	public void addBodyPart(int x, int y)
	{
		body.add(new BodyPart(x, y));
		size++;
	}
	
	/**
	 * Removes a BodyPart
	 * @param bodyPart
	 */
	public void removeBodyPart(int bodyPart)
	{
		body.remove(bodyPart);
		size--;
	}
	
	/**
	 * Returns current size
	 * @return int
	 */
	public int getSize()
	{
		return this.size;
	}
	
	/**
	 * Get BodyPart
	 * @param i
	 * @return BodyPart
	 */
	public BodyPart getBodyPart(int i) 
	{
		return body.get(i);
	}
	
	/**
	 * Get complete body
	 * @return ArrayList
	 */
	public ArrayList<BodyPart> getBody()
	{
		return this.body;
	}
	
	/**
	 * Returns direction of the snake
	 * @return
	 */
	public Direction getDirection() {
		return direction;
	}

	/**
	 * Sets direction of the snake
	 * @param direction
	 */
	public void setDirection(Direction direction) {
		this.direction = direction;
	}
	
}
