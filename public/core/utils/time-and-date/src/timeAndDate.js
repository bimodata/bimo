const { DateTime, Interval, Settings, Duration } = require('luxon');

Settings.defaultZone = 'Europe/Paris';

const MAX_DURATION_FOR_HASTUS_EXTENDED_HOURS = Duration.fromObject({ hour: 36 });
const DATE_TO_USE_FOR_UNKNOWN_DATES = DateTime.local(2000, 1, 1);
const START_OF_OPERATING_DAY = DATE_TO_USE_FOR_UNKNOWN_DATES.plus({ hour: 3 });
const END_OF_OPERATING_DAY = START_OF_OPERATING_DAY.plus({ day: 1 });

const hastusExtendedHoursMatcher = /^([0123]?[0-9]):([0-5][0-9])(?:;([0-5][0-9]))?(?:\.(\d))?$/;
function hastusExtendedHoursToDuration(hastusExtendedHoursString) {
  // Todo: check what the last digit means in Hastus ...
  const matchResult = hastusExtendedHoursMatcher.exec(hastusExtendedHoursString);
  if (!matchResult) {
    throw new Error(`${hastusExtendedHoursString} is not a valid Hastus time`);
  }
  const duration = Duration.fromObject({
    hours: (matchResult[1] && parseInt(matchResult[1], 10)) || 0,
    minutes: (matchResult[2] && parseInt(matchResult[2], 10)) || 0,
    seconds: (matchResult[3] && parseInt(matchResult[3], 10)) || 0,
    // todo: eventually add the 4th match result here.
  });
  return duration;
}

const hastusMinutesAndSecondsMatcher = /^(\d?\d?\d)(?:;([0-5][0-9]))?$/;
function hastusMinutesAndSecondsToDuration(hastusMinutesAndSecondsString) {
  const matchResult = hastusMinutesAndSecondsMatcher.exec(hastusMinutesAndSecondsString);
  if (!matchResult) {
    throw new Error(`${hastusMinutesAndSecondsString} is not a valid Hastus minutes and seconds duration`);
  }
  const duration = Duration.fromObject({
    minutes: (matchResult[1] && parseInt(matchResult[1], 10)) || 0,
    seconds: (matchResult[2] && parseInt(matchResult[2], 10)) || 0,
  });
  return duration;
}

const hastusHoursAndMinutesMatcher = /^(\d?\d?\d)h([0-5][0-9])(?:;([0-5][0-9]))?$/;
function hastusHoursAndMinutesToDuration(hastusHoursAndMinutesString) {
  const matchResult = hastusHoursAndMinutesMatcher.exec(hastusHoursAndMinutesString);
  if (!matchResult) {
    throw new Error(`${hastusHoursAndMinutesString} is not a valid Hastus hours and minutes duration`);
  }
  const duration = Duration.fromObject({
    hours: (matchResult[1] && parseInt(matchResult[1], 10)) || 0,
    minutes: (matchResult[2] && parseInt(matchResult[2], 10)) || 0,
    seconds: (matchResult[3] && parseInt(matchResult[3], 10)) || 0,
  });
  return duration;
}

function durationToDateTime(duration) {
  return DATE_TO_USE_FOR_UNKNOWN_DATES.plus(duration);
}

function hastusExtendedHoursToDateTime(hastusExtendedHoursString) {
  return durationToDateTime(hastusExtendedHoursToDuration(hastusExtendedHoursString));
}

function hastusExtendedHoursToJsDate(hastusExtendedHoursString) {
  return hastusExtendedHoursToDateTime(hastusExtendedHoursString).toJSDate();
}

const durationByIsoTimeStringCache = {};
function isoTimeStringToDuration(isoTimeString) {
  const cachedValue = durationByIsoTimeStringCache[isoTimeString];
  if (cachedValue) return cachedValue;

  // Locking the date, otherwise, when executed on a day of timechange, it didn't work
  const dt = DateTime.fromISO(`2020-01-01T${isoTimeString}`);
  if (!dt.isValid) throw Error(dt.invalidExplanation);
  const newValue = dt.diff(dt.startOf('day'));
  durationByIsoTimeStringCache[isoTimeString] = newValue;
  return newValue;
}

/**
 *
 * @param {Duration} duration
 */
function durationToIsoTimeString(duration) {
  if (!(duration instanceof Duration)) throw Error(`Duration should be a Duration. Got ${typeof duration}`);
  return duration.shiftTo('day', 'hour', 'minute', 'second').set({ day: 0 }).toFormat('hh:mm:ss');
}

function durationToHastusExtendedHoursString(duration) {
  if (!(duration instanceof Duration)) throw Error(`Duration should be a Duration. Got ${typeof duration}`);
  const durationAsString = duration.shiftTo('hour', 'minute', 'second').toFormat('hh:mm;ss');
  if (duration > MAX_DURATION_FOR_HASTUS_EXTENDED_HOURS) throw new Error(`La valeur ${durationAsString} dépasse le maximum autorisé.`);
  return durationAsString;
}

function getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings(timeString1, timeString2) {
  const duration1 = hastusExtendedHoursToDuration(timeString1);
  const duration2 = hastusExtendedHoursToDuration(timeString2);
  return duration2.as('seconds') - duration1.as('seconds');
}

function getDifferenceInDaysBetweenTwoIsoDateStrings(isoDateString1, isoDateString2) {
  return DateTime.fromISO(isoDateString2, { zone: 'utc' })
    .diff(DateTime.fromISO(isoDateString1, { zone: 'utc' }))
    .as('days');
}

function getDifferenceInSecondsBetweenTwoHastusMinutesAndSecondsStrings(timeString1, timeString2) {
  const duration1 = hastusMinutesAndSecondsToDuration(timeString1);
  const duration2 = hastusMinutesAndSecondsToDuration(timeString2);
  return duration2.as('seconds') - duration1.as('seconds');
}

function addTimeObjectToHastusExtendedHoursString(timeString, timeObject) {
  return durationToHastusExtendedHoursString(hastusExtendedHoursToDuration(timeString).plus(timeObject));
}

/**
 * @param {number|String} numberOfSeconds Number of seconds since midnight
 * @returns {String} Hastus extended hours string
 */
function numberOfSecondsToHastusExtendedHoursString(numberOfSeconds) {
  const numberOfSecondsAsInt = parseInt(numberOfSeconds, 10);
  const numberAsDuration = Duration.fromMillis(numberOfSecondsAsInt * 1000);
  return durationToHastusExtendedHoursString(numberAsDuration);
}

/**
 * @param {number|String} numberOfSeconds Number of seconds since midnight
 * @returns {String} Hastus minutes and seconds string
 */
function numberOfSecondsToHastusMinutesAndSecondsString(numberOfSeconds) {
  const numberOfSecondsAsInt = parseInt(numberOfSeconds, 10);
  return Duration.fromMillis(numberOfSecondsAsInt * 1000).toFormat(`m;ss`);
}

/**
 * @param {number|String} numberOfSeconds Number of seconds since midnight
 * @returns {String} Hastus hours and minutes string
 */
function numberOfSecondsToHastusHoursAndMinutesString(numberOfSeconds, { allowSeconds = false } = {}) {
  const numberOfSecondsAsInt = parseInt(numberOfSeconds, 10);
  const toFormat = allowSeconds ? `h:mm;ss` : `h:mm`;
  return Duration.fromMillis(numberOfSecondsAsInt * 1000).toFormat(toFormat).replace(':', 'h');
}

const isoDateStringMatcher = /^(\d{4})-(\d{2})-(\d{2})$/;
function isoDateStringToHastusDateString(isoDateString) {
  const result = isoDateString.match(isoDateStringMatcher);
  if (!result) throw new Error(`The provided date is not in iso format (YYYY-MM-DD)`);
  return `${result[3]}/${result[2]}/${result[1]}`;
}

/**
 *
 * @param {Interval} interval
 */
function* days(interval) {
  let cursor = interval.start.startOf('day');
  while (cursor < interval.end) {
    yield cursor;
    cursor = cursor.plus({ days: 1 });
  }
}

/**
 *
 * @param {string} startDateAsIsoDateString
 * @param {string} endDateAsIsoDateString
 * @param {object} [options={}]
 * @param {object} [options.startDelta=0] - a number of days to add or subtract to the start date
 * @param {object} [options.endDelta=0] - a number of days to add or subtract to the end date
 */
function arrayOfIsoDateStringsFromStartAndEndIsoDateStrings(startDateAsIsoDateString, endDateAsIsoDateString, options = {}) {
  const { startDelta = 0, endDelta = 0 } = options;
  const startDateAsDateTime = DateTime.fromISO(startDateAsIsoDateString).startOf('day').plus({ day: startDelta });
  const endDateAsDateTime = DateTime.fromISO(endDateAsIsoDateString).endOf('day').plus({ day: endDelta });
  const interval = Interval.fromDateTimes(startDateAsDateTime, endDateAsDateTime);
  const arrayOfDateTimes = Array.from(days(interval));
  return arrayOfDateTimes.map((dateTime) => dateTime.toISODate());
}

exports.hastusExtendedHoursToDuration = hastusExtendedHoursToDuration;
exports.durationToHastusExtendedHoursString = durationToHastusExtendedHoursString;
exports.numberOfSecondsToHastusExtendedHoursString = numberOfSecondsToHastusExtendedHoursString;
exports.getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings = getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings;
exports.hastusMinutesAndSecondsToDuration = hastusMinutesAndSecondsToDuration;
exports.hastusHoursAndMinutesToDuration = hastusHoursAndMinutesToDuration;
exports.getDifferenceInSecondsBetweenTwoHastusMinutesAndSecondsStrings = getDifferenceInSecondsBetweenTwoHastusMinutesAndSecondsStrings;
exports.numberOfSecondsToHastusMinutesAndSecondsString = numberOfSecondsToHastusMinutesAndSecondsString;
exports.numberOfSecondsToHastusHoursAndMinutesString = numberOfSecondsToHastusHoursAndMinutesString;
exports.arrayOfIsoDateStringsFromStartAndEndIsoDateStrings = arrayOfIsoDateStringsFromStartAndEndIsoDateStrings;
exports.isoTimeStringToDuration = isoTimeStringToDuration;
exports.durationToIsoTimeString = durationToIsoTimeString;
exports.durationToDateTime = durationToDateTime;
exports.addTimeObjectToHastusExtendedHoursString = addTimeObjectToHastusExtendedHoursString;
exports.DateTime = DateTime;
exports.Interval = Interval;
exports.Duration = Duration;
exports.hastusExtendedHoursToDateTime = hastusExtendedHoursToDateTime;
exports.hastusExtendedHoursToJsDate = hastusExtendedHoursToJsDate;
exports.START_OF_OPERATING_DAY = START_OF_OPERATING_DAY;
exports.END_OF_OPERATING_DAY = END_OF_OPERATING_DAY;
exports.isoDateStringToHastusDateString = isoDateStringToHastusDateString;
exports.getDifferenceInDaysBetweenTwoIsoDateStrings = getDifferenceInDaysBetweenTwoIsoDateStrings;
