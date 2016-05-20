(function() {
    'use strict';

    let register = require('babel-register');
    
    let express = require('express');

    let app = express();
    let server = require('http').Server(app);
    let io = require('socket.io')(server);

    let Player = require('./server/game/player').default;
    let Game = require('./server/game/game').default;
    let Stage = require('./server/game/stage').default;

    let Keyboard = require('./server/game/keyboard').default;
    let EVENTS = require('./events');

    let stage = new Stage();

    let game = new Game(io, stage);
    game.start();

    server.listen(1234);

    app.use(express.static('public'));

    io.on('connect', function (socket) {
        'use strict';

        console.log('client connected');

        socket.on(EVENTS.ADD_PLAYER, function (player) {

            let newPlayer = new Player(stage, {
                id: socket.id,
                name: player.name,
                color: player.color,
                keyboard: new Keyboard(38, 39, 40, 37, 48)
            });

            game.addPlayer(newPlayer);

            var result = { id: newPlayer.id, name: newPlayer.name, color: newPlayer.color };

            io.emit(EVENTS.PLAYER_CREATED, result);

            setInterval(function () {
                if(newPlayer.keyboard.isDown(newPlayer.keyboard.up)) { newPlayer.character.speedUp(); }
                if(newPlayer.keyboard.isDown(newPlayer.keyboard.down)) { newPlayer.character.speedDown(); }
                if(newPlayer.keyboard.isDown(newPlayer.keyboard.right)) { newPlayer.character.rotateRight(); }
                if(newPlayer.keyboard.isDown(newPlayer.keyboard.left)) { newPlayer.character.rotateLeft(); }
                if(newPlayer.keyboard.isDown(newPlayer.keyboard.fire) && !newPlayer.character.isFiring) { newPlayer.character.fire(); }
            }, 10);
        });

        socket.on('disconnect', function() {
            game.objects.forEach((object) => {
                if (object.player && object.player.id === socket.id) {
                    game.removeObject(object);
                }
            });
            game.players.delete(socket.id);
        });

        socket.on(EVENTS.MOVE_PLAYER, function (data) {
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

})();
