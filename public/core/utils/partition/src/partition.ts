const _ = require('lodash');

/**
 *
 * @param {any[]} collection an array of items to partition
 * @param {function|object|string[]|string} iteratee
 */
function partition(collection, iteratee) {
  const matchedValues = [];
  const unmatchedValues = [];
  const callback = _.iteratee(iteratee);
  collection.forEach((value, index, array) => {
    if (callback(value, index, array)) {
      matchedValues.push(value);
    }
    else {
      unmatchedValues.push(value);
    }
  });
  return [matchedValues, unmatchedValues];
}

module.exports = partition;

/**
 * @typedef {Object} PartitionConfig
 * @property {string} param
 */
