class Animation {
  constructor(spriteSheet, frameSpeed, startFrame, endFrame, context) {
    this.currentFrame = 0;        // the current frame to draw
    this.counter = 0;             // keep track of frame rate
    this.spriteSheet = spriteSheet;
    this.frameSpeed = frameSpeed;
    this.animationSequence = [];  // array holding the order of the animation
    this.context = context;
    this.startFrame = startFrame;
    this.endFrame = endFrame;
    // start and end range for frames
    for (let frameNumber = this.startFrame; frameNumber <= this.endFrame; frameNumber++) {
      this.animationSequence.push(frameNumber);
    }
  }

  update() {
    // update to the next frame if it is time
    if (this.counter === (this.frameSpeed - 1)) {
      this.currentFrame = (this.currentFrame + 1) % this.animationSequence.length;
    }
    // update the counter
    this.counter = (this.counter + 1) % this.frameSpeed;
  }

  draw(x, y, rotation, scale = 1) {
    // get the row and col of the frame
    const row = Math.floor(this.animationSequence[this.currentFrame] / this.spriteSheet.framesPerRow);
    const col = Math.floor(this.animationSequence[this.currentFrame] % this.spriteSheet.framesPerRow);
    const CENTER_X = (-this.spriteSheet.frameWidth / 2) * scale;
    const CENTER_Y = (-this.spriteSheet.frameHeight / 2) * scale;

    this.context.save();
    this.context.translate(x, y);
    this.context.rotate((rotation + 90) * Math.PI / 180);
    this.context.drawImage(
    this.spriteSheet.image,
    col * this.spriteSheet.frameWidth, row * this.spriteSheet.frameHeight,
    this.spriteSheet.frameWidth, this.spriteSheet.frameHeight,
    CENTER_X, CENTER_Y,
    this.spriteSheet.frameWidth * scale, this.spriteSheet.frameHeight * scale);
    this.context.restore();
  }
}

export default Animation;