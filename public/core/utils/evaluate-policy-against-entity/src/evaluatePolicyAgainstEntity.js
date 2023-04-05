const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const { createPropsFromItems } = require('@bimo/core-utils-create-props-from-items');
const getPolicy = require('./getPolicy');

/**
 *
 * @param {*} entity
 * @param {EvaluatePolicyAgainstEntityConfig} config
 * @param {Object} context
 * @param {Object=} context.task
 * @param {Object=} context.logger
 */
function evaluatePolicyAgainstEntity(entity, config = {}, context = {}) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: `evaluatePolicyAgainstEntity` });
  const policy = getPolicy(entity, config, context);

  const { createArgsFromEntityConfig = defaultCreateArgsFromEntityConfig } = config;
  const args = createPropsFromItems(entity, createArgsFromEntityConfig, context);

  const { event = 'default', logResults = true, guardFromErrors = true } = config;

  let results;
  try {
    results = policy.evaluate(event, args, context);
  }
  catch (error) {
    if (!guardFromErrors) throw error;
    results = [({ ruleKey: 'Global error', level: 'error', message: error.message })];
  }

  if (logResults) {
    results.forEach(({ level, message }) => {
      logger.logNotice({
        level,
        message,
      });
    });
  }

  return results;
}

module.exports = evaluatePolicyAgainstEntity;

/**
 * @typedef {Object} EvaluatePolicyAgainstEntityConfig
 * @property {import('@bimo/core-policy/src/Policy')} [policy]
 * @property {string} [policyKey]
 */

const defaultCreateArgsFromEntityConfig = {
  collection: {
    createConfig: {
      sourcePropPath: '__self__',
      destinationPropType: 'any',
    },
  },
};
