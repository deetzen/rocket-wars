import RefillAmmo from './powerup/refillammo';
import RefillShield from './powerup/refillshield';
import PermanentFire from './powerup/permanentfire';

export default class PowerUps
{
    constructor (game) {
        this.game = game;
        this.powerups = [
            new RefillAmmo(this.game.stage,{x:0,y:0}),
            new PermanentFire(this.game.stage,{x:0,y:0}),
            new RefillShield(this.game.stage,{x:0,y:0})
        ]
    }

    static getTimeout () {
        return ((Math.floor(Math.random() * 10) + 4) * 1000);
    }

    start () {
        setTimeout(this.add.bind(this), PowerUps.getTimeout());
    }

    add () {
        let index = Math.floor(Math.random() * this.powerups.length);
        let powerUp = this.powerups.slice(index, index+1)[0];
        let exists = false;

        setTimeout(this.add.bind(this), PowerUps.getTimeout());

        this.game.objects.forEach((object) => {
            if (object.constructor.name === powerUp.constructor.name) {
                exists = true;
                return;
            }
        });

        if (exists) {
            return;
        }

        powerUp.id = '_' + Math.random().toString(36).substr(2, 9);
        powerUp.position.x = Math.round(Math.random() * (this.game.stage.width - 70)) + 35;
        powerUp.position.y = Math.round(Math.random() * (this.game.stage.height - 70)) + 35;

        this.game.addObject(powerUp);
    }
}