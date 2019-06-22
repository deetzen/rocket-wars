import express from 'express';
import Game from './game/Game';
import listener from './listener';
import path from 'path';
import Server from './Server';
import Timer from './Timer';

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
listener(game, server.getIo());
