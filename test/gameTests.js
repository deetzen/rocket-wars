'use strict';

const assert = require('assert');

const Game = require('../src/server/Game');

describe('Game', () => {
  const game = new Game();

  it('is a class.', async () => {
    assert.ok(game.constructor.name, 'Game');
  });

  it('has an empty player list.', async () => {
    assert.equal(game.getPlayers().size, 0);
  });

  it('has an empty object list.', async () => {
    assert.equal(game.getObjects().size, 0);
  });
});
