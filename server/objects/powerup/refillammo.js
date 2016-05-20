import {MAX_AMMO, CHARACTER_SIZE} from '../../../constants';
import FlyingObject from '../flying-object';

class RefillAmmo extends FlyingObject
{
    constructor(stage, options) {
        super(stage, options);
        this.velocity = 0;
        this.size = (CHARACTER_SIZE * 0.8);
        this.color = 'rgba(255,255,255,0.6)';
        this.shadow = true;
        this.unicode = '\uf135';
    }

    hit (object) {
        this.game.removeObject(this);
        if (object.player) {
            object.player.ammo = MAX_AMMO;
        }
    }
}

export default RefillAmmo;