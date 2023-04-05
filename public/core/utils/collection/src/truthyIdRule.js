const PolicyRule = require('@bimo/core-policy-rule');
const Collection = require('./Collection');

/**
 *
 * @param {object} args
 * @param {object} args.item
 * @param {Collection} args.collection
 */
function evaluateAdd({ item, collection }) {
  if (!collection.idPropName) return false;
  if (!item[collection.idPropName]) {
    return `La valeur ${item[collection.idPropName]} de la propriété ${collection.idPropName} est invalide.`;
  }
  return false;
}

/**
 *
 * @param {object} args
 * @param {Collection} args.collection
 */
function evaluateDefault({ collection }) {
  if (!collection.idPropName) return false;
  const itemWithFalseyId = collection.items.find(((item) => !item[collection.idPropName]));

  if (itemWithFalseyId) {
    return `Un item a une valeur invalide (${itemWithFalseyId[collection.idPropName]}) dans la propriété ${collection.idPropName} utilisée comme id dans cette collection.`;
  }
  return false;
}

module.exports = new PolicyRule({
  key: 'truthyId',
  description: 'Ensures that each item in a collection has a truthy id.',
  evaluateFnByEventKey: {
    add: evaluateAdd,
    default: evaluateDefault,
    remove: () => { },
  },
});
