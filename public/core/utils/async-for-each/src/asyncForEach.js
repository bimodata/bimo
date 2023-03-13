/* eslint-disable no-await-in-loop */

async function asyncForEachArray(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array);
  }
}

async function asyncForEachMap(map, callback) {
  const entries = Array.from(map.entries());
  for (let index = 0; index < entries.length; index += 1) {
    const key = entries[index][0];
    const value = entries[index][1];
    await callback(value, key, map);
  }
}

async function asyncForEachColl(collection, callback) {
  const keys = Object.keys(collection);
  const values = Object.values(collection);
  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    const value = values[index];
    await callback(value, key, collection);
  }
}

/**
 * @callback ArrayOrCollOrMapCallback
 * @param {T} value
 * @param {number|string} indexOrKey
 * @param {T[]|object<string,T>|Map<string,T>} arrayOrCollOrMap
 * @template T
 */

/**
  *
  * @param {T[]|Object<string,T>|Map<string,T>} arrayOrCollectionOrMap
  * @param {ArrayOrCollOrMapCallback<T>} callback
  * @template T
  */
async function asyncForEach(arrayOrCollectionOrMap, callback) {
  if (!arrayOrCollectionOrMap) return null;
  if (Array.isArray(arrayOrCollectionOrMap)) {
    return asyncForEachArray(arrayOrCollectionOrMap, callback);
  }
  if (arrayOrCollectionOrMap instanceof Map) {
    return asyncForEachMap(arrayOrCollectionOrMap, callback);
  }

  return asyncForEachColl(arrayOrCollectionOrMap, callback);
}

module.exports = asyncForEach;
