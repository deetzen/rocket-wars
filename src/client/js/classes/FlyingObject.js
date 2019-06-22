'use strict';

class FlyingObject {
  constructor () {
    this.context = null;
    this.type = '';
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.size = 45;
    this.skin = null;
    this.shield = 0;
    this.label = '';
  }

  draw () {
    if (!this.visible) {
      return;
    }

    this.context.save();

    this.context.fillStyle = this.color;
    this.context.textAlign = 'left';
    this.context.translate(this.x, this.y);

    this.context.rotate(this.rotation * Math.PI / 180);

    this.context.restore();

    if (this.label) {
      this.drawLabel();
    }

    if (this.skin) {
      this.skin.draw(this.context, this.x, this.y, this.rotation, this.size);
    }

    return this;
  }

  drawLabel () {
    this.context.font = '13px Arial';
    this.context.fillStyle = this.color;

    const textWidth = this.context.measureText(this.label).width;

    this.context.fillText(this.label, this.x + (textWidth / 2), this.y + ((this.size / 2) * 1.9));

    return this;
  }
}

module.exports = FlyingObject;
