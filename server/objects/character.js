import {CHARACTER_SIZE, MAX_SHIELD, MIN_VELOCITY, FIRE_RATE, MAX_VELOCITY, ACCELERATION} from '../../constants';
import FlyingObject from './flying-object';
import Skin from '../skin/skin';
import Canon from '../weapons/canon';

class Character extends FlyingObject
{
    constructor(stage, options) {
        super(stage, options);
        this.alive = true;
        this.size = CHARACTER_SIZE;
        this.velocity = MIN_VELOCITY;
        this.player = options.player;
        this.label = options.player.name;
        this.weapons = [new Canon(stage, this.player, this)];
        this.activeWeapon = 0;
        this.shield = MAX_SHIELD;
        this.skin = new Skin('rocket-1', 0, 0, 0);
    }

    fire () {
        setTimeout(() => {
            this.isFiring = false;
        }, FIRE_RATE);

        if (!this.isFiring) {
            this.isFiring = true;
            this.weapons[this.activeWeapon].fire();
        }
    }

    rotateRight () {
        this.rotation += 2;
    }

    rotateLeft () {
        this.rotation -= 2;
    }

    speedUp () {
        if (this.velocity < (MAX_VELOCITY - ACCELERATION)) {
            this.velocity += ACCELERATION;
        } else {
            this.velocity = MAX_VELOCITY;
        }
    }
    speedDown () {
        if (this.velocity > (MIN_VELOCITY + ACCELERATION)) {
            this.velocity -= ACCELERATION;
        } else {
            this.velocity = 0;
        }
    }

    hit (object) {
        if (this.shield <= 0 && object.player && this.alive) {
            this.destroy();
            if (object.player) {
                object.player.score += 3;
            }
        }
    }

    respawn () {
        this.visible = true;
        this.shield = MAX_SHIELD;
        this.position.x = Math.round(Math.random() * this.stage.width) + 1;
        this.position.y = Math.round(Math.random() * this.stage.height) + 1;
        this.rotation = Math.round(Math.random() * 360) + 1;
        this.velocity = MIN_VELOCITY;
        this.skin = new Skin('rocket-1', 0, 0, 0);
    }

    destroy () {
        this.player.score -= 2;
        this.velocity = 0;
        this.alive = false;
        this.skin = new Skin('explosion', 0, 40, 2);
        setTimeout(this.respawn.bind(this), 2000);

//        this.explosion.currentFrame = 0;

        /*
        var snd = new Audio("sounds/explode.wav"); // buffers automatically when created
        snd.play();
        */
    }
}

export default Character;
