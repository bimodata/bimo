const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');

/**
 *
 * @param {string|object} entity an Item
 * @param {*} options
 */
function getEntityClassKeyFromEntity(entity, options = {}) {
  const logger = getAndAddLoggerToServiceOptions(options, { serviceName: `getEntityClassKeyFromEntity` });
  logger.silly(`Got this as entity:`);
  logger.silly(entity);
  if (typeof entity === 'object') {
    if (entity.constructor && entity.constructor.name) return entity.constructor.name;
    throw new Error(`The provided object did not have an "constructor.name" property. Cannot retrieve item EntityClassKey`);
  }
  throw new Error(`Entity must be an object. Got ${typeof entity}`);
}

module.exports = getEntityClassKeyFromEntity;
