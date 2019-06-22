class Keyboard {
  constructor () {
    this.keys = {
      up: {
        keyCode: 38,
        percent: 100,
        pressed: false
      },
      right: {
        keyCode: 39,
        percent: 100,
        pressed: false
      },
      down: {
        keyCode: 40,
        percent: 100,
        pressed: false
      },
      left: {
        keyCode: 37,
        percent: 100,
        pressed: false
      },
      fire: {
        keyCode: 32,
        percent: 100,
        pressed: false
      }
    };
  }

  isDown (keyCode) {
    for (const i in this.keys) {
      if (this.keys[i].keyCode === keyCode) {
        return this.keys[i].pressed;
      }
    }

    return null;
  }

  onKeydown (event) {
    const percent = event.percent > 100 ? 100 : event.percent < 0 ? 0 : event.percent;

    for (const i in this.keys) {
      if (this.keys[i].keyCode === event.keyCode) {
        this.keys[i].pressed = true;
        this.keys[i].percent = percent;
      }
    }
  }

  onKeyup (event) {
    const percent = event.percent > 100 ? 100 : event.percent < 0 ? 0 : event.percent;

    for (const i in this.keys) {
      if (this.keys[i].keyCode === event.keyCode) {
        this.keys[i].pressed = false;
        this.keys[i].percent = percent;
      }
    }
  }
}

export default Keyboard;
