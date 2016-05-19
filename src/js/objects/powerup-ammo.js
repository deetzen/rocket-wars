import {CHARACTER_SIZE} from '../../../constants';
import FlyingObject from './flying-object';

class PowerUpAmmo extends FlyingObject
{
    constructor(options) {
        super(options);
        this.velocity = 0;
        this.alive = true;
        this.size = CHARACTER_SIZE;
        this.radius = this.size / 2;
        this.color = 'rgba(255,255,255,0.6)';
        this.shadow = true;
        this.unicode = '\uf135';
    }

    hit (object) {
        console.log('HERE');
        this.game.removeObject(this);
    }

    checkValid () {
    }
}

export default PowerUpAmmo;
