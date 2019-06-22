'use strict';

const Asteroid = require('./Asteroid');
const Skin = require('../../skin/Skin');

class Planet extends Asteroid {
  constructor (stage, options) {
    super(stage, options);
    this.velocity = Math.round(Math.random() * 0.4) + 0.2;
    this.mass = 500;
    this.zIndex = 0;
    this.size = Math.round(Math.random() * 300) + 300;
    this.alive = false;

    const index = Math.round(Math.random() * 3) + 1;

    this.skin = new Skin(`planet${index}`);
  }

  rotate () {
    this.rotation += this.rotateDirection * 0.1;

    return this;
  }

  hit () {
    return this;
  }
}

module.exports = Planet;
