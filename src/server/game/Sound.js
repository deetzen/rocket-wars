import { PLAY_SOUND } from '../../events';

export default class Sound {
  constructor () {
    this.io = null;
    this.socket = null;
  }

  setSocket (socket) {
    this.socket = socket;
  }

  setIo (io) {
    this.io = io;
  }

  play (sound, privateSound = false) {
    if (privateSound) {
      this.socket.emit(PLAY_SOUND, sound);
    } else {
      this.io.emit(PLAY_SOUND, sound);
    }
  }
}
