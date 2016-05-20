import {ADD_PLAYER,UPDATE_PLAYERS,AMMO_CREATED,UPDATE_OBJECTS} from '../../events';
import {HOSTNAME} from '../../constants';
import Game from './game/game';
import Player from './game/player';
import SkinLibrary from './skin/library';
import Skin from './skin/skin';
import FlyingObject from './objects/flying-object';
import io from 'socket.io-client/socket.io.js';

(function() {

    let socket = io(HOSTNAME);
    let game = new Game(socket);

    let skinLibrary = new SkinLibrary();
    skinLibrary.addSkin('images/rocket1up_spr_strip5.png', 71, 80, 90);
    skinLibrary.addSkin('images/playerbullet1_spr_strip6.png', 39, 70, 180);

    let playerName = 'henry';

    socket.emit(ADD_PLAYER, {
        name: playerName,
        color: '#00B806'
    });
    
    socket.on(UPDATE_OBJECTS, function (objects) {
        game.objects.splice(0, game.objects.length);

        for(let object in objects)
        {
            let newObject = new FlyingObject(objects[object].type);
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
            newObject.skin = new Skin(skinLibrary, objects[object].skin.imageSource, objects[object].skin.currentFrame);

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
    
})();