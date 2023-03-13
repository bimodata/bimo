/* eslint-disable no-restricted-syntax */
/**
 * @template T
 * @param {Set<T>} set
 * @param {function(T)} predicate
 * @returns {T} a value in set for which predicate returned true
 */
function findInSet(set, predicate) {
  for (const value of set) {
    if (predicate(value)) return value;
  }
  return false;
}

module.exports = findInSet;

/**
 * @typedef {Object} FindInSetConfig
 * @property {string} param
 */
