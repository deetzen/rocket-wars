import FlyingObject from './../flying-object';
import Skin from '../../skin/skin';

class Asteroid extends FlyingObject
{
  constructor(stage, options) {
    super(stage, options);
    this.velocity = 1;
    this.mass = 50;
    this.size = 150;
    this.skin = new Skin('asteroid-7');
    this.shield = 3;
    this.currentFrame = 0;
  }

  drawShield () {}

  hit (object) {
    this.skin.currentFrame = 3 - this.shield;

    if (this.shield <= 0) {
      this.shield = 3;
      this.skin.currentFrame = 0;
      this.game.removeObject(this);
    }
  }
}

export default Asteroid;
