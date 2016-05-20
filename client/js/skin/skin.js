export default class Skin
{
    constructor (sprite, currentFrame) {
        this.sprite = sprite;
        this.currentFrame = currentFrame;
    }

    draw (context, x, y, rotation, size) {
        if (!this.sprite) return;

        let scale = (size / this.sprite.frameWidth);
        let newWidth = this.sprite.frameWidth * scale;
        let newHeight = this.sprite.frameHeight * scale;

        // get the row and col of the frame
        const row = Math.floor(this.sprite.animationSequence[this.currentFrame] / this.sprite.framesPerRow);
        const col = Math.floor(this.sprite.animationSequence[this.currentFrame] % this.sprite.framesPerRow);

        context.save();
        context.translate(x, y);
        context.rotate((rotation + this.sprite.rotation) * Math.PI / 180);

        context.drawImage(
            this.sprite.image,
            col * this.sprite.frameWidth, row * this.sprite.frameHeight,
            this.sprite.frameWidth, this.sprite.frameHeight,
            -newWidth/2, -newHeight/2,
            newWidth, newHeight
        );
        context.restore();
    };
}