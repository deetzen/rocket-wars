'use strict';

const {
  UPDATE_OBJECTS,
  UPDATE_PLAYERS
} = require('../events');

class Timer {
  constructor (game, io) {
    this.game = game;
    this.io = io;
  }

  checkCollision () {
    this.game.collide();
  }

  updateObjects () {
    const objects = this.game.getObjects();

    objects.forEach(object => {
      object.
        update().
        checkValid();
    });

    this.io.emit(UPDATE_OBJECTS, objects);
  }

  updatePlayers () {
    const players = this.game.getPlayers();
    const playerList = [];

    players.forEach(player => {
      playerList[player.id] = {
        id: player.id,
        name: player.name,
        ammo: player.ammo,
        score: player.score,
        color: player.color
      };
    });

    this.io.emit(UPDATE_PLAYERS, playerList);
  }

  start () {
    setInterval(() => this.updateObjects(), 35);
    setInterval(() => this.updatePlayers(), 17);
    setInterval(() => this.checkCollision(), 17);
  }
}

module.exports = Timer;
