import {MAX_SHIELD, FIRE_REQUEST} from '../../../events';
import FlyingObject from './flying-object';

class Character extends FlyingObject
{
    constructor(options) {
        super(options);
    }

    draw () {
        super.draw();

//        this.drawShield();
//        this.drawLabel();
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
        this.game.socket.emit(FIRE_REQUEST, this.player.id);
    }
}

export default Character;
