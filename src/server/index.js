'use strict';

const express = require('express');
const path = require('path');

const Game = require('./Game');
const Server = require('./Server');
const Timer = require('./Timer');

const Listener = require('./Listener');

// Directory of static files for frontend
const rootDir = path.resolve(path.dirname(''));

/**
 * Start a game instance
 */
const game = new Game();

/**
 * Start the server
 */
const server = new Server(game);
const app = server.getApp();

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Xss-Protection', '1; mode=block');

  return next();
});

app.use(express.static(`${rootDir}/dist`));

/**
 * Start the timer
 */
const timer = new Timer(game, server.getIo());

timer.start();

/**
 * Start the input listener
 */
const listener = new Listener(game, server.getIo());

listener.listen();
