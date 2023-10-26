const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');

const { getBestMatchToTargetFromCandidatesList } = require('@bimo/core-utils-compare-and-match');

const { Collection } = require('@bimo/core-utils-collection');

const { retrieveCandidatesArrayToUse } = require('./retrieveCandidatesArrayToUse');

/**
 * @template TargetType, CandidateType
 * @param {Object} targetAndCandidates
 * @param {TargetType} targetAndCandidates.target
 * @param {Collection<CandidateType>|CandidateType[]} targetAndCandidates.candidates
 * @param {FindBestMatchForTargetAmongCandidatesConfig} config
 * @param {Object} context
 * @returns {CandidateType|null}
 */
function findBestMatchForTargetAmongCandidates({ target, candidates: rawCandidates } = {}, config, context = {}) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: `findBestMatchForTargetAmongCandidates` });
  logger.trace(`Start of findBestMatchForTargetAmongCandidates`);
  if (!target) {
    logger.trace(`No target - returning null`);
    return null;
  }
  if (!rawCandidates) {
    logger.trace(`No candidates - returning null`);
    return null;
  }
  const {
    iterationConfigs = [{}], noticeLevelForGlobalNoMatch = 'trace',
    createMessageForGlobalNoMatch = () => `No match found after all ${iterationConfigs.length} iterations. Will return null.`,
    createNoticeForGlobalNoMatch,
  } = config;

  let finalResult;
  const foundSome = iterationConfigs.some((iterationConfig, iterationIndex) => {
    const {
      candidatesFilteringConfig, getBestMatchConfig, iterationName = iterationIndex + 1,
      noticeLevelForCouldNotRetrieveCandidates = 'debug',
      createMessageForCouldNotRetrieveCandidates = ({ error }) => `Could not retrieve candidates: ${error.message}`,
      noticeLevelForMatch = 'trace', noticeLevelForNoMatch = 'trace',
      createMessageForMatch = () => `Found match in iteration ${iterationName}. Will return`,
      createMessageForNoMatch = () => `No match found in iteration ${iterationName}. Will try next iteration.`,
      createNoticeForMatch, createNoticeForNoMatch,
    } = iterationConfig;

    logger.trace(`Starting iteration # ${iterationIndex} ${iterationName}`);

    /** @type {CandidateType[]} */
    let candidates;
    try {
      candidates = retrieveCandidatesArrayToUse({ target, candidates: rawCandidates }, candidatesFilteringConfig, context);
    }
    catch (error) {
      logger[noticeLevelForCouldNotRetrieveCandidates](createMessageForCouldNotRetrieveCandidates({ target, rawCandidates, error }));
      return false;
    }

    const result = getBestMatchToTargetFromCandidatesList(target, candidates, getBestMatchConfig, context);

    if (result === null || result.bestMatch === null) {
      // TODO: #175 reenable lazy evaluation
      if (createNoticeForNoMatch) logger.logNotice(createNoticeForNoMatch({ target, candidates, result }));
      else if (logger[noticeLevelForNoMatch]) logger[noticeLevelForNoMatch](createMessageForNoMatch({ target, candidates, result }));
      return false;
    }

    finalResult = getBestMatchConfig?.detailedResults
      ? { ...result, indexOfIterationThatMatched: iterationIndex }
      : result;

    if (createNoticeForMatch) logger.logNotice(createNoticeForMatch({ target, candidates, result }));
    else if (logger[noticeLevelForMatch]) logger[noticeLevelForMatch](createMessageForMatch({ target, candidates, result }));

    return true;
  });

  if (!foundSome) {
    // TODO: #175 reenable lazy evaluation
    if (createNoticeForGlobalNoMatch) logger.logNotice(createNoticeForGlobalNoMatch({ target, rawCandidates }));
    else if (logger[noticeLevelForGlobalNoMatch]) {
      logger[noticeLevelForGlobalNoMatch](createMessageForGlobalNoMatch({ target, rawCandidates }));
    }
    return null;
  }

  logger.trace(`Found match.`);
  return finalResult;
}

module.exports = findBestMatchForTargetAmongCandidates;

/**
 * createNoticeForGlobalNoMatch will let you adjust the log level depending on the target
 * @typedef {Object} FindBestMatchForTargetAmongCandidatesConfig
 * @property {IterationConfigs[]} iterationConfigs
 * @property {string} [noticeLevelForGlobalNoMatch=trace]
 * @property {string|function} [createMessageForGlobalNoMatch]
 * @property {function} [createNoticeForGlobalNoMatch]
 */

/**
 * @typedef {Object} IterationConfigs
 * @property {string} [iterationName]
 * @property {object} [getBestMatchConfig]
 * @property {object} [candidatesFilteringConfig]
 * @property {string} [noticeLevelForMatch=trace]
 * @property {function} [createMessageForMatch]
 * @property {function} [createNoticeForMatch]
 * @property {string} [noticeLevelForNoMatch=trace]
 * @property {function} [createMessageForNoMatch]
 * @property {function} [createNoticeForNoMatch]
 */
