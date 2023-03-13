const { evaluateMatch } = require('json-query-matcher');

// const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');

function evaluateItemQuery(item, itemQuery, context) {
  if (item === undefined || item === null) return false;
  if (Array.isArray(item) || typeof item !== 'object') {
    throw new Error(`Item must be an object`);
  }
  if (Array.isArray(itemQuery) || !['object', 'function'].includes(typeof itemQuery)) {
    throw new Error(`ItemQuery must be a function or an object`);
  }

  // const logger = getAndAddLoggerToServiceOptions(context, { serviceName: 'createPropsFromItemsAndConfig' });

  if (typeof itemQuery === 'function') {
    return itemQuery(item, context);
  }
  return evaluateMatch(item, itemQuery, undefined);
  // return evaluateMatch(item, itemQuery, logger);
}

module.exports = evaluateItemQuery;
