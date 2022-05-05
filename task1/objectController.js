/* Class Point
 * Point in 2D area
 * default (0, 0) */

class Point {
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
  }
}

/* Class ObjectController
 * You can control point in 2D area
 * setSpeed(speed) (m/sec)
 * setAcceleration(acceleration) (m/sec**2)
 * setAngle(angle) (deg)
 * move(time) (sec) - move point from start point to new point after *time* seconds
 * getPoints() - return array of points */
class ObjectController {
  constructor(point) {
    this._point = point;
    this._speed = 0;
    this._acceleration = 0;
    this._angle = 0;
    this._pointArray = [point];
  }

  setSpeed(speed) {
    if (speed) {
      this._speed = speed;
      return true;
    }
    return false;
  }
  getSpeed() {
    return this._speed;
  }

  setAcceleration(acceleration) {
    if (acceleration) {
      this._acceleration = acceleration;
      return true;
    }
    return false;
  }
  getAcceleration() {
    return this._acceleration;
  }

  setAngle(angle) {
    if (angle) {
      this._angle = angle;
      return true;
    }
    return false;
  }
  getAngle() {
    return this._angle;
  }

  getPoints() {
    return this._pointArray;
  }

  move(time = 0) {
    if (time) {
      const s = this._speed * time + (this._acceleration * time ** 2) / 2; // s = v0 * t + (a * t**2) / 2
      const v = this._speed + this._acceleration * time; // v = v0 + a * t

      const x = this._point.x + s * Math.cos((this._angle * Math.PI) / 180); // x = x0 + s * cos(alfa)
      const y = this._point.y + s * Math.sin((this._angle * Math.PI) / 180); // y = y0 + s * sin(alfa)

      const newPoint = new Point(x, y);

      this._point = newPoint;
      this._pointArray.push(newPoint);
      this._speed = v;

      return true;
    }
    return false;
  }
}

const obj = new ObjectController(new Point(0, 0));
