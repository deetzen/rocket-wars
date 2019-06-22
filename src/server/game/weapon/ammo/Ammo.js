'use strict';

const { Object } = require('../../object/Object');
const Skin = require('../../../skin/Skin');

class Ammo extends Object {
  constructor (stage, options) {
    super(stage, options);
    this.type = options.type;
    this.shadow = false;
    this.type = options.type || 1;
    this.size = 45;
    this.mass = 1;
    this.zIndex = 10;
    this.skin = new Skin('bullet', 0, 5, 2);
  }

  draw () {
    this.checkValid();
    this.skin.update();

    return this;
  }

  hit (object) {
    if (object.alive) {
      this.game.removeObject(this);
      this.player.score += 1;
      object.damage += 1;
    }

    this.game.sound.play('hit');

    return this;
  }

  checkValid () {
    const stageWidth = this.stage.width;
    const stageHeight = this.stage.height;

    if (this.position.x >= stageWidth ||
      this.position.x <= 0 ||
      this.position.y >= stageHeight ||
      this.position.y <= 0) {
      this.game.removeObject(this);
    }

    return this;
  }
}

module.exports = Ammo;
