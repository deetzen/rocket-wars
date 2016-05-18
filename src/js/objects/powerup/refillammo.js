import {CHARACTER_SIZE} from '../../constants';
import FlyingObject from '../flying-object';

class RefillAmmo extends FlyingObject
{
    constructor(stage, options) {
        super(stage, options);
        this.velocity = 0;
        this.size = (CHARACTER_SIZE * 0.7);
        this.radius = this.size / 2;
        this.color = 'rgba(255,255,255,0.6)';
        this.shadow = true;
        this.unicode = '\uf135';
    }

    hit (object) {
        this.game.removeObject(this);
    }
}

export default RefillAmmo;
