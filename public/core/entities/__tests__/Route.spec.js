const { expect } = require('chai');

const dataPack = require('@bimo/test-data-json-serialized-entities-data-pack-1');
const { getTestEntity } = require('@bimo/test-utils-get-test-data');

const { Route } = require('..');

describe('Domain :: Route', () => {
  let route;
  beforeEach(async () => {
    route = await getTestEntity(dataPack.entities.Route, Route);
  });

  describe('#getVariantsThatUseOneOfThesePlaces', () => {
    context(`when given a list of places, one of which is used at least once in at least one variant of the route`, () => {
      const listOfPlaces = ['eDxeN', 'XYKmU'];
      it(`returns an array of the concerned variants`, () => {
        expect(route.getVariantsThatUseOneOfThesePlaces(listOfPlaces)).to.be.an('array').of.length(2);
      });
    });
    context(`when given a list of places, none of which is used at least once in the route`, () => {
      const listOfPlaces = new Set(['XYKmU', 'TotoVille']);
      it(`returns an empty array`, () => {
        expect(route.getVariantsThatUseOneOfThesePlaces(listOfPlaces)).to.be.an('array').of.length(0);
      });
    });
    context(`when given something falsey`, () => {
      it(`returns undefined`, () => {
        /* eslint-disable no-unused-expressions */
        expect(route.getVariantsThatUseOneOfThesePlaces()).to.be.undefined;
        expect(route.getVariantsThatUseOneOfThesePlaces(null)).to.be.undefined;
        expect(route.getVariantsThatUseOneOfThesePlaces(false)).to.be.undefined;
        expect(route.getVariantsThatUseOneOfThesePlaces('')).to.be.undefined;
        /* eslint-enable no-unused-expressions */
      });
    });
  });
});
