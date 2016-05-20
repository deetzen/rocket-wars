import FlyingObject from '../../objects/flying-object';
import Skin from '../../skin/skin';

class Ammo extends FlyingObject {
  constructor(stage, options) {
    super(stage, options);
    this.type = options.type;
    this.shadow = false;
    this.type = options.type || 1;
    this.size = 10;
    this.mass = 1;
    this.skin = new Skin(`images/playerbullet1_spr_strip6.png`, 0, 5, 4, 70, 39);
  }

  draw() {
    this.checkValid();
    this.skin.update();
  }

  hit(object) {
    this.game.removeObject(this);

    if (object.constructor.name === 'Character') {
      this.player.score++;
      object.player.shield--;
    }

    /*
    var snd = new Audio("sounds/hit.wav"); // buffers automatically when created
    snd.play();
    */
  }

  checkValid() {
    let stageWidth = this.stage.width;
    let stageHeight = this.stage.height;

    if (this.position.x >= stageWidth || this.position.x <= 0 || this.position.y >= stageHeight || this.position.y <= 0) {
      this.game.removeObject(this);
    }

    return true;
  }
}

export default Ammo;
