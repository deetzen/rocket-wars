import Vector from '../utils/vector';
import Bullet from './ammo/bullet';

export default class Weapon
{
    constructor (stage, player, character) {
        this.player = player;
        this.character = character;
        this.stage = stage;
    }

    fire () {
        if (!this.player.ammo || !this.character.visible) { return; }
        this.player.ammo--;

        let bulletPosition = Vector.calcMovement(this.character.position.x, this.character.position.y, this.character.rotation, this.character.size/2);

        let bullet = new Bullet(this.stage, {
            x: bulletPosition.x,
            y: bulletPosition.y,
            type: this.character.type,
            size: 10,
            player: this.player,
            color: this.player.color,
            velocity: this.character.velocity * 4,
            rotation: this.character.rotation
        });

        this.character.game.addObject(bullet);

        var snd = new Audio("sounds/shoot.wav"); // buffers automatically when created
        snd.play();
    }
}