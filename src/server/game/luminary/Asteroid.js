'use strict';

const Object = require('../object/Object');
const Skin = require('../../skin/Skin');

const {
  ROTATE_LEFT,
  ROTATE_RIGHT,
  STAGE_HEIGHT,
  STAGE_WIDTH
} = require('../../../constants');

class Asteroid extends Object {
  constructor (stage, options) {
    super(stage, options);
    this.velocity = 1;
    this.mass = 60;
    this.size = 150;
    this.skin = new Skin('asteroid');
    this.currentFrame = 0;
    this.maxDamage = 10;
    this.zIndex = 2;

    const randomPosition = this.getRandomStartPosition();

    this.position.x = randomPosition.x;
    this.position.y = randomPosition.y;
    this.direction = randomPosition.angle;
    this.rotation = Math.round(Math.random() * 360);

    const rotateDirections = [ ROTATE_LEFT, ROTATE_RIGHT ];

    this.rotateDirection = rotateDirections[Math.floor(Math.random() * rotateDirections.length)];

    setInterval(() => {
      this.rotate();
    }, 50);
  }

  getRandomStartPosition () {
    const diagonale = Math.sqrt((STAGE_WIDTH * STAGE_WIDTH) + (STAGE_HEIGHT * STAGE_HEIGHT));
    const radius = diagonale / 1.5;
    const angle = Math.round(Math.random() * 360);

    let x = Math.round((STAGE_WIDTH / 2) + (radius * Math.cos(angle * (Math.PI / 180))));
    let y = Math.round((STAGE_HEIGHT / 2) + (radius * Math.sin(angle * (Math.PI / 180))));

    x += Math.round(Math.random() * (STAGE_WIDTH - (this.size / 2))) - (STAGE_WIDTH / 2);
    y += Math.round(Math.random() * (STAGE_HEIGHT - (this.size / 2))) - (STAGE_HEIGHT / 2);

    return {
      x,
      y,
      angle: (180 + angle) % 360
    };
  }

  update () {
    const angle = (this.direction * Math.PI) / 180;

    this.position.x += (this.velocity * Math.cos(angle)) + this.vector.x;
    this.position.y += (this.velocity * Math.sin(angle)) + this.vector.y;

    if (this.skin) {
      this.skin.update();
    }

    return this;
  }

  checkValid () {
    const stageWidth = this.stage.width;
    const stageHeight = this.stage.height;

    if (this.wasInScreen && (this.position.x - (this.size / 2) > stageWidth || this.position.x + (this.size / 2) < 0 || this.position.y - (this.size / 2) > stageHeight || this.position.y + (this.size / 2) < 0)) {
      this.game.removeObject(this);
    } else if (this.position.x - (this.size / 2) < stageWidth && this.position.x + (this.size / 2) > 0 && this.position.y - (this.size / 2) < stageHeight && this.position.y + (this.size / 2) > 0) {
      this.wasInScreen = true;
    }

    return this;
  }

  rotate () {
    this.rotation += this.rotateDirection * 2.5;

    return this;
  }

  hit () {
    this.skin.currentFrame = Math.floor((3 * this.damage) / this.maxDamage);

    if (this.damage >= this.maxDamage) {
      this.damage = 0;
      this.skin.currentFrame = 0;
      this.game.removeObject(this);
    }

    return this;
  }
}

module.exports = Asteroid;
