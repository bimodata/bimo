const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const getBboxForPlaces = require('@bimo/core-services-get-bbox-for-places');
const retrievePlace = require('@bimo/core-services-retrieve-place');

/**
 *
 * @param {import('@bimo/core-entities/src/Place')} placeLike
 * @param {Object} config
 * @param {Object} context
 * @param {Object=} context.task
 * @param {Object=} context.logger
 * @returns {import('@bimo/core-entities/src/BoundingBox')}
 */
function getBboxForPlace(placeLike, config = {}, context = {}) {
  getAndAddLoggerToServiceOptions(context, { serviceName: `getBboxForPlace` });

  const sourcePlace = retrievePlace(placeLike, context.placesCollection, context);
  const allPlaces = [sourcePlace, ...sourcePlace.childrenPlaces];

  return getBboxForPlaces(allPlaces, { padding: 100, ...config }, context);
}

module.exports = getBboxForPlace;
