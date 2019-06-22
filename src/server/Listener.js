'use strict';

const Player = require('./Player/Player');

const {
  ADD_PLAYER,
  DISCONNECT,
  FIRE_REQUEST,
  KEYDOWN,
  KEYUP,
  PLAYER_CREATED
} = require('../events');

class Listener {
  constructor (game, io) {
    this.io = io;
    this.game = game;
  }

  listen () {
    this.io.on('connect', socketServer => {
      this.game.sound.setSocket(socketServer);
      this.game.sound.setIo(this.io);

      socketServer.on(ADD_PLAYER, ({ name, color }) => {
        const player = new Player(this.game.stage, {
          id: socketServer.id,
          game: this.game,
          name,
          color
        });

        this.game.addPlayer(player);

        const result = { id: player.id, name: player.name, color: player.color };

        this.io.emit(PLAYER_CREATED, result);

        setInterval(() => {
          if (player.keyboard.isDown(player.keyboard.keys.up.keyCode)) {
            player.character.speedUp(player.keyboard.keys.up.percent);
          }
          if (player.keyboard.isDown(player.keyboard.keys.down.keyCode)) {
            player.character.speedDown(player.keyboard.keys.down.percent);
          }
          if (player.keyboard.isDown(player.keyboard.keys.right.keyCode)) {
            player.character.rotateRight(player.keyboard.keys.right.percent);
          }
          if (player.keyboard.isDown(player.keyboard.keys.left.keyCode)) {
            player.character.rotateLeft(player.keyboard.keys.left.percent);
          }
          if (player.keyboard.isDown(player.keyboard.keys.fire.keyCode) && !player.character.isFiring) {
            player.character.fire(player.keyboard.keys.fire.percent);
          }
        }, 10);
      });

      socketServer.on(DISCONNECT, () => {
        this.game.objects.forEach(object => {
          if (object.player && object.player.id === socketServer.id) {
            this.game.removeObject(object);
          }
        });

        this.game.players.delete(socketServer.id);
      });

      socketServer.on(FIRE_REQUEST, data => {
        this.game.objects.get(data).fire();
      });

      socketServer.on(KEYDOWN, event => {
        if (this.game.players.has(event.player)) {
          const player = this.game.players.get(event.player);
          const { keyboard } = player;

          keyboard.onKeydown(event);
        }
      });

      socketServer.on(KEYUP, event => {
        if (this.game.players.has(event.player)) {
          const player = this.game.players.get(event.player);
          const { keyboard } = player;

          keyboard.onKeyup(event);
        }
      });
    });
  }
}

module.exports = Listener;
