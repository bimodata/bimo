const { shallowAssign } = require('@bimo/core-utils-shallow-assign');

/**
 * TODO: use new service @bimo/core-utils-have-different-props for this ?
 * @param {*} object1
 * @param {*} object1
 */
function haveDifferentCommonProps(object1, object2) {
  try {
    const shallow1 = {};
    const shallow2 = {};
    shallowAssign(shallow1, object1);
    shallowAssign(shallow2, object2);
    Object.keys(shallow1).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(shallow1, key) && Object.prototype.hasOwnProperty.call(shallow2, key)) {
        if (shallow1[key] !== shallow2[key]) {
          throw new Error(`Difference in ${key}: "${shallow1[key]}" !== "${shallow2[key]}"`);
        }
      }
    });
    return false;
  }
  catch (reason) {
    return reason;
  }
}

module.exports = haveDifferentCommonProps;
