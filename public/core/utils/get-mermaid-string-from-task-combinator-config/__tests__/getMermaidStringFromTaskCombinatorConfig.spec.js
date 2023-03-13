const { expect } = require('chai');
const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

const getMermaidStringFromActionConfig = require('..');
const inputDataBySuiteName = require('./inputDataBySuiteName');
const expectedResultBySuiteName = require('./expectedResultBySuiteName');

/**
 *
 * @param {Object} item
 * @param {*} config
 * @param {*} serviceContext
 * @param {*} expectedResult
*/
function itGivesTheExpectedResult(item, config, serviceContext, expectedResult) {
  it(`gives the expected result`, () => {
    const result = getMermaidStringFromActionConfig(item, config, serviceContext);
    expect(result.toString()).to.equal(expectedResult);
  });
}

const serviceContext = { logger };

const testDataByTestSuiteName = {
  octopus1: {
    item: inputDataBySuiteName.octopus1.taskCombinatorConfig,
    config: undefined,
    expectedResult: expectedResultBySuiteName.octopus1,
    serviceContext,
  },
  'octopus-sans-lieux': {
    item: inputDataBySuiteName['octopus-sans-lieux'].taskCombinatorConfig,
    config: { executeArgNamesToIgnore: ['placesCollection'] },
    expectedResult: expectedResultBySuiteName['octopus-sans-lieux'],
    serviceContext,
  },
  'octopus-bus': {
    item: inputDataBySuiteName['octopus-bus'].taskCombinatorConfig,
    config: { executeArgNamesToIgnore: ['placesCollection'] },
    expectedResult: expectedResultBySuiteName['octopus-bus'],
    serviceContext,
  },
};

describe('getMermaidStringFromTaskCombinatorConfig', () => {
  Object.entries(testDataByTestSuiteName).forEach(([testSuiteName, { item, config, expectedResult, serviceContext: servCtxt }]) => {
    context(`On test suite ${testSuiteName}`, () => {
      itGivesTheExpectedResult(item, config, servCtxt, expectedResult);
    });
  });
});
