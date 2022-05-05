/* Class Point
 * Point in 3D area
 * default (0, 0, 0) */

class Point {
  constructor(x = 0, y = 0, z = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
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

  get z() {
    return this._z;
  }
  set z(value) {
    this._z = value;
  }
}

/* Class ObjectController
 * You can control point in 3D area
 * setSpeed(speed) (m/sec)
 * setAcceleration(acceleration) (m/sec**2)
 * setAngle(angle) (deg)
 * move(time) (sec) - move point from start point to new point after *time* seconds
 * getPoints() - return array of points */
class ObjectController {
  constructor(point = new Point()) {
    this._point = point;
    this._speed = 0;
    this._acceleration = 0;
    this._angle = 0;
    this._angleZ = 0;
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

  setAngleZ(angle) {
    if (angle) {
      this._angleZ = angle;
      return true;
    }
    return false;
  }
  getAngleZ() {
    return this._angleZ;
  }

  getPoints() {
    return this._pointArray;
  }

  move(time = 0) {
    if (time) {
      const s = this._speed * time + (this._acceleration * time ** 2) / 2; // s = v0 * t + (a * t**2) / 2
      const v = this._speed + this._acceleration * time; // v = v0 + a * t

      const sXY = s * Math.cos((this._angleZ * Math.PI) / 180); // s2D = s * cos(beta)
      const z = this._point.z + s * Math.sin((this._angleZ * Math.PI) / 180); // z = z0 + s * sin(beta)

      const x = this._point.x + sXY * Math.cos((this._angle * Math.PI) / 180); // x = x0 + s2D * cos(alfa)
      const y = this._point.y + sXY * Math.sin((this._angle * Math.PI) / 180); // y = y0 + s2D * sin(alfa)

      const newPoint = new Point(x, y, z);

      this._point = newPoint;
      this._pointArray.push(newPoint);
      this._speed = v;

      return true;
    }
    return false;
  }
}

const obj = new ObjectController();
