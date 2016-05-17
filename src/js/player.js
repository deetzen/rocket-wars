import FlyingObject from './flying-object';
import {CHARACTER_SIZE} from './constants';

export default class {

    constructor (options) {
        this.name = options.name;
        this.color = options.color;
        this.keyboard = options.keyboard;
        this.score = 0;

        this.character = new FlyingObject({
            size: CHARACTER_SIZE,
            player: this,
            x: Math.round(Math.random() * window.innerWidth) + 1,
            y: Math.round(Math.random() * window.innerHeight) + 1,
            rotation: Math.round(Math.random() * 360) + 1,
            color: this.color,
            unicode: '\uf0fb',
            infinite: true
        });
        
        this.enableKeyboard();

        setInterval(this.checkInput.bind(this), 10);
    }

    checkInput () {
        if(this.keyboard.isDown(this.keyboard.up)) { this.character.speedUp(); }
        if(this.keyboard.isDown(this.keyboard.down)) { this.character.speedDown(); }
        if(this.keyboard.isDown(this.keyboard.right)) { this.character.rotateRight(); }
        if(this.keyboard.isDown(this.keyboard.left)) { this.character.rotateLeft(); }
        if(this.keyboard.isDown(this.keyboard.fire) && !this.character.isFiring) { this.character.fire(); }
    }

    enableKeyboard () {
        document.addEventListener('keydown', event => {
            this.keyboard.onKeydown(event);
        });
        document.addEventListener('keyup', event => {
            this.keyboard.onKeyup(event);
            this.character.isFiring = false;
        });
    }
}