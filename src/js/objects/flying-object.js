import {VELOCITY,MAX_VELOCITY,MIN_VELOCITY} from '../constants';
import Utils from '../utils';

class FlyingObject {

    constructor (options) {
        this.x = options.x;
        this.y = options.y;
        this.alive = true;
        this.label = options.label || false;
        this.shadow = options.shadow || false;
        this.game = options.game || null;
        this.player = options.player || null;
        this.rotation = options.rotation || 0;
        this.color = options.color || 'lightpink';
        this.unicode = options.unicode || '';
        this.velocity = options.velocity || VELOCITY;
        this.size = options.size ? options.size : 45;
        this.radius = options.size / 2;
    }

    draw () {

        if (this.checkValid() === false) {
            return;
        }

        let context = this.game.context;

        context.save();

        // draw object
        context.fillStyle = this.color;
        context.textAlign = 'left';
        context.translate(this.x, this.y);

        context.font = this.size + 'px FontAwesome';
        let textWidth = context.measureText(this.unicode).width;

        if (this.label) {
            // draw label
            context.font = (this.size / 2.8) + 'px Arial';
            context.fillStyle = this.color;
            context.fillText(this.player.name, -textWidth, textWidth);
        }

        if (this.shadow) {
            context.shadowColor = 'rgba(0,0,0,0.5)';
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowBlur = 1;
        }

        context.font = this.size + 'px FontAwesome';
        context.rotate(this.rotation * Math.PI / 180);
        context.fillText(this.unicode, -(textWidth / 2), (textWidth / 3.4));

        context.restore();
    }

    update () {
        this.move();
    }

    rotateRight () {
        this.rotation += (VELOCITY/2.8);
    }

    rotateLeft () {
        this.rotation -= (VELOCITY/2.8);
    }

    speedUp () {
        if (this.velocity < MAX_VELOCITY) {
            this.velocity += 0.2;
        }
    }
    speedDown () {
        if (this.velocity > MIN_VELOCITY) {
            this.velocity -= 0.2;
        }
    }

    move () {

        let vectors = Utils.calcVector(this.x, this.y, this.rotation, this.velocity);
        let canvasWidth = this.game.canvas.width;
        let canvasHeight = this.game.canvas.height;

        if(canvasWidth < vectors.x) {
            this.x = 0;
        } else if (vectors.x < 0) {
            this.x = canvasWidth;
        } else {
            this.x = vectors.x;
        }

        if(canvasHeight < vectors.y) {
            this.y = 0;
        } else if(vectors.y < 0) {
            this.y = canvasHeight;
        } else {
            this.y = vectors.y;
        }
    }

    hit () {}
    destroy () {}
    checkValid () {}

}

export default FlyingObject;

