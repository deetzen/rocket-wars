(function() {
    'use strict';

    let register = require('babel-register');
    
    let express = require('express');
    let fs = require('fs');

    let privateKey  = fs.readFileSync('certificates/rocket-wars.de.free.key', 'utf8');
    let certificate = fs.readFileSync('certificates/rocket-wars.de.crt', 'utf8');
    let credentials = {key: privateKey, cert: certificate};

    let app = express();
    let https_server = require('https').Server(credentials, app);
    let http_server = require('http').Server(app);

    let io = require('socket.io')(https_server);

    let Player = require('./server/game/player').default;
    let Game = require('./server/game/game').default;
    let Stage = require('./server/game/stage').default;
    let Sound = require('./server/game/sound').default;

    let Keyboard = require('./server/game/keyboard').default;
    let EVENTS = require('./events');

    let stage = new Stage();
    let sound = new Sound(io);

    let game = new Game(io, stage, sound);
    game.start();

    http_server.listen(1233);
    https_server.listen(1234);

    app.use(function(req, res, next) {
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "SAMEORIGIN");
        res.setHeader("X-Xss-Protection", "1; mode=block");
        res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubdomains; preload");
        res.setHeader("Content-Security-Policy", "script-src 'self' https://rocket-wars.de:* https://ajax.googleapis.com https://ssl.google-analytics.com 'sha256-wBhFPZwc6Udf8DqLnOu/HBPPqkoOveSyuhlS/nNXQo0='; object-src 'self'");
        return next();
    });

    app.use(express.static('public'));

    io.on('connect', function (socket) {
        'use strict';

        sound.setSocket(socket);

        socket.on(EVENTS.ADD_PLAYER, function (remotePlayer) {

            let player = new Player(stage, {
                id: socket.id,
                game: game,
                name: remotePlayer.name,
                color: remotePlayer.color,
                keyboard: new Keyboard(38, 39, 40, 37, 32)
            });

            game.addPlayer(player);

            var result = { id: player.id, name: player.name, color: player.color };

            io.emit(EVENTS.PLAYER_CREATED, result);

            setInterval(function () {
                if(player.keyboard.isDown(player.keyboard.keys.up.keyCode)) { player.character.speedUp(player.keyboard.keys.up.percent); }
                if(player.keyboard.isDown(player.keyboard.keys.down.keyCode)) { player.character.speedDown(player.keyboard.keys.down.percent); }
                if(player.keyboard.isDown(player.keyboard.keys.right.keyCode)) { player.character.rotateRight(player.keyboard.keys.right.percent); }
                if(player.keyboard.isDown(player.keyboard.keys.left.keyCode)) { player.character.rotateLeft(player.keyboard.keys.left.percent); }
                if(player.keyboard.isDown(player.keyboard.keys.fire.keyCode) && !player.character.isFiring) { player.character.fire(player.keyboard.keys.fire.percent); }
            }, 10);
        });

        socket.on(EVENTS.DISCONNECT, function() {
            game.objects.forEach((object) => {
                if (object.player && object.player.id === socket.id) {
                    game.removeObject(object);
                }
            });
            game.players.delete(socket.id);
        });

        socket.on(EVENTS.FIRE_REQUEST, function (data) {
            game.objects.get(data).fire();
        });

        socket.on(EVENTS.KEYDOWN, function (event) {
            if(game.players.has(event.player)) {
                var player = game.players.get(event.player);
                var keyboard = player.keyboard;
                keyboard.onKeydown(event);
            }
        });

        socket.on(EVENTS.KEYUP, function (event) {
            if(game.players.has(event.player)) {
                var player = game.players.get(event.player);
                var keyboard = player.keyboard;
                keyboard.onKeyup(event);
            }
        });
    });

})();
