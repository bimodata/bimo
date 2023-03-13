const { expect } = require('chai');

const { getStupidLogger } = require('@bimo/core-utils-logging');

const { cleanStringUsingRegexAndReplacePairs } = require('..');

const logger = getStupidLogger(true);

describe(`# cleanStringUsingRegexs`, () => {
  context(`when given a string and a valid array of regexAndReplacePairs`, () => {
    it(`applies the regex replace pairs in order the order of the array and returns the cleaned string`, () => {
      expect(cleanStringUsingRegexAndReplacePairs(
        `123456/7`,
        [['/(/.*)/gm', '']],
        { logger },
      )).to.equal(`123456`);

      expect(cleanStringUsingRegexAndReplacePairs(
        `123456/7`,
        [
          ['/(/.*)/gm', ''],
          ['/.*[02468]$/gm', '0'],
          ['/.*[13579]$/gm', '1'],
        ],
        { logger },
      )).to.equal(`0`);

      expect(cleanStringUsingRegexAndReplacePairs(
        `123457`,
        [
          ['/(/.*)/gm', ''],
          ['/.*[02468]$/gm', '0'],
          ['/.*[13579]$/gm', '1'],
        ],
        { logger },
      )).to.equal(`1`);

      expect(cleanStringUsingRegexAndReplacePairs(
        `123457`,
        [
          ['/^(\\d{4}).*/gm', '$1'],
        ],
        { logger },
      )).to.equal(`1234`);
    });
  });
  context(`when given an empty array`, () => {
    it(`returns the initial string`, () => {
      expect(cleanStringUsingRegexAndReplacePairs('toto', [])).to.equal('toto');
    });
  });
  context(`when given no regexAndReplacePairs`, () => {
    it(`returns the initial string`, () => {
      expect(cleanStringUsingRegexAndReplacePairs('toto')).to.equal('toto');
    });
  });
  context(`when given invalid regexAndReplacePairs`, () => {
    it(`throws`, () => {
      expect(() => cleanStringUsingRegexAndReplacePairs('toto', [
        ['1234', 6],
      ])).to.throw();
    });
  });
});
