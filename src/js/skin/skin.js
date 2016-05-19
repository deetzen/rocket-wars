export default class Skin
{
    constructor (skin) {
        this.imageSource = skin.imageSource;
        this.currentFrame = skin.currentFrame;
        this.frameWidth = skin.frameWidth;
        this.frameHeight = skin.frameHeight;
        this.animationSequence = [];
    }
    
    draw (context, x, y, rotation, scale = 1) {

        this.image = new Image();
        this.image.src = this.imageSource;

        this.image.onload = () => {
            this.framesPerRow = Math.floor(this.image.width / this.frameWidth);
            this.rows = Math.floor(this.image.height / this.frameHeight);

            for (let frameNumber = 0; frameNumber <= this.framesPerRow * this.rows; frameNumber++) {
                this.animationSequence.push(frameNumber);
            }

            // get the row and col of the frame
            const row = Math.floor(this.animationSequence[this.currentFrame] / this.framesPerRow);
            const col = Math.floor(this.animationSequence[this.currentFrame] % this.framesPerRow);
            const CENTER_X = (-this.frameWidth / 2) * scale;
            const CENTER_Y = (-this.frameHeight / 2) * scale;

            context.save();
            context.translate(x, y);
            context.rotate((rotation + 90) * Math.PI / 180);
            context.drawImage(
                this.image,
                col * this.frameWidth, row * this.frameHeight,
                this.frameWidth, this.frameHeight,
                CENTER_X, CENTER_Y,
                this.frameWidth * scale, this.frameHeight * scale);
            context.restore();
        };
    }
}