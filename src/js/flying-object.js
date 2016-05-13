import {VELOCITY} from './constants';

class FlyingObject {

    constructor (options) {
        this.x = options.x;
        this.y = options.y;
        this.game = null;
        this.circle = options.circle || {};
        this.rotation = options.rotation || 0;
        this.keyboard = options.keyboard || null;
        this.color = options.color || 'lightpink';
        this.unicode = options.unicode || '';
        this.independent = options.independent || false;
        this.velocity = options.velocity || VELOCITY;
        this.keyboardIsEnabled = false;
        this.fontSize = options.size ? options.size + 'px' : '45px';
        this.isFiring = false;
        this.radius = options.size / 2;
        this.infinite = options.infinite || false;

        if(this.keyboard) {
            this.enableKeyboard();
        }
    }

    draw () {
        if(!this.isValid()) {
            let ammoPos = this.game.flyingObjects.indexOf(this);
            this.game.flyingObjects.splice(ammoPos, 1);
        }

        let context = this.game.context;

        context.font = this.fontSize + ' FontAwesome';

        // draw fighter
        context.save();
        context.fillStyle = this.color;
        context.font = this.fontSize + ' FontAwesome';
        let textWidth = context.measureText(this.unicode).width;
        context.translate(this.x, this.y);
        context.rotate(this.rotation * Math.PI / 180);
        context.fillText(this.unicode, -(textWidth / 2), (textWidth / 3.4));
        context.restore();
    }

    update () {

        if(this.independent) {
            this.move();
            return;
        }

        if(this.keyboardIsEnabled) {
            if(this.keyboard.isDown(this.keyboard.up)) { this.move(); }
            if(this.keyboard.isDown(this.keyboard.right)) { this.rotateRight(); }
            if(this.keyboard.isDown(this.keyboard.left)) { this.rotateLeft(); }
            if(this.keyboard.isDown(this.keyboard.fire) && !this.isFiring) { this.fire(); }
        }
    }

    fire () {
        this.isFiring = true;

        let ammoPos = FlyingObject.calcVector(this.x, this.y, this.rotation, this.radius * 1.5);

        let ammo = new FlyingObject({
            x: ammoPos.x,
            y: ammoPos.y,
            color: '#FFFFFF',
            velocity: VELOCITY * 1.6,
            independent: true,
            infinite: false,
            size: 20,
            unicode: '.',
            rotation: this.rotation
        });

        this.game.addFlyingObject(ammo);
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
        this.rotation += (VELOCITY/4);
    }

    rotateLeft () {
        this.rotation -= (VELOCITY/4);
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

    enableKeyboard () {
        document.addEventListener('keydown', event => { this.keyboard.onKeydown(event); });
        document.addEventListener('keyup', event => {
            this.keyboard.onKeyup(event);
            this.isFiring = false;
        });
        
        this.keyboardIsEnabled = true;
    }
}

export default FlyingObject;