'use strict';

const Sprite = require('./utils/Sprite');

const shield = new Sprite('sprites/weapons/shield_frames.png', 280, 280, 135);
const rocket = new Sprite('sprites/rocket1up_spr_strip5.png', 80, 71, 90);
const bullet = new Sprite('sprites/playerbullet1_spr_strip6.png', 39, 70, 180);
const planet1 = new Sprite('sprites/planets/background_02_parallax_03.png', 836, 836, 0);
const planet2 = new Sprite('sprites/planets/background_01_parallax_03.png', 574, 574, 0);
const planet3 = new Sprite('sprites/planets/background_01_parallax_04.png', 806, 806, 0);
const asteroid = new Sprite('sprites/asteroids/asteroid_07_with_cracks.png', 250, 300, 0);
const explosion = new Sprite('sprites/explosions/explosion.png', 140, 140, 0);
const powerUpShield = new Sprite('sprites/power-ups/powerup_04.png', 100, 100, 0);
const powerUpAmmo = new Sprite('sprites/power-ups/powerup_06.png', 100, 100, 0);
const powerUpPermanentFire = new Sprite('sprites/power-ups/powerup_08.png', 100, 100, 0);

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
