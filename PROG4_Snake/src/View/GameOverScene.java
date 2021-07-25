package View;

import Controller.Controller;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.Pane;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;

public class GameOverScene extends Scene {

	private final int WIDTH = 760;
	private final int HEIGHT = 600;
	private final String gameOver = "GAME OVER!";
	
	private StackPane root;
	
	private Label gameOverText;
	private Label time;
	
	/**
	 * Constructor
	 * @param controller
	 */
	public GameOverScene(Controller controller) {
		super(new Pane());
		
		root = new StackPane();
		root.setPrefSize(WIDTH, HEIGHT);
		root.setBackground((new Background(new BackgroundFill(Color.RED, null, null))));
		
		gameOverText = new Label(gameOver);
		gameOverText.setFont(Font.font("Verdana", 40));
		gameOverText.setTextFill(Color.WHITE);
		
		time = new Label();
		time.setFont(Font.font("Verdana", 40));
		time.setTextFill(Color.WHITE);
		
		int minutes = (int) (controller.getGame().getPlayTime() /(1000 * 60));
        int seconds = (int) (controller.getGame().getPlayTime() / 1000 % 60);
        int millis  = (int) (controller.getGame().getPlayTime() % 1000);
		
		time.setText(String.format("%02d:%02d.%03d", minutes, seconds, millis));
		
		root.getChildren().addAll(gameOverText, time);
		
		StackPane.setAlignment(gameOverText, Pos.CENTER);
		StackPane.setAlignment(time, Pos.BOTTOM_CENTER);
		
		setRoot(root);
	}

}
