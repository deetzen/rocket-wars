import Skin from '../../skin/Skin';
import uuid from 'uuidv4';
import Vector from '../../utils/Vector';

export default class {
  constructor (stage, options) {
    const userId = uuid();

    this.id = `_${userId}`;
    this.alive = true;
    this.zIndex = 0;
    this.vector = new Vector(0, 0);
    this.position = new Vector(options.x || 0, options.y || 0);
    this.mass = 10;
    this.label = '';
    this.elasticity = 0.2;
    this.stage = stage;
    this.visible = options.visible || true;
    this.game = options.game || null;
    this.player = options.player || null;
    this.rotation = options.rotation || 0;
    this.direction = options.direction || 0;
    this.color = options.color || 'lightpink';
    this.velocity = options.velocity;
    this.size = options.size ? options.size : 45;
    this.damage = 0;
    this.skin = new Skin('rocket-1', 0, 0, 0, 1);
  }

  collide (obj) {
    const dn = new Vector(this.position.x - obj.position.x, this.position.y - obj.position.y);
    const sr = (this.size / 2) + (obj.size / 2);
    const dx = dn.length();

    if (dx > sr) {
      return;
    }

    const sm = this.mass + obj.mass;

    dn.normalize();

    const dt = new Vector(dn.y, -dn.x);
    const mT = dn.multiply(this.size / 2 + obj.size / 2 - dx);

    this.position.tx(mT.multiply(obj.mass / sm));
    obj.position.tx(mT.multiply(-this.mass / sm));

    const cr = Math.min(this.elasticity, obj.elasticity);

    const v1 = dn.multiply(this.vector.dot(dn)).length();
    const v2 = dn.multiply(obj.vector.dot(dn)).length();

    this.vector = dt.multiply(this.vector.dot(dt));
    this.vector.tx(dn.multiply((((cr * obj.mass) * (v2 - v1)) + (this.mass * v1) + (obj.mass * v2)) / sm));

    obj.vector = dt.multiply(obj.vector.dot(dt));
    obj.vector.tx(dn.multiply((((cr * this.mass) * (v1 - v2)) + (obj.mass * v2) + (this.mass * v1)) / sm));

    obj.hit(this);
  }

  update () {
    const angle = (this.direction * Math.PI) / 180;

    this.position.x += (this.velocity * Math.cos(angle)) + this.vector.x;
    this.position.y += (this.velocity * Math.sin(angle)) + this.vector.y;

    if (this.stage.width < this.position.x) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = this.stage.width;
    }

    if (this.stage.height < this.position.y) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = this.stage.height;
    }

    if (this.skin) {
      this.skin.update();
    }
  }

  hit () {
    return this;
  }

  destroy () {
    return this;
  }

  checkValid () { // eslint-disable-line class-methods-use-this
    return true;
  }
}
