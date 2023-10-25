const { expect } = require('chai');
const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

const getDurationFromStringUsingRegexps = require('..');

/**
 *
 * @param {Item} item
 * @param {*} config
 * @param {*} serviceContext
 * @param {*} expectedResult
*/
function itGivesTheExpectedResult(item, config, serviceContext, expectedResult) {
  it(`gives the expected result`, () => {
    const result = getDurationFromStringUsingRegexps(item, config, serviceContext);
    const parsedResult = [null, undefined].includes(result) ? result : result.toString();
    expect(parsedResult).to.equal(expectedResult);
  });
}

const terGrandEstLuxembourgConfig = {
  regexReplacePairsByDurationComponent: {
    hours: [['/^(\\d?\\d):\\d\\d.*/', '$1']],
    minutes: [['/^\\d?\\d:(\\d\\d).*/', '$1']],
    seconds: [ // we want to add a 0 after. using '$10' as a replace value would work since there
      // are less than 10 capturing groups. But it's confusing so we do it in two steps
      ['/^\\d?\\d:\\d\\d(\\d).*/', '$1'],
      ['/^\\d$/', '$&0'],
    ],
  },
};

const serviceContext = { logger };

const testDataByTestSuiteName = {
  'TER Grand Est Luxembourg style 1': {
    item: '06:503',
    config: terGrandEstLuxembourgConfig,
    expectedResult: `PT6H50M30S`,
    serviceContext,
  },
  'TER Grand Est Luxembourg style 2': {
    item: '06:58/593',
    config: terGrandEstLuxembourgConfig,
    expectedResult: `PT6H58M`,
    serviceContext,
  },
  'TER Grand Est Luxembourg style 3': {
    item: '07:033/043',
    config: terGrandEstLuxembourgConfig,
    expectedResult: `PT7H3M30S`,
    serviceContext,
  },
  'Excel Style': {
    item: '8:05',
    config: terGrandEstLuxembourgConfig,
    expectedResult: `PT8H5M`,
    serviceContext,
  },
  'Empty string': {
    item: '',
    config: terGrandEstLuxembourgConfig,
    expectedResult: ``,
    serviceContext,
  },
  undefined: {
    item: undefined,
    config: terGrandEstLuxembourgConfig,
    expectedResult: undefined,
    serviceContext,
  },
  null: {
    item: null,
    config: terGrandEstLuxembourgConfig,
    expectedResult: null,
    serviceContext,
  },
};

describe('getDurationFromStringUsingRegexps', () => {
  Object.entries(testDataByTestSuiteName).forEach(([testSuiteName, { item, config, expectedResult, serviceContext: servCtxt }]) => {
    context(`On test suite ${testSuiteName}`, () => {
      itGivesTheExpectedResult(item, config, servCtxt, expectedResult);
    });
  });
});
