'use strict';

const express = require('express');
const { Server } = require('http');
const { SERVER_PORT } = require('../constants');
const socketIo = require('socket.io');

module.exports = class {
  constructor () {
    this.app = express();
    this.server = new Server(this.app);
    this.io = socketIo(this.server);

    this.server.listen(SERVER_PORT, () => {
      console.log(`Backend running: http://localhost:${SERVER_PORT}`); // eslint-disable-line no-console
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
};
