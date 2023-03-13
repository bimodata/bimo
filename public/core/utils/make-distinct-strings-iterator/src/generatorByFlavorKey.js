const makeIntegersIterator = require('./makeIntegersIterator');
const makeSingleCharIterator = require('./makeSingleCharIterator');

module.exports = {
  integer: makeIntegersIterator,
  singleChar: makeSingleCharIterator,
};
