const TYPES_TO_KEEP = ["string", "number", "boolean"];

/**
 * Assigns props of source that are strings, numbers, boolean or null to target
 * @param {object} target - the target object
 * @param {object} source - the source object
 */
export function shallowAssign(target: any, source: any) {
  if (typeof target !== "object")
    throw new Error(`Target must be an object. Got ${typeof source}`);
  if (typeof source !== "object")
    throw new Error(`Source must be an object. Got ${typeof source}`);
  Object.keys(source).forEach((key) => {
    const value = source[key];
    const type = typeof value;
    if (value === null || TYPES_TO_KEEP.includes(type)) {
      // eslint-disable-next-line no-param-reassign
      target[key] = value;
    }
  });
  return target;
}
