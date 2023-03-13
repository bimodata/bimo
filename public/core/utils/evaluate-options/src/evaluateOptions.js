const { inspect } = require('util');
const { evaluateItemQuery } = require('@bimo/core-utils-evaluate-item-query');
const _ = require('lodash');

/**
 * Recursively evaluates item against options. Returns true if item matches options, false otherwise.
 * @param {any} item the item to evaluate against the options
 * @param {any} options the options against which to evaluate the item
 * @returns {Boolean|object} true if item matches options, false otherwise
 */
function recursiveEvaluateOptions(item, options, logger) {
  logger.silly(`item: ${inspect(item, false, 1)}`);
  logger.silly(`options: ${inspect(options)}`);

  if (typeof options !== `object`) return options;
  const optionsKeys = Object.keys(options);
  logger.trace(`Options is an object with the following keys: ${optionsKeys}`);
  if (!optionsKeys.includes('$query')) {
    return _.mapValues(options, (rawOptionValue) => recursiveEvaluateOptions(item, rawOptionValue, logger));
  }
  if (optionsKeys.length > 1) throw new Error(`Malformed options object. $query keys should not have siblings.`);
  return evaluateItemQuery(item, options.$query);
}

module.exports = recursiveEvaluateOptions;
