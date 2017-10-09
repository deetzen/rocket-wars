import { MAX_AMMO } from '../../../constants';
import PowerUp from './powerup';
import Skin from '../../skin/skin';

class RefillAmmo extends PowerUp {
  constructor(stage, options) {
    super(stage, options);
    this.skin = new Skin('powerup-ammo', 1, 2, 15);
  }

  hit(object) {
    super.hit();
    if (object.player) {
      object.player.ammo = MAX_AMMO;
    }
    this.game.sound.play('powerup-refillammo', true);
  }
}

export default RefillAmmo;