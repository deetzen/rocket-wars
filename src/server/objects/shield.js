import { SHIELD_MAX_DAMAGE } from '../../constants';

import FlyingObject from './flying-object';
import Skin from '../skin/skin';

class Shield extends FlyingObject {
  constructor(stage, options) {
    super(stage, options);
    this.velocity = 0;
    this.zIndex = 11;
    this.character = options.character;
    this.skin = new Skin('shield', 0, 5, 6);
    this.skin.alpha = 1;
  }

  update() {
    super.update();
    const alpha = 1 - (this.damage / SHIELD_MAX_DAMAGE);
    this.skin.alpha = alpha > 0 ? alpha : 0;
    this.skin.update();
  }

  hit() {
    if (this.visible && this.damage >= SHIELD_MAX_DAMAGE) {
      this.alive = false;
      this.visible = false;
    }
  }
}

export default Shield;
