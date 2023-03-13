const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const { pick } = require('lodash');

/**
 *
 * @param {[NetworkNode, NetworkNode]} nodes
 * @param {CreateSegmentFromNodesConfig} [config]
 * @param {Object} context
 * @param {Object=} context.task
 * @param {Object=} context.logger
 */
function createGeojsonFeatureFromPlace(place, config, context = {}) {
  getAndAddLoggerToServiceOptions(context, { serviceName: `createGeojsonFeatureFromPlace` });
  const {
    placePropsToShowOnFeature = ['plcIdentifier', 'plcDescription'],
    placeCustomPropsToShowOnFeature = ['Localisation de la gare', 'PK'],
  } = config;
  return ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [parseFloat(place.locaXCoord), parseFloat(place.locaYCoord)],
    },
    properties: { ...pick(place, placePropsToShowOnFeature), ...pick(place.customProps ?? {}, placeCustomPropsToShowOnFeature) },
  });
}

module.exports = createGeojsonFeatureFromPlace;

/**
 * @typedef {Object} CreateSegmentFromNodesConfig
 * @property {string} param
 */
