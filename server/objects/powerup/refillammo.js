import {MAX_AMMO, CHARACTER_SIZE} from '../../../constants';
import FlyingObject from '../flying-object';
import Skin from '../../skin/skin';

class RefillAmmo extends FlyingObject
{
    constructor(stage, options) {
        super(stage, options);
        this.velocity = 0;
        this.size = (CHARACTER_SIZE * 0.8);
        this.color = 'rgba(255,255,255,0.6)';
        this.skin = new Skin('powerup-ammo', 1, 2, 15);

        setTimeout(() => { this.remove(); }, 15000);
    }

    hit (object) {
        this.game.removeObject(this);
        if (object.player) {
            object.player.ammo = MAX_AMMO;
        }
    }

    remove () {
        if (this.game) {
            this.game.removeObject(this);
        }
    }
}

export default RefillAmmo;