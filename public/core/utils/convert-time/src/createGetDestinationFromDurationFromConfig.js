/* eslint-disable no-param-reassign */
const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const { durationToIsoTimeString, durationToHastusExtendedHoursString } = require('@bimo/core-utils-time-and-date');

const getDestinationFromDurationByDestinationFormatKey = {
  hastus: durationToHastusExtendedHoursString,
  iso: durationToIsoTimeString,
  duration: (d) => d,
};

/**
 * @typedef {Object} DurationToDestinationConfig
 * @property {'iso'|'hastus'} destinationFormatKey
 */

/**
 * @param {DurationToDestinationConfig} config
 * @param {*} context
 */
function createGetDestinationFromDurationFromConfig(config, context) {
  getAndAddLoggerToServiceOptions(context, { serviceName: `createGetDestinationFromDurationFromConfig` });
  const { destinationFormatKey = config } = config;
  return getDestinationFromDurationByDestinationFormatKey[destinationFormatKey];
}

module.exports = createGetDestinationFromDurationFromConfig;
