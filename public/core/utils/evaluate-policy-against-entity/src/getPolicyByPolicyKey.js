const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');

function getPolicyByPolicyKey(context = {}) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: `getPolicyByPolicyKey` });
  const { policyByPolicyKey, task } = context;
  if (policyByPolicyKey) {
    logger.trace(`context.policyByPolicyKey exists and will be used`);
    return policyByPolicyKey;
  }
  if (task && task.policyByPolicyKey) {
    logger.trace(`task.policyByPolicyKey exists and will be used`);
    return task.policyByPolicyKey;
  }
  throw new Error(`Could not get PolicyByPolicyKey`);
}
module.exports = getPolicyByPolicyKey;
