const _ = require('lodash');

/**
 * Like _.get, but with a special __self__ keyword
 * If the path is __self__, returns object
 * If the last element of path is __self__, removes
 * it from the path and returns what _.get would return
 * @param {any} object object on which to get prop
 * @param {string|string[]} path
 */
function getWithSelf(object, path, defaultValue) {
  const pathWithoutSelf = removeSelfFromPath(path);
  if (pathWithoutSelf === '' || (Array.isArray(pathWithoutSelf) && pathWithoutSelf.length === 0)) {
    return object;
  }
  return _.get(object, pathWithoutSelf, defaultValue);
}

const SELF = '__self__';
const selfMatcher = new RegExp(`(?:^|\\.)${SELF}$`);
/**
 *
 * @param {string|string[]} path
 */
function removeSelfFromPath(path) {
  if (typeof path === 'string') return path.replace(selfMatcher, '');
  if (path[path.length - 1] === SELF) return path.slice(0, path.length - 1);
  return path;
}

module.exports = getWithSelf;
