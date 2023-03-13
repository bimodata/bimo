// @ts-nocheck
const { expect } = require('chai');

const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

const { placesCollection } = require('./prepareData')();

const serviceContext = { logger };

const getBboxForPlaces = require('../src/getBboxForPlaces');

describe('getBboxForPlaces', () => {
  describe(`with default config on valid places`, () => {
    const config = {};
    it(`returns the expected bBox`, () => {
      const bBox = getBboxForPlaces(placesCollection.items, config, serviceContext);
      expect(bBox.mapshaperStyleString).to.equal('-10,-10,20,20');
    });
  });
});
