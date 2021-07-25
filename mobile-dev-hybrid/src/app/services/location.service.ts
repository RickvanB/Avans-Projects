import { Injectable } from '@angular/core';
import { range } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  /**
   * This method will check if a point is within the given range
   */
  pointInRange(pointToCheckLat : number, pointToCheckLong : number, centerLat : number, centerLong : number, radius: number) : boolean {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerLat / 180.0) * ky;
    var dx = Math.abs(centerLong - pointToCheckLong) * kx;
    var dy = Math.abs(centerLat - pointToCheckLat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= radius;
  }

  /**
   * Generate a random location within a range
   * @param center 
   * @param radius 
   */
  generateRandomPoint(lat, long, radius) {
    var x0 = long;
    var y0 = lat;
    // Convert Radius from meters to degrees.
    var rd = radius/111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x/Math.cos(y0);

    // Resulting point.
    return {'lat': y+y0, 'lng': xp+x0};
  }
}
