function unCouplingIsInvalid(unCoupling) {
  const blockActs = Array.from(unCoupling.vehicleSchedule.setOfblockActivitiesByBlockActivityEntityItem.get(unCoupling));
  if (blockActs.length > 2) {
    return `More than two block activities`;
  }
  if (!blockActs.some((blockAct) => blockAct.blkactVehicleActivityTypeNo === '15')) {
    return `No "d'un dételage"`;
  }
  if (!blockActs.some((blockAct) => blockAct.blkactVehicleActivityTypeNo === '14')) {
    return `No Dételage`;
  }
  return false;
}

module.exports = unCouplingIsInvalid;
