const caseConversion = require('./src/caseConversion');
const cleanStringUsingRegexAndReplacePairs = require('./src/cleanStringUsingRegexAndReplacePairs');
const getRegexFromStringifedRegex = require('./src/getRegexFromStringifedRegex');

module.exports = {
  ...caseConversion,
  cleanStringUsingRegexAndReplacePairs,
  getRegexFromStringifedRegex,
};
