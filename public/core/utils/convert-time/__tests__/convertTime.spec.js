const { expect } = require('chai');
const { Duration } = require('luxon');

const convertTime = require('..');

/**
 * This regex based config was used before `@bimo-hastsncf/services-octopus-time-string-to-durations`
 * was created. We keep it here as its a good way to test regexbased configs, but you should check out
 * the dedicated package if you have to manipulate octopus-excel style times
 */
const sourceToDurationConfigForOcto = {
  regexReplacePairsByDurationComponent: {
    hours: [['/^(\\d\\d):\\d\\d.*/', '$1']],
    minutes: [['/^\\d\\d:(\\d\\d).*/', '$1']],
    seconds: [ // we want to add a 0 after. using '$10' as a replace value would work since there
      // are less than 10 capturing groups. But it's confusing so we do it in two steps
      ['/^\\d\\d:\\d\\d(\\d).*/', '$1'],
      ['/^\\d$/', '$&0'],
    ],
  },
};

/**
 *
 * @param {Item} item
 * @param {*} config
 * @param {*} serviceContext
 * @param {*} expectedResult
*/
function itGivesTheExpectedResult(source, config, serviceContext, expectedResult) {
  it(`gives the expected result`, () => {
    const result = convertTime(source, config, serviceContext);
    expect(result).to.equal(expectedResult);
  });
}

const testDataByTestSuiteName = {
  'Simple iso to hastus': {
    source: `13:30:25`,
    config: {
      sourceToDurationConfig: 'iso',
      durationToDestConfig: 'hastus',
    },
    expectedResult: `13:30;25`,
  },
  'Simple iso to hastus without seconds': {
    source: `13:30`,
    config: {
      sourceToDurationConfig: 'iso',
      durationToDestConfig: 'hastus',
    },
    expectedResult: `13:30;00`,
  },
  'Octopus excel style time using regex': {
    source: `13:303`,
    config: {
      sourceToDurationConfig: sourceToDurationConfigForOcto,
      durationToDestConfig: 'hastus',
    },
    expectedResult: `13:30;30`,
  },
  'Iso times read as Octopus Excel Style times': {
    // seconds are lost in that case
    source: `13:30:30`,
    config: {
      sourceToDurationConfig: sourceToDurationConfigForOcto,
      durationToDestConfig: 'hastus',
    },
    expectedResult: `13:30;00`,
  },
  'Octopus excel style times to iso': {
    source: `13:303`,
    config: {
      sourceToDurationConfig: sourceToDurationConfigForOcto,
      durationToDestConfig: 'iso',
    },
    expectedResult: `13:30:30`,
  },
  'Octopus excel style times to hastus': {
    source: `01:303`,
    config: {
      sourceToDurationConfig: sourceToDurationConfigForOcto,
      durationToDestConfig: 'hastus',
    },
    expectedResult: `01:30;30`,
  },
  'Octopus excel style times to hastus with adjustment': {
    source: `01:303`,
    config: {
      sourceToDurationConfig: sourceToDurationConfigForOcto,
      durationToDestConfig: 'hastus',
      durationAdjustmentObject: { day: 1 },
    },
    expectedResult: `25:30;30`,
  },
  'Octopus excel style times to hastus with lowerBound': {
    source: `01:303`,
    config: {
      sourceToDurationConfig: sourceToDurationConfigForOcto,
      durationToDestConfig: 'hastus',
      lowerBoundDuration: Duration.fromObject({ day: 1 }),
    },
    expectedResult: `25:30;30`,
  },
};

describe('convertTime', () => {
  Object.entries(testDataByTestSuiteName).forEach(([testSuiteName, { source, config, expectedResult, serviceContext }]) => {
    context(`On test suite ${testSuiteName}`, () => {
      itGivesTheExpectedResult(source, config, serviceContext, expectedResult);
    });
  });
});
