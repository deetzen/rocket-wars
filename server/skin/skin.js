export default class Skin
{
    constructor (id, frameStart = 0, frameEnd = 0, frameSpeed = 0) {
        this.id = id;
        this.currentFrame = frameStart;
        this.frameEnd = frameEnd;
        this.frameSpeed = frameSpeed;
        this.alpha = 1;
        this.counter = 0;
    }

    update () {
        if (this.counter === (this.frameSpeed - 1)) {
            this.currentFrame = (this.currentFrame + 1) % this.frameEnd;
        }
        // update the counter
        this.counter = (this.counter + 1) % this.frameSpeed;
    }
}