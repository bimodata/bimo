const Collection = require('./Collection');

/**
 *
 * @param {object} args
 * @param {object} args.item
 * @param {Collection} args.collection
 * @param {string} args.propName
 */
function evaluateAdd({ item, collection, propName }) {
  const value = item[propName];
  const currentItemWithValue = collection.getByPropName(propName, value);
  if (currentItemWithValue) {
    return `Un item a déjà la valeur ${value} pour la propriété ${propName} dans cette collection.\n`
    + `item existant: ${currentItemWithValue.shortLoggingOutput}\n`
    + `nouvel item  : ${item.shortLoggingOutput}`;
  }
  return false;
}

/**
 *
 * @param {object} args
 * @param {Collection} args.collection
 * @param {string} args.propName
 */
function evaluateDefault({ collection, propName }) {
  const takenValues = new Set();
  const itemWithDuplicateValue = collection.items.find(((item) => {
    if (!takenValues.has(item[propName])) {
      takenValues.add(item[propName]);
      return false;
    }
    return true;
  }));

  if (itemWithDuplicateValue) {
    return `Au moins deux items ont la valeur ${itemWithDuplicateValue[propName]} pour la propriété ${propName} dans cette collection.`;
  }
  return false;
}

module.exports = { evaluateAdd, evaluateDefault };
