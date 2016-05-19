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

        setTimeout(this.add.bind(this), PowerUps.getTimeout());

        for (let i = 0; i < this.game.objects.length; i++) {
            let object = this.game.objects[i];
            if (object.constructor.name === powerUp.constructor.name) {
                return;
            }
        }

        powerUp.position.x = Math.round(Math.random() * (this.game.canvas.width - 70)) + 35;
        powerUp.position.y = Math.round(Math.random() * (this.game.canvas.height - 70)) + 35;

        this.game.addObject(powerUp);
    }
}