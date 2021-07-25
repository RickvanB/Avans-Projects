package Model;

public class Spot {

	private Marker marker;
	private int x;
	private int y;
	
	/**
	 * Constructor
	 * @param x
	 * @param y
	 * @param marker
	 */
	public Spot(int x, int y, Marker marker) 
	{
		this.x = x;
		this.y = y;
		this.marker = marker;
	}
	
	/**
	 * Get x position of the spot
	 * @return int
	 */
	public int getX()
	{
		return this.x;
	}
	
	/**
	 * Returns y position of the spot
	 * @return int
	 */
	public int getY()
	{
		return this.y;
	}
	
	/**
	 * Get marker of the spot
	 * @return Marker
	 */
	public Marker getMarker()
	{
		return this.marker;
	}
	
	/**
	 * Returns image location
	 * @return String
	 */
	public String returnSpotImage()
	{
		String image = null;
		if(this.marker.equals(Marker.BEAR)) {
			image = "/images/bear.png";
		} else if(this.marker.equals(Marker.FIRE)) {
			image = "/images/fire.png";
		} else if(this.marker.equals(Marker.MOUSE)) {
			image = "/images/mouse.png";
		}
		
		return image;
	}
	
}
