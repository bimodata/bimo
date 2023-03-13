/* eslint-disable no-param-reassign */
const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const couplingIsInvalid = require('./couplingIsInvalid');
const unCouplingIsInvalid = require('./unCouplingIsInvalid');
const createBlockActsForInvalidCoupling = require('./createBlockActsForInvalidCoupling');
const createBlockActsForInvalidUnCoupling = require('./createBlockActsForInvalidUnCoupling');

/**
 *
 * @param {import('@bimo/core-entities/src/VehicleSchedule')} vsc
 * @param {CheckAndRepairConsistChangesInVscConfig} config
 * @param {*} options
 */
function checkAndRepairConsistChangesInVsc(vsc, config, options = {}) {
  const logger = getAndAddLoggerToServiceOptions(options, { serviceName: `checkAndRepairConsistChangesInVsc` });
  const couplings = vsc.consistChanges.pick((cchg) => cchg.cchgActivity === 'Attelage');
  const unCouplings = vsc.consistChanges.pick((cchg) => cchg.cchgActivity === 'Dételage');
  couplings.forEach((coupling) => {
    const invalidMessage = couplingIsInvalid(coupling);
    if (!invalidMessage) {
      logger.trace(`${coupling.llo} is already valid`);
      return;
    }
    logger.debug(`${coupling.llo} is invalid for this reason ${invalidMessage}`);
    const blockActs = createBlockActsForInvalidCoupling(coupling, invalidMessage);
    logger.debug(`Added ${blockActs.map((blkAct) => blkAct.mlo).join(', ')} for ${coupling.mlo}`);
  });
  unCouplings.forEach((unCoupling) => {
    const invalidMessage = unCouplingIsInvalid(unCoupling);
    if (!invalidMessage) {
      logger.trace(`${unCoupling.llo} is already valid`);
      return;
    }
    logger.debug(`${unCoupling.llo} is invalid for this reason ${invalidMessage}`);
    const blockActs = createBlockActsForInvalidUnCoupling(unCoupling, invalidMessage);
    logger.debug(`Added ${blockActs.map((blkAct) => blkAct.mlo).join(', ')} for ${unCoupling.mlo}`);
  });
  vsc._nullifyAllCachedValues();
  return vsc;
}

module.exports = checkAndRepairConsistChangesInVsc;

/**
 * @typedef {Object} CheckAndRepairConsistChangesInVscConfig
 */
