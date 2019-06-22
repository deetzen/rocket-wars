import Player from './game/Player';

import {
  ADD_PLAYER,
  DISCONNECT,
  FIRE_REQUEST,
  KEYDOWN,
  KEYUP,
  PLAYER_CREATED
} from '../events';

const listener = (game, io) => {
  io.on('connect', socketServer => {
    game.sound.setSocket(socketServer);
    game.sound.setIo(io);

    socketServer.on(ADD_PLAYER, remotePlayer => {
      const player = new Player(game.stage, {
        id: socketServer.id,
        game,
        name: remotePlayer.name,
        color: remotePlayer.color
      });

      game.addPlayer(player);

      const result = { id: player.id, name: player.name, color: player.color };

      io.emit(PLAYER_CREATED, result);

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
      game.objects.forEach(object => {
        if (object.player && object.player.id === socketServer.id) {
          game.removeObject(object);
        }
      });

      game.players.delete(socketServer.id);
    });

    socketServer.on(FIRE_REQUEST, data => {
      game.objects.get(data).fire();
    });

    socketServer.on(KEYDOWN, event => {
      if (game.players.has(event.player)) {
        const player = game.players.get(event.player);
        const { keyboard } = player;

        keyboard.onKeydown(event);
      }
    });

    socketServer.on(KEYUP, event => {
      if (game.players.has(event.player)) {
        const player = game.players.get(event.player);
        const { keyboard } = player;

        keyboard.onKeyup(event);
      }
    });
  });
};

export default listener;
