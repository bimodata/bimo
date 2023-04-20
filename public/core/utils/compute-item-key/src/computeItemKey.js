const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const computeBasedOnPaths = require('./computeBasedOnPaths');

/**
 *
 * @param {Object} item
 * @param {ComputeItemKeyConfig} config - an object or string. If string, used as a shorthand for config.path
 * @param {Object} context
 * @param {Object=} context.task
 * @param {Object=} context.logger
 */
function computeItemKey(item, config, context = {}) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: `computeItemKey` });
  const {
    computeFn, modeKey, computeFnByModeKey = {},
    path = typeof config === 'string' ? config : null,
    paths = path && [path],
    noticeLevelForKeyComputationError = 'throw',
    returnValueForKeyComputationError = undefined,
  } = config;
  if (paths) return computeBasedOnPaths(item, { ...config, paths });

  let computeFnToUse = computeFn;
  if (modeKey) {
    logger.trace(`Will try to compute according to this modeKey: ${modeKey}`);
    const computeFnForThisModeKey = computeFnByModeKey[modeKey];
    if (!computeFnForThisModeKey) throw new Error(`Mode key inconnu: ${modeKey}`);
    computeFnToUse = computeFnForThisModeKey;
  }

  if (!computeFnToUse) throw new Error(`Un modeKey ou une computeFn doivent être fournis`);

  try {
    const key = computeFnToUse(item, config, context);
    return key;
  }
  catch (error) {
    logger[noticeLevelForKeyComputationError](
      `Erreur au moment de calculer la key de ${item.shortLoggingOutput}: ${error.message}\n${error.stack}.`,
    );
    return returnValueForKeyComputationError;
  }
}

module.exports = computeItemKey;

/**
 * @typedef {Object|string} ComputeItemKeyConfig
 * @property {Object} [computeFnByModeKey={}]
 * @property {string=} modeKey - computation mode key
 * @property {function=} computeFn - a function that takes a variant as first arg, placesCollection as second, and computes the key
 * @property {string=} path - path to the prop of item that should be used as key
 */
