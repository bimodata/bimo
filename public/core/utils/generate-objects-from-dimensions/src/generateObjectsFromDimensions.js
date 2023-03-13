const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');

/**
 *
 * @param {GenerateObjectsFromDimensionsConfig} config
 * @param {*} options
 * @returns {object[]}
 */
function generateObjectsFromDimensions(config, options = {}) {
  const logger = getAndAddLoggerToServiceOptions(options, { serviceName: `generateObjectsFromDimensions` });
  const { dimensions } = config;
  logger.trace(`Start of generateObjectsFromDimensions with ${dimensions.length} dimensions.`);
  logger.silly(dimensions);

  const allObjects = dimensions.reduce((prev, dimension) => {
    logger.silly(`Handling dimension ${dimension.key}`);
    const expendedArray = [];
    prev.forEach((prevObj) => {
      dimension.values.forEach((dimValue) => {
        expendedArray.push({
          ...prevObj,
          [dimension.key]: dimValue,
        });
      });
    });
    return expendedArray;
  }, [{}]);

  logger.trace(`End of generateObjectsFromDimensions with ${dimensions.length} dimensions.`);
  logger.silly(allObjects);
  return allObjects;
}

module.exports = generateObjectsFromDimensions;

/**
 * @typedef {Object} GenerateObjectsFromDimensionsConfig
 * @property {object[]} dimensions
 */
