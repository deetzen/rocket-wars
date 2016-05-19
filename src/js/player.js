import {CHARACTER_SIZE, MAX_AMMO, MAX_SHIELD} from '../../constants';
import Character from './objects/character';

class Player {

    constructor (options) {
        this.id = options.id;
        this.name = options.name;
        this.color = options.color;
        this.keyboard = options.keyboard;
        this.score = 0;
        this.ammo = MAX_AMMO;
        this.shield = MAX_SHIELD;

        this.character = new Character({
            size: CHARACTER_SIZE,
            player: this,
            x: 0,
            y: 0,
            keyboard: this.keyboard,
            rotation: Math.round(Math.random() * 360) + 1,
            color: this.color,
            unicode: '\uf0fb'
        });
        
        setInterval(this.raiseAmmo.bind(this), 2500);
    }

    raiseAmmo() {
        if (this.ammo < MAX_AMMO) {
            this.ammo++;
        }
    }
}

export default Player;