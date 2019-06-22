'use strict';

const PowerUp = require('./PowerUp');

const Skin = require('../Skin/Skin');

class RefillShield extends PowerUp {
  constructor (stage, options) {
    super(stage, options);
    this.skin = new Skin('powerUpShield', 1, 2, 15);
  }

  hit (object) {
    object.damage = 0;

    if (object.shieldObject) {
      object.shieldObject.damage = 0;
    }

    if (object.character) {
      object.character.damage = 0;
    }

    super.hit();

    this.game.sound.play('powerUpRefillShield', true);

    return this;
  }
}

module.exports = RefillShield;
