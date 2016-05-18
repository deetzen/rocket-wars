import {MAX_VELOCITY, MIN_VELOCITY, MAX_AMMO, FIRE_RATE, MAX_SHIELD} from '../constants';
import SpriteSheet from '../sprite-sheet';
import Animation from '../animation';
import Utils from '../utils';
import FlyingObject from './flying-object';
import Ammo from './ammo';

class Character extends FlyingObject
{
    constructor(options) {
        super(options);
        this.alive = true;
        this.isFiring = false;
        this.label = true;
        this.shadow = true;
    }

    draw () {
        if (!this.alive) {
            this.velocity = 0;
            this.explosion.update();
            this.explosion.draw(this.x - this.size, this.y - this.size, this.game.context);
        } else {
            super.draw();
        }
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
            size: 10,
            player: this.player,
            color: this.color,
            velocity: this.velocity * 1.4,
            rotation: this.rotation
        });

        this.game.addObject(ammo);

        var snd = new Audio("sounds/shoot.wav"); // buffers automatically when created
        snd.play();
    }

    hit (object) {
        if (object.constructor.name === 'Ammo') {
            this.player.shield--;

            if (this.player.shield <= 0) {
                this.destroy();
            }
        }

        if (object.constructor.name === 'PowerUpAmmo') {
            this.player.ammo = MAX_AMMO;
        }
    }

    respawn () {
        this.alive = true;
        this.shield = MAX_SHIELD;
        this.x = Math.round(Math.random() * window.innerWidth) + 1;
        this.y = Math.round(Math.random() * window.innerHeight) + 1;
        this.rotation = Math.round(Math.random() * 360) + 1;
        this.velocity = Math.round(Math.random() * (MAX_VELOCITY - MIN_VELOCITY)) + MIN_VELOCITY;
    }

    destroy () {
        this.alive = false;
        setTimeout(this.respawn.bind(this), 2000);

        this.explosionSheet = new SpriteSheet('images/explosion_3_40_128.png', 128, 128);
        this.explosion = new Animation(this.explosionSheet, 3, 0, 40, false);

        var snd = new Audio("sounds/explode.wav"); // buffers automatically when created
        snd.play();
    }

    checkValid () {
        return this.alive;
    }
}

export default Character;
