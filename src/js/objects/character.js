import {FIRE_REQUEST} from '../../../events';
import FlyingObject from './flying-object';

class Character extends FlyingObject
{
    constructor(options) {
        super(options);
    }

    draw () {
        super.draw();
    }

    fire () {
        this.game.socket.emit(FIRE_REQUEST, this.player.id);
    }
}

export default Character;
