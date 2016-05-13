import Game from './game';
import FlyingObject from './flying-object';
import Keyboard from './keyboard';

let game = new Game();

let rocketSize = 45;

let rocket = new FlyingObject({
    keyboard: new Keyboard(38, 39, 40, 37, 16),
    size: rocketSize,
    x: rocketSize,
    y: window.innerHeight / 2,
    color: '#EB2A2A',
    unicode: '\uf0fb',
    infinite: true
});

let rocket2 = new FlyingObject({
    keyboard: new Keyboard(87, 68, 83, 65, 32),
    size: rocketSize,
    x: window.innerWidth - rocketSize,
    y: window.innerHeight / 2,
    color: '#34AB29',
    unicode: '\uf0fb',
    rotation: 180,
    infinite: true
});

game.addFlyingObject(rocket);
game.addFlyingObject(rocket2);

game.start();