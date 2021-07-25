package View;

import Controller.Controller;
import Controller.PlayGround;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.Image;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;

public class DrawPane extends StackPane {

	public final static int WIDTH = 760;
	public final static int HEIGHT = 600;
	private final static int X_YPOS = 50;
	private final static int RECT_SIZE = 65;
	private final int ROWS = 19;
	private final int COLS = 15;
		
	private GraphicsContext gc;
	
	private PlayGround pg;
	private Canvas canvas;
	private Controller controller;
	
	/**
	 * Constructor
	 * @param controller
	 * @param pg
	 */
	public DrawPane(Controller controller, PlayGround pg)
	{
		this.setPrefSize(WIDTH, HEIGHT);
		this.canvas = new Canvas(WIDTH, HEIGHT);
		gc = canvas.getGraphicsContext2D();
		this.controller = controller;
		this.pg = pg;
		
		this.setBackground((new Background(new BackgroundFill(Color.GREY, null, null))));
		
		this.setupGrid();
		this.draw();
	}
	
	/**
	 * Draw snake and other objects for the first time
	 */
	public void draw()
	{
		this.getChildren().clear();
		this.drawSnake();
		this.drawMice();
		this.drawObstacles();
		this.getChildren().add(canvas);
	}
	
	/**
	 * Update the grid
	 */
	public void update()
	{	
		canvas = new Canvas(WIDTH, HEIGHT);
		this.getChildren().add(canvas);
		gc = canvas.getGraphicsContext2D();
		this.setupGrid();
		this.drawSnake();
		this.drawMice();
		this.drawObstacles();
		this.getChildren().clear();
		this.getChildren().add(canvas);
	}
	
	/**
	 * Draws the snake onto the board
	 */
	private void drawSnake()
	{
		for(int i = controller.getSnake().getBody().size() - 1; i >= 0; i--) {
			
			if(i == 0) {
				gc.setFill(controller.getSnake().getHead().HEAD_COLOR);
			} else {
				gc.setFill(controller.getSnake().getBodyPart(i).BODY_COLOR);
			}
			
			gc.fillOval(controller.getSnake().getBodyPart(i).getX(), 
						controller.getSnake().getBodyPart(i).getY(), 
						controller.getSnake().getBodyPart(i).SIZE, 
						controller.getSnake().getBodyPart(i).SIZE
			);
		}
	}
	
	/**
	 * Draws a grid of rectangles
	 */
	private void setupGrid()
	{	
		for(int y = 0; y < ROWS; y++) {
			
			for(int x = 0; x < COLS; x++) {
				
				if(x % 2 == 0 && y % 2 == 0) {
					gc.setFill(Color.rgb(97, 98, 99));
				} else if(x % 2 == 0) {
					gc.setFill(Color.rgb(131, 133, 134));
				}
				else {
					gc.setFill(Color.rgb(64, 66, 68));
				}
				
				gc.fillRect((x * X_YPOS), (y * X_YPOS), RECT_SIZE, RECT_SIZE);
			}
		}
	}
	
	/**
	 * Draws obstacles onto the grid
	 */
	private void drawObstacles()
	{
		for(int i = 0; i < this.pg.getObstacles().size(); i++) {
			gc.drawImage(new Image(this.pg.getObstacles().get(i).returnSpotImage()), 
					this.pg.getObstacles().get(i).getX(), 
					this.pg.getObstacles().get(i).getY(), RECT_SIZE, RECT_SIZE);
		}
	}
	
	/**
	 * Draws mice onto the grid
	 */
	private void drawMice()
	{
		for(int i = 0; i < this.pg.getMice().size(); i++) {
			gc.drawImage(new Image(this.pg.getMice().get(i).returnSpotImage()), 
					this.pg.getMice().get(i).getX(), 
					this.pg.getMice().get(i).getY(), RECT_SIZE, RECT_SIZE);
		}
	}
	
}
