const { expect } = require('chai');

const makeSingleCharIterator = require('../src/makeSingleCharIterator');

function getStringFromAllIteratorResults(config, context) {
  const strings = [];
  const charIterator = makeSingleCharIterator(config, context);
  let nextChar = charIterator.next();
  while (!nextChar.done) {
    strings.push(nextChar.value);
    nextChar = charIterator.next();
  }
  return strings.join('');
}

describe('makeSingleCharIterator', () => {
  describe('with default config', () => {
    it('yields the expected strings', async () => {
      expect(getStringFromAllIteratorResults()).to.equal('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    });
  });
  describe('with simple custom config', () => {
    it('yields the expected strings', async () => {
      expect(getStringFromAllIteratorResults({ orderedCharSetKeys: ['oneToNine', 'lowerCaseLetters'] }))
        .to.equal('123456789abcdefghijklmnopqrstuvwxyz');
    });
  });
  describe('with complex custom config', () => {
    it('yields the expected strings', async () => {
      expect(getStringFromAllIteratorResults({
        customCharArrayByCharSetKey: {
          oneToNine: [1, 5, 9],
          myCoolStrings: 'Gaël Haméon'.split(''),
        },
        orderedCharSetKeys: ['oneToNine', 'lowerCaseLetters', 'myCoolStrings'],
      }))
        .to.equal('159abcdefghijklmnopqrstuvwxyzGaël Haméon');
    });
  });
});
