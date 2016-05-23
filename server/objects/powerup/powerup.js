import {STAGE_WIDTH, STAGE_HEIGHT, CHARACTER_SIZE} from '../../../constants';
import FlyingObject from '../flying-object';

class PowerUp extends FlyingObject
{
    constructor(stage, options) {
        super(stage, options);
        this.velocity = 0;
        this.size = (CHARACTER_SIZE * 0.8);
        this.collected = false;
        this.zIndex = 3;
        this.timeOut = 20000;
        this.timeStart = new Date();

        this.position.x = Math.round(Math.random() * (STAGE_WIDTH - this.size)) + this.size;
        this.position.y = Math.round(Math.random() * (STAGE_HEIGHT - this.size)) + this.size;
        this.direction = Math.round(Math.random() * 360);

        setTimeout(() => { this.remove(); }, this.timeOut);
    }

    update () {
        super.update();

        var duration = (new Date() - this.timeStart);
        var percent = duration / this.timeOut;

        this.skin.frameSpeed = Math.round(((1 - percent) * 7) + 10);
    }

    hit (object) {
        if (this.visible == true) {
            this.visible = false;
            setTimeout(() => { this.remove() }, 5000);
        }
    }

    remove () {
        clearInterval(this.interval);
        this.visible = true;

        if (this.game) {
            this.game.removeObject(this);
        }
    }
}

export default PowerUp;
