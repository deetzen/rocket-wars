import FlyingObject from './flying-object';

class RefillAmmo extends FlyingObject
{
    constructor(stage, options) {
        super(stage, options);
        this.shadow = false;
        this.size = 10;
        this.radius = this.size / 2;
        this.unicode = '\uf111';
    }

    hit (object) {
        this.game.objects.splice(this.game.objects.indexOf(this), 1);

        if (object.constructor.name === 'Character') {
            this.player.score++;
        }

        var snd = new Audio("sounds/hit.wav"); // buffers automatically when created
        snd.play();
    }

    checkValid () {
        let canvasWidth = this.game.canvas.width;
        let canvasHeight = this.game.canvas.height;

        if (this.x >= canvasWidth || this.x <= 0 || this.y >= canvasHeight || this.y <= 0) {
            this.game.removeObject(this);
        }

        return true;
    }
}

export default RefillAmmo;
