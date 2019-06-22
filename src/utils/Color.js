class Color {
  constructor () {
    this.hue = Math.random();
    this.goldenRatio = 0.618033988749895;
    this.hexwidth = 2;
  }

  static hsvToRgb (hue, saturation, value) {
    const hI = Math.floor(hue * 6);

    const fraction = (hue * 6) - hI;

    const valueP = value * (1 - saturation);
    const valueQ = value * (1 - (fraction * saturation));
    const valueT = value * (1 - ((1 - fraction) * saturation));

    let red = 255;
    let green = 255;
    let blue = 255;

    switch (hI) {
      case 0: {
        red = value;
        green = valueT;
        blue = valueP;
        break;
      }
      case 1: {
        red = valueQ;
        green = value;
        blue = valueP;
        break;
      }
      case 2: {
        red = valueP;
        green = value;
        blue = valueT;
        break;
      }
      case 3: {
        red = valueP;
        green = valueQ;
        blue = value;
        break;
      }
      case 4: {
        red = valueT;
        green = valueP;
        blue = value;
        break;
      }
      case 5: {
        red = value;
        green = valueP;
        blue = valueQ;
        break;
      }
      default: {
        break;
      }
    }

    return [ Math.floor(red * 256), Math.floor(green * 256), Math.floor(blue * 256) ];
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

module.exports = Color;
