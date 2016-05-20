import {ADD_PLAYER,UPDATE_PLAYERS,AMMO_CREATED,UPDATE_OBJECTS} from '../../events';
import {HOSTNAME} from '../../constants';
import Game from './game/game';
import Player from './game/player';
import Skin from './skin/skin';
import Ammo from './objects/ammo';
import Factory from './objects/factory';
import io from 'socket.io-client/socket.io.js';

(function() {

    let socket = io(HOSTNAME);
    let game = new Game(socket);

    let playerName = 'henry';

    socket.emit(ADD_PLAYER, {
        name: playerName,
        color: '#00B806'
    });
    
    socket.on(UPDATE_OBJECTS, function (objects) {
        game.objects.splice(0, game.objects.length);

        let ObjectFactory = new Factory();
        for(let object in objects)
        {
            let newObject = ObjectFactory.create(objects[object].type);
            newObject.id = objects[object].id;
            newObject.x = objects[object].x;
            newObject.y = objects[object].y;
            newObject.context = game.context;
            newObject.player = objects[object].player;
            newObject.visible = objects[object].visible;
            newObject.rotation = objects[object].rotation;
            newObject.unicode = objects[object].unicode;
            newObject.skin = new Skin(objects[object].skin, game.context);

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
                ammp: players[player].ammo
            }));
        }
    });

    socket.on(AMMO_CREATED, function (newAmmo) {
        let ammo = new Ammo({
            x: newAmmo.x,
            y: newAmmo.y,
            size: newAmmo.size,
            player: game.players[newAmmo.player],
            color: newAmmo.color
        });
        
        game.addObject(ammo);
    });

    document.addEventListener('keydown', (event) => {
        socket.emit('keydown', { player: socket.nsp + '#' + socket.id, keyCode: event.keyCode });
    });
    
    document.addEventListener('keyup', (event) => {
        socket.emit('keyup', { player: socket.nsp + '#' + socket.id, keyCode: event.keyCode });
    });
    
})();