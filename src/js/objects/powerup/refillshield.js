import {CHARACTER_SIZE, MAX_SHIELD} from '../../constants';
import FlyingObject from '../flying-object';

class RefillShield extends FlyingObject
{
    constructor(stage, options) {
        super(stage, options);
        this.velocity = 0;
        this.size = (CHARACTER_SIZE * 0.4);
        this.color = 'rgba(255,255,255,0.6)';
        this.shadow = true;
        this.unicode = '\uf132';
    }

    hit (object) {
        this.game.removeObject(this);
        if (object.player) {
            object.player.shield = MAX_SHIELD;
        }
    }
}

export default RefillShield;
