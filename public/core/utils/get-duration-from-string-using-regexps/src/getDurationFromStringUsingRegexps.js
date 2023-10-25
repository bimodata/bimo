const { Duration } = require('luxon');
const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const { cleanStringUsingRegexAndReplacePairs } = require('@bimo/core-utils-string');

const defaultLogLevelByDurationComponent = {
  seconds: 'trace',
  minutes: 'warn',
  hours: 'error',
};

/**
 *
 * @param {string} sourceString
 * @param {GetDurationFromStringUsingRegexpsConfig} config
 * @param {*} context
 */
function getDurationFromStringUsingRegexps(sourceString, config, context) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: `getDurationFromStringUsingRegexps` });
  if (typeof sourceString !== 'string') {
    logger.trace(`Returning sourceString as is when it is not a string`);
    return sourceString;
  }
  if (sourceString === '') {
    logger.trace(`Returning '' when sourceString is ''`);
    return '';
  }
  const {
    regexReplacePairsByDurationComponent, allowIdenticalResult = false,
    createNoticeForIdenticalResult = ({ durationComponent }) => ({
      level: defaultLogLevelByDurationComponent[durationComponent] || 'error',
      message: `Pas de correspondance pour ${durationComponent} dans ${sourceString}`,
    }),
    createNoticeForNaN = ({ durationComponent, cleanedValue }) => ({
      level: 'error',
      message: `Impossible de convertir ${cleanedValue} en nombre pour créer ${durationComponent} à partir de ${sourceString}`,
    }),
  } = config;

  // @ts-ignore
  const durationObject = Object.fromEntries(Object.entries(regexReplacePairsByDurationComponent)
    .map(([durationComponent, regexReplacePairs]) => {
      const cleanedValue = cleanStringUsingRegexAndReplacePairs(sourceString, regexReplacePairs, context);
      if (!allowIdenticalResult && (sourceString === cleanedValue)) {
        logger.logNotice(createNoticeForIdenticalResult({ durationComponent, sourceString, regexReplacePairs, context }));
        return null;
      }
      const cleanedValueAsNumber = parseInt(cleanedValue, 10);
      if (Number.isNaN(cleanedValueAsNumber)) {
        logger.logNotice(createNoticeForNaN({ durationComponent, sourceString, regexReplacePairs, context, cleanedValue }));
        return null;
      }
      return [durationComponent, cleanedValueAsNumber];
    }).filter(Boolean));
  return Duration.fromObject(durationObject);
}

module.exports = getDurationFromStringUsingRegexps;

/**
 * @typedef {Object} GetDurationFromStringUsingRegexpsConfig
 * @property {Boolean} [allowIdenticalResult=false] - when this is false (the default) and the result of
 * a replacement is the same as the original string, we consider that there was no match.
 * If you have some special cases where this is not true, set this to true, and
 * call me cause I'm curious ...
 * @property {RegexReplacePairsByDurationComponent} [regexReplacePairsByDurationComponent]
 */

/**
 * @typedef {Object} RegexReplacePairsByDurationComponent
 * @property {RegexAndReplacePairs} [days] - an array of regexReplacePairs that produces the number of days from the source string
 * @property {RegexAndReplacePairs} [hours] - an array of regexReplacePairs that produces the number of hours from the source string
 * @property {RegexAndReplacePairs} [minutes] - an array of regexReplacePairs that produces the number of minutes from the source string
 * @property {RegexAndReplacePairs} [seconds] - an array of regexReplacePairs that produces the number of seconds from the source string
 */

/**
 * @typedef {string[][]} RegexAndReplacePairs
 */
