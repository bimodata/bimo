const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const _ = require('lodash');

/**
 *
 * @param {[string|undefined[], string|undefined[]]} lists
 * @param {MatchTwoListsOfStringsConfig} config
 * @param {*} context
 */
function matchTwoListsOfStrings([listA, listB], config, context = {}) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: `matchTwoListsOfStrings` });

  const { returnOnFirstMatch = false } = config;

  const sortedA = _.sortBy(listA);
  const sortedB = _.sortBy(listB);
  const matched = [];
  const onlyA = [];
  const onlyB = [];

  logger.trace(`Will start comparing ${sortedA.length} values from A and ${sortedB.length} values from B`);
  while (sortedA.length > 0 && sortedB.length > 0) {
    const valueA = sortedA.pop();
    const valueB = sortedB.pop();
    if (valueA === valueB) {
      matched.push(valueA);
      if (returnOnFirstMatch) {
        logger.trace(`Returning early with firstMatch`);
        return { matched, onlyA, onlyB, remainingA: sortedA, remainingB: sortedB };
      }
    }
    // @ts-ignore
    else if (valueA > valueB) {
      onlyA.push(valueA);
      sortedB.push(valueB);
    }
    else {
      onlyB.push(valueB);
      sortedA.push(valueA);
    }
  }

  logger.trace(`Done comparing. ${sortedA.length} values from A and ${sortedB.length} values from B remaining.`);
  onlyA.push(...sortedA);
  onlyB.push(...sortedB);

  return { matched, onlyA, onlyB };
}

module.exports = matchTwoListsOfStrings;

/**
 * @typedef {Object} MatchTwoListsOfStringsConfig
 */
