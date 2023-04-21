const getAndSetIfRequired = require('@bimo/core-utils-get-and-set-if-required');

/**
 *
 * @param {import('../VehicleSchedule')} vsc
 */
function computeActivityEntityItemsOfVsc(vsc) {
  const activityEntityItemByBlockActivity = new Map();
  const setOfblockActivitiesByBlockActivityEntityItem = new Map();

  vsc.blocks.forEach((block) => {
    block.blockActivities.forEach((blockActivity) => {
      const collectionKey = collectionKeyByEntityClassKey[blockActivity.activityEntityClassKey];
      const hastusIdKey = hastusIdKeyByEntityClassKey[blockActivity.activityEntityClassKey];

      let activityEntityItem = vsc[collectionKey].getByBusinessId(blockActivity[hastusIdKey]);
      if (!activityEntityItem) {
        const foundInOtherSchedule = vsc.vscincloirs.some((vscInclOir) => {
          activityEntityItem = vscInclOir.vsc?.[collectionKey].getByBusinessId(blockActivity[hastusIdKey]);
          return activityEntityItem;
        });
        if (!foundInOtherSchedule) {
          throw new Error(`Impossible de trouver un ${blockActivity.activityNameByLanguageCode.fr} avec l'id ${blockActivity[hastusIdKey]} `
            + `dans l'horaire ${vsc.shortLoggingOutput} et ses horaires inclus.`);
        }
      }

      const setOfBlockActivitiesOfThisEntityItem = getAndSetIfRequired(
        setOfblockActivitiesByBlockActivityEntityItem, activityEntityItem, new Set(),
      );
      setOfBlockActivitiesOfThisEntityItem.add(blockActivity);

      activityEntityItemByBlockActivity.set(blockActivity, activityEntityItem);
    });
  });
  return { setOfblockActivitiesByBlockActivityEntityItem, activityEntityItemByBlockActivity };
}

module.exports = computeActivityEntityItemsOfVsc;

const collectionKeyByEntityClassKey = {
  Trip: 'trips',
  ConsistChange: 'consistChanges',
  VehicleStandby: 'vehicleStandbys',
  Maintenance: 'maintenances',
};

const hastusIdKeyByEntityClassKey = {
  Trip: 'blkactTripNo',
  ConsistChange: 'blkactCchgNo',
  VehicleStandby: 'blkactVehicleStandbyNo',
  Maintenance: 'blkactMaintenanceNo',
};