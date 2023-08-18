/**
 *
 * @param {import('@bimo/core-entities').ConsistChange} uncoupling
 * @param {*} invalidMessage
 * @returns
 */
function createBlockActsForInvalidUncoupling(uncoupling, invalidMessage) {
  switch (invalidMessage) {
    case 'No Dételage':
      break;
    case 'More than two block activities':
    case `No "d'un dételage"`:
    default:
      throw new Error(`"${invalidMessage}" case is not supported yet`);
  }
  const trip = uncoupling.vehicleSchedule?.tripsAndIncludedTrips.getByBusinessId(uncoupling.cchgOnTripNo);
  if (!trip) throw new Error(`Could not find trip for ${uncoupling.llo}`);
  const blockAct = trip.block.blockActivities.createNewItem({
    blkactVehicleActivityTypeNo: '14',
    blkactHasFixedLink: '0',
    blkactCchgNo: uncoupling.cchgInternalNumber,
  });
  return [blockAct];
}

module.exports = createBlockActsForInvalidUncoupling;
