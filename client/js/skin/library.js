export default class SkinLibrary
{
    constructor () {
        this.skins = [];
    }

    addSkin (imageSource, frameHeight, frameWidth) {
        let image = new Image();
        image.src = imageSource;
        image.onload = () => {
            let skin = {
                image: image,
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