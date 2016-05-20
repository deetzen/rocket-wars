import {MAX_SHIELD} from '../../../constants';

class FlyingObject {

    constructor () {
        this.context = null;
        this.type = '';
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.size = 45;
        this.skin = null;
        this.shield = 0;
    }

    draw () {
        if (!this.visible) {
            return;
        }

        this.context.save();

        this.context.fillStyle = this.color;
        this.context.textAlign = 'left';
        this.context.translate(this.x, this.y);

        this.context.rotate(this.rotation * Math.PI / 180);

        this.context.restore();

        if (this.shield) {
            this.drawShield();
        }

        if (this.label) {
            this.drawLabel();
        }

        if (this.skin) {
            this.skin.draw(this.context, this.x, this.y, this.rotation, this.size);
        }
    }

    drawShield () {
        this.context.save();
        this.context.beginPath();

        let shieldPercent = this.shield / MAX_SHIELD;
        let color = '90,255,90';
        if (shieldPercent < 0.2) {
            color = '255,90,90';
        } else if (shieldPercent < 0.7) {
            color = '255,255,90';
        }

        this.context.fillStyle = 'rgba(' + color + ',' + (shieldPercent/3) + ')';
        this.context.strokeStyle = 'rgba(' + color + ',' + shieldPercent + ')';

        this.context.lineWidth = '1.3';
        this.context.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();
        this.context.restore();
    }

    drawLabel () {
        this.context.font = '13px Arial';
        this.context.fillStyle = this.color;
        let textWidth = this.context.measureText(this.label).width;
        this.context.fillText(this.label, this.x + (textWidth/2), this.y + this.size/2 + 18);
    }
}

export default FlyingObject;

