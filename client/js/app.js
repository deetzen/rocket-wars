import {ADD_PLAYER,UPDATE_PLAYERS,UPDATE_OBJECTS} from '../../events';
import {STAGE_WIDTH,STAGE_HEIGHT} from '../../constants';
import {HOSTNAME} from '../../constants';
import Game from './game/game';
import Player from './game/player';
import SpriteLibrary from './skin/library';
import Skin from './skin/skin';
import FlyingObject from './objects/flying-object';
import io from 'socket.io-client/socket.io.js';

(function() {

    let socket = io(HOSTNAME);
    let game = new Game(socket);

    let scaleX = game.canvas.width / STAGE_WIDTH;
    let scaleY = game.canvas.height / STAGE_HEIGHT;

    let spriteLibrary = new SpriteLibrary();

    Promise.all([
        spriteLibrary.addSprite('shield','images/weapons/shield_frames.png', 280, 280, 90),
        spriteLibrary.addSprite('rocket-1','images/rocket1up_spr_strip5.png', 71, 80, 90),
        spriteLibrary.addSprite('bullet-1','images/playerbullet1_spr_strip6.png', 39, 70, 180),
        spriteLibrary.addSprite('asteroid-7','images/asteroids/asteroid_07.png', 250, 300, 0),
        spriteLibrary.addSprite('explosion','images/explosion.png', 128, 128, 0),
        spriteLibrary.addSprite('powerup-shield','images/power-ups/powerup_04.png', 100, 100, 0),
        spriteLibrary.addSprite('powerup-ammo','images/power-ups/powerup_06.png', 100, 100, 0),
        spriteLibrary.addSprite('powerup-permanentfire','images/power-ups/powerup_08.png', 100, 100, 0)
    ]).then(() => {

        let playerName = 'henry';

        socket.emit(ADD_PLAYER, {
            name: playerName,
            color: '#00B806'
        });

        socket.on(UPDATE_OBJECTS, function (objects) {
            game.objects.splice(0, game.objects.length);
            for(let object in objects) {
                let newObject = new FlyingObject(objects[object].type);
                const sprite = spriteLibrary.sprites.get(objects[object].sprite.id);
                newObject.id = objects[object].id;
                newObject.x = objects[object].x * scaleX;
                newObject.y = objects[object].y * scaleY;
                newObject.shield = objects[object].shield;
                newObject.size = objects[object].size * scaleX;
                newObject.context = game.context;
                newObject.label = objects[object].label;
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

            for(let player in players) {
                game.addPlayer(new Player({
                    id: players[player].id,
                    name: players[player].name,
                    color: players[player].color,
                    shield: players[player].shield,
                    ammo: players[player].ammo,
                    score: players[player].score
                }));
            }
        });

        document.addEventListener('keydown', (event) => {
            socket.emit('keydown', { player: socket.nsp + '#' + socket.id, keyCode: event.keyCode });
        });

        document.addEventListener('keyup', (event) => {
            socket.emit('keyup', { player: socket.nsp + '#' + socket.id, keyCode: event.keyCode });
        });

        window.onresize = () => {
            game.canvas.width = window.innerWidth;
            game.canvas.height = window.innerHeight;

            scaleX = game.canvas.width / STAGE_WIDTH;
            scaleY = game.canvas.height / STAGE_HEIGHT;
        };






    });

})();