'use strict';

const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/gu, char => {
  const random = Math.random() * 16 | 0; // eslint-disable-line no-bitwise
  const result = char === 'x' ? random : (random & 0x3) | 0x8; // eslint-disable-line no-bitwise

  return result.toString(16);
});

module.exports = {
  uuid
};
