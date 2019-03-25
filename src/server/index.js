import buntstift from 'buntstift';
import EVENTS from '../events';
import express from 'express';
import Game from './game/Game';
import Player from './player/Player';
import { Server } from 'http';
import socket from 'socket.io';

const app = express();
const server = new Server(app);
const io = socket(server);

const game = new Game(io);

game.start();

server.listen(8181, () => {
  buntstift.info('server running: http://localhost:8181');
});

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Xss-Protection', '1; mode=block');

  return next();
});

app.use(express.static(`${__dirname}/../../public`));

io.on('connect', socketServer => {
  game.sound.setSocket(socketServer);
  game.sound.setIo(io);

  socketServer.on(EVENTS.ADD_PLAYER, remotePlayer => {
    const player = new Player(game.stage, {
      id: socketServer.id,
      game,
      name: remotePlayer.name,
      color: remotePlayer.color
    });

    game.addPlayer(player);

    const result = { id: player.id, name: player.name, color: player.color };

    io.emit(EVENTS.PLAYER_CREATED, result);

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

  socketServer.on(EVENTS.DISCONNECT, () => {
    game.objects.forEach(object => {
      if (object.player && object.player.id === socketServer.id) {
        game.removeObject(object);
      }
    });
    game.players.delete(socketServer.id);
  });

  socketServer.on(EVENTS.FIRE_REQUEST, data => {
    game.objects.get(data).fire();
  });

  socketServer.on(EVENTS.KEYDOWN, event => {
    if (game.players.has(event.player)) {
      const player = game.players.get(event.player);
      const keyboard = player.keyboard;

      keyboard.onKeydown(event);
    }
  });

  socketServer.on(EVENTS.KEYUP, event => {
    if (game.players.has(event.player)) {
      const player = game.players.get(event.player);
      const keyboard = player.keyboard;

      keyboard.onKeyup(event);
    }
  });
});
