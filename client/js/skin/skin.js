export default class Skin
{
    constructor (spriteLibrary, skin, currentFrame) {
        this.skinName = skin;
        this.spriteLibrary = spriteLibrary;
        this.currentFrame = currentFrame;
    }
    
    draw (context, x, y, rotation, size)
    {
        let sprite = this.spriteLibrary.getSkin(this.skinName);

        if (!sprite) return;

        let scale = (size / sprite.frameWidth);
        let newWidth = sprite.frameWidth * scale;
        let newHeight = sprite.frameHeight * scale;

        // get the row and col of the frame
        const row = Math.floor(sprite.animationSequence[this.currentFrame] / sprite.framesPerRow);
        const col = Math.floor(sprite.animationSequence[this.currentFrame] % sprite.framesPerRow);

        context.save();
        context.translate(x, y);
        context.rotate((rotation + sprite.rotation) * Math.PI / 180);

        context.drawImage(
            sprite.image,
            col * sprite.frameWidth, row * sprite.frameHeight,
            sprite.frameWidth, sprite.frameHeight,
            -newWidth/2, -newHeight/2,
            newWidth, newHeight
        );
        context.restore();
    };
}