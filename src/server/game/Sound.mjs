import { PLAY_SOUND } from '../../events';

class Sound {
  constructor () {
    this.io = null;
    this.socket = null;
  }

  setSocket (socket) {
    this.socket = socket;

    return this;
  }

  setIo (io) {
    this.io = io;

    return this;
  }

  play (sound, privateSound = false) {
    if (privateSound) {
      this.socket.emit(PLAY_SOUND, sound);
    } else {
      this.io.emit(PLAY_SOUND, sound);
    }

    return this;
  }
}

export default Sound;
