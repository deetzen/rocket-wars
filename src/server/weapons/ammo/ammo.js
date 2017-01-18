import FlyingObject from '../../objects/flying-object';
import Skin from '../../skin/skin';

class Ammo extends FlyingObject {
  constructor(stage, options) {
    super(stage, options);
    this.type = options.type;
    this.shadow = false;
    this.type = options.type || 1;
    this.size = 45;
    this.mass = 1;
    this.zIndex = 10;
    this.skin = new Skin('bullet-1', 0, 5, 2);
  }

  draw() {
    this.checkValid();
    this.skin.update();
  }

  hit(object) {
    if (object.alive) {
      this.game.removeObject(this);
      this.player.score++;
      object.damage++;
    }

    this.game.sound.play('hit');
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
