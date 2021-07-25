package Controller;

import Model.Game;
import Model.Snake;
import View.GameScene;

public class GameThread implements Runnable
{
	private Thread t;
	private MovementController movement;
	private PlayGround playGround;
	private Game game;
	
	private boolean run;
	private int duration = 1;
	
	/**
	 * Constructor
	 * @param playGround
	 * @param game
	 */
	public GameThread(PlayGround playGround, Game game) {
		this.run = true;
		t = new Thread(this);
		this.playGround = playGround;
		this.game = game;
		t.start();
	}

	/**
	 * Create movement controller
	 * @param gs
	 * @param snake
	 * @param controller
	 */
	public void createMovementController(GameScene gs, Snake snake, Controller controller)
	{
		movement = new MovementController(gs, snake, controller, game);
	}
	
	/**
	 * Returns movement controller
	 * @return Controller
	 */
	public MovementController getMovementController()
	{
		return movement;
	}
	
	/**
	 * Start thread
	 * @param run
	 */
	public void start(boolean run) {		
		this.movement.startLoop();
		this.run = run;
	}
	
	/**
	 * Stop thread and timeline
	 * @param run
	 */
	public void stop(boolean run)
	{
		this.run = run;
		this.movement.pauseLoop();
	}
	
	/**
	 * Execute thread
	 */
	@Override
	public void run() 
	{	
		while(run && !game.isGameOver()) {
			
			try {
				
				if(movement != null && playGround != null) {
					duration = this.game.getSpeed();
					duration++;
					movement.setRate(duration);
					playGround.addExtraBodyPart();
				}
				
				playGround.addObstacles();
				playGround.addMice();
				Thread.sleep(7000);
			} catch (InterruptedException e) {
				//If this happened, sleep has gone wrong, abort mission
				System.exit(0);
			}
		}
	}
	
	
	
}
