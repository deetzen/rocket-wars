import {ADD_PLAYER,PLAYER_CREATED,AMMO_CREATED,UPDATE_OBJECTS} from '../../events';
import {HOSTNAME} from '../../constants';
import Game from './game';
import Player from './player';
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
        
        for(let object in objects) {
            let newObject = ObjectFactory.create(objects[object].type);
            newObject.id = objects[object].id;
            newObject.x = objects[object].x;
            newObject.y = objects[object].y;
            newObject.context = game.context;
            newObject.visible = objects[object].visible;
            newObject.rotation = objects[object].rotation;
            newObject.unicode = objects[object].unicode;
            newObject.skin = new Skin(objects[object].skin, game.context);

            game.addObject(newObject);
        }
        
        game.updateCanvas();
    });
    
    socket.on(PLAYER_CREATED, function (newPlayer) {

        console.log('player with id ' + newPlayer.id + ' was created on server');

        let player = new Player({
            id: newPlayer.id,
            name: newPlayer.name,
            color: newPlayer.color
        });
        
        game.addPlayer(player);
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