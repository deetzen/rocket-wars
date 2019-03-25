import PowerUp from './PowerUp';
import Skin from '../../skin/Skin';

class PermanentFire extends PowerUp {
  constructor (stage, options) {
    super(stage, options);
    this.skin = new Skin('powerup-permanentfire', 1, 2, 15);
    this.interval = null;
  }

  startFire (object) {
    this.interval = setInterval(() => {
      if (object.player) {
        object.fire();
        object.player.ammo += 1;
      }
    }, 180);
  }

  hit (object) {
    if (this.visible === true) {
      if (object.player && object.player.character) {
        this.startFire(object.player.character);
      }
    }
    super.hit();
    this.game.sound.play('powerup-permanentfire', true);
  }

  remove () {
    clearInterval(this.interval);
    super.remove();
  }
}

export default PermanentFire;