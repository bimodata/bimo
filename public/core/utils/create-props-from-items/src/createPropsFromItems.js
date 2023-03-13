const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const shallowAssign = require('@bimo/core-utils-shallow-assign');

const createPropFromItems = require('./createPropFromItems');
const getAndValidateItemsFromItemOrItems = require('./getAndValidateItemsFromItemOrItems');

/**
 * Creates an object with props obtained by transforming items according to config
 * @param {Object} itemOrItems - the source items
 * @param {*} config - either an array of propConfigTuples, or an object whose keys are propNames and values propConfigs
 * @param {Object=} context -
 * @returns {Object} the desired object
 */
function createPropsFromItemsAndConfig(itemOrItems, config, context) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: 'createPropsFromItemsAndConfig' });
  logger.silly(`Start of createPropsFromItemsAndConfig with ${JSON.stringify(config)}`);
  if (!itemOrItems) return null;
  const items = getAndValidateItemsFromItemOrItems(itemOrItems);

  const outputProps = {};

  if (!config) {
    if (items.length === 1) return shallowAssign(outputProps, items[0]);
    throw new Error(`Items must be an object or an array of length 1 when no config is provided.`);
  }

  if (!['array', 'object'].includes(typeof config)) throw new Error('config must be an array or an object');

  const propConfigTuplesArray = Array.isArray(config) ? config : Object.entries(config);
  propConfigTuplesArray.forEach((propConfigTuple) => {
    const [propName, propConfig] = propConfigTuple;
    try {
      logger.silly(`Will create prop for ${propName}`);
      outputProps[propName] = createPropFromItems(items, propConfig, context);
    }
    catch (error) {
      const { noticeLevelForError = 'error' } = propConfig;
      if (noticeLevelForError) {
        if (noticeLevelForError === 'throw') throw error;
        if (logger[noticeLevelForError]) {
          logger[noticeLevelForError](error.message);
        }
        else {
          throw new Error(`"${noticeLevelForError}" is not a known level on logger. Known levels are ${Object.keys(logger)}`);
        }
      }
    }
  });

  return outputProps;
}

module.exports = createPropsFromItemsAndConfig;
