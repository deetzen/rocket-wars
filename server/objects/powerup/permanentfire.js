import {CHARACTER_SIZE} from '../../../constants';
import FlyingObject from '../flying-object';

class PermanentFire extends FlyingObject
{
    constructor(stage, options) {
        super(stage, options);
        this.velocity = 0;
        this.size = (CHARACTER_SIZE * 0.8);
        this.color = 'rgba(255,255,255,0.6)';
        this.shadow = true;
        this.unicode = '\uf06d';
        this.collected = false;
        this.interval = null;
    }

    startFire (object) {
        this.interval = setInterval(() => { object.fire(); object.player.ammo++; }, 100);
    }

    hit (object) {
        if (this.visible == true) {
            this.visible = false;
            setTimeout(() => { this.remove() }, 5000);

            if (object.player && object.player.character) {
                this.startFire(object.player.character);
            }
        }
    }
    remove () {
        clearInterval(this.interval);
        this.visible = true;
        this.game.removeObject(this);
    }
}

export default PermanentFire;
