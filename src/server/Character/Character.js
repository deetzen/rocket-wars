'use strict';

const Canon = require('../Weapon/Canon');
const FlyingObject = require('../Object/FlyingObject');
const Shield = require('./Shield');
const Skin = require('../Skin/Skin');

const {
  ACCELERATION,
  CHARACTER_SIZE,
  FIRE_RATE,
  MAX_AMMO,
  MAX_VELOCITY,
  MIN_VELOCITY
} = require('../../constants');

class Character extends FlyingObject {
  constructor (stage, options) {
    super(stage, options);
    this.alive = true;
    this.mass = 20;
    this.direction = this.rotation;
    this.zIndex = 10;
    this.size = CHARACTER_SIZE;
    this.velocity = MIN_VELOCITY;
    this.player = options.player;
    this.label = options.player.name;
    this.weapons = [ new Canon(stage, this.player, this) ];
    this.activeWeapon = 0;
    this.skin = new Skin('rocket', 0, 0, 0);
    this.shieldObject = null;
    this.createShield();
  }

  removeShield () {
    this.game.removeObject(this.shieldObject);
    this.shieldObject = null;
  }

  createShield () {
    this.shieldObject = new Shield(this.stage, {
      x: this.x,
      y: this.y,
      size: this.size * 1.4,
      player: this.player,
      character: this,
      game: this.game
    });

    this.game.addObject(this.shieldObject);
  }

  update () {
    super.update();

    if (this.shieldObject) {
      this.shieldObject.position.x = this.position.x;
      this.shieldObject.position.y = this.position.y;
      this.shieldObject.rotation = this.rotation;
      this.shieldObject.visible = this.alive;
      this.shieldObject.update();
    }

    return this;
  }

  fire () {
    setTimeout(() => {
      this.isFiring = false;
    }, FIRE_RATE);

    if (!this.isFiring) {
      this.isFiring = true;
      this.weapons[this.activeWeapon].fire();
    }

    return this;
  }

  rotateRight (percent = 100) {
    this.rotation += (percent / 100) * 3.5;
    this.direction = this.rotation;

    return this;
  }

  rotateLeft (percent = 100) {
    this.rotation -= (percent / 100) * 3.5;
    this.direction = this.rotation;

    return this;
  }

  speedUp (percent = 100) {
    if (this.velocity < (MAX_VELOCITY - ACCELERATION)) {
      this.velocity += (percent / 100) * ACCELERATION;
    } else {
      this.velocity = MAX_VELOCITY;
    }

    return this;
  }

  speedDown (percent = 100) {
    if (this.velocity > (MIN_VELOCITY + ACCELERATION)) {
      this.velocity -= (percent / 100) * ACCELERATION;
    } else {
      this.velocity = MIN_VELOCITY;
    }

    return this;
  }

  hit (object) {
    if (this.damage >= 1 && object.player && this.alive) {
      this.destroy();
      if (object.player) {
        object.player.score += 3;
      }
    }

    return this;
  }

  respawn () {
    this.alive = true;
    this.damage = 0;
    this.label = this.player.name;
    this.player.ammo = MAX_AMMO;
    this.position.x = Math.round(Math.random() * this.stage.width) + 1;
    this.position.y = Math.round(Math.random() * this.stage.height) + 1;
    this.direction = Math.round(Math.random() * 360) + 1;
    this.velocity = MIN_VELOCITY;
    this.skin = new Skin('rocket-1', 0, 0, 0);
    this.zIndex = 10;
    this.size = CHARACTER_SIZE;

    this.shieldObject.visible = true;
    this.shieldObject.alive = true;
    this.shieldObject.damage = 0;

    return this;
  }

  destroy () {
    this.alive = false;
    this.zIndex = 9;
    this.label = '';
    this.size = this.size * 1.6;
    this.player.score = 0;
    this.velocity = this.velocity / 10;
    this.skin = new Skin('explosion', 0, 9, 6);

    setTimeout(this.respawn.bind(this), 2000);

    this.game.sound.play('explode');

    return this;
  }
}

module.exports = Character;
