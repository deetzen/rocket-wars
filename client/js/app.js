import {ADD_PLAYER,PLAY_SOUND,UPDATE_PLAYERS,UPDATE_OBJECTS} from '../../events';
import {HOSTNAME,STAGE_WIDTH,STAGE_HEIGHT} from '../../constants';
import Game from './game/game';
import Player from './game/player';
import SpriteLibrary from './sprite/library';
import Skin from './sprite/skin';
import FlyingObject from './objects/flying-object';
import io from 'socket.io-client/socket.io.js';

(function() {
    'use strict';

    let socket = io(HOSTNAME);
    let game = new Game(socket);

    // antialiasing for canvas ;)
    game.context.translate(0.5, 0.5);

    let playerName = '';
    while (!playerName) {
        playerName = prompt("Please enter your name", "Rocket Warrior " + Math.round(Math.random() * 5000));
    }

    socket.emit(ADD_PLAYER, {
        name: playerName
    });

    let scaleX = game.canvas.width / STAGE_WIDTH;
    let scaleY = game.canvas.height / STAGE_HEIGHT;

    let spriteLibrary = new SpriteLibrary();
    Promise.all([
        spriteLibrary.addSprite('game-background-1', 'images/backgrounds/background_02_parallax_01.png', 2448, 1936, 0),
        spriteLibrary.addSprite('shield','images/weapons/shield_frames.png', 280, 280, 135),
        spriteLibrary.addSprite('rocket-1','images/rocket1up_spr_strip5.png', 80, 71, 90),
        spriteLibrary.addSprite('bullet-1','images/playerbullet1_spr_strip6.png', 39, 70, 180),
        spriteLibrary.addSprite('planet-1','images/backgrounds/background_02_parallax_03.png', 836, 836, 0),
        spriteLibrary.addSprite('planet-2','images/backgrounds/background_01_parallax_03.png', 574, 574, 0),
        spriteLibrary.addSprite('planet-3','images/backgrounds/background_01_parallax_04.png', 806, 806, 0),
        spriteLibrary.addSprite('asteroid-7','images/asteroids/asteroid_07_with_cracks.png', 250, 300, 0),
        spriteLibrary.addSprite('explosion','images/explosions/explosion.png', 140, 140, 0),
        spriteLibrary.addSprite('powerup-shield','images/power-ups/powerup_04.png', 100, 100, 0),
        spriteLibrary.addSprite('powerup-ammo','images/power-ups/powerup_06.png', 100, 100, 0),
        spriteLibrary.addSprite('powerup-permanentfire','images/power-ups/powerup_08.png', 100, 100, 0)
    ]).then(() => {

        let backgroundSprite = spriteLibrary.sprites.get('game-background-1');
        game.setBackground(new Skin(backgroundSprite, 0));

        socket.on(UPDATE_OBJECTS, function (objects) {
            game.objects.splice(0, game.objects.length);

            for (let object in objects) {
                let newObject = new FlyingObject();
                const sprite = spriteLibrary.sprites.get(objects[object].sprite.id);
                newObject.id = objects[object].id;
                newObject.x = objects[object].x;
                newObject.y = objects[object].y;
                newObject.shield = objects[object].shield;
                newObject.size = objects[object].size;
                newObject.context = game.context;
                newObject.player = objects[object].player;
                newObject.visible = objects[object].visible;
                newObject.rotation = objects[object].rotation;
                newObject.unicode = objects[object].unicode;
                newObject.skin = new Skin(sprite, objects[object].sprite.currentFrame);

                game.addObject(newObject);
            }

            game.drawCanvas();
        });

        socket.on(UPDATE_PLAYERS, function (players) {
            game.players.splice(0, game.players.length);

            for (let player in players) {
                game.addPlayer(new Player({
                    id: players[player].id,
                    name: players[player].name,
                    color: players[player].color,
                    ammo: players[player].ammo,
                    score: players[player].score
                }));
            }
        });

        socket.on(PLAY_SOUND, function (sound) {
            var snd = new Audio('sounds/' + sound + '.wav');
            snd.play();
        });

        document.addEventListener('keydown', (event) => {
            socket.emit('keydown', { player: socket.nsp + '#' + socket.id, keyCode: event.keyCode, percent: 100 });
        });

        document.addEventListener('keyup', (event) => {
            socket.emit('keyup', { player: socket.nsp + '#' + socket.id, keyCode: event.keyCode, percent: 100 });
        });

        window.onresize = () => {
            game.canvas.width = window.innerWidth;
            game.canvas.height = window.innerHeight;

            scaleX = game.canvas.width / STAGE_WIDTH;
            scaleY = game.canvas.height / STAGE_HEIGHT;
        };
    });
})();