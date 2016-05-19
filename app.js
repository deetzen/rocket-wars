var register = require('babel-register');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Player = require('./server/game/player').default;
var Game = require('./server/game/game').default;
var Stage = require('./server/game/stage').default;

var Keyboard = require('./server/game/keyboard').default;
var EVENTS = require('./events');

var stage = new Stage();

var game = new Game(io, stage);
game.start();

server.listen(1234);

app.use(express.static('client'));

io.on('connect', function (socket) {
    
    console.log('client connected');

    socket.on(EVENTS.ADD_PLAYER, function (player) {
        
        var player = new Player(stage, {
            id: socket.id,
            name: player.name,
            color: player.color,
            keyboard: new Keyboard(38, 39, 40, 37, 48)
        });

        game.addPlayer(player);

        var result = { id: player.id, name: player.name, color: player.color };
        
        io.emit(EVENTS.PLAYER_CREATED, result);

        setInterval(function () {
            if(player.keyboard.isDown(player.keyboard.up)) { player.character.speedUp(); }
            if(player.keyboard.isDown(player.keyboard.down)) { player.character.speedDown(); }
            if(player.keyboard.isDown(player.keyboard.right)) { console.log('rotate right'); player.character.rotateRight(); }
            if(player.keyboard.isDown(player.keyboard.left)) { player.character.rotateLeft(); }
            if(player.keyboard.isDown(player.keyboard.fire) && !player.character.isFiring) { player.character.fire(); }
        }, 10);
    });
    
    socket.on(EVENTS.MOVE_PLAYER, function (data) {
        console.log(data);
        switch(data.translate) {
            case 'rotateRight':
                game.objects.get(data.id).rotateRight();
                break;
            case 'rotateLeft':
                game.objects.get(data.id).rotateLeft();
                break;
            case 'speedUp':
                game.objects.get(data.id).speedUp();
                break;
            case 'speedDown':
                game.objects.get(data.id).speedDown();
                break;
        }
    });
    
    socket.on(EVENTS.FIRE_REQUEST, function (data) {
        game.objects.get(data).fire();
    });
    
    socket.on('keydown', function (event) {
        if(game.players.has(event.player)) {
            var player = game.players.get(event.player);
            var keyboard = player.keyboard;
            keyboard.onKeydown(event);
        }
    });

    socket.on('keyup', function (event) {
        if(game.players.has(event.player)) {
            var player = game.players.get(event.player);
            var keyboard = player.keyboard;
            keyboard.onKeyup(event);
        }
    });
});