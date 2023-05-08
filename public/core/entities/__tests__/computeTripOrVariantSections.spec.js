/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const prepareData = require('./data/prepareTripOrVariantData');

const { tripA, variantA } = prepareData();
const { TripOrVariantSectionsCollection } = require('..');

const computeTripOrVariantSectionsOfTripOrVariant = require('../dist/cjs/src/subs/computeTripOrVariantSectionsOfTripOrVariant').default;

function itReturnsTripOrVariantSectionsCollection(tripOrVariantGenerator) {
  it('returns a TripOrVariantSectionsCollection', () => {
    const tripOrVariant = tripOrVariantGenerator();
    expect(computeTripOrVariantSectionsOfTripOrVariant(tripOrVariant, { TripOrVariantSectionsCollection }))
      .to.be.instanceOf(TripOrVariantSectionsCollection);
  });
}

function itCreatesTheRightSections(tripOrVariantGenerator, expectedResultString) {
  it('creates the right sections', () => {
    const tripOrVariant = tripOrVariantGenerator();
    const collection = computeTripOrVariantSectionsOfTripOrVariant(tripOrVariant, { TripOrVariantSectionsCollection });
    const resultString = collection.map((section) => `${section.startPoint.placeId}>${section.endPoint.placeId}`).join('//');
    expect(resultString).to.eql(expectedResultString);
  });
}

const testDataByTestSuiteName = {
  'Simple variant': {
    tripOrVariantGenerator: variantA,
    expectedResultString: `A>B//A>C//A>D//A>Z//B>C//B>D//B>Z//C>D//C>Z//D>Z`,
  },
  'Simple trip': {
    tripOrVariantGenerator: tripA,
    expectedResultString: `A>B//A>C//A>D//A>X//A>Z//B>C//B>D//B>X//B>Z//C>D//C>X//C>Z//D>X//D>Z//X>Z`,
  },

};

describe('computeTripOrVariantSections', () => {
  Object.entries(testDataByTestSuiteName).forEach(([testSuiteName, { tripOrVariantGenerator, expectedResultString }]) => {
    context(`On test suite ${testSuiteName}`, () => {
      itReturnsTripOrVariantSectionsCollection(tripOrVariantGenerator);
      itCreatesTheRightSections(tripOrVariantGenerator, expectedResultString);
    });
  });
});
