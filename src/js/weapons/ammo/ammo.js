import FlyingObject from '../../objects/flying-object';
import SpriteSheet from '../../animation/sprite-sheet';
import Animation from '../../animation/animation';

class Ammo extends FlyingObject {
  constructor(stage, options) {
    super(stage, options);
    this.type = options.type;
    this.shadow = false;
    this.type = options.type || 1;
    this.size = 10;
    this.mass = 1;
    this.unicode = '\uf111';
    this.skinSheet = new SpriteSheet(`images/playerbullet${this.type}_spr_strip6.png`, 70, 39, this.context);
    this.skin = new Animation(this.skinSheet, 1, 0, 5, this.context);
  }

  draw() {
    this.checkValid();
    this.skin.update();
    this.skin.draw(this.position.x, this.position.y, this.rotation + 90, 1);
  }

  hit(object) {
    this.game.objects.splice(this.game.objects.indexOf(this), 1);

    if (object.constructor.name === 'Character') {
      this.player.score++;
      object.player.shield--;
    }

    var snd = new Audio("sounds/hit.wav"); // buffers automatically when created
    snd.play();
  }

  checkValid() {
    let canvasWidth = this.game.canvas.width;
    let canvasHeight = this.game.canvas.height;

    if (this.position.x >= canvasWidth || this.position.x <= 0 || this.position.y >= canvasHeight || this.position.y <= 0) {
      this.game.removeObject(this);
    }

    return true;
  }
}

export default Ammo;
