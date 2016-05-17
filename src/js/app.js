import Game from './game';
import Player from './player';
import Keyboard from './keyboard';

(function() {
    let game = new Game();

    var player1_name = prompt("Name of player 1", "");
    let player1 = new Player({
        name: player1_name,
        color: '#00B806',
        keyboard: new Keyboard(38, 39, 40, 37, 48)
    });

    var player2_name = prompt("Name of player 1", "");
    let player2 = new Player({
        name: player2_name,
        color: '#00A6BF',
        keyboard: new Keyboard(87, 68, 83, 65, 70)
    });

    game.addPlayer(player1);
    game.addPlayer(player2);

    game.start();
})();