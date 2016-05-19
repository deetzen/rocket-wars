import {CHARACTER_SIZE, MIN_VELOCITY, MAX_AMMO, MAX_SHIELD} from '../../constants';
import Character from '../objects/character';

export default class {

    constructor (stage, options) {
        this.id = options.id;
        this.stage = stage;
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
            x: Math.round(Math.random() * this.stage.width) + 1,
            y: Math.round(Math.random() * this.stage.height) + 1,
            rotation: Math.round(Math.random() * 360) + 1,
            color: this.color,
            unicode: '\uf0fb'
        });

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
}