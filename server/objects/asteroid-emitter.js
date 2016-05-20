import Asteroid from './asteroid';

export default class AsteroidFactory
{
  constructor (game) {
    this.game = game;
    this.asteroids = [
      new Asteroid(this.game.stage,{x:0,y:0})
    ]
  }

  static getTimeout () {
    return ((Math.floor(Math.random() * 10) + 4) * 1000);
  }

  start () {
    setTimeout(this.add.bind(this), AsteroidFactory.getTimeout());
  }

  add () {
    console.log('asteroid added');
    setTimeout(this.add.bind(this), AsteroidFactory.getTimeout());
    let asteroid = this.asteroids[0];
    asteroid.id = '_' + Math.random().toString(36).substr(2, 9);
    asteroid.position.x = Math.round(Math.random() * (this.game.stage.width - 70)) + 35;
    asteroid.position.y = Math.round(Math.random() * (this.game.stage.height - 70)) + 35;

    this.game.addObject(asteroid);
  }
}