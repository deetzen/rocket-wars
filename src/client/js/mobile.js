const { HOSTNAME } = require('../../constants');
const io = require('../../../node_modules/socket.io-client/dist/socket.io.js');

const socket = io(HOSTNAME);

socket.emit('add player', {
  name: `Rocket Warrior ${Math.round(Math.random() * 5000)}`
});

document.addEventListener('devicemotion', event => {
  document.getElementById('content').innerHTML = event.acceleration;
}, true);

document.addEventListener('touchend', () => {
  socket.emit('keyup', { player: socket.id, keyCode: 32, percent: 100 });
});

document.addEventListener('touchstart', () => {
  socket.emit('keydown', { player: socket.id, keyCode: 32, percent: 100 });
});
