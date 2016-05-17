import {VELOCITY,MAX_VELOCITY,MIN_VELOCITY} from './constants';

class FlyingObject {

    constructor (options) {
        this.x = options.x;
        this.y = options.y;
        this.alive = true;
        this.game = options.game || null;
        this.player = options.player || null;
        this.circle = options.circle || {};
        this.rotation = options.rotation || 0;
        this.color = options.color || 'lightpink';
        this.unicode = options.unicode || '';
        this.independent = options.independent || false;
        this.velocity = options.velocity || VELOCITY;
        this.fontSize = options.size ? options.size + 'px' : '45px';
        this.isFiring = false;
        this.radius = options.size / 2;
        this.infinite = options.infinite || false;
    }

    draw () {
        if(!this.isValid()) {
            let ammoPos = this.game.ammos.indexOf(this);
            this.game.ammos.splice(ammoPos, 1);
        } if (!this.alive) {
            return;
        }


        let context = this.game.context;

        // draw fighter
        context.save();
        context.fillStyle = this.color;
        context.shadowColor = 'rgba(0,0,0,0.5)';
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowBlur = 1;
        context.font = this.fontSize + ' FontAwesome';
        let textWidth = context.measureText(this.unicode).width;
        context.translate(this.x, this.y);
        context.rotate(this.rotation * Math.PI / 180);
        context.fillText(this.unicode, -(textWidth / 2), (textWidth / 3.4));
        context.restore();
    }

    update () {
        this.move();
    }

    fire () {
        this.isFiring = true;

        let ammoPos = FlyingObject.calcVector(this.x, this.y, this.rotation, this.radius * 1.5);

        let ammo = new FlyingObject({
            x: ammoPos.x,
            y: ammoPos.y,
            player: this.player,
            color: this.color,
            velocity: this.velocity * 1.4,
            independent: true,
            infinite: false,
            size: 7,
            unicode: '\uf111',
            rotation: this.rotation
        });

        this.game.addAmmo(ammo);

        var snd = new Audio("sounds/shoot.wav"); // buffers automatically when created
        snd.play();
    }

    static calcVector (xCoord, yCoord, angle, length) {
        length = typeof length !== 'undefined' ? length : 10;
        angle = angle * Math.PI / 180;
        return {
            x: length * Math.cos(angle) + xCoord,
            y: length * Math.sin(angle) + yCoord
        }
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

        let vectors = FlyingObject.calcVector(this.x, this.y, this.rotation, this.velocity);
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

    isValid () {
        if (this.infinite) {
            return true;
        }

        let canvasWidth = this.game.canvas.width;
        let canvasHeight = this.game.canvas.height;

        return !(this.x >= canvasWidth || this.x <= 0 || this.y >= canvasHeight || this.y <= 0);
    }


}

export default FlyingObject;