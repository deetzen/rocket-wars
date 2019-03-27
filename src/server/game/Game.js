import ObjectEmitter from './object/Emitter';
import Sound from './Sound';
import Stage from './Stage';
import { Players } from '../player/Player';
import { Objects } from './object/Object';
import { UPDATE_OBJECTS, UPDATE_PLAYERS } from '../../events';

export default class Game {
  constructor (io) {
    this.io = io;
    this.stage = new Stage();
    this.sound = new Sound();

    this.players = new Players();
    this.objects = new Objects();
  }

  start () {
    // update all objects in game
    setInterval(() => this.updateObjects(), 35);

    // send updates to clients
    setInterval(() => this.updateClients(), 17);

    // start the object emitter
    new ObjectEmitter(this).start();
  }

  addPlayer (player) {
    if (!this.players.has(player.id)) {
      this.players.set(player.id, player);
      this.addObject(player.character);
    }
  }

  addObject (object) {
    object.game = this;
    this.objects.set(object.id, object);
  }

  removeObject (object) {
    this.objects.delete(object.id);
  }

  updateObjects () {
    if (this.objects.size > 0) {
      this.objects.forEach(object => {
        object
          .update()
          .checkValid();
      });
    }
    this.collide();
  }

  updateClients () {
    const objects = Game.sortObjects(this.objects);
    const players = {};

    if (this.players.size > 0) {
      this.players.forEach(player => {
        players[player.id] = {
          id: player.id,
          name: player.name,
          ammo: player.ammo,
          score: player.score,
          color: player.color
        };
      });
    }

    this.io.emit(UPDATE_OBJECTS, objects);
    this.io.emit(UPDATE_PLAYERS, players);
  }

  static sortObjects (objects) {
    if (objects.size > 0) {
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
