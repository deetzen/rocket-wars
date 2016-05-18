import {MAX_VELOCITY, MIN_VELOCITY, FIRE_RATE, MAX_SHIELD} from '../constants';
import SpriteSheet from '../sprite-sheet';
import Animation from '../animation';
import Utils from '../utils';
import FlyingObject from './flying-object';
import Ammo from './ammo';

class Character extends FlyingObject
{
    constructor(stage, options) {
        super(stage, options);
        this.alive = true;
        this.isFiring = false;
        this.label = true;
        this.shadow = true;

        this.explosionSheet = new SpriteSheet('images/explosion_3_40_128.png', 128, 128);
        this.explosion = new Animation(this.explosionSheet, 3, 0, 40, false, this.context);
    }

    draw () {
        if (!this.visible) {
            this.velocity = 0;
            this.explosion.update();
            this.explosion.draw(this.x - this.size, this.y - this.size);
        } else {
            this.drawShield();
            super.draw();
        }
    }

    drawShield () {
        this.context.save();
        this.context.beginPath();
        let opacity = (this.player.shield - 1) / MAX_SHIELD;

        let color = '90,255,90';
        if (opacity < 0.4) {
            color = '255,90,90';
        } else if (opacity < 0.7) {
            color = '255,255,90';
        }

        this.context.fillStyle = 'rgba(' + color + ',' + (opacity/5) + ')';
        this.context.strokeStyle = 'rgba(' + color + ',' + opacity + ')';

        this.context.lineWidth = '2';
        this.context.arc(this.x, this.y, (this.size * 0.65), 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();
        this.context.restore();
    }

    fire () {
        if (!this.player.ammo) { return; }

        this.player.ammo--;

        this.isFiring = true;
        setTimeout(function() {
            this.isFiring = false;
        }.bind(this), FIRE_RATE);

        let ammoPos = Utils.calcVector(this.x, this.y, this.rotation, this.radius * 1.5);

        let ammo = new Ammo(this.stage, {
            x: ammoPos.x,
            y: ammoPos.y,
            size: 10,
            player: this.player,
            color: this.color,
            velocity: this.velocity * 4,
            rotation: this.rotation
        });

        this.game.addObject(ammo);

        var snd = new Audio("sounds/shoot.wav"); // buffers automatically when created
        snd.play();
    }

    hit (object) {
        if (object.constructor.name === 'Character') {
            this.rotation -= 90;
        }
        if (this.player.shield <= 0) {
            if (object.player) {
                object.player.score += 3;
            }
            this.destroy();
        }
    }

    respawn () {
        this.visible = true;
        this.player.shield = MAX_SHIELD;
        this.x = Math.round(Math.random() * this.canvas.width) + 1;
        this.y = Math.round(Math.random() * this.canvas.height) + 1;
        this.rotation = Math.round(Math.random() * 360) + 1;
        this.velocity = Math.round(Math.random() * (MAX_VELOCITY - MIN_VELOCITY)) + MIN_VELOCITY;
    }

    destroy () {
        this.player.score -= 2;
        this.visible = false;
        setTimeout(this.respawn.bind(this), 2000);

        this.explosion.currentFrame = 0;

        var snd = new Audio("sounds/explode.wav"); // buffers automatically when created
        snd.play();
    }
}

export default Character;
