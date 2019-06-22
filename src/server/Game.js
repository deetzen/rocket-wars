'use strict';

const FlyingObjects = require('./Object/FlyingObjects');
const Players = require('./Player/Players');

const Sound = require('./Sound/Sound');
const Stage = require('./Stage/Stage');

class Game {
  constructor () {
    this.stage = new Stage();
    this.sound = new Sound();

    this.objects = new FlyingObjects();
    this.players = new Players();
  }

  addPlayer (player) {
    if (!this.players.has(player.id)) {
      this.players.set(player.id, player);
      this.addObject(player.character);
    }
  }

  getPlayers () {
    return this.players;
  }

  addObject (object) {
    object.game = this;
    this.objects.set(object.id, object);
  }

  removeObject (object) {
    this.objects.delete(object.id);
  }

  getObjects () {
    return Game.sortObjects(this.objects);
  }

  static sortObjects (objects) {
    const sortedObjects = new Map([ ...objects.entries() ].sort((first, second) => {
      const object1 = first[Object.keys(first)[1]];
      const object2 = second[Object.keys(second)[1]];

      let zIndex = 0;

      if (object1.zIndex > object2.zIndex) {
        zIndex = 1;
      } else if (object1.zIndex < object2.zIndex) {
        zIndex = -1;
      }

      return zIndex;
    }));

    sortedObjects.forEach(object => {
      sortedObjects[object.id] = {
        id: object.id,
        type: object.constructor.name,
        label: object.label,
        color: object.color,
        visible: object.visible,
        x: object.position.x,
        y: object.position.y,
        size: object.size,
        rotation: object.rotation,
        unicode: object.unicode,
        sprite: object.skin,
        shield: object.shield
      };
    });

    return sortedObjects;
  }

  collide () {
    this.objects.forEach(object1 => {
      this.objects.forEach(object2 => {
        if (!object1.visible || !object2.visible) {
          return;
        }

        if (!object1.alive || !object2.alive) {
          return;
        }

        if (object1 === object2) {
          return;
        }

        if (object1.player === object2.player) {
          return;
        }

        object2.collide(object1);
        object1.collide(object2);
      });
    });
  }
}

module.exports = Game;
