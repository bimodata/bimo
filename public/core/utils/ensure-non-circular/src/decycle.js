// based on https://github.com/douglascrockford/JSON-js/blob/master/cycle.js

function decycle(object) {
  const objects = new WeakMap(); // object to path mappings

  return (function derez(value, path) {
    // The derez function recurses through the object, producing the deep copy.

    let oldPath; // The path of an earlier occurance of value
    let newValue; // The new object or array

    // typeof null === "object", so go on if this value is really an object but not
    // one of the weird builtin objects.

    if (
      typeof value === 'object'
            && value !== null
            && !(value instanceof Boolean)
            && !(value instanceof Date)
            && !(value instanceof Number)
            && !(value instanceof RegExp)
            && !(value instanceof String)
    ) {
      // If the value is an object or array, look to see if we have already
      // encountered it. If so, return a {"$ref":PATH} object. This uses an
      // ES6 WeakMap.

      oldPath = objects.get(value);
      if (oldPath !== undefined) {
        return { $ref: oldPath };
      }

      // Otherwise, accumulate the unique value and its path.

      objects.set(value, path);

      // If it is an array, replicate the array.

      if (Array.isArray(value)) {
        newValue = [];
        value.forEach((element, i) => {
          newValue[i] = derez(element, `${path}[${i}]`);
        });
      }
      else {
        // If it is an object, replicate the object.

        newValue = {};
        Object.keys(value).forEach((key) => {
          newValue[key] = derez(
            value[key],
            `${path}[${JSON.stringify(key)}]`,
          );
        });
      }
      return newValue;
    }
    return value;
  }(object, '$'));
}

module.exports = decycle;
