const { expect } = require('chai');
// const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

const normalizeSubTaskConfig = require('..');

/**
 *
 * @param {Object} item
 * @param {*} config
 * @param {*} serviceContext
 * @param {*} expectedResult
*/
function itGivesTheExpectedResult(item, config, serviceContext, expectedResult) {
  it(`gives the expected result`, () => {
    const result = normalizeSubTaskConfig(item);
    expect(result).to.eql(expectedResult);
  });
}

const serviceContext = {};

const testDataByTestSuiteName = {
  simple: {
    item: {
      taskConstructorKey: 'ImproveRtevCollBasedOnTemplates',
      taskName: 'Projection des variantes à la voie',
      pathAndDefaultValueByExecuteArgName: {
        sourceRtevColl: { path: 'resultBySubTaskKey.createRtevColl' },
        placesCollection: { path: 'mainExecuteArgs.placesCollection' },
        configSet: { path: 'mainExecuteArgs.improveRtevCollConfigSet' },
        errRtevIdentifier: { path: 'mainExecuteArgs.errRtevIdentifier' },
        templateRouteVersionsCollection: { path: 'mainExecuteArgs.templateRouteVersionsCollection' },
      },
    },
    config: undefined,
    expectedResult: {
      taskConstructorKey: 'ImproveRtevCollBasedOnTemplates',
      taskName: 'Projection des variantes à la voie',
      pathAndDefaultValueByExecuteArgName: {
        sourceRtevColl: { path: 'resultBySubTaskKey.createRtevColl' },
        placesCollection: { path: 'mainExecuteArgs.placesCollection' },
        configSet: { path: 'mainExecuteArgs.improveRtevCollConfigSet' },
        errRtevIdentifier: { path: 'mainExecuteArgs.errRtevIdentifier' },
        templateRouteVersionsCollection: { path: 'mainExecuteArgs.templateRouteVersionsCollection' },
      },
      normalizedConfigByExecuteArgName: {
        sourceRtevColl: {
          arrayMode: false,
          normalizedSourceConfigs: [{ fallBackMode: [{ path: 'resultBySubTaskKey.createRtevColl' }] }],
        },
        placesCollection: {
          arrayMode: false,
          normalizedSourceConfigs: [{ fallBackMode: [{ path: 'mainExecuteArgs.placesCollection' }] }],
        },
        configSet: {
          arrayMode: false,
          normalizedSourceConfigs: [{ fallBackMode: [{ path: 'mainExecuteArgs.improveRtevCollConfigSet' }] }],
        },
        errRtevIdentifier: {
          arrayMode: false,
          normalizedSourceConfigs: [{ fallBackMode: [{ path: 'mainExecuteArgs.errRtevIdentifier' }] }],
        },
        templateRouteVersionsCollection: {
          arrayMode: false,
          normalizedSourceConfigs: [{ fallBackMode: [{ path: 'mainExecuteArgs.templateRouteVersionsCollection' }] }],
        },
      },
    },
    serviceContext,
  },
  'with array mode': {
    item: {
      taskConstructorKey: 'MergeBlaBla',
      taskName: `Fusion des services issus d'Octopus et Excel`,
      sourceConfigByExecuteArgName: {
        arrayOfCollections: [
          { path: 'toto.titi' },
          { path: 'tata', defaultValue: 'toto.titi' },
          { defaultValue: 'tadf' },
        ],
        itemEntityClassKey: `ScheduledService`,
      },
    },
    config: undefined,
    expectedResult: {
      taskConstructorKey: 'MergeBlaBla',
      taskName: 'Fusion des services issus d\'Octopus et Excel',
      sourceConfigByExecuteArgName: {
        arrayOfCollections: [{ path: 'toto.titi' }, { path: 'tata', defaultValue: 'toto.titi' }, { defaultValue: 'tadf' }],
        itemEntityClassKey: 'ScheduledService',
      },
      normalizedConfigByExecuteArgName: {
        arrayOfCollections: {
          arrayMode: true,
          normalizedSourceConfigs: [
            { fallBackMode: [{ path: 'toto.titi' }] },
            { fallBackMode: [{ path: 'tata', defaultValue: 'toto.titi' }] },
            { fallBackMode: [{ defaultValue: 'tadf' }] }],
        },
        itemEntityClassKey: {
          arrayMode: false,
          normalizedSourceConfigs: [{ fallBackMode: [{ defaultValue: 'ScheduledService' }] }],
        },
      },
    },
    serviceContext,
  },
};

describe('normalizeSubTaskConfig', () => {
  Object.entries(testDataByTestSuiteName).forEach(([testSuiteName, { item, config, expectedResult, serviceContext: servCtxt }]) => {
    context(`On test suite ${testSuiteName}`, () => {
      itGivesTheExpectedResult(item, config, servCtxt, expectedResult);
    });
  });
});
