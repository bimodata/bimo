/**
 *
 * @param {import('@bimo/core-entities').ConsistChange} coupling
 * @param {*} invalidMessage
 * @returns
 */
function createBlockActsForInvalidCoupling(coupling, invalidMessage) {
  switch (invalidMessage) {
    case 'No "Atteler"':
      break;
    case 'More than two block activities':
    case 'No "à atteler"':
    default:
      throw new Error(`"${invalidMessage}" case is not supported yet`);
  }
  const trip = coupling.vehicleSchedule?.tripsAndIncludedTrips.getByBusinessId(coupling.cchgOnTripNo);
  if (!trip) throw new Error(`Could not find trip for ${coupling.llo}`);
  const blockAct = trip.block.blockActivities.createNewItem({
    blkactVehicleActivityTypeNo: '13',
    blkactHasFixedLink: '0',
    blkactCchgNo: coupling.cchgInternalNumber,
  });
  return [blockAct];
}

module.exports = createBlockActsForInvalidCoupling;
