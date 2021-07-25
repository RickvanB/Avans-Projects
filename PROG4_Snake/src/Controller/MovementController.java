package Controller;

import Model.BodyPart;
import Model.Direction;
import Model.Game;
import Model.Snake;
import View.GameScene;
import javafx.animation.Animation;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.event.EventHandler;
import javafx.scene.input.KeyEvent;
import javafx.util.Duration;

public class MovementController {
	
	/**
	 *  Prevent switching directions fast after move
	 */
	private boolean lockMovement;
	
	/**
	 * The movement in X and Y-axis
	 */
	private int dx, dy;
	
	private int step = 50;
	private final int duration = 1000;
	private final int maxSpeed = 12;
	
	private GameScene gameScene;
	private Snake snake;
	private Game game;
	private BodyPart head;
	private Timeline timeline;
	private Controller controller;
	
	/**
	 * Constructor
	 * @param gs
	 * @param snake
	 * @param controller
	 * @param game
	 */
	public MovementController(GameScene gs, Snake snake, Controller controller, Game game)
	{
		lockMovement = true;
		this.gameScene = gs;
		this.snake = snake;
		this.head = this.snake.getHead();
		this.controller = controller;
		this.game = game;
		this.setupGameLoop();
	}
	
	/**
	 * Setup TimeLine and movement
	 */
	public void setupGameLoop()
	{	
		timeline = new Timeline(new KeyFrame(Duration.millis(this.duration), event -> {
			
			//When moving up
			if(snake.getDirection().equals(Direction.UP)) {
				dx = 0;
				dy = -step;
			}
			
			//When moving down
			if(snake.getDirection().equals(Direction.DOWN)) {
				dx = 0;
				dy = step;

			}
			
			//When moving left
			if(snake.getDirection().equals(Direction.LEFT)) {
				dx = -step;
				dy = 0;
			}
			
			//When moving right
			if(snake.getDirection().equals(Direction.RIGHT)) {
				dx = step;
				dy = 0;
			}
			
			//If snake is smaller than 5
			if(snake.getSize() < 5) {
				game.setGameOver(true);
			}
			
			//Check if we hit something or if we ate a mouse
			gameScene.getPlayGround().checkCollision();
			gameScene.getPlayGround().checkIfEatenMouse();
			
			// Check if game is over
			if(game.isGameOver()) {
				controller.getGameThread().stop(false);
				controller.setEndScene();
				timeline.stop();
			}
			
			move(dx, dy);
			movement();
			lockMovement = true;

		}));
		timeline.setCycleCount(Animation.INDEFINITE);
	}
	
	/**
	 * Set rate of animation
	 * @param duration
	 */
	public void setRate(int duration)
	{
		if(duration > maxSpeed) {
			duration = maxSpeed;
		}
		
		gameScene.getDashboard().getSlider().setValue((double)duration);
		game.setSpeed((int) (timeline.getCycleDuration().toSeconds() + duration));
		timeline.setRate(timeline.getCycleDuration().toSeconds() + duration);
	}
	
	/**
	 * Get rate of animation
	 * @return double
	 */
	public double getRate()
	{
		return timeline.getCycleDuration().toSeconds();
	}
	
	/**
	 * Start animation
	 */
	public void startLoop()
	{
		timeline.play();
	}
	
	/**
	 * Stop animation
	 */
	public void pauseLoop()
	{
		timeline.stop();
	}
	
	/**
	 * Method to handle snake's position and movement on board
	 * @param dx - movement in X-axis, 1 for right, -1 for left
	 * @param dy - movement in Y-axis, 1 for down, -1 for up
	 */
	private void move(int dx, int dy)
	{	
		// temporary variables to hold BodyParts
		BodyPart prev = new BodyPart(head.getX(), head.getY());
		BodyPart next = new BodyPart(head.getX(), head.getY());
		head.setX(head.getX() + dx);
		head.setY(head.getY() + dy);
		
		// If snake pass window borders
		if(head.getX() > gameScene.getDrawPane().WIDTH || head.getX() < 0
			|| head.getY() > gameScene.getDrawPane().HEIGHT
			|| head.getY() < 0) {
			game.setGameOver(true);
			return;
		}
		
		// moving the snake's body, each BodyPart gets the position of the one in front
		for(int i = 1; i < snake.getBody().size(); i++) {
			
			next.setX( snake.getBodyPart(i).getX());
			next.setY( snake.getBodyPart(i).getY());
	
			snake.getBodyPart(i).setX(prev.getX());
			snake.getBodyPart(i).setY(prev.getY());
			prev.setX(next.getX());
			prev.setY(next.getY());
		}
	}
	
	/**
	 * Method to handle pressed keys on scene given as argument
	 */
	private void movement()
	{
		//View needs focus in order to register key events
		gameScene.getDrawPane().requestFocus();
		gameScene.setOnKeyPressed(e -> {
			
			switch(e.getCode()) {
				case UP:
					if(lockMovement) {
						lockMovement = false;
						snake.setDirection(Direction.UP);
					}
					break;
				case DOWN:
					if(lockMovement) {
						lockMovement = false;
						snake.setDirection(Direction.DOWN);
					}
					break;
				case LEFT:
					if(lockMovement) {
						lockMovement = false;
						snake.setDirection(Direction.LEFT);
					}
					break;
				case RIGHT:
					if(lockMovement) {
						lockMovement = false;
						snake.setDirection(Direction.RIGHT);
					}
					break;
			}
			
			e.consume();
			
		});
		
		gameScene.setOnKeyReleased(new EventHandler<KeyEvent>() {
			 @Override
	         public void handle(KeyEvent event) {
			 }
		});
	}
}
