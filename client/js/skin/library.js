export default class SpriteLibrary
{
    constructor () {
        this.skins = [];
    }

    addSkin (imageSource, frameHeight, frameWidth, rotation) {
        let image = new Image();
        image.src = imageSource;
        image.onload = () => {
            let skin = {
                image: image,
                rotation: rotation,
                framesPerRow: Math.floor(image.width / frameWidth),
                frameWidth: frameWidth,
                frameHeight: frameHeight,
                rows: Math.floor(image.height / frameHeight),
                animationSequence: []
            };

            for (let frameNumber = 0; frameNumber <= skin.framesPerRow * skin.rows; frameNumber++) {
                skin.animationSequence.push(frameNumber);
            }

            this.skins[imageSource] = skin;
        };
    };

    getSkin (skinName) {
        return this.skins[skinName];
    }
}