'use strict';

class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  dot (vector) {
    return (this.x * vector.x) + (this.y * vector.y);
  }

  length () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  normalize () {
    const speed = 1 / this.length();

    this.x *= speed;
    this.y *= speed;

    return this;
  }

  multiply (speed) {
    return new Vector(this.x * speed, this.y * speed);
  }

  tx (vector) {
    this.x += vector.x;
    this.y += vector.y;

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

module.exports = Vector;
