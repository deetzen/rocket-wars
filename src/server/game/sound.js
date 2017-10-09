import {PLAY_SOUND} from '../../events';

export default class Sound {
  constructor(io) {
    this.io = io;
    this.socket = null;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  play(sound, privateSound = false) {
    if (privateSound) {
      this.socket.emit(PLAY_SOUND, sound);
    } else {
      this.io.emit(PLAY_SOUND, sound);
    }
  }
}
