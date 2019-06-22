export default class {
  constructor(up, right, down, left, fire) {
    this.keys = {
      up: {
        keyCode: up,
        percent: 100,
        pressed: false,
      },
      right: {
        keyCode: right,
        percent: 100,
        pressed: false,
      },
      down: {
        keyCode: down,
        percent: 100,
        pressed: false,
      },
      left: {
        keyCode: left,
        percent: 100,
        pressed: false,
      },
      fire: {
        keyCode: fire,
        percent: 100,
        pressed: false,
      },
    };
  }

  isDown(keyCode) {
    for (const i in this.keys) {
      if (this.keys[i].keyCode == keyCode) {
        return this.keys[i].pressed;
      }
    }
    return null;
  }

  onKeydown(event) {
    const percent = event.percent > 100 ? 100 : event.percent < 0 ? 0 : event.percent;
    for (const i in this.keys) {
      if (this.keys[i].keyCode == event.keyCode) {
        this.keys[i].pressed = true;
        this.keys[i].percent = percent;
      }
    }
  }

  onKeyup(event) {
    const percent = event.percent > 100 ? 100 : event.percent < 0 ? 0 : event.percent;
    for (const i in this.keys) {
      if (this.keys[i].keyCode == event.keyCode) {
        this.keys[i].pressed = false;
        this.keys[i].percent = percent;
      }
    }
  }
}
