const { iteratee } = require('lodash');

/**
 *
 * @param {object|any[]} collection
 * @param {function|object|string[]|string} iteratee
 * @returns {Map}
 */
function groupByToMap(collection, rawIteratee) {
  const returnMap = new Map();
  const callback = iteratee(rawIteratee);
  const collIsArray = Array.isArray(collection);
  Object.entries(collection).forEach(([indexOrKey, value]) => {
    const key = callback(value, collIsArray ? parseInt(indexOrKey, 10) : indexOrKey, collection);
    if (!returnMap.has(key)) {
      returnMap.set(key, []);
    }
    returnMap.get(key).push(value);
  });
  return returnMap;
}

module.exports = groupByToMap;
