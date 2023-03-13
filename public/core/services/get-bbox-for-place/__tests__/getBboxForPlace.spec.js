// @ts-nocheck
const { expect } = require('chai');
const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

const getBboxForPlace = require('../src/getBboxForPlace');

const { placesCollection } = require('./prepareData')();

const serviceContext = { logger };

describe('getBboxForPlace', () => {
  const testParamsByTestName = {
    'default config on place A': {
      placeId: 'A',
      config: {},
      expectedResult: `-100,-100,120,120`,
    },
    'default config on place B': {
      placeId: 'B',
      config: {},
      expectedResult: `-110,-110,110,110`,
    },
    'custom padding on place A': {
      placeId: 'A',
      config: { padding: 5 },
      expectedResult: `-5,-5,25,25`,
    },
    'custom padding only on X on place A': {
      // so the y padding will remain the default = 100
      placeId: 'A',
      config: { xPadding: 5 },
      expectedResult: `-5,-100,25,120`,
    },
  };
  Object.entries(testParamsByTestName).forEach(([testName, testParams]) => {
    it(`works with ${testName}`, () => {
      const { placeId, config, expectedResult } = testParams;
      const place = placesCollection.getByBusinessId(placeId);
      const bBox = getBboxForPlace(place, config, serviceContext);
      expect(bBox.mapshaperStyleString).to.equal(expectedResult);
    });
  });
});
