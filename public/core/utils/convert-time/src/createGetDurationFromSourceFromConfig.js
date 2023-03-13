/* eslint-disable no-param-reassign */
const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const getDurationFromStringUsingRegexps = require('@bimo/core-utils-get-duration-from-string-using-regexps');
const { isoTimeStringToDuration, hastusExtendedHoursToDuration } = require('@bimo/core-utils-time-and-date');

const getRawDurationFromSourceBySourceFormatKey = {
  hastus: hastusExtendedHoursToDuration,
  iso: isoTimeStringToDuration,
  duration: (d) => d,
};

/**
 * @param {SourceToDurationConfig} config
 * @param {*} context
 */
function createGetDurationFromSourceFromConfig(config, context) {
  getAndAddLoggerToServiceOptions(context, { serviceName: `createGetDurationFromSourceFromConfig` });
  const { sourceFormatKey = config, regexReplacePairsByDurationComponent } = config;

  return regexReplacePairsByDurationComponent
    ? (source) => getDurationFromStringUsingRegexps(source, config, context)
    : getRawDurationFromSourceBySourceFormatKey[sourceFormatKey];
}

module.exports = createGetDurationFromSourceFromConfig;

/**
 * @typedef {Object} SourceToDurationConfig
 * @property {RegexReplacePairsByDurationComponent} [regexReplacePairsByDurationComponent]
 * @property {'iso'|'hastus'} sourceFormatKey
 * @property {Boolean} [considerJourExploitation=true]
 */

/**
 * @typedef {Object} RegexReplacePairsByDurationComponent
 * @property {RegexAndReplacePairs} [days] - an array of regexReplacePairs that produces the number of days from the source string
 * @property {RegexAndReplacePairs} [hours] - an array of regexReplacePairs that produces the number of hours from the source string
 * @property {RegexAndReplacePairs} [minutes] - an array of regexReplacePairs that produces the number of minutes from the source string
 * @property {RegexAndReplacePairs} [seconds] - an array of regexReplacePairs that produces the number of seconds from the source string
 */

/**
 * @typedef {[string, string][]} RegexAndReplacePairs
 */
