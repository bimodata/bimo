const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');

function getCollectionClassKeyFromItemClassKey(itemClassKey) {
  return `${itemClassKey}sCollection`;
}

/**
 *
 * @param {string|object} item an item entityClassKey or an item
 * @param {*} options
 */
function getCollectionClassKeyFromItem(item, options = {}) {
  const logger = getAndAddLoggerToServiceOptions(options, { serviceName: `getCollectionClassKeyFromItem` });
  logger.silly(`Got this as item:`);
  logger.silly(item);
  if (typeof item === 'string') {
    return getCollectionClassKeyFromItemClassKey(item);
  }
  if (typeof item === 'object') {
    return getCollectionClassKeyFromItemClassKey(item.constructor.name);
  }
  throw new Error(`Item must be a string or an object. Got ${typeof item}`);
}

module.exports = getCollectionClassKeyFromItem;
