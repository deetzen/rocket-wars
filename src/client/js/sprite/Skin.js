'use strict';

class Skin {
  constructor (sprite, currentFrame, alpha = 1) {
    this.sprite = sprite;
    this.alpha = alpha;
    this.currentFrame = currentFrame;
  }

  draw (context, x, y, rotation, size) {
    if (!this.sprite) {
      return;
    }

    const scale = size / this.sprite.frameWidth;
    const newWidth = this.sprite.frameWidth * scale;
    const newHeight = this.sprite.frameHeight * scale;

    // get the row and col of the frame
    const row = Math.floor(this.sprite.animationSequence[this.currentFrame] / this.sprite.framesPerRow);
    const col = Math.floor(this.sprite.animationSequence[this.currentFrame] % this.sprite.framesPerRow);

    context.save();
    context.translate(x, y);
    context.rotate((rotation + this.sprite.rotation) * Math.PI / 180);

    context.globalAlpha = this.alpha;

    context.drawImage(
      this.sprite.image,
      col * this.sprite.frameWidth, row * this.sprite.frameHeight,
      this.sprite.frameWidth, this.sprite.frameHeight,
      -newWidth / 2, -newHeight / 2,
      newWidth, newHeight
    );

    context.restore();
  }
}

module.exports = Skin;
