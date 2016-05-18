import Game from './game';
import Player from './player';
import Keyboard from './keyboard';

(function() {
    let game = new Game();

    let player1 = new Player({
        name: 'Player 1',
        color: '#00B806',
        keyboard: new Keyboard(38, 39, 40, 37, 48)
    });

    let player2 = new Player({
        name: 'Player 2',
        color: '#00A6BF',
        keyboard: new Keyboard(87, 68, 83, 65, 70)
    });

    game.addPlayer(player1);
    game.addPlayer(player2);

    game.start();
})();