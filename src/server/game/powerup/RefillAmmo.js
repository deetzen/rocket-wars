import { MAX_AMMO } from '../../../constants';
import PowerUp from './PowerUp';
import Skin from '../../skin/Skin';

export default class RefillAmmo extends PowerUp {
  constructor (stage, options) {
    super(stage, options);
    this.skin = new Skin('powerup-ammo', 1, 2, 15);
  }

  hit (object) {
    super.hit();
    if (object.player) {
      object.player.ammo = MAX_AMMO;
    }
    this.game.sound.play('powerup-refillammo', true);

    return this;
  }
}
