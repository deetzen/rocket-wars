export default class Color {
  constructor () {
    this.hue = Math.random();
    this.goldenRatio = 0.618033988749895;
    this.hexwidth = 2;
  }

  static hsvToRgb (h, s, v) {
    const hI = Math.floor(h * 6);
    const f = (h * 6) - hI;
    const p = v * (1 - s);
    const q = v * (1 - (f * s));
    const t = v * (1 - ((1 - f) * s));
    let r = 255;
    let g = 255;
    let b = 255;

    switch (hI) {
      case 0: {
        r = v;
        g = t;
        b = p;
        break;
      }
      case 1: {
        r = q;
        g = v;
        b = p;
        break;
      }
      case 2: {
        r = p;
        g = v;
        b = t;
        break;
      }
      case 3: {
        r = p;
        g = q;
        b = v;
        break;
      }
      case 4: {
        r = t;
        g = p;
        b = v;
        break;
      }
      case 5: {
        r = v;
        g = p;
        b = q;
        break;
      }
      default: {
        break;
      }
    }

    return [ Math.floor(r * 256), Math.floor(g * 256), Math.floor(b * 256) ];
  }

  padHex (str) {
    if (str.length > this.hexwidth) {
      return str;
    }

    return new Array((this.hexwidth - str.length) + 1).join('0') + str;
  }

  get (hex, saturation, value) {
    this.hue += this.goldenRatio;
    this.hue %= 1;

    if (typeof saturation !== 'number') {
      saturation = 0.5;
    }

    if (typeof value !== 'number') {
      value = 0.95;
    }
    const rgb = Color.hsvToRgb(this.hue, saturation, value);

    if (hex) {
      return `#${this.padHex(rgb[0].toString(16))
      }${this.padHex(rgb[1].toString(16))
      }${this.padHex(rgb[2].toString(16))}`;
    }

    return rgb;
  }
}
