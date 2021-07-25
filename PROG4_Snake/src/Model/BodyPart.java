package Model;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.scene.paint.Color;

public class BodyPart {

	public final Color BODY_COLOR = Color.ORANGE;
	public final Color HEAD_COLOR = Color.RED;
	public final int SIZE = 50;
	
	private SimpleIntegerProperty x;
	private SimpleIntegerProperty y;
	
	public BodyPart(int x, int y)
	{
		this.x = new SimpleIntegerProperty(this, "x");
		this.y = new SimpleIntegerProperty(this, "y");
		
		this.setX(x);
		this.setY(y);
	}
	
	/**
	 * Returns x position
	 * @return
	 */
	public int getX() {
		return x.get();
	}

	/**
	 * Set x position
	 * @param x
	 */
	public void setX(int x) {
		this.x.set(x);
	}
	
	/**
	 * Return y position
	 * @return
	 */
	public int getY() {
		return y.get();
	}

	/**
	 * Set y position
	 * @param y
	 */
	public void setY(int y) {
		this.y.set(y);
	}
	
	/**
	 * Returns x property
	 * @return IntegerProperty
	 */
	public IntegerProperty bodyXProperty() {
		return this.x;
	}
	
	/**
	 * Returns y property
	 * @return IntegerProperty
	 */
	public IntegerProperty bodyYProperty() {
		return this.y;
	}
	
	
	
}
