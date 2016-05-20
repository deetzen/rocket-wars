export default class Skin
{
    constructor (skinLibrary, skin) {
        this.skinName = skin;
        this.spriteLibrary = skinLibrary;
    }
    
    draw (context, x, y, rotation, currentFrame = 0, scale = 1)
    {
        let sprite = this.spriteLibrary.getSkin(this.skinName);

        // get the row and col of the frame
        const row = Math.floor(sprite.animationSequence[currentFrame] / sprite.framesPerRow);
        const col = Math.floor(sprite.animationSequence[currentFrame] % sprite.framesPerRow);
        const CENTER_X = (-sprite.frameWidth / 2) * scale;
        const CENTER_Y = (-sprite.frameHeight / 2) * scale;

        context.save();
        context.translate(x, y);
        context.rotate((rotation + 90) * Math.PI / 180);

        context.drawImage(
            sprite.image,
            col * sprite.frameWidth, row * sprite.frameHeight,
            sprite.frameWidth, sprite.frameHeight,
            CENTER_X, CENTER_Y,
            sprite.frameWidth * scale, sprite.frameHeight * scale
        );
        context.restore();
    };
}