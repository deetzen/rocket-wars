'use strict';

const assert = require('assert');

const Game = require('../src/server/game/Game');

describe('Game', () => {
  it('should be of type function.', async () => {
    assert.equal(typeof Game, 'function');
  });
});
