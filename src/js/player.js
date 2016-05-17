import FlyingObject from './flying-object';
import {CHARACTER_SIZE} from './constants';
import SpriteSheet from './sprite-sheet';
import Animation from './animation';

export default class {

    constructor (options) {
        this.name = options.name;
        this.color = options.color;
        this.keyboard = options.keyboard;
        this.score = 0;

        this.explosionSheet = new SpriteSheet('images/explosion_3_40_128.png', 128, 128);
        this.explosion = new Animation(this.explosionSheet, 4, 0, 40, false);

        this.character = new FlyingObject({
            size: CHARACTER_SIZE,
            label: true,
            shadow: true,
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

    explode(context){
        this.explosion.update();
        this.explosion.draw(this.character.x, this.character.y, context);
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