const { camelOrPascalToSnake } = require('@bimo/core-utils-string');

/**
 *
 * @param {string} propName
 * @param {object} props
 * @param {string|Object} Type
 * @param {any} defaultValue
 * @param {object} options
 * @param {string} options.altPropName
 */
function getAndValidatePropFromProps(propName, props, Type = `string`, defaultValue = undefined, options = {}) {
  let rawProp = props[propName] ?? (options.altPropName && props[options.altPropName]);

  if (rawProp === undefined) {
    if (!options.forbidLoosePropNameMatching) {
      const snakePropName = camelOrPascalToSnake(propName);
      rawProp = props[snakePropName];
    }
  }

  if (rawProp === undefined) {
    rawProp = defaultValue;
    if (options.parent) {
      rawProp.parent = options.parent;
    }
  }

  if ((Type === `string`) || (Type === 'boolean') || (rawProp instanceof Type) || rawProp === null) {
    return rawProp;
  }

  if (Object.getPrototypeOf(Type).name.match(/Collection$/)) {
    return new Type({ items: rawProp, ...options });
  }
  if (Object.getPrototypeOf(Type).name === 'Uint8Array') { // buffer !?!
    return Buffer.from(rawProp || '');
  }

  return new Type(rawProp);
}
module.exports = getAndValidatePropFromProps;
