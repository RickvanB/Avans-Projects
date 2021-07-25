package Controller;

import java.util.Iterator;

import Model.BodyPart;
import Model.Direction;
import Model.Game;
import Model.Snake;
import View.GameOverScene;
import View.GameScene;
import javafx.geometry.Rectangle2D;
import javafx.stage.Screen;
import javafx.stage.Stage;

public class Controller {
	
	//Controller
	private PlayGround playGround;
	private GameThread thread;
	
	//View
	private GameScene gameScene;
	// Model
	private Snake snake;
	private Game game;
	private GameOverScene gameOverScene;
	
	private Stage stage;
	
	/**
	 * Constructor
	 * @param stage
	 */
	public Controller(Stage stage)
	{
		this.stage = stage;
		snake = new Snake();
		//Default to right when start
		snake.setDirection(Direction.RIGHT);
		game = new Game();
		playGround = new PlayGround(snake, game);
		thread = new GameThread(playGround, game);
		gameScene = new GameScene(thread, this, playGround);
		thread.createMovementController(gameScene, snake, this);
		playGround.setGameScene(gameScene);
		this.setupListeners();
		
		stage.setTitle("PROG4 ASS Snake - Rick van Beek");
	}
	
	/**
	 * Set scene and show window
	 */
	public void setUpGame() 
	{
		stage.setResizable(false);
		stage.setScene(gameScene);
		stage.show();
		this.centerWindow();
	}
	
	/**
	 * Set end screen when game is over
	 */
	public void setEndScene()
	{
		gameOverScene = new GameOverScene(this);
		stage.setScene(gameOverScene);
		stage.setResizable(false);
		stage.show();
		this.centerWindow();
	}
	
	/**
	 * Set play time
	 * @param milliseconds
	 */
	public void setPlayTime(long seconds) {
		game.setPlayTime(seconds);
	}
	
	/**
	 * Returns Game model
	 * @return
	 */
	public Game getGame()
	{
		return game;
	}
	
	/**
	 * Returns GameThread
	 * @return
	 */
	public GameThread getGameThread()
	{
		return thread;
	}
	
	/**
	 * Returns Snake model
	 * @return
	 */
	public Snake getSnake()
	{
		return snake;
	}
	
	/**
	 * Center window
	 */
	private void centerWindow()
	{
		Rectangle2D primScreenBounds = Screen.getPrimary().getVisualBounds();
	    stage.setX((primScreenBounds.getWidth() - stage.getWidth()) / 2);
	    stage.setY((primScreenBounds.getHeight() - stage.getHeight()) / 2);
	}
	
	/**
	 * Setup standard listeners
	 */
	private void setupListeners() 
	{
		Iterator i = snake.getBody().iterator();
		while(i.hasNext()) {
			BodyPart bp = (BodyPart) i.next();
			bp.bodyXProperty().addListener((observable, oldValue, newValue) -> gameScene.getDrawPane().update());
			bp.bodyYProperty().addListener((observable, oldValue, newValue) -> gameScene.getDrawPane().update());
		}
	}
}
