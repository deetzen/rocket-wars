import Object from './object/Object';
import Game from './game/Game';
import IoClient from 'socket.io-client/dist/socket.io.js';
import Player from './game/Player';
import Skin from './sprite/Skin';
import SpriteLibrary from './sprite/SpriteLibrary';

import { SERVER_PORT, STAGE_HEIGHT, STAGE_WIDTH } from '../../constants';
import { PLAY_SOUND, UPDATE_OBJECTS, UPDATE_PLAYERS } from '../../events';

const socket = new IoClient(':'+SERVER_PORT);
const game = new Game(socket);

const spriteLibrary = new SpriteLibrary();
let scaleX = 1;
let scaleY = 1;

Promise.all([
  spriteLibrary.addSprite('shield', 'images/weapons/shield_frames.png', 280, 280, 135),
  spriteLibrary.addSprite('rocket-1', 'images/rocket1up_spr_strip5.png', 80, 71, 90),
  spriteLibrary.addSprite('bullet-1', 'images/playerbullet1_spr_strip6.png', 39, 70, 180),
  spriteLibrary.addSprite('planet-1', 'images/backgrounds/background_02_parallax_03.png', 836, 836, 0),
  spriteLibrary.addSprite('planet-2', 'images/backgrounds/background_01_parallax_03.png', 574, 574, 0),
  spriteLibrary.addSprite('planet-3', 'images/backgrounds/background_01_parallax_04.png', 806, 806, 0),
  spriteLibrary.addSprite('asteroid-7', 'images/asteroids/asteroid_07_with_cracks.png', 250, 300, 0),
  spriteLibrary.addSprite('explosion', 'images/explosions/explosion.png', 140, 140, 0),
  spriteLibrary.addSprite('powerup-shield', 'images/power-ups/powerup_04.png', 100, 100, 0),
  spriteLibrary.addSprite('powerup-ammo', 'images/power-ups/powerup_06.png', 100, 100, 0),
  spriteLibrary.addSprite('powerup-permanentfire', 'images/power-ups/powerup_08.png', 100, 100, 0)
]).then(() => {
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
            const newObject = new Object();
            const sprite = spriteLibrary.sprites.get(objects[object].sprite.id);

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

      document.addEventListener('keydown', event => {
        socket.emit('keydown', { player: socket.id, keyCode: event.keyCode, percent: 100 });
      });

      document.addEventListener('keyup', event => {
        socket.emit('keyup', { player: socket.id, keyCode: event.keyCode, percent: 100 });
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
});
