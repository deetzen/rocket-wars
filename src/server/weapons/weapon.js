import Vector from '../utils/vector';
import Bullet from './ammo/bullet';

export default class Weapon {
  constructor(stage, player, character) {
    this.player = player;
    this.character = character;
    this.stage = stage;
  }

  fire() {
    if (!this.character.alive) {
      return;
    }
    if (this.player.ammo <= 0) {
      this.player.ammo = 0;
      return;
    }

    this.player.ammo -= 1;

    const bulletPosition = Vector
      .calcMovement(
        this.character.position.x,
        this.character.position.y,
        this.character.rotation,
        this.character.size / 2);

    const bullet = new Bullet(this.stage, {
      x: bulletPosition.x,
      y: bulletPosition.y,
      type: this.character.type,
      size: 10,
      player: this.player,
      color: this.player.color,
      velocity: (this.character.velocity + 5) * 1.8,
      direction: this.character.direction,
      rotation: this.character.rotation,
    });

    this.character.game.addObject(bullet);

    this.character.game.sound.play('shoot');
  }
}
