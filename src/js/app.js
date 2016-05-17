import Game from './game';
import Player from './player';
import Keyboard from './keyboard';

(function() {
    let game = new Game();

    let player1 = new Player({
        name: 'Player 1',
        color: '#EB2A2A',
        keyboard: new Keyboard(38, 39, 40, 37, 16)
    });

    let player2 = new Player({
        name: 'Player 2',
        color: '#2AEB2A',
        keyboard: new Keyboard(87, 68, 83, 65, 32)
    });

    game.addPlayer(player1);
    game.addPlayer(player2);

    game.start();
})();