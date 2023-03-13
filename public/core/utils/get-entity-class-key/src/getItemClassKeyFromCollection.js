const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');

const collectionMatcher = /sCollection$/;

function getItemClassKeyFromCollectionClassKey(collectionClassKey) {
  if (collectionMatcher.test(collectionClassKey)) return collectionClassKey.slice(0, -11);
  throw new Error(`The provided string did not end with "sCollection". Cannot retrieve item EntityClassKey`);
}

/**
 *
 * @param {string|object} collection a Collection entityClassKey or a Collection
 * @param {*} options
 */
function getItemClassKeyFromCollection(collection, options = {}) {
  const logger = getAndAddLoggerToServiceOptions(options, { serviceName: `getItemClassKeyFromCollection` });
  logger.silly(`Got this as collection:`);
  logger.silly(collection);
  if (typeof collection === 'string') {
    return getItemClassKeyFromCollectionClassKey(collection);
  }
  if (typeof collection === 'object') {
    if (collection.itemName) return collection.itemName;
    throw new Error(`The provided object did not have an "itemName" property. Cannot retrieve item EntityClassKey`);
  }
  throw new Error(`Collection must be a string or an object. Got ${typeof collection}`);
}

module.exports = getItemClassKeyFromCollection;
