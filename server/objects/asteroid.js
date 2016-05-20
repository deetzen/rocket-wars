import FlyingObject from './flying-object';
import Skin from '../skin/skin';

class Asteroid extends FlyingObject
{
  constructor(stage, options) {
    super(stage, options);
    this.velocity = 1;
    this.mass = 50;
    this.size = 150;
    this.skin = new Skin('asteroid-7');
  }

  hit (object) {
    // console.log('asteroid-hit', this.skin);
  }
}

export default Asteroid;
