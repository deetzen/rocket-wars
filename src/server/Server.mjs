import buntstift from 'buntstift';
import express from 'express';
import { Server } from 'http';
import { SERVER_PORT } from '../constants';
import socketIo from 'socket.io';

export default class {
  constructor () {
    this.app = express();
    this.server = new Server(this.app);
    this.io = socketIo(this.server);

    this.server.listen(SERVER_PORT, () => {
      buntstift.info(`Backend running: http://localhost:${SERVER_PORT}`);
    });
  }

  use (func) {
    this.app.use(func);
  }

  getApp () {
    return this.app;
  }

  getIo () {
    return this.io;
  }
}
