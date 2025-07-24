const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const { createPropsFromItems } = require('@bimo/core-utils-create-props-from-items');
const { get } = require('lodash');

const { defaultPathPointFactory, defaultSchedulePointFactory } = require('./defaultItemsFactories');

/**
 *
 * @param {*} item
 * @param {CreatePathAndScheduleFromItemConfig} config
 * @param {Object} context
 * @param {Object=} context.task
 * @param {Object=} context.logger
 */
function createPathAndScheduleFromItem(item, config, context) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: `createPathAndScheduleFromItem` });
  const {
    pathToArrayOfPoints,
    createPathPointFromPointConfig,
    createSchedulePointFromPointConfig,
  } = config;

  const arrayOfPoints = get(item, pathToArrayOfPoints);

  if (!arrayOfPoints || !Array.isArray(arrayOfPoints)) {
    throw new Error(`pathToArrayOfPoints (${pathToArrayOfPoints}) does not lead to an array. Got ${arrayOfPoints}`);
  }
  const pathPoints = [];
  const schedulePoints = [];

  arrayOfPoints.forEach((point, index) => {
    logger.trace(`Handling point ${point}`);

    /** We create a new object that includes the point, the item and the index in case we want to derive some props from them */
    const pointItemAndIndex = { point, item, index };
    const pathPointProps = createPropsFromItems(pointItemAndIndex, createPathPointFromPointConfig, context);
    const pathPoint = { ...defaultPathPointFactory(), ...pathPointProps };
    pathPoints.push(pathPoint);

    const schedulePointProps = createPropsFromItems(pointItemAndIndex, createSchedulePointFromPointConfig, context);
    const schedulePoint = { ...defaultSchedulePointFactory(), ...schedulePointProps };
    schedulePoints.push(schedulePoint);
  });

  logger.trace(`Created ${pathPoints.length} path points and ${schedulePoints.length} schedule points`);

  return { path: pathPoints, schedule: schedulePoints };
}

module.exports = createPathAndScheduleFromItem;

/**
 * @typedef {Object} CreatePathAndScheduleFromItemConfig
 * @property {string|string[]} pathToArrayOfPoints
 * @property {object} createPathPointFromPointConfig
 * @property {object} createSchedulePointFromPointConfig
 */
