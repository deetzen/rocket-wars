const {
  STAGE_HEIGHT,
  STAGE_WIDTH
} = require('../../constants');

class Stage {
  constructor () {
    this.width = STAGE_WIDTH;
    this.height = STAGE_HEIGHT;
  }
}

module.exports = Stage;
