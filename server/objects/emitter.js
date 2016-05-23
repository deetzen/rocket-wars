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
                weight: 0.5
            },
            PermanentFire: {
                class: PermanentFire,
                weight: 0.4
            },
            RefillShield: {
                class: RefillShield,
                weight: 0.3
            },
            Asteroid: {
                class: Asteroid,
                weight: 0.2
            },
            Planet: {
                class: Planet,
                weight: 0.3
            }
        };
    }

    static getTimeout() {
        return ((Math.floor(Math.random() * 6) + 1) * 1000);
    }

    start () {
        setTimeout(this.add.bind(this), Emitter.getTimeout());
    }

    static rand (min, max) {
        return Math.random() * (max - min) + min;
    };


    getRandomItem () {
        var total_weight = Object.keys(this.objects).reduce((previous, key) => {
            return previous + this.objects[key].weight;
        }, 0);

        var random_num = Emitter.rand(0, total_weight);
        var weight_sum = 0;

        for (let index in this.objects) {
            weight_sum += this.objects[index].weight;
            weight_sum = +weight_sum.toFixed(2);

            if (random_num <= weight_sum) {
                return { name: index, class: this.objects[index].class };
            }
        }
    }
    
    add () {
        this.start();

        let object = this.getRandomItem();

        let exists = false;
        this.game.objects.forEach((gameObject) => {
            if (gameObject.constructor.name === object.name) {
                exists = true;
                return;
            }
        });

        if (!exists) {
            let objectInstance = new object.class(this.game.stage, {});
            this.game.addObject(objectInstance);
        }
    }
}
