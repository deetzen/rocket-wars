import { CHARACTER_SIZE, STAGE_HEIGHT, STAGE_WIDTH } from '../../../constants';
import FlyingObject from '../flying-object';

class PowerUp extends FlyingObject {
  constructor(stage, options) {
    super(stage, options);
    this.velocity = 0;
    this.size = (CHARACTER_SIZE * 0.8);
    this.collected = false;
    this.zIndex = 3;
    this.timeOut = 20000;
    this.timeStart = new Date();

    this.position.x = Math.round(Math.random() * (STAGE_WIDTH - this.size)) + this.size;
    this.position.y = Math.round(Math.random() * (STAGE_HEIGHT - this.size)) + this.size;
    this.direction = Math.round(Math.random() * 360);

    setTimeout(() => {
      this.remove();
    }, this.timeOut);
  }

  update() {
    super.update();

    const duration = (new Date() - this.timeStart);
    const percent = duration / this.timeOut;

    this.skin.frameSpeed = Math.round(((1 - percent) * 20) + 10);
  }

  hit() {
    if (this.visible === true) {
      this.visible = false;
      setTimeout(() => {
        this.remove();
      }, 5000);
    }
  }

  remove() {
    clearInterval(this.interval);
    this.visible = true;

    if (this.game) {
      this.game.removeObject(this);
    }
  }
}

export default PowerUp;
