const { expect } = require('chai');

const { Collection } = require('@bimo/core-utils-collection');
const Item = require('@bimo/core-utils-item');
const deepFreeze = require('deep-freeze-es6');

const { retrieveCandidatesArrayToUse } = require('../src/retrieveCandidatesArrayToUse');

/**
 *
 * @param {string} targetKey
 * @param {'candidatesAsColl'|'candidatesAsArray'} candidatesKey
 * @param {string[]} resultKeys
 */
function prepareData(targetKey = 'trip', candidatesKey = 'candidatesAsColl', resultKeys = ['var1', 'var3']) {
  const trip = new Item({ customProps: { trpDirection: '5' } });
  const var1 = new Item({ customProps: { varDirection: '5', shouldKeep: true } });
  const var2 = new Item({ customProps: { varDirection: '4', shouldKeep: true } });
  const var3 = new Item({ customProps: { varDirection: '5' } });
  const candidatesAsColl = new Collection({ items: [var1, var2, var3], ItemConstructor: Item });
  const candidatesAsArray = [var1, var2, var3];
  const objectByKey = { trip, var1, var2, var3, candidatesAsColl, candidatesAsArray };
  return {
    target: objectByKey[targetKey],
    candidates: objectByKey[candidatesKey],
    expectedResult: resultKeys.map((key) => objectByKey[key]),
  };
}

function itReturnsTheCandidatesThatMatchTheConfigWithoutMutatingAnyInput({ target, candidates, config, expectedResult, serviceContext }) {
  it('returns the candidates that match the config, without mutating any input', () => {
    deepFreeze({ target, candidates, config, expectedResult });
    const result = retrieveCandidatesArrayToUse({ target, candidates }, config, serviceContext);
    expect(result).to.eql(expectedResult);
  });
}

describe('retrieveCandidatesArrayToUse', () => {
  context(`with valid args and config`, () => {
    const testDataByTestSuiteName = {
      'with simple strings for getKeyFromTripOrVariantConfig and groupCandidatesByConfig': {
        ...prepareData('trip', 'candidatesAsColl', ['var1', 'var3']),
        config: {
          getKeyFromTargetConfig: 'customProps.trpDirection',
          groupCandidatesByConfig: 'customProps.varDirection',
        },
        context: {},
      },
      'with a complex config for getKeyFromTripOrVariantConfig': {
        ...prepareData('trip', 'candidatesAsColl', ['var1', 'var3']),
        config: {
          getKeyFromTargetConfig: { computeFn: () => '5' },
          groupCandidatesByConfig: 'customProps.varDirection',
        },
        context: {},
      },
      'with a complex config for groupCandidatesByConfig': {
        ...prepareData('trip', 'candidatesAsColl', ['var1', 'var3']),
        config: {
          getKeyFromTargetConfig: { computeFn: () => '5' },
          groupCandidatesByConfig: (v) => v.customProps.varDirection,
        },
        context: {},
      },
      'with a string in filterPredicate and a coll in candidates': {
        ...prepareData('trip', 'candidatesAsColl', ['var1', 'var2']),
        config: { filterPredicate: 'customProps.shouldKeep' },
        context: {},
      },
      'with a string in filterPredicate and an array in candidates': {
        ...prepareData('trip', 'candidatesAsArray', ['var1', 'var2']),
        config: { filterPredicate: 'customProps.shouldKeep' },
        context: {},
      },
      'with a function in filterPredicate and a coll in candidates': {
        ...prepareData('trip', 'candidatesAsColl', ['var3']),
        config: { filterPredicate: (v) => !v.customProps.shouldKeep },
        context: {},
      },
      'with a filter predicate and groupByConfig': {
        ...prepareData('trip', 'candidatesAsColl', ['var1']),
        config: {
          filterPredicate: (v) => v.customProps.shouldKeep,
          getKeyFromTargetConfig: 'customProps.trpDirection',
          groupCandidatesByConfig: 'customProps.varDirection',
        },
        context: {},
      },
    };
    Object.entries(testDataByTestSuiteName).forEach(([testSuiteName, testData]) => {
      context(testSuiteName, () => {
        itReturnsTheCandidatesThatMatchTheConfigWithoutMutatingAnyInput(testData);
      });
    });
  });
  context(`with valid args but invalid config`, () => {
    context('with an invalid config for groupCandidatesByConfig ', () => {
      it('throws when it is invalid', () => {
        const candidatesFilteringConfig = { getKeyFromTargetConfig: { computeFn: () => '5' }, groupCandidatesByConfig: {} };

        const { target, candidates } = prepareData();

        const fn = () => retrieveCandidatesArrayToUse({ target, candidates }, candidatesFilteringConfig);

        expect(fn).to.throw('Invalid config');
      });
      it('throws when it is missing', () => {
        const candidatesFilteringConfig = { getKeyFromTripOrVariantConfig: { computeFn: () => '5' } };

        const { target, candidates } = prepareData();

        const fn = () => retrieveCandidatesArrayToUse({ target, candidates }, candidatesFilteringConfig);

        expect(fn).to.throw('Invalid config and/or options');
      });
    });
    context(`when a key can't be generated`, () => {
      it('throws with an explicit message', () => {
        const candidatesFilteringConfig = { getKeyFromTargetConfig: { computeFn: () => undefined }, groupCandidatesByConfig: {} };
        const { target, candidates } = prepareData();
        const fn = () => retrieveCandidatesArrayToUse({ target, candidates }, candidatesFilteringConfig);

        expect(fn).to.throw('Could not generate key for');
      });
    });
    context(`if the key doesn't yield a candidates array`, () => {
      it('throws', () => {
        const candidatesFilteringConfig = {
          getKeyFromTargetConfig: { computeFn: () => '7' },
          groupCandidatesByConfig: 'customProps.varDirection',
        };

        const { target, candidates } = prepareData();

        const fn = () => retrieveCandidatesArrayToUse({ target, candidates }, candidatesFilteringConfig);

        expect(fn).to.throw('No candidates found');
      });
    });
  });
});
