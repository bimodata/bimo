function couplingIsInvalid(coupling) {
  const blockActs = Array.from(coupling.vehicleSchedule.setOfblockActivitiesByBlockActivityEntityItem.get(coupling));
  if (blockActs.length > 2) {
    return `More than two block activities`;
  }
  if (!blockActs.some((blockAct) => blockAct.blkactVehicleActivityTypeNo === '12')) {
    return `No "à atteler"`;
  }
  if (!blockActs.some((blockAct) => blockAct.blkactVehicleActivityTypeNo === '13')) {
    return `No "Atteler"`;
  }
  return false;
}

module.exports = couplingIsInvalid;
