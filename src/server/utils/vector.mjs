export default class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  dot (v) {
    return (this.x * v.x) + (this.y * v.y);
  }

  length () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  normalize () {
    const s = 1 / this.length();

    this.x *= s;
    this.y *= s;

    return this;
  }

  multiply (s) {
    return new Vector(this.x * s, this.y * s);
  }

  tx (v) {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  static calcMovement (xCoord, yCoord, angle, radius) {
    radius = typeof radius !== 'undefined' ? radius : 1;
    angle = (angle * Math.PI) / 180;

    return {
      x: (radius * Math.cos(angle)) + xCoord,
      y: (radius * Math.sin(angle)) + yCoord
    };
  }
}
