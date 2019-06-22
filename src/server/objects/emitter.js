import Asteroid from './luminary/asteroid';
import Planet from './luminary/planet';
import RefillAmmo from './powerup/refillammo';
import RefillShield from './powerup/refillshield';
import PermanentFire from './powerup/permanentfire';

export default class Emitter {
  constructor(game) {
    this.game = game;
    this.objects = {
      RefillAmmo: {
        class: RefillAmmo,
        weight: 0.5,
      },
      PermanentFire: {
        class: PermanentFire,
        weight: 0.4,
      },
      RefillShield: {
        class: RefillShield,
        weight: 0.3,
      },
      Asteroid: {
        class: Asteroid,
        weight: 0.2,
      },
      Planet: {
        class: Planet,
        weight: 0.3,
      },
    };
  }

  static getTimeout() {
    return ((Math.floor(Math.random() * 3) + 1) * 1000);
  }

  start() {
    setTimeout(this.add.bind(this), Emitter.getTimeout());
  }

  static rand(min, max) {
    return (Math.random() * (max - min)) + min;
  }


  getRandomItem() {
    const totalWeight = Object
      .keys(this.objects)
      .reduce((previous, key) => previous + this.objects[key].weight, 0);

    const randomNum = Emitter.rand(0, totalWeight);
    let weightSum = 0;

    for (const index in this.objects) {
      weightSum += this.objects[index].weight;
      weightSum = +weightSum.toFixed(2);

      if (randomNum <= weightSum) {
        return { name: index, class: this.objects[index].class };
      }
    }

    return this;
  }

  add() {
    this.start();

    const object = this.getRandomItem();

    let exists = false;
    this.game.objects.forEach((gameObject) => {
      if (gameObject.constructor.name === object.name) {
        exists = true;
      }
    });

    if (!exists) {
      const objectInstance = new object.class(this.game.stage, {});
      this.game.addObject(objectInstance);
    }
  }
}
