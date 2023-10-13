const { inspect } = require('util');

const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');

const getRegexFromStringifedRegex = require('./getRegexFromStringifedRegex');

/**
 *
 * @param {any} stringToClean - string to clean
 * @param {string[][]} regexAndReplacePairs - array of [stringified regex, replacer] tuples
 * @param {object} [options={}]
 * @returns {string} the cleaned string
 */
function cleanStringUsingRegexAndReplacePairs(stringToClean, regexAndReplacePairs, options) {
  const logger = options && getAndAddLoggerToServiceOptions(options, { serviceName: 'cleanStringUsingRegexs' });
  if (!regexAndReplacePairs || [undefined, null].includes(stringToClean)) return stringToClean;
  let cleanedString = stringToClean.toString();

  if (logger) logger.silly(`Will use these regexAndReplacePairs: ${inspect(regexAndReplacePairs)}`);
  regexAndReplacePairs.forEach((regexAndReplacePair) => {
    const [stringifiedRegex, replaceString] = regexAndReplacePair;
    const regex = getRegexFromStringifedRegex(stringifiedRegex);
    cleanedString = cleanedString.replace(regex, replaceString);
  });
  if (logger) logger.trace(`String ${stringToClean} cleaned to ${cleanedString}`);
  return cleanedString;
}

module.exports = cleanStringUsingRegexAndReplacePairs;
