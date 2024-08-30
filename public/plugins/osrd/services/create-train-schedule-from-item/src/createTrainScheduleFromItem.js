const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const { createPropsFromItems } = require('@bimo/core-utils-create-props-from-items');
const { defaultBaseScheduleFactory } = require('./defaultItemsFactories');
const createPathAndScheduleFromItem = require('./createPathAndScheduleFromItem');

/**
 *
 * @param {*} item
 * @param {CreateTrainScheduleFromItemConfig} config
 * @param {Object} context
 * @param {Object=} context.task
 * @param {Object=} context.logger
 */
function createTrainScheduleFromItem(item, config, context) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: `createTrainScheduleFromItem` });
  const {
    createBaseTrainSchedulePropsConfig,
    createPathAndScheduleConfig,
  } = config;

  if (!createPathAndScheduleConfig) throw new Error(`Bad config: createPathAndScheduleConfig is mandatory`);

  const customBaseTrainScheduleProps = createPropsFromItems(item, createBaseTrainSchedulePropsConfig, context);

  const { path, schedule } = createPathAndScheduleFromItem(item, createPathAndScheduleConfig, context);

  const trainSchedule = { ...defaultBaseScheduleFactory(), ...customBaseTrainScheduleProps, path, schedule };
  trainSchedule.schedule[0].arrival = null;

  logger.trace(`Created TrainSchedule: ${trainSchedule.train_name}`);

  return trainSchedule;
}

module.exports = createTrainScheduleFromItem;

/**
 * @typedef {Object} CreateTrainScheduleFromItemConfig
 * @property {object} createBaseTrainSchedulePropsConfig
 * @property {object} createPathAndScheduleConfig
 */
