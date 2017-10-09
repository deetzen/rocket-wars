const register = require('babel-register');

const express = require('express');

const app = express();
const httpServer = require('http').Server(app);

const io = require('socket.io')(httpServer);

const Player = require('./server/game/player').default;
const Game = require('./server/game/game').default;
const Stage = require('./server/game/stage').default;
const Sound = require('./server/game/sound').default;

const Keyboard = require('./server/game/keyboard').default;
const EVENTS = require('./events');

const stage = new Stage();
const sound = new Sound(io);

const game = new Game(io, stage, sound);
game.start();

httpServer
  .listen(8442, () => {
    console.log('server running: http://localhost:8442');
  });

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Xss-Protection', '1; mode=block');

  return next();
});

app.use(express.static(`${__dirname}/client`));

io.on('connect', (socket) => {
  sound.setSocket(socket);

  socket.on(EVENTS.ADD_PLAYER, (remotePlayer) => {
    const player = new Player(stage, {
      id: socket.id,
      game,
      name: remotePlayer.name,
      color: remotePlayer.color,
      keyboard: new Keyboard(38, 39, 40, 37, 32),
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

  socket.on(EVENTS.DISCONNECT, () => {
    game.objects.forEach((object) => {
      if (object.player && object.player.id === socket.id) {
        game.removeObject(object);
      }
    });
    game.players.delete(socket.id);
  });

  socket.on(EVENTS.FIRE_REQUEST, (data) => {
    game.objects.get(data).fire();
  });

  socket.on(EVENTS.KEYDOWN, (event) => {
    if (game.players.has(event.player)) {
      const player = game.players.get(event.player);
      const keyboard = player.keyboard;
      keyboard.onKeydown(event);
    }
  });

  socket.on(EVENTS.KEYUP, (event) => {
    if (game.players.has(event.player)) {
      const player = game.players.get(event.player);
      const keyboard = player.keyboard;
      keyboard.onKeyup(event);
    }
  });
});
