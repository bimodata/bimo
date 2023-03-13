/* eslint-disable no-restricted-syntax */

/**
 *
 * @param {*} sourceItem
 * @param {*} path
 */
function* getIteratorForCollectionAtPath(sourceItem, path) {
  const newPath = Array.isArray(path) ? path.slice() : path.split('.');
  const propKeyAtThisLevel = newPath.shift();
  const valueAtThisLevel = sourceItem[propKeyAtThisLevel];
  const arrayToIterateAtThisLevel = Array.isArray(valueAtThisLevel) ? valueAtThisLevel : [valueAtThisLevel];
  for (const item of arrayToIterateAtThisLevel) {
    if (newPath.length === 0) {
      yield item;
    }
    else {
      yield* getIteratorForCollectionAtPath(item, newPath);
    }
  }
}

module.exports = getIteratorForCollectionAtPath;
