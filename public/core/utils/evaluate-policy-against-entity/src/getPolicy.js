const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const getPolicyByPolicyKey = require('./getPolicyByPolicyKey');

function getPolicy(entity, config, context = {}) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: `getPolicy` });
  const { policy: predefinedPolicy, policyKey } = config;
  if (predefinedPolicy) return predefinedPolicy;

  if (policyKey) {
    const policyByPolicyKey = getPolicyByPolicyKey(context);
    const policy = policyByPolicyKey[policyKey];
    if (policy) return policy;
    logger.warn(`${policyKey} does not exist in policyByPolicyKey`
      + `Existing policy keys: ${Object.keys(policyByPolicyKey).join(',')}`);
  }

  if (entity.policy) return entity.policy;

  throw new Error(`Could not get policy`);
}
module.exports = getPolicy;
