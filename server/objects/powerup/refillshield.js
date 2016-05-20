import {CHARACTER_SIZE, MAX_SHIELD} from '../../../constants';
import FlyingObject from '../flying-object';
import Skin from '../../skin/skin';

class RefillShield extends FlyingObject
{
    constructor(stage, options) {
        super(stage, options);
        this.velocity = 0;
        this.size = (CHARACTER_SIZE * 0.8);
        this.color = 'rgba(255,255,255,0.6)';
        this.skin = new Skin('powerup-shield', 1, 2, 15);

        setTimeout(() => { this.remove(); }, 20000);
    }

    hit (object) {
        this.game.removeObject(this);
        if (object.shield) {
            object.shield = MAX_SHIELD;
        }
    }

    remove () {
        if (this.game) {
            this.game.removeObject(this);
        }
    }

}

export default RefillShield;