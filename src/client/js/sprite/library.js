export default class SpriteLibrary {
  constructor () {
    this.sprites = new Map();
  }

  addSprite (name, source, frameHeight, frameWidth, rotation) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.src = source;
      image.onerror = reject;
      image.onload = () => {
        const sprite = {
          name,
          image,
          rotation,
          frameWidth,
          frameHeight,
          rows: Math.floor(image.height / frameHeight),
          framesPerRow: Math.floor(image.width / frameWidth),
          animationSequence: []
        };

        for (let frameNumber = 0; frameNumber <= sprite.framesPerRow * sprite.rows; frameNumber++) {
          sprite.animationSequence.push(frameNumber);
        }
        this.sprites.set(name, sprite);
        resolve();
      };
    });
  }
}
