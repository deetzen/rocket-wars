'use strict';

const FlyingObject = require('../object/FlyingObject');
const { SHIELD_MAX_DAMAGE } = require('../../../constants');
const Skin = require('../../skin/Skin');

class Shield extends FlyingObject {
  constructor (stage, options) {
    super(stage, options);
    this.velocity = 0;
    this.zIndex = 11;
    this.character = options.character;
    this.skin = new Skin('shield', 0, 5, 6);
    this.skin.alpha = 1;
  }

  update () {
    super.update();

    const alpha = 1 - (this.damage / SHIELD_MAX_DAMAGE);

    this.skin.alpha = alpha > 0 ? alpha : 0;
    this.skin.update();

    return this;
  }

  hit () {
    if (this.visible && this.damage >= SHIELD_MAX_DAMAGE) {
      this.alive = false;
      this.visible = false;
    }

    return this;
  }
}

module.exports = Shield;
