import PowerUp from './powerup';
import Skin from '../../skin/skin';

class RefillShield extends PowerUp
{
    constructor(stage, options) {
        super(stage, options);
        this.skin = new Skin('powerup-shield', 1, 2, 15);
    }

    hit (object) {
        object.damage = 0;
        if (object.shieldObject) {
            object.shieldObject.damage = 0;
        } 
        if (object.character) {
            object.character.damage = 0;
        }
        super.hit();
        this.game.sound.play('powerup-refillshield', true);
    }
}

export default RefillShield;