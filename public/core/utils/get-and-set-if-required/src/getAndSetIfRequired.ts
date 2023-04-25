import _ from "lodash";

/**
 * Gets the property value at path of object. If the resolved value is undefined the defaultValue is used
 * in its place and is set at path in object.
 *
 * @param object The object to query.
 * @param path The path of the property to get.
 * @param defaultValue The value returned if the resolved value is undefined.
 * @return Returns the resolved value.
 */
export function getAndSetIfRequired<T>(
  object: object,
  path: string | string[],
  defaultValue: T
): T {
  if (object instanceof Map) return getAndSetIfRequiredInMap(object, path, defaultValue);
  const value = _.get(object, path, defaultValue);
  if (!_.has(object, path)) {
    _.set(object, path, value);
  }
  return value;
}

export default getAndSetIfRequired;

/**
 * Gets the value at key in map. If the value is undefined, the defaultValue is used
 * in its place and is set at key in the map.
 * @param map The map in which to get/set the value
 * @param key The key of the value
 * @param defaultValue The value returned if the resolved value is undefined.
 * @return Returns the resolved value.
 */
export function getAndSetIfRequiredInMap<K, V>(
  map: Map<K, V>,
  key: K,
  defaultValue: V
): V {
  if (map.has(key)) return map.get(key) as V;
  map.set(key, defaultValue);
  return defaultValue;
}
