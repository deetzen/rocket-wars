import buntstift from 'buntstift';
import { ADD_PLAYER, PLAYER_CREATED, DISCONNECT, FIRE_REQUEST, KEYDOWN, KEYUP } from '../events';
import { SERVER_PORT } from '../constants';
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

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Xss-Protection', '1; mode=block');

  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");

  return next();
});

server.listen(SERVER_PORT, () => {
  buntstift.info('Backend running: http://localhost:8181');
});

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
      const keyboard = player.keyboard;

      keyboard.onKeydown(event);
    }
  });

  socketServer.on(KEYUP, event => {
    if (game.players.has(event.player)) {
      const player = game.players.get(event.player);
      const keyboard = player.keyboard;

      keyboard.onKeyup(event);
    }
  });
});
