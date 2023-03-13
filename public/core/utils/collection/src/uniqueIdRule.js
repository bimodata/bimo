const PolicyRule = require('@bimo-core/policy-rule');
const { evaluateAdd, evaluateDefault } = require('./uniquePropHelperFunctions');

module.exports = new PolicyRule({
  key: 'uniqueId',
  description: 'Ensures that each item in a collection has a unique id. Falsey ids are ignored.',
  evaluateFnByEventKey: {
    add: ({ item, collection }) => {
      if (!collection.idPropName) return false;
      return evaluateAdd({ item, collection, propName: collection.idPropName });
    },
    default: ({ collection }) => {
      if (!collection.idPropName) return false;
      return evaluateDefault({ collection, propName: collection.idPropName });
    },
    remove: () => { },
  },
});
