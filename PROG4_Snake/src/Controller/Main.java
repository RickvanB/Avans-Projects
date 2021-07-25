package Controller;

import javafx.application.Application;
import javafx.stage.Stage;

public class Main extends Application {

	private Controller controller;
	
	public static void main(String[] args) {
		launch(args);
	}

	@Override
	public void start(Stage stage) throws Exception {
		
		controller = new Controller(stage);
		controller.setUpGame();
	}

}
