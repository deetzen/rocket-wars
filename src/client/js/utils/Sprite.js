class Sprite {
  constructor (src, frameHeight = 0, frameWidth = 0, rotation = 0) {
    const image = new Image();

    image.src = src;

    image.onload = () => {
      this.image = image;
      this.frameWidth = frameWidth;
      this.frameHeight = frameHeight;
      this.rotation = rotation;
      this.rows = Math.floor(image.height / frameHeight);
      this.framesPerRow = Math.floor(image.width / frameWidth);
      this.animationSequence = [];

      for (let frameNumber = 0; frameNumber <= this.framesPerRow * this.rows; frameNumber++) {
        this.animationSequence.push(frameNumber);
      }
    };
  }
}

module.exports = Sprite;
