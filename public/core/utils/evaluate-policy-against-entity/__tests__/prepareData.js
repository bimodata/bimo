const { PlacesCollection } = require('@bimo/core-entities');
const { Policy, PolicyRule } = require('@bimo/core-utils-collection');

const validPlacesCollection = () => new PlacesCollection({
  items: [
    { plcIdentifier: 'A' },
    { plcIdentifier: 'B' },
    { plcIdentifier: 'C' },
    { plcIdentifier: 'D' },
    { plcIdentifier: 'E' },
    { plcIdentifier: 'A1', plcReferencePlace: 'A' },
    { plcIdentifier: 'B1', plcReferencePlace: 'B' },
    { plcIdentifier: 'C1', plcReferencePlace: 'C' },
    { plcIdentifier: 'D1', plcReferencePlace: 'D' },
    { plcIdentifier: 'E1', plcReferencePlace: 'E' },
  ],
});

const invalidPlacesCollection = () => {
  const placesCollection = validPlacesCollection();
  placesCollection.getByBusinessId('A').plcIdentifier = 'B';
  return placesCollection;
};

const customRule = new PolicyRule({
  key: 'custom1',
  description: 'custom rule for tests',
  evaluateFnByEventKey: { default: ({ collection }) => (collection.getByBusinessId('E') ? `J'aime pas les E` : false) },
});

const customPolicy = new Policy({ ruleAndConfigTuples: [[customRule, { level: 'info' }]] });

module.exports = { validPlacesCollection, invalidPlacesCollection, customPolicy, customRule };
