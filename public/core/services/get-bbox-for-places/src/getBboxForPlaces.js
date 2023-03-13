const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const { BoundingBox } = require('@bimo/core-entities');

/**
 *
 * @param {import('@bimo/core-entities/src/Place')[]} places
 * @param {Object} config
 * @param {Object} context
 * @param {Object=} context.task
 * @param {Object=} context.logger
 * @returns {import('@bimo/core-entities/src/BoundingBox')}
 */
function getBboxForPlaces(places, config = {}, context = {}) {
  getAndAddLoggerToServiceOptions(context, { serviceName: `getBboxForPlaces` });
  const {
    padding = 0,
    xPadding = padding,
    yPadding = padding,
    xMinPadding = xPadding,
    xMaxPadding = xPadding,
    yMinPadding = yPadding,
    yMaxPadding = yPadding,

  } = config;

  let xMin = Number.POSITIVE_INFINITY;
  let yMin = Number.POSITIVE_INFINITY;
  let xMax = Number.NEGATIVE_INFINITY;
  let yMax = Number.NEGATIVE_INFINITY;

  places.forEach((place) => {
    if (place.isLocated) {
      const x = parseFloat(place.locaXCoord);
      const y = parseFloat(place.locaYCoord);
      if (x < xMin) xMin = x;
      if (x > xMax) xMax = x;
      if (y < yMin) yMin = y;
      if (y > yMax) yMax = y;
    }
  });

  if (xMin === Number.POSITIVE_INFINITY) throw new Error(`Could not compute BBox for places`);

  return new BoundingBox({
    xMin: xMin - xMinPadding,
    yMin: yMin - yMinPadding,
    xMax: xMax + xMaxPadding,
    yMax: yMax + yMaxPadding,
  });
}

module.exports = getBboxForPlaces;
