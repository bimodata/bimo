const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');

const { Collection } = require('@bimo/core-utils-collection');

const computeItemKey = require('@bimo/core-utils-services-compute-item-key');

/**
 * @template TargetType, CandidateType
 * @param {Object} targetAndCandidates
 * @param {TargetType} targetAndCandidates.target
 * @param {Collection<CandidateType>} targetAndCandidates.candidates
 * @param {CandidatesFilteringConfig} config
 * @param {Object} context
 * @returns {CandidateType[]}
 */
function retrieveCandidatesArrayToUse({ target, candidates }, config, context = {}) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: `retrieveCandidatesArrayToUse` });

  if (!config) {
    logger.trace(`No candidatesFilteringConfig. Will use all candidates`);
    return candidates instanceof Collection ? candidates.items : candidates;
  }

  const { predefinedCandidatesFilteringConfigByKey = {} } = context;
  const unShortHandedConfig = (typeof config === 'string')
    ? { modeKey: config }
    : config;

  const { modeKey } = unShortHandedConfig;
  const modeKeyRelatedConfig = predefinedCandidatesFilteringConfigByKey[modeKey] ?? {};

  const {
    getKeyFromTargetConfig,
    groupCandidatesByConfig,
    filterPredicate,
    refreshCache = false,
    doNotMutateGroupByCustomKeyFunction = false,
  } = { ...modeKeyRelatedConfig, ...unShortHandedConfig };
  if (!((getKeyFromTargetConfig && groupCandidatesByConfig) || filterPredicate)) {
    throw new Error(`Invalid config and/or options: ${JSON.stringify(config)}`);
  }

  /**
   * If there is a filterPredicate, we HAVE to create a new collection to avoid mutating the collection that was passed
   * If there is no filterPredicate, we can use the collection as is, which lets us take advantage of the caching
   * @type {Collection<CandidateType} */
  const candidatesCollection = (filterPredicate || !(candidates instanceof Collection)) ? createNewCollection(candidates) : candidates;

  if (filterPredicate) {
    candidatesCollection.filter(filterPredicate);
  }

  if (!groupCandidatesByConfig) return candidatesCollection.items;

  const key = computeItemKey(target, getKeyFromTargetConfig, context);
  if (!key) {
    throw new Error(`Could not generate key for ${target.shortLoggingOutput || JSON.stringify(target)}`
      + ` using ${JSON.stringify(getKeyFromTargetConfig)}`);
  }

  let groupedCandidatesByKey;

  // TODO: #58 simplify this after simplifiying groupBy on collection
  if (typeof groupCandidatesByConfig === 'string') {
    groupedCandidatesByKey = candidatesCollection.groupByProp(groupCandidatesByConfig, { refreshCache });
  }
  else if (typeof groupCandidatesByConfig === 'function') {
    /** There are two cases here:
     * Case 1: Your groupByCustomKey function needs the target - the grouping of the candidates will
     *         vary depending on the target, and the groups must be computed for each target any ways
     *         We cannot cache anything. We pass the function wrapped in a closure with the target, config
     *         and context, so that the function can use these.
     *
     * Case 2: Your groupByCustomKey function does not need the target. We do not need to recompute groups
     *         for each target. We want to take advantage of the caching. We pass the function as is
     *         without adding the target, config and context since we don't need them and they would prevent
     *         the caching.
     */
    const functionToUse = doNotMutateGroupByCustomKeyFunction
      ? groupCandidatesByConfig
      : (item) => groupCandidatesByConfig(item, target, config, context);

    groupedCandidatesByKey = candidatesCollection.groupByCustomKey(functionToUse, { refreshCache });
  }
  else {
    throw new Error(`Invalid config: ${JSON.stringify(groupCandidatesByConfig)}`);
  }

  logger.trace(`Candidates have been grouped by keys. Got ${groupedCandidatesByKey.size} keys. Will try to find this key: ${key}`);

  const candidatesToUse = groupedCandidatesByKey.get(key);
  if (!candidatesToUse) {
    throw new Error(`No candidates found for ${target.mediumLoggingOutput || JSON.stringify(target)} using ${JSON.stringify(config)}`);
  }
  return candidatesToUse;
}

module.exports = { retrieveCandidatesArrayToUse };

/**
 * @typedef {Object} CandidatesFilteringConfig
 * @property {Object} groupCandidatesByConfig - config object that determines how candidates
 * of the candidates collection will be grouped and keyed
 * @property {Object} getKeyFromTargetConfig - config object that determines
 * how the key will be generated from a target object, to then get the right group of candidates
 */

function createNewCollection(candidates) {
  try {
    const items = candidates instanceof Collection ? [...candidates.items] : [...candidates];
    return new Collection({
      ItemConstructor: items[0].constructor,
      itemName: items[0].constructor.name,
      associationType: 'aggregation',
      items,
    });
  }
  catch (error) {
    throw new Error('Candidates must be array or collection');
  }
}
