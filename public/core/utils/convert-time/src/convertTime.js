const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const createGetDurationFromSourceFromConfig = require('./createGetDurationFromSourceFromConfig');
const createGetDestinationFromDurationFromConfig = require('./createGetDestinationFromDurationFromConfig');

/**
 * @param {any} source
 * @param {convertTimeConfig} config
 * @param {Object} context
 * @param {Object=} context.task
 * @param {Object=} context.logger
 */
function convertTime(source, config, context = {}) {
  getAndAddLoggerToServiceOptions(context, { serviceName: `convertTime` });

  const { durationAdjustmentObject, lowerBoundDuration } = config;

  const getDurationFromSource = createGetDurationFromSource(config, context);
  const getDestinationFromDuration = createGetDestinationFromDuration(config, context);

  if (!getDurationFromSource || !getDestinationFromDuration) {
    throw new Error(`Could not create pivot functions`);
  }

  const unadjustedDuration = getDurationFromSource(source, config, context);

  const adjustedDuration = durationAdjustmentObject ? unadjustedDuration.plus(durationAdjustmentObject) : unadjustedDuration;

  const verifiedDuration = (lowerBoundDuration && adjustedDuration < lowerBoundDuration)
    ? adjustedDuration.plus({ day: 1 }) : adjustedDuration;

  return getDestinationFromDuration(verifiedDuration, config, context);
}

module.exports = convertTime;

function createGetDurationFromSource(config, context) {
  const { sourceFormat, sourceToDurationFn, sourceToDurationConfig } = config;
  if (sourceFormat) return createGetDurationFromSourceFromConfig(sourceFormat, context);
  if (sourceToDurationFn) return sourceToDurationFn;
  if (sourceToDurationConfig) return createGetDurationFromSourceFromConfig(sourceToDurationConfig, context);
  return false;
}

function createGetDestinationFromDuration(config, context) {
  const { destinationFormat, durationToDestFn, durationToDestConfig } = config;
  if (destinationFormat) return createGetDestinationFromDurationFromConfig(destinationFormat, context);
  if (durationToDestFn) return durationToDestFn;
  if (durationToDestConfig) return createGetDestinationFromDurationFromConfig(durationToDestConfig, context);
  return false;
}

/**
 * @typedef {Object} convertTimeConfig
 * @property {'iso'|'hastus'|'duration'} [sourceFormat] - the source format, if one of the predefined format suits
 * @property {'iso'|'hastus'|'duration'} [destinationFormat] - the destination format, if one of the predefined format suits
 * @property {import('./createGetDurationFromSourceFromConfig').SourceToDurationConfig} [sourceToDurationConfig] -
 * config options to convert the source format to a Luxon duration
 * @property {function} [sourceToDurationFn] - a function that converts the source format to a Luxon duration
 * @property {import('./createGetDestinationFromDurationFromConfig').DurationToDestinationConfig} [durationToDestConfig] -
 * config options to convert a Luxon duration to the destination format
 * @property {function} [durationToDestFn] - a function that converts a Luxon duration to the destination format
 * @property {import('luxon').Duration} [lowerBoundDuration] - See readme.
 * @property {Object} [durationAdjustementObject] - See readme.
 */
