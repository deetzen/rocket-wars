import {CHARACTER_SIZE} from '../../constants';
import FlyingObject from '../flying-object';

class PermanentFire extends FlyingObject
{
    constructor(stage, options) {
        super(stage, options);
        this.velocity = 0;
        this.size = (CHARACTER_SIZE * 0.7);
        this.radius = this.size / 2;
        this.color = 'rgba(255,255,255,0.6)';
        this.shadow = true;
        this.unicode = '\uf06d';
        this.collected = false;
        this.interval = null;
    }

    draw () {
        if (this.collected == false) {
            super.draw();
        }
    }

    startFire (character) {
        this.interval = setInterval(() => { character.fire(); character.player.ammo++; }, 75);
    }

    hit (object) {
        if (this.collected == false) {
            setTimeout(() => { this.remove() }, 5000);
            this.startFire(object);
            this.collected = true;
        }
    }

    remove () {
        clearInterval(this.interval);
        this.collected = false;
        this.game.removeObject(this);
    }
}

export default PermanentFire;
