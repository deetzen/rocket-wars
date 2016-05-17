export default class {

    constructor (up, right, down, left, fire) {
        this.up = up;
        this.right = right;
        this.down = down;
        this.left = left;
        this.fire = fire;
        this.pressed = {};
    }

    isDown (keyCode) {
        return this.pressed[keyCode];
    }

    onKeydown (event) {
        this.pressed[event.keyCode] = true;
    }

    onKeyup (event) {
        delete this.pressed[event.keyCode];
    }
}