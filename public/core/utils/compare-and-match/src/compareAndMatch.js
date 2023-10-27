const levenshtein = require('js-levenshtein');

exports.levenshtein = levenshtein;

/**
 *
 * @param {Object} target - the object you want to match
 * @param {Object[]} candidatesList - the list of candidate objects
 * @param {Object} [config={}] - some options for the function
 * @param {Function=} config.keyFunction - a function that takes the object and returns
 * the string that should be used as a key for this object
 * @param {Function=} config.distanceFunction - a function that takes a target object,
 * a candidate object and returns the distance between the two
 * @param {Number=} config.maxDistance - the maximum acceptable distance. Return null if
 *  no candidates are under or equal to this distance
 * @param {Boolean=} config.detailedResults - if true, returns an object that contains the best match,
 *  an array of matches that are under the maxDistance, and and an array of all candidates and their distances.
 *  This options disables early exit.
 * @param {Object} [context={}] - some options for the function
 * @param {Object=} context.logger - a logger object
 * @returns {Object} the best match, or a complex object with lots of info if options.detailedResults = true
 */
function getBestMatchToTargetFromCandidatesList(target, candidatesList, config = {}, context = {}) {
  const {
    keyFunction = ((o) => JSON.stringify(o)),
    distanceFunction = ((t, c) => levenshtein(keyFunction(t), keyFunction(c))),
    detailedResults = false,
    maxDistance = Number.POSITIVE_INFINITY,
  } = config;
  const { logger = false } = context;

  const validMatches = [];
  const allResults = [];

  let smallestDistanceSoFar = Number.POSITIVE_INFINITY;
  let candidateWithSmallestDistance = null;

  candidatesList.some((candidate) => {
    const distanceToThisCandidate = distanceFunction(target, candidate, config, context);
    if (logger && logger.trace) {
      logger.trace(`[target: ${(target.slo)}][candidate: ${(candidate.slo)}][distance: ${distanceToThisCandidate}]`);
    }
    if (distanceToThisCandidate === 0 && !detailedResults) {
      candidateWithSmallestDistance = candidate;
      smallestDistanceSoFar = 0;
      return true;
    }
    if (distanceToThisCandidate <= smallestDistanceSoFar) {
      smallestDistanceSoFar = distanceToThisCandidate;
      candidateWithSmallestDistance = candidate;
    }
    if (config.detailedResults) {
      const detailedResultData = { candidate, distance: distanceToThisCandidate };
      allResults.push(detailedResultData);
      if (config.maxDistance && distanceToThisCandidate <= config.maxDistance) {
        validMatches.push(detailedResultData);
      }
    }
    return false;
  });

  let bestMatch;
  if (smallestDistanceSoFar > maxDistance) {
    bestMatch = null;
  }
  else {
    bestMatch = candidateWithSmallestDistance;
  }
  if (detailedResults) {
    return { bestMatch, validMatches, allResults, bestMatchDistance: smallestDistanceSoFar };
  }

  return bestMatch;
}

exports.getBestMatchToTargetFromCandidatesList = getBestMatchToTargetFromCandidatesList;
