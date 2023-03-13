const { expect } = require('chai');
const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

const matchTwoListsOfStrings = require('..');

function itReturnsAnObject(lists, config, serviceContext) {
  it(`returns an object with "matched", "onlyA", "onlyB" arrays of strings`, () => {
    const { matched, onlyA, onlyB } = matchTwoListsOfStrings(lists, config, serviceContext);
    [matched, onlyA, onlyB].forEach((resultArray) => {
      expect(resultArray).to.be.an('array');
      resultArray.forEach((item) => expect(item).to.be.a('string'));
    });
  });
}

function itGivesTheExpectedResult(lists, config, serviceContext, expectedResult) {
  it(`gives the expected result`, () => {
    const result = matchTwoListsOfStrings(lists, config, serviceContext);
    expect(result).to.eql(expectedResult);
  });
}

const testDataByTestSuiteName = {
  'identical except order': {
    lists: [
      ['123', '3456', '14534534'],
      ['3456', '123', '14534534'],
    ],
    config: {},
    serviceContext: {},
    expectedResult: {
      matched: ['3456', '14534534', '123'],
      onlyA: [],
      onlyB: [],
    },
  },
  'identical but not same number': {
    lists: [
      ['123', '3456', '14534534', '123', '123'],
      ['3456', '123', '123', '14534534'],
    ],
    config: {},
    serviceContext: {},
    expectedResult: {
      matched: ['3456', '14534534', '123', '123'],
      onlyA: ['123'],
      onlyB: [],
    },
  },
  'totally different 1': {
    lists: [
      ['123', '3456', '14534534'],
      ['A', 'B', 'C'],
    ],
    config: {},
    serviceContext: {},
    expectedResult: {
      matched: [],
      onlyA: ['123', '14534534', '3456'],
      onlyB: ['C', 'B', 'A'],
    },
  },
  mixed: {
    lists: [
      ['A', 'B', '53SaA', '53saa', 'C'],
      ['123', '3456', 'B', '14534534', '53saa'],
    ],
    config: {},
    expectedResult: {
      matched: ['B', '53saa'],
      onlyB: ['123', '14534534', '3456'],
      onlyA: ['C', 'A', '53SaA'],
    },
  },
  'mixed with return on first match': {
    lists: [
      ['A', 'B', '53SaA', '53saa', 'C'],
      ['123', '3456', 'B', '14534534', '53saa'],
    ],
    config: { returnOnFirstMatch: true },
    expectedResult: {
      matched: ['B'],
      onlyA: ['C'],
      onlyB: [],
      remainingA: ['53SaA', '53saa', 'A'],
      remainingB: ['123', '14534534', '3456', '53saa'],
    },
    serviceContext: { logger },
  },
};

describe('matchTwoListsOfStrings', () => {
  Object.entries(testDataByTestSuiteName).forEach(([testSuiteName, { lists, config, expectedResult, serviceContext }]) => {
    context(`On test suite ${testSuiteName}`, () => {
      itReturnsAnObject(lists, config, serviceContext);
      itGivesTheExpectedResult(lists, config, serviceContext, expectedResult);
    });
  });
});
