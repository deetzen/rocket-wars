'use strict';

const assert = require('assertthat');

const Game = require('../../src/server/game/Game');

suite('Game', () => {
  test('is a function.', async () => {
    assert.that(Game).is.ofType('function');
  });
});
