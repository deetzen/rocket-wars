import Asteroid from './asteroids/asteroid';
import RefillAmmo from './powerup/refillammo';
import RefillShield from './powerup/refillshield';
import PermanentFire from './powerup/permanentfire';

export default class Emitter {
    constructor(game) {
        this.game = game;
        this.objects = [
            new RefillAmmo(this.game.stage, {x: 0, y: 0}),
            new PermanentFire(this.game.stage, {x: 0, y: 0}),
            new RefillShield(this.game.stage, {x: 0, y: 0}),
            new Asteroid(this.game.stage, {x: 0, y: 0})
        ];
        this.weight = [0.5, 0.3, 0.4, 0.2];
    }

    static getTimeout() {
        return ((Math.floor(Math.random() * 10) + 2) * 1000);
    }

    start () {
        setTimeout(this.add.bind(this), Emitter.getTimeout());
    }

    static rand (min, max) {
        return Math.random() * (max - min) + min;
    };


    getRandomItem () {
        var total_weight = this.weight.reduce(function (prev, cur, i, arr) {
            return prev + cur;
        });

        var random_num = Emitter.rand(0, total_weight);
        var weight_sum = 0;

        for (var i = 0; i < this.objects.length; i++) {
            weight_sum += this.weight[i];
            weight_sum = +weight_sum.toFixed(2);

            if (random_num <= weight_sum) {
                return this.objects[i];
            }
        }
    }
    
    add () {
        this.start();

        let object = this.getRandomItem(this.objects, this.weight);

        let exists = false;
        this.game.objects.forEach((gameObject) => {
            if (gameObject.constructor.name === object.constructor.name) {
                exists = true;
                return;
            }
        });

        if (exists) {
            return;
        }

        object.id = '_' + Math.random().toString(36).substr(2, 9);
        object.position.x = Math.round(Math.random() * (this.game.stage.width - 70)) + 35;
        object.position.y = Math.round(Math.random() * (this.game.stage.height - 70)) + 35;

        this.game.addObject(object);

    }
}
