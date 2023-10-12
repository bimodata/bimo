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
    parseAsInt = false,
    parseAsFloat = false,
    considerNanAsError = true,
  } = config;
  let computeFnToUse;
  if (paths) {
    computeFnToUse = () => computeBasedOnPaths(item, { ...config, paths });
  }
  else if (modeKey) {
    logger.trace(`Will try to compute according to this modeKey: ${modeKey}`);
    const computeFnForThisModeKey = computeFnByModeKey[modeKey];
    if (!computeFnForThisModeKey) throw new Error(`Mode key inconnu: ${modeKey}`);
    computeFnToUse = computeFnForThisModeKey;
  }
  else {
    computeFnToUse = computeFn;
  }

  if (!computeFnToUse) throw new Error(`Un modeKey ou une computeFn doivent être fournis`);

  try {
    const rawKey = computeFnToUse(item, config, context);
    let parsedKey = rawKey;
    if (parseAsFloat) parsedKey = parseFloat(parsedKey);
    if (parseAsInt) parsedKey = parseInt(parsedKey, 10);
    if (considerNanAsError && Number.isNaN(parsedKey)) {
      throw new Error(`La conversion de la clé "${rawKey}" en nombre a échoué`);
    }

    return parsedKey;
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
