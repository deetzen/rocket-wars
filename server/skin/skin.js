export default class Skin
{
    constructor (imageSource, frameStart = 0, frameEnd = 0, frameSpeed = 0, frameWidth = 0, frameHeight = 0) {
        this.imageSource = imageSource;
        this.currentFrame = frameStart;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameEnd = frameEnd;
        this.frameSpeed = frameSpeed;
        this.counter = 0;
    }
    
    update () {
        if (this.counter === (this.frameSpeed - 1)) {
            this.currentFrame = (this.currentFrame + 1) % this.animationSequence.length;
        }
        // update the counter
        this.counter = (this.counter + 1) % this.frameSpeed;
    }
}