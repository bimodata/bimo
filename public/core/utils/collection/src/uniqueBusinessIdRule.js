const PolicyRule = require('@bimo/core-policy-rule');
const { evaluateAdd, evaluateDefault } = require('./uniquePropHelperFunctions');

module.exports = new PolicyRule({
  key: 'uniqueBusinessId',
  description: 'Ensures that each item in a collection has a unique business id. Falsey ids are ignored.',
  evaluateFnByEventKey: {
    add: ({ item, collection }) => {
      if (!collection.businessIdPropName) return false;
      return evaluateAdd({ item, collection, propName: collection.businessIdPropName });
    },
    default: ({ collection }) => {
      if (!collection.businessIdPropName) return false;
      return evaluateDefault({ collection, propName: collection.businessIdPropName });
    },
    remove: () => { },
  },
});
