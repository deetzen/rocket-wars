import Character from './character/Character';
import Color from '../utils/color';
import Keyboard from './Keyboard';
import { MAX_AMMO } from '../../constants';

class Player {
  constructor (stage, options) {
    this.id = options.id;
    this.stage = stage;
    this.name = options.name;
    this.color = options.color || new Color().get(true, 0.6, 0.7);
    this.keyboard = options.keyboard || new Keyboard();
    this.game = options.game;
    this.score = 0;
    this.ammo = MAX_AMMO;

    this.character = new Character(this.stage, {
      player: this,
      game: this.game,
      x: Math.round(Math.random() * this.stage.width) + 1,
      y: Math.round(Math.random() * this.stage.height) + 1,
      rotation: Math.round(Math.random() * 360) + 1,
      color: this.color,
      unicode: '\uF0FB'
    });

    setInterval(this.raiseAmmo.bind(this), 75);
  }

  raiseAmmo () {
    if (this.ammo < MAX_AMMO) {
      if (!this.character.isFiring) {
        this.ammo += 0.3;
      }
    } else {
      this.ammo = MAX_AMMO;
    }
  }
}

export default Player;
