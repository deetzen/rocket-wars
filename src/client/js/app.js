import {PLAY_SOUND,UPDATE_PLAYERS,UPDATE_OBJECTS} from '../../events';
import {STAGE_WIDTH, STAGE_HEIGHT} from '../../constants';
import {HOSTNAME} from '../../constants';
import Game from './game/game';
import Player from './game/player';
import SpriteLibrary from './sprite/library';
import Skin from './sprite/skin';
import FlyingObject from './objects/flying-object';
import io from '../../../node_modules/socket.io-client/dist/socket.io.js';

let socket = io(HOSTNAME);
const game = new Game(socket);

let scaleX = 1;
let scaleY = 1;

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

    socket.on(UPDATE_OBJECTS, function (objects) {
        game.objects.splice(0, game.objects.length);

        for (let object in objects) {
            let newObject = new FlyingObject();
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
        socket.emit('keydown', { player: socket.id, keyCode: event.keyCode, percent: 100 });
    });

    document.addEventListener('keyup', (event) => {
        socket.emit('keyup', { player: socket.id, keyCode: event.keyCode, percent: 100 });
    });

    window.onresize = () => {
        if (game.canvas) {
            game.canvas.width = window.innerWidth;
            game.canvas.height = window.innerHeight;
        }

        scaleX = game.canvas.width / STAGE_WIDTH;
        scaleY = game.canvas.height / STAGE_HEIGHT;
    };

    let startGameFunction = function (e)
    {
        let playerName = document.getElementById('playerName').value;
        if (playerName) {
            game.start(playerName)
        }

        scaleX = game.canvas.width / STAGE_WIDTH;
        scaleY = game.canvas.height / STAGE_HEIGHT;

        e.preventDefault();
    };

    let form = document.getElementById('gameForm');
    if(form.addEventListener){
        form.addEventListener("submit", startGameFunction, false);
    }else if(ele.attachEvent){
        form.attachEvent('onsubmit', startGameFunction);
    }
});