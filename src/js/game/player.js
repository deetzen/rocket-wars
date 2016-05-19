import {CHARACTER_SIZE, MIN_VELOCITY, MAX_AMMO, MAX_SHIELD} from '../constants';
import Character from '../objects/character';

export default class {

    constructor (stage, options) {
        this.stage = stage;
        this.context = this.stage.context;
        this.canvas = this.stage.canvas;
        this.name = options.name;
        this.color = options.color;
        this.keyboard = options.keyboard;
        this.score = 0;
        this.ammo = MAX_AMMO;
        this.shield = MAX_SHIELD;

        this.character = new Character(this.stage, {
            size: CHARACTER_SIZE,
            velocity: MIN_VELOCITY,
            player: this,
            x: Math.round(Math.random() * this.canvas.width) + 1,
            y: Math.round(Math.random() * this.canvas.height) + 1,
            rotation: Math.round(Math.random() * 360) + 1,
            color: this.color,
            unicode: '\uf0fb'
        });

        this.enableKeyboard();

        setInterval(this.checkInput.bind(this), 10);
        setInterval(this.raiseAmmo.bind(this), 1200);
    }

    raiseAmmo() {
        if(this.character.isFiring) {
            return;
        }
        if (this.ammo < MAX_AMMO) {
            this.ammo++;
        }
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
        });
    }
}