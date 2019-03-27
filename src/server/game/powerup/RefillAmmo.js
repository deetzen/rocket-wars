'use strict';

const { MAX_AMMO } = require('../../../constants');
const PowerUp = require('./PowerUp');
const Skin = require('../../skin/Skin');

class RefillAmmo extends PowerUp {
  constructor (stage, options) {
    super(stage, options);
    this.skin = new Skin('powerUpAmmo', 1, 2, 15);
  }

  hit (object) {
    super.hit();
    if (object.player) {
      object.player.ammo = MAX_AMMO;
    }
    this.game.sound.play('powerUpRefillAmmo', true);

    return this;
  }
}

module.exports = RefillAmmo;
