class Animation {
  constructor(spritesheet, frameSpeed, startFrame, endFrame, repeat = true, context) {
    this.animationSequence = [];  // array holding the order of the animation
    this.currentFrame = 0;        // the current frame to draw
    this.counter = 0;             // keep track of frame rate
    this.context = context;
    this.spritesheet = spritesheet;
    this.frameSpeed = frameSpeed;
    this.startFrame = startFrame;
    this.endFrame = endFrame;
    this.repeat = repeat;
    // start and end range for frames
    for (let frameNumber = this.startFrame; frameNumber <= this.endFrame; frameNumber++) {
      this.animationSequence.push(frameNumber);
    }
  }
  update() {
    // update to the next frame if it is time
    if (this.counter == (this.frameSpeed - 1))
      this.currentFrame = (this.currentFrame + 1) % this.animationSequence.length;
    // update the counter
    this.counter = (this.counter + 1) % this.frameSpeed;
  };

  draw(x, y) {
    // get the row and col of the frame
    var row = Math.floor(this.animationSequence[this.currentFrame] / this.spritesheet.framesPerRow);
    var col = Math.floor(this.animationSequence[this.currentFrame] % this.spritesheet.framesPerRow);
    this.context.drawImage(
    this.spritesheet.image,
    col * this.spritesheet.frameWidth, row * this.spritesheet.frameHeight,
    this.spritesheet.frameWidth, this.spritesheet.frameHeight,
    x, y,
    this.spritesheet.frameWidth, this.spritesheet.frameHeight);
  };
}

export default Animation;