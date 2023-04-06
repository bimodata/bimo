const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const computeItemKey = require('@bimo/core-utils-services-compute-item-key');
const matchTwoListsOfStrings = require('@bimo/core-utils-match-two-lists-of-strings');
const { Collection, Item } = require('@bimo/core-utils-collection');
// eslint-disable-next-line no-unused-vars

/**
 *
 * @param {[Collection, Collection]} collections
 * @param {GetComparisonObjectsForTwoCollectionsConfig} config
 * @param {Object} context
 * @param {Object=} context.task
 * @param {Object=} context.logger
 */
function getComparisonObjectsForTwoCollections([collectionA, collectionB], config, context = {}) {
  getAndAddLoggerToServiceOptions(context, { serviceName: `getComparisonObjectsForTwoCollections` });
  const {
    computeItemKeyConfig = {},
    computeItemKeyConfigForA = computeItemKeyConfig,
    computeItemKeyConfigForB = computeItemKeyConfig,
    handleMultipleItemsForKeyFn,
    handleMultipleItemsForKeyFnForA = handleMultipleItemsForKeyFn,
    handleMultipleItemsForKeyFnForB = handleMultipleItemsForKeyFn,
  } = config;
  const aItemByKey = collectionA.keyBy(
    (item) => computeItemKey(item, computeItemKeyConfigForA, context),
    handleMultipleItemsForKeyFnForA && ((items, key) => handleMultipleItemsForKeyFnForA(items, key, context)),
  );
  const bItemByKey = collectionB.keyBy(
    (item) => computeItemKey(item, computeItemKeyConfigForB, context),
    handleMultipleItemsForKeyFnForB && ((items, key) => handleMultipleItemsForKeyFnForB(items, key, context)),
  );

  const aKeys = ([...aItemByKey.keys()]);
  const bKeys = ([...bItemByKey.keys()]);

  const {
    matched: commonKeys,
    onlyA: aOnlyKeys,
    onlyB: bOnlyKeys,
  } = matchTwoListsOfStrings([aKeys, bKeys], config, context);

  const aOnlyItems = new Set(aOnlyKeys.map((aKey) => aItemByKey.get(aKey)));
  const bOnlyItems = new Set(bOnlyKeys.map((bKey) => bItemByKey.get(bKey)));
  const bCommonItems = new Set(commonKeys.map((commonKey) => bItemByKey.get(commonKey)));
  const aCommonItems = new Set(commonKeys.map((commonKey) => aItemByKey.get(commonKey)));

  /** @type {Map<Item, Item>} */
  const bItemByAItem = new Map();
  /** @type {Map<Item, Item>} */
  const aItemByBItem = new Map();
  commonKeys.forEach((commonKey) => {
    const aItem = aItemByKey.get(commonKey);
    const bItem = bItemByKey.get(commonKey);
    bItemByAItem.set(aItem, bItem);
    aItemByBItem.set(bItem, aItem);
  });

  return {
    aItemByKey,
    bItemByKey,
    aKeys,
    bKeys,
    commonKeys,
    aOnlyKeys,
    bOnlyKeys,
    aOnlyItems,
    bOnlyItems,
    bCommonItems,
    aCommonItems,
    bItemByAItem,
    aItemByBItem,
  };
}

module.exports = getComparisonObjectsForTwoCollections;

/**
 * @typedef {Object} GetComparisonObjectsForTwoCollectionsConfig
 * @property {Object} [computeItemKeyConfig]
 * @property {Object} [computeItemKeyConfigForA]
 * @property {Object} [computeItemKeyConfigForB]
 * @property {Function} [handleMultipleItemsForKeyFn]
 * @property {Function} [handleMultipleItemsForKeyFnForA]
 * @property {Function} [handleMultipleItemsForKeyFnForB]
 */
