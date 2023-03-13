const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const _ = require('lodash');

/**
 *
 * @param {object[]} items
 * @param {HaveDifferentPropsConfig} config
 * @param {*} context
 */
function haveDifferentProps(items, config, context = {}) {
  getAndAddLoggerToServiceOptions(context, { serviceName: `haveDifferentProps` });
  const { pathsToProps } = config;
  let firstValue;
  let otherValue;
  const differentProp = pathsToProps.find((pathToProp) => items.some((item, index) => {
    if (index === 0) {
      firstValue = _.get(item, pathToProp);
      return false;
    }
    otherValue = _.get(item, pathToProp);
    return firstValue !== otherValue;
  }));

  return differentProp ? { differentProp, firstValue, otherValue } : false;
}

module.exports = haveDifferentProps;

/**
 * @typedef {Object} HaveDifferentPropsConfig
 * @property {string[]} pathsToProps
 */
