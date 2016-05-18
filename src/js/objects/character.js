import {MAX_AMMO, FIRE_RATE} from '../constants';
import Utils from '../utils';
import FlyingObject from './flying-object';
import Ammo from './ammo';

class Character extends FlyingObject
{
    constructor(options) {
        super(options);
        this.isFiring = false;
        this.label = true;
        this.shadow = true;
    }

    fire () {

        if (!this.player.ammo) { return; }

        this.player.ammo--;

        this.isFiring = true;
        setTimeout(function() {
            this.isFiring = false;
        }.bind(this), FIRE_RATE);

        let ammoPos = Utils.calcVector(this.x, this.y, this.rotation, this.radius * 1.5);

        let ammo = new Ammo({
            x: ammoPos.x,
            y: ammoPos.y,
            player: this.player,
            color: this.color,
            velocity: this.velocity * 1.4,
            rotation: this.rotation
        });

        this.game.addObject(ammo);

        var snd = new Audio("sounds/shoot.wav"); // buffers automatically when created
        snd.play();
    }

    hit(object) {
        if (object.constructor.name === 'Ammo') {
            this.player.shield--;

            if (this.player.shield === 0) {
                this.destroy();
            }
        }

        if (object.constructor.name === 'PowerUpAmmo') {
            this.player.ammo = MAX_AMMO;
        }
    }

    respawn () {
        this.alive = true;
        this.x = Math.round(Math.random() * window.innerWidth) + 1;
        this.y = Math.round(Math.random() * window.innerHeight) + 1;
        this.rotation = Math.round(Math.random() * 360) + 1;
    }

    destroy () {
        this.alive = false;
        setTimeout(this.respawn.bind(this), 2000);

        var snd = new Audio("sounds/explode.wav"); // buffers automatically when created
        snd.play();
    }

    checkValid () {
        return this.alive;
    }
}

export default Character;
