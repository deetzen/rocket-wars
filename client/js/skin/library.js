export default class SpriteLibrary
{
    constructor () {
        this.sprites = new Map();
    }

    addSprite (name, source, frameHeight, frameWidth, rotation) {
        return new Promise((resolve, reject)=>{
            let image = new Image();
            image.src = source;
            image.onerror = reject;
            image.onload = () => {
                let sprite = {
                    name: name,
                    image: image,
                    rotation: rotation,
                    framesPerRow: Math.floor(image.width / frameWidth),
                    frameWidth: frameWidth,
                    frameHeight: frameHeight,
                    rows: Math.floor(image.height / frameHeight),
                    animationSequence: []
                };
                for (let frameNumber = 0; frameNumber <= sprite.framesPerRow * sprite.rows; frameNumber++) {
                    sprite.animationSequence.push(frameNumber);
                }
                this.sprites.set(name, sprite);
                resolve();
        };
        });
    };
}