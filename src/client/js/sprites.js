'use strict';

const Sprite = require('./utils/Sprite');

const shield = new Sprite('sprites/shield.png', 280, 280, 135);
const rocket = new Sprite('sprites/rocket.png', 80, 71, 90);
const bullet = new Sprite('sprites/bullet.png', 39, 70, 180);
const planet1 = new Sprite('sprites/planet1.png', 836, 836, 0);
const planet2 = new Sprite('sprites/planet2.png', 574, 574, 0);
const planet3 = new Sprite('sprites/planet3.png', 806, 806, 0);
const asteroid = new Sprite('sprites/asteroid.png', 250, 300, 0);
const explosion = new Sprite('sprites/explosion.png', 140, 140, 0);
const powerUpShield = new Sprite('sprites/powerUpShield.png', 100, 100, 0);
const powerUpAmmo = new Sprite('sprites/powerUpAmmo.png', 100, 100, 0);
const powerUpPermanentFire = new Sprite('sprites/powerUpPermanentFire.png', 100, 100, 0);

const library = {
  shield,
  rocket,
  bullet,
  planet1,
  planet2,
  planet3,
  asteroid,
  explosion,
  powerUpShield,
  powerUpAmmo,
  powerUpPermanentFire
};

module.exports = {
  library,
  get: key => {
    if (library[key]) {
      return library[key];
    }
  }
};
