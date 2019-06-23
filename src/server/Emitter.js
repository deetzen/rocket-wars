'use strict';

const Asteroid = require('./Luminary/Asteroid');
const PermanentFire = require('./PowerUp/PermanentFire');
const Planet = require('./Luminary/Planet');
const RefillAmmo = require('./PowerUp/RefillAmmo');
const RefillShield = require('./PowerUp/RefillShield');

class Emitter {
  constructor (game) {
    this.game = game;

    this.objects = {
      RefillAmmo: { class: RefillAmmo, weight: 0.5 },
      PermanentFire: { class: PermanentFire, weight: 0.4 },
      RefillShield: { class: RefillShield, weight: 0.3 },
      Asteroid: { class: Asteroid, weight: 0.2 },
      Planet: { class: Planet, weight: 0.3 }
    };
  }

  static getTimeout () {
    return (Math.floor(Math.random() * 3) + 1) * 1000;
  }

  start () {
    setTimeout(this.add.bind(this), Emitter.getTimeout());
  }

  static rand (min, max) {
    return (Math.random() * (max - min)) + min;
  }

  getRandomItem () {
    const totalWeight = Object.
      keys(this.objects).
      reduce((previous, key) => previous + this.objects[key].weight, 0);

    const randomNum = Emitter.rand(0, totalWeight);
    let weightSum = 0;

    for (const index in this.objects) {
      if (this.objects && this.objects[index]) {
        weightSum += Number(this.objects[index].weight.toFixed(2));

        if (randomNum <= weightSum) {
          return this.objects[index].class;
        }
      }
    }

    return this;
  }

  add () {
    this.start();

    const GameOject = this.getRandomItem();
    let exists = false;

    this.game.objects.forEach(gameObject => {
      if (gameObject.constructor.name === GameOject.name) {
        exists = true;
      }
    });

    if (!exists) {
      const objectInstance = new GameOject(this.game.stage, {});

      this.game.addObject(objectInstance);
    }
  }
}

module.exports = Emitter;
