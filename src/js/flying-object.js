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
        this.fontSize = options.fontSize || '45px';
        this.radius = options.radius || 35;
        this.isFiring = false;

        if(this.keyboard) {
            this.enableKeyboard();
        }
    }

    draw () {

        let context = this.game.context;
        let circle = { x: this.x, y: this.y };
        let fighter = { x: circle.x - 21, y: circle.y + 15, width: context.measureText(this.unicode).width};

        // circle
        context.fillStyle = this.color;
        context.strokeStyle = '#FFFFFF';
        context.beginPath();
        context.arc(circle.x, circle.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.stroke();

        if(this.rotation !== 0) {

            context.save();
            context.translate(circle.x, circle.y);

            // draw fighter
            context.fillStyle = '#FFFFFF';
            context.font = this.fontSize + ' FontAwesome';
            context.rotate(this.rotation * Math.PI / 180);
            context.fillText(this.unicode, - (fighter.width / 2) + 3, 15);
            context.restore();

        } else {
            // draw fighter
            context.fillStyle = '#FFFFFF';
            context.font = this.fontSize + ' FontAwesome';
            context.fillText(this.unicode, fighter.x, fighter.y);
        }
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

        let ammoPos = this.calcVector(this.x, this.y, this.rotation, this.radius);

        let ammo = new Ammo({
            x: ammoPos[0],
            y: ammoPos[1],
            color: this.color,
            velocity: 15,
            independent: true,
            radius: 3,
            rotation: this.rotation
        });

        this.game.addFlyingObject(ammo);
    }

    calcVector (xCoord, yCoord, angle, length) {
        length = typeof length !== 'undefined' ? length : 10;
        angle = angle * Math.PI / 180;
        return [length * Math.cos(angle) + xCoord, length * Math.sin(angle) + yCoord]
    }

    rotateRight () {
        this.rotation += (VELOCITY/4);
    }

    rotateLeft () {
        this.rotation -= (VELOCITY/4);
    }

    move () {

        let vectors = this.calcVector(this.x, this.y, this.rotation, VELOCITY);
        let canvasWidth = this.game.canvas.width;
        let canvasHeight = this.game.canvas.height;

        if(canvasWidth < vectors[0]) {
            this.x = 0;
        } else if (vectors[0] < 0) {
            this.x = canvasWidth;
        } else {
            this.x = vectors[0];
        }

        if(canvasHeight < vectors[1]) {
            this.y = 0;
        } else if(vectors[1] < 0) {
            this.y = canvasHeight;
        } else {
            this.y = vectors[1];
        }
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

class Ammo extends FlyingObject {

    constructor (options) {
        super(options);
    }

    isValid () {

        let canvasWidth = this.game.canvas.width;
        let canvasHeight = this.game.canvas.height;

        if(this.x >= canvasWidth || this.x <= 0 || this.y >= canvasHeight || this.y <= 0) {
            return false;
        }

        return true;
    }

    draw () {

        if(!this.isValid()) {
            let ammoPos = this.game.flyingObjects.indexOf(this);
            this.game.flyingObjects.splice(ammoPos, 1);
        }

        let context = this.game.context;
        context.fillStyle = '#FFFFFF';

        if(this.rotation !== 0) {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.rotation * Math.PI / 180);
            context.beginPath();
            context.arc(0, 0, this.radius, 0, 2 * Math.PI);
            context.fill();
            context.restore();
        } else {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            context.fill();
        }
    }

    move () {
        let vectors = this.calcVector(this.x, this.y, this.rotation, VELOCITY * 1.5);
        this.x = vectors[0];
        this.y = vectors[1];
    }
}

export default FlyingObject;