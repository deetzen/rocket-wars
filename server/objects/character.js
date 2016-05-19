import {CHARACTER_SIZE, MIN_VELOCITY, MAX_SHIELD, FIRE_RATE} from '../../constants';
import FlyingObject from './flying-object';
import Skin from '../skin/skin';
import Canon from '../weapons/canon';

class Character extends FlyingObject
{
    constructor(stage, options) {
        super(stage, options);
        this.alive = true;
        this.shadow = true;
        this.player = options.player || null;
        this.weapons = [new Canon(stage, this.player, this)];
        this.activeWeapon = 0;

        //this.explosionSheet = new SpriteSheet('images/explosion_3_40_128.png', 128, 128);
        //this.explosionSheet = new SpriteSheet(`images/explosion2_spr_strip16.png`, 203, 207, this.context);
        //this.explosion = new Animation(this.explosionSheet, 3, 0, 40, this.context);
        //this.explosionSheet = new SpriteSheet('images/explosion.png', 128, 128);
        //this.explosion = new Animation(this.explosionSheet, 3, 0, 39, this.context);

        this.type = Math.floor(Math.random() * 5 + 1); // TODO: used to get random sprite-sheet ( 1 - 5 ) remove later on
        this.skin = new Skin(`images/rocket${this.type}up_spr_strip5.png`, 0, 0, 4, 71, 80);
    }

    draw () {
//        let scale = (CHARACTER_SIZE / this.skinSheet.frameWidth);
/*        if (!this.visible) {
            this.velocity = 0;

            if (this.explosion.currentFrame < 20) {
                this.skin.update();
                this.skin.draw(this.position.x, this.position.y, this.rotation, scale);
            }

            this.explosion.update();
            this.explosion.draw(this.position.x, this.position.y);
        } else {*/

            this.drawShield();
            this.drawLabel();
            this.skin.update();

//            let scale = (CHARACTER_SIZE / this.skinSheet.frameWidth);
//            this.skin.draw(this.position.x, this.position.y, this.rotation, scale);
//        }
    }

    drawLabel () {
        this.context.font = '14px Arial';
        this.context.fillStyle = this.color;
        let textWidth = this.context.measureText(this.player.name).width;
        this.context.fillText(this.player.name, this.position.x + (textWidth/2), this.position.y + this.size/2 + 18);
    }

    drawShield () {
        this.context.save();
        this.context.beginPath();

        let shieldPercent = this.player.shield / MAX_SHIELD;
        let color = '90,255,90';
        if (shieldPercent < 0.2) {
            color = '255,90,90';
        } else if (shieldPercent < 0.7) {
            color = '255,255,90';
        }

        this.context.fillStyle = 'rgba(' + color + ',' + (shieldPercent/3) + ')';
        this.context.strokeStyle = 'rgba(' + color + ',' + shieldPercent + ')';

        this.context.lineWidth = '1.3';
        this.context.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();
        this.context.restore();
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

    hit (object) {
        if (this.player.shield <= 0 && object.player) {
            this.destroy();
            if (object.player) {
                object.player.score += 3;
            }
        }
    }

    respawn () {
        this.visible = true;
        this.player.shield = MAX_SHIELD;
        this.position.x = Math.round(Math.random() * this.canvas.width) + 1;
        this.position.y = Math.round(Math.random() * this.canvas.height) + 1;
        this.rotation = Math.round(Math.random() * 360) + 1;
        this.velocity = MIN_VELOCITY;
    }

    destroy () {
        this.player.score -= 2;
        this.visible = false;
        setTimeout(this.respawn.bind(this), 2000);

        this.explosion.currentFrame = 0;

        /*
        var snd = new Audio("sounds/explode.wav"); // buffers automatically when created
        snd.play();
        */
    }
}

export default Character;
