package View;

import Controller.Controller;
import Controller.GameThread;
import javafx.animation.AnimationTimer;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.control.ToggleButton;
import javafx.scene.layout.HBox;

public class Dashboard extends HBox {

	private ToggleButton pauseButton;
	private Button exitButton;
	private Slider speedSlider;
	private Label playtimeLabel;
	
	private boolean run = true;
	private long elapsedMillis = 0;
	
	private GameThread gameThread;
	private Controller controller;
	
	public Dashboard(GameThread gameThread, Controller controller)
	{
		this.setSpacing(20);
		this.setAlignment(Pos.CENTER);
		this.gameThread = gameThread;
		this.controller = controller;
        
        AnimationTimer stopwatch = new AnimationTimer() {

            private static final long STOPPED = -1;
            private long startTime = STOPPED;

            @Override
            public void handle(long timestamp) {
                if (startTime == STOPPED) {
                    startTime = timestamp;
                }
                long elapsedNanos = timestamp - startTime;
                elapsedMillis = elapsedNanos / 1_000_000;
                
                controller.setPlayTime(elapsedMillis);
                playtimeLabel.setText(millisToReadableFormat(elapsedMillis));
            }

            @Override
            public void stop() {
                startTime = STOPPED ;
                super.stop();
            }
        };
		
		pauseButton = new ToggleButton("Play");
		pauseButton.setOnAction(event -> {
			if(pauseButton.isSelected()) {
				pauseButton.setText("Pause");
				run = true;
				gameThread.start(run);
				stopwatch.start();
			} else {
				pauseButton.setText("Play");
				run = false;
				stopwatch.stop();
				gameThread.stop(run);
			}
		});
		
		exitButton = new Button("Exit");
		exitButton.setOnAction(event -> {
			System.exit(0);
		});
		
		speedSlider = new Slider(1, 12, 1);
		speedSlider.setMinWidth(300);
		speedSlider.setBlockIncrement(1);
		speedSlider.setMajorTickUnit(1);
		speedSlider.setMinorTickCount(0);
		speedSlider.setShowTickLabels(true);
		speedSlider.setShowTickMarks(true);
		speedSlider.setSnapToTicks(true);
		
		this.playtimeLabel = new Label();
		playtimeLabel.setText(millisToReadableFormat(elapsedMillis));
		
		this.getChildren().addAll(pauseButton, exitButton, speedSlider, playtimeLabel);
		
		//Listeners
		speedSlider.valueProperty().addListener(new SpeedListener());
	}
	
	/**
	 * Returns slider
	 * @return Slider
	 */
	public Slider getSlider()
	{
		return speedSlider;
	}
	
	/**
	 * Convert milliseconds to readable format
	 * @param elapsedMillis
	 * @return String
	 */
	private String millisToReadableFormat(long elapsedMillis)
	{
		int minutes = (int) (elapsedMillis /(1000 * 60));
        int seconds = (int) (elapsedMillis / 1000 % 60);
        int millis  = (int) (elapsedMillis % 1000);
        
		return String.format("%02d:%02d.%03d", minutes, seconds, millis);
	}
	
	/**
	 * Private class that handles updates when the slider is moved
	 *
	 */
	private class SpeedListener implements ChangeListener<Number>
	{		
		@Override
		public void changed(ObservableValue<? extends Number> observable,
				Number oldValue, Number newValue) {
			gameThread.getMovementController().setRate(newValue.intValue());
		}
	}
	
	
}
