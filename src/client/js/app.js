'use strict';

const IoClient = require('socket.io-client/dist/socket.io.js');

const GameObject = require('./classes/FlyingObject');
const Game = require('./classes/Game');
const Player = require('./classes/Player');
const Skin = require('./classes/Skin');

const { SERVER_PORT, STAGE_HEIGHT, STAGE_WIDTH } = require('../../constants');
const { PLAY_SOUND, UPDATE_OBJECTS, UPDATE_PLAYERS } = require('../../events');
const sprites = require('./sprites');

const socket = new IoClient(`:${SERVER_PORT}`);
const game = new Game(socket);

let scaleX = 1;
let scaleY = 1;

const startGameFunction = event => {
  const playerName = document.getElementById('playerName').value;

  if (playerName) {
    game.start(playerName);

    window.onresize = () => {
      if (game.canvas) {
        game.canvas.width = window.innerWidth;
        game.canvas.height = window.innerHeight;
      }

      scaleX = game.canvas.width / STAGE_WIDTH;
      scaleY = game.canvas.height / STAGE_HEIGHT;
    };

    socket.on(UPDATE_OBJECTS, objects => {
      game.objects.splice(0, game.objects.length);

      for (const object in objects) {
        if (objects) {
          const newObject = new GameObject();
          const sprite = sprites.get(objects[object].sprite.id);

          newObject.id = objects[object].id;
          newObject.x = objects[object].x * scaleX;
          newObject.y = objects[object].y * scaleY;
          newObject.shield = objects[object].shield;
          newObject.size = objects[object].size;
          newObject.context = game.context;
          newObject.player = objects[object].player;
          newObject.visible = objects[object].visible;
          newObject.label = objects[object].label;
          newObject.rotation = objects[object].rotation;
          newObject.unicode = objects[object].unicode;
          newObject.skin = new Skin(sprite, objects[object].sprite.currentFrame, objects[object].sprite.alpha);

          game.addObject(newObject);
        }
      }

      game.drawCanvas();
    });

    socket.on(UPDATE_PLAYERS, players => {
      game.players.splice(0, game.players.length);

      for (const player in players) {
        if (player) {
          game.addPlayer(new Player({
            id: players[player].id,
            name: players[player].name,
            color: players[player].color,
            ammo: players[player].ammo,
            score: players[player].score
          }));
        }
      }
    });

    socket.on(PLAY_SOUND, sound => {
      const snd = new Audio(`sounds/${sound}.wav`);

      snd.play();
    });

    document.addEventListener('keydown', keyEvent => {
      socket.emit('keydown', { player: socket.id, keyCode: keyEvent.keyCode, percent: 100 });
    });

    document.addEventListener('keyup', keyEvent => {
      socket.emit('keyup', { player: socket.id, keyCode: keyEvent.keyCode, percent: 100 });
    });
  }

  scaleX = game.canvas.width / STAGE_WIDTH;
  scaleY = game.canvas.height / STAGE_HEIGHT;

  event.preventDefault();
};

const form = document.getElementById('gameForm');

if (form.addEventListener) {
  form.addEventListener('submit', startGameFunction, false);
} else if (form.attachEvent) {
  form.attachEvent('onsubmit', startGameFunction);
}
