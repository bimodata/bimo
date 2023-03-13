/* eslint-disable no-restricted-syntax */
const path = require('path');

const { expect } = require('chai');

const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

const getIteratorForLinesOfHugeFile = require('..');

const serviceContext = { logger };

function itReturnsAnIterator(filePath, config) {
  it(`returns an async generator`, () => {
    const iterator = getIteratorForLinesOfHugeFile(filePath, config, serviceContext);
    const nextValue = iterator.next();
    expect(iterator.next).to.be.a('function');
    expect(nextValue).to.be.a('promise');
  });
}

function itYieldsTheRightValues(filePath, config, expectedValues) {
  it(`yields the right values`, async () => {
    const iterator = getIteratorForLinesOfHugeFile(filePath, config, serviceContext);
    let index = 0;
    for await (const value of iterator) {
      const expectedValue = expectedValues[index];
      expect(value).to.eql(expectedValue);
      index += 1;
    }
  });
}

describe('getIteratorForLinesOfHugeFile', () => {
  context(`on a small txt file`, () => {
    const expectedValues = [
      { line: '1351235', lineNumber: 5 },
      { line: '123512', lineNumber: 6 },
      { line: 'Bonjour ceci est du texte avec des accents. Égypte À ça Gaël.', lineNumber: 7 },
    ];
    context(`in utf8 encoding, without enconding specified in the config `, async () => {
      const filePath = path.join(__dirname, './testDataUtf8.txt');
      const config = { firstLineToProcess: 5, lastLineToProcess: 7 };
      itReturnsAnIterator(filePath, config);
      itYieldsTheRightValues(filePath, config, expectedValues);
    });
    context(`on a file in latin1 encoding, without enconding specified in the config `, async () => {
      const filePath = path.join(__dirname, './testDataLatin1.txt');
      const config = { firstLineToProcess: 5, lastLineToProcess: 7, encoding: 'latin1' };
      itReturnsAnIterator(filePath, config);
      itYieldsTheRightValues(filePath, config, expectedValues);
    });
  });
});
