import {HOSTNAME} from '../../constants';
import io from 'socket.io-client/socket.io.js';

(function() {
    'use strict';

    let socket = io(HOSTNAME);

    socket.emit('add player', {
        name: "Rocket Warrior " + Math.round(Math.random() * 5000)
    });

    document.addEventListener('devicemotion', function (e) {
        console.log(e.acceleration);
        document.getElementById('content').innerHTML = e.acceleration;
    }, true);

    document.addEventListener('touchend', function (e) {
        socket.emit('keyup', { player: socket.nsp + '#' + socket.id, keyCode: 48, percent: 100 });
    });

    document.addEventListener('touchstart', function (e) {
        socket.emit('keydown', { player: socket.nsp + '#' + socket.id, keyCode: 48, percent: 100 });
    });
})();
