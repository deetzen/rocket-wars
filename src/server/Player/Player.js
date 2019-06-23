'use strict';

const uuid = require('uuidv4');

const Character = require('../Character/Character');
const Keyboard = require('../Keyboard/Keyboard');

const Color = require('../../utils/Color');
const { MAX_AMMO } = require('../../constants');

class Player {
  constructor (stage, { id, color, name, keyboard, game } = {}) {
    this.id = id || uuid();
    this.stage = stage;
    this.game = game;
    this.name = name;
    this.color = color || new Color().get(true, 0.6, 0.7);
    this.keyboard = keyboard || new Keyboard();
    this.score = 0;
    this.ammo = MAX_AMMO;

    this.character = new Character(this.stage, {
      player: this,
      game: this.game,
      x: Math.round(Math.random() * this.stage.width) + 1,
      y: Math.round(Math.random() * this.stage.height) + 1,
      rotation: Math.round(Math.random() * 360) + 1,
      color: this.color,
      unicode: '\uF0FB'
    });

    setInterval(this.raiseAmmo.bind(this), 300);
  }

  raiseAmmo () {
    if (this.ammo < MAX_AMMO) {
      if (!this.character.isFiring) {
        this.ammo += 2;
      }
    } else {
      this.ammo = MAX_AMMO;
    }
  }
}

module.exports = Player;
