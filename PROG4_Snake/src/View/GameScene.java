package View;

import Controller.Controller;
import Controller.GameThread;
import Controller.PlayGround;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.Pane;

public class GameScene extends Scene {
	
	private BorderPane root;
	private DrawPane drawPane;
	private Dashboard dashboard;
	private PlayGround playGround;
	private Controller controller;
	
	/**
	 * Constructor
	 * @param gt GameThread
	 * @param c Controller
	 * @param pg PlayGround
	 */
	public GameScene(GameThread gt, Controller c, PlayGround pg) {
		super(new Pane());
		
		this.playGround = pg;
		this.controller = c;
		drawPane = new DrawPane(controller, pg);
		dashboard = new Dashboard(gt, c);
		
		root = new BorderPane();
		root.setCenter(drawPane);
		root.setBottom(dashboard);
		
		setRoot(root);
	}
	
	/**
	 * Returns PlayGround
	 * @return PlayGround
	 */
	public PlayGround getPlayGround()
	{
		return this.playGround;
	}
	
	/**
	 * Get DrawPane
	 * @return DrawPane
	 */
	public DrawPane getDrawPane()
	{
		return drawPane;
	}
	
	/**
	 * Returns the dashboard
	 * @return Dashboard
	 */
	public Dashboard getDashboard()
	{
		return dashboard;
	}
	
	/**
	 * Setup new listener when new BodyPart
	 * @param bodyPartNr
	 */
	public void setNewListener(int bodyPartNr)
	{
		controller.getSnake().getBodyPart(bodyPartNr).bodyXProperty().addListener((observable, oldValue, newValue) -> drawPane.update());
		controller.getSnake().getBodyPart(bodyPartNr).bodyYProperty().addListener((observable, oldValue, newValue) -> drawPane.update());
	}

}
