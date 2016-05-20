import FlyingObject from './flying-object';

class Ammo extends FlyingObject
{
    constructor(options) {
        super(options);
        this.alive = true;
        this.shadow = false;
        this.size = 10;
        this.radius = this.size / 2;
        this.unicode = '\uf111';
    }

    hit (object) {
        this.game.removeObject(this);

        if (object.constructor.name === 'Character') {
            this.player.score++;
        }
    }

    checkValid () {
        let canvasWidth = this.game.canvas.width;
        let canvasHeight = this.game.canvas.height;

        if (this.x >= canvasWidth || this.x <= 0 || this.y >= canvasHeight || this.y <= 0) {
            this.game.removeObject(this);
        }
    }
}

export default Ammo;
