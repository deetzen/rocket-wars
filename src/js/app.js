import Game from './game';
import FlyingObject from './flying-object';
import Keyboard from './keyboard';

let game = new Game();

let rocket = new FlyingObject({
    keyboard: new Keyboard(38, 39, 40, 37, 16),
    x: 40,
    y: window.innerHeight / 2,
    color: '#193441',
    unicode: '\uf0fb'
});
let rocket2 = new FlyingObject({
    keyboard: new Keyboard(87, 68, 83, 65, 32),
    x: window.innerWidth - 40,
    y: window.innerHeight / 2,
    color: '#91AA9D',
    unicode: '\uf0fb',
    rotation: 180
});

game.addFlyingObject(rocket);
game.addFlyingObject(rocket2);

game.start();