const { expect } = require('chai');

const evaluatePolicyAgainstEntity = require('..');

const { validPlacesCollection, invalidPlacesCollection, customPolicy } = require('./prepareData');

const testDataByTestCase = {
  'No config, no context, valid collection': {
    entity: validPlacesCollection(),
    expectedResult: [],
  },
  'No config, no context, invalid collection': {
    entity: invalidPlacesCollection(),
    expectedResult: [
      {
        ruleKey: 'Global error',
        level: 'error',
        message: 'Error on rule Ensures that each item in a collection has a unique business id. Falsey ids are ignored. '
          + '(uniqueBusinessId):\nAu moins deux items ont la valeur B pour la propriété plcIdentifier dans cette collection.',
      },
    ],
  },
  'Explicit Policy, no context, invalid collection': {
    entity: invalidPlacesCollection(),
    config: { policy: customPolicy },
    expectedResult: [{ ruleKey: 'custom1', level: 'info', message: 'J\'aime pas les E' }],
  },
  'Policy key, policyByPolicyKey in context, invalid collection': {
    entity: invalidPlacesCollection(),
    config: { policyKey: 'customPolicy' },
    serviceContext: { policyByPolicyKey: { customPolicy } },
    expectedResult: [{ ruleKey: 'custom1', level: 'info', message: 'J\'aime pas les E' }],
  },
};

describe('evaluatePolicyAgainstEntity', () => {
  Object.entries(testDataByTestCase).forEach(([testCase, { entity, config, serviceContext, expectedResult }]) => {
    it(`${testCase}`, () => {
      const result = evaluatePolicyAgainstEntity(entity, config, serviceContext);
      expect(result).to.eql(expectedResult);
    });
  });
});
