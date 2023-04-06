/* eslint-disable no-await-in-loop */

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

export async function asyncForEachArray<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => any
) {
  for (let index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array);
  }
}

export async function asyncForEachMap<K, V>(
  map: Map<K, V>,
  callback: (value: V, key: K, map: Map<K, V>) => any
) {
  const entries = Array.from(map.entries());
  for (let index = 0; index < entries.length; index += 1) {
    const key = entries[index][0];
    const value = entries[index][1];
    await callback(value, key, map);
  }
}

type Collection<V> = {
  [key: string]: V;
};

export async function asyncForEachColl<V>(
  collection: Collection<V>,
  callback: (value: V, key: string, collection: Collection<V>) => any
) {
  const keys = Object.keys(collection);
  const values = Object.values(collection);
  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    const value = values[index];
    await callback(value, key, collection);
  }
}

export async function asyncForEach<K, V>(
  arrayOrCollectionOrMap: V[] | Map<K, V> | Collection<V>,
  callback: {
    (item: V, index: number, array: V[]): any;
    (value: V, key: string, collection: Collection<V>): any;
    (value: V, key: K, map: Map<K, V>): any;
  }
) {
  if (!arrayOrCollectionOrMap) return null;
  if (Array.isArray(arrayOrCollectionOrMap)) {
    return asyncForEachArray(arrayOrCollectionOrMap, callback);
  }
  if (arrayOrCollectionOrMap instanceof Map) {
    return asyncForEachMap(arrayOrCollectionOrMap, callback);
  }

  return asyncForEachColl(arrayOrCollectionOrMap, callback);
}

export default asyncForEach;
