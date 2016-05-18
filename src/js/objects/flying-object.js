import {VELOCITY,MAX_VELOCITY,MIN_VELOCITY} from '../constants';
import Utils from '../utils';

class FlyingObject {

    constructor (stage, options) {
        this.x = options.x;
        this.y = options.y;
        this.stage = stage;
        this.canvas = this.stage.canvas;
        this.context = this.stage.context;
        this.visible = options.visible || true;
        this.label = options.label || false;
        this.shadow = options.shadow || false;
        this.game = options.game || null;
        this.player = options.player || null;
        this.rotation = options.rotation || 0;
        this.color = options.color || 'lightpink';
        this.unicode = options.unicode || '';
        this.velocity = options.velocity || VELOCITY;
        this.size = options.size ? options.size : 45;
        this.radius = options.size * 0.65;
    }

    draw () {
        if (!this.checkValid() || !this.visible) {
            return;
        }

        this.context.save();

        // draw object
        this.context.fillStyle = this.color;
        this.context.textAlign = 'left';
        this.context.translate(this.x, this.y);

        this.context.font = this.size + 'px FontAwesome';
        let textWidth = this.context.measureText(this.unicode).width;

        if (this.label) {
            this.drawLabel(textWidth);
        }

        if (this.shadow) {
            this.drawShadow();
        }

        this.context.font = this.size + 'px FontAwesome';
        this.context.rotate(this.rotation * Math.PI / 180);
        this.context.fillText(this.unicode, -(textWidth / 2), (textWidth / 3.4));

        this.context.restore();
    }

    drawShadow () {
        this.context.shadowColor = 'rgba(0,0,0,0.5)';
        this.context.shadowOffsetX = 2;
        this.context.shadowOffsetY = 2;
        this.context.shadowBlur = 1;
    }

    drawLabel (textWidth) {
        this.context.font = (this.size / 3) + 'px Arial';
        this.context.fillStyle = this.color;
        this.context.fillText(this.player.name, -textWidth/2, textWidth);
    }

    update () {
        this.move();
    }

    rotateRight () {
        this.rotation += (VELOCITY/3);
    }

    rotateLeft () {
        this.rotation -= (VELOCITY/3);
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
        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;

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
    checkValid () {
        return true;
    }

}

export default FlyingObject;

