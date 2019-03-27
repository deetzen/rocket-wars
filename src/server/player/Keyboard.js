'use strict';

class Keyboard {
  constructor (up, right, down, left, fire) {
    this.keys = {
      up: { keyCode: up, percent: 100, pressed: false },
      right: { keyCode: right, percent: 100, pressed: false },
      down: { keyCode: down, percent: 100, pressed: false },
      left: { keyCode: left, percent: 100, pressed: false },
      fire: { keyCode: fire, percent: 100, pressed: false }
    };
  }

  isDown (keyCode) {
    for (const i in this.keys) {
      if (this.keys[i].keyCode === keyCode) {
        return this.keys[i].pressed;
      }
    }

    return false;
  }

  static santitizePercent (percent) {
    percent = percent > 100 ? 100 : percent;
    percent = percent < 0 ? 0 : percent;

    return percent;
  }

  onKeydown (event) {
    const percent = Keyboard.santitizePercent(event.percent);

    for (const i in this.keys) {
      if (this.keys[i].keyCode === event.keyCode) {
        this.keys[i].pressed = true;
        this.keys[i].percent = percent;
      }
    }

    return this;
  }

  onKeyup (event) {
    const percent = this.santitizePercent(event.percent);

    for (const i in this.keys) {
      if (this.keys[i].keyCode === event.keyCode) {
        this.keys[i].pressed = false;
        this.keys[i].percent = percent;
      }
    }

    return this;
  }
}

module.exports = Keyboard;
