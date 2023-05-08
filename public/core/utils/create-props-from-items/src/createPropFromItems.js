const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const { cleanStringUsingRegexAndReplacePairs } = require('@bimo/core-utils-string');
const getWithSelf = require('@bimo/core-utils-get-with-self');
const getAndValidateItemsFromItemOrItems = require('./getAndValidateItemsFromItemOrItems');

/**
 * The name of a propety
 * @typedef {string} PropName
 */

/**
 * The config options that decide how a props value will be generated
 * @typedef {object} PropConfig
 * @property {string} [noticeLevelForError=trace] - level to use on the logger if there is an error while processing this prop
 * @property {string=} staticValue - a predefined value that will be assigned to the prop
 * @property {function=} createFn - a function that takes the source items as argument and returns a value
 * @property {object=} createConfig - a config object
 * @property {string=} createConfig.sourcePropPath - path to the item's prop that will be the source for the value
 * @property {string[]=} createConfig.sourcePropPaths - paths to the item's props that will be concatenated to
 * create the source for the value
 * @property {string=} createConfig.separator - path to the item's prop that will be the source for the value
 * @property {string=} createConfig.sourcePropFallbackValue - static fallback value if sourcePropPath is not defined on object or if
 * sourcePropPaths concatenate to falsey
 * @property {[string, string][]=} createConfig.regexAndReplacePairs - regexAndReplace pairs that will be applied to the sourceItemProp
 * @property {number=} createConfig.sourceItemIndex - index of the item to use in items
 * @property {'string'|'array'|'any'} [createConfig.destinationPropType='string'] - index of the item to use in items
 */

/**
 *
 * @param {Object} itemOrItems - the source items
 * @param {PropConfig|string|number|boolean} config - a PropConfig object or a string that will be used as a static value
 */
function createPropFromItems(itemOrItems, config, context = {}) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: 'createPropFromItems' });
  logger.silly(`Start of createPropFromItems with ${JSON.stringify(config)}`);

  if (!itemOrItems) return null;
  const items = getAndValidateItemsFromItemOrItems(itemOrItems);

  if (config === undefined || config === null) throw new Error(`config is mandatory`);

  if (['number', 'boolean'].includes(typeof config)) return config;

  const configToUse = typeof config === 'string' ? { createConfig: config } : config;

  if (typeof configToUse === 'object') {
    if (configToUse.staticValue !== undefined) {
      return configToUse.staticValue;
    }
    if (configToUse.createFn !== undefined) {
      if (typeof configToUse.createFn === 'function') {
        return configToUse.createFn(items, config, context);
      }
      if (typeof configToUse.createFn === 'string') {
        if (process.env.ALLOW_EVAL === 'true') {
          // eslint-disable-next-line no-new-func
          return new Function(`return (${configToUse.createFn})`)()(items, config, context);
        }
        throw new Error(`Execution of custom javascript code is not allowed on this ENV`);
      }
      throw new Error(`Invalid createFn`);
    }
    if (configToUse.createConfig !== undefined) {
      const {
        // If createConfig is a string, it's a shorthand for sourcePropPath
        sourcePropPath = (typeof configToUse.createConfig === 'string' && configToUse.createConfig),
        sourcePropFallbackValue,
        regexAndReplacePairs, sourceItemIndex = 0,
        sourcePropPaths, separator = '',
        destinationPropType = 'string',
        lookupDictionary = {},
        lookupFallbackValue,
      } = configToUse.createConfig;
      if (sourcePropPath && sourcePropPaths) throw new Error(`Only one of sourcePropPath or sourcePropPaths should be defined`);
      const sourcePropPathsToUse = sourcePropPaths || [sourcePropPath];

      const values = sourcePropPathsToUse.map((path) => {
        const indexPart = (sourceItemIndex === null) ? '' : `${sourceItemIndex}.`;
        const rawValue = getWithSelf(items, `${indexPart}${path}`, '');
        const lookupValue = lookupDictionary[rawValue];
        const lookupFallback = lookupFallbackValue === undefined ? rawValue : lookupFallbackValue;
        return lookupValue === undefined ? lookupFallback : lookupValue;
      });

      if (destinationPropType === 'string') {
        const valueToClean = values.join(separator) || sourcePropFallbackValue;
        return cleanStringUsingRegexAndReplacePairs(valueToClean, regexAndReplacePairs);
      }
      if (destinationPropType === 'array') return values;

      return values[0] || sourcePropFallbackValue;
    }
  }

  throw new Error(`Invalid config: ${JSON.stringify(config)}`);
}

module.exports = createPropFromItems;
