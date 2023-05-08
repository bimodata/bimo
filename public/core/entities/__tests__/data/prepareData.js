const { VehicleSchedulesCollection, VehicleSchedule, ConsistChange, resetAllEntitiesNextIds } = require('../..');

function prepareData() {
  resetAllEntitiesNextIds();
  const vscCollection = new VehicleSchedulesCollection({ associationType: 'composition' });

  /** @type {VehicleSchedule} */
  const blockingVsc = vscCollection.createNewItem({ vscName: 'blocking' });
  /** @type {VehicleSchedule} */
  const oldVsc = vscCollection.createNewItem({ vscName: 'oldSched', vscSchedType: '16' });
  const newVsc = new VehicleSchedule({ vscName: 'newSched', vscSchedType: '1', vscIntId: 'new' });

  blockingVsc.addIncludedVsc(oldVsc);

  oldVsc.trips.createNewItem({ trpNumber: 'T1', trpType: '0', trpIntNumber: 'T1' });
  oldVsc.trips.createNewItem({ trpNumber: 'T2', trpType: '0', trpIntNumber: 'T2' });
  oldVsc.trips.createNewItem({ trpNumber: 'T3', trpType: '0', trpIntNumber: 'T3' });
  oldVsc.trips.createNewItem({ trpNumber: 'T4', trpType: '0', trpIntNumber: 'T4' });
  oldVsc.trips.createNewItem({ trpNumber: 'T5', trpType: '0', trpIntNumber: 'T5' });
  oldVsc.trips.createNewItem({ trpNumber: 'T6', trpType: '0', trpIntNumber: 'T6' });
  oldVsc.trips.createNewItem({ trpNumber: 'T7', trpType: '0', trpIntNumber: 'T7' });

  blockingVsc.blocks.createNewItem({ blkNumber: 'B1' });
  blockingVsc.blocks.createNewItem({ blkNumber: 'B2' });

  oldVsc.trips.forEach((trip, index) => {
    const copy = trip.copy(`new_${trip.trpIntNumber}`);
    copy.moveToVehicleSchedule(newVsc);
    if (index < 4 || index === 6) {
      blockingVsc.blocks.items[0].addTrip(trip);
    }
    else {
      blockingVsc.blocks.items[1].addTrip(trip);
    }
  });

  const cchg = blockingVsc.consistChanges.createNewItem({
    cchgActivity: 'Dételage',
    cchgOnTripNo: 'T2',
    cchgRelatedBlock: 'B2',
    cchgOntrpBlock: 'B1',
  });

  blockingVsc.blocks.items[1].blockActivities.createNewItem({
    blkactVehicleActivityTypeNo: '15',
    blkactCchgNo: cchg.cchgInternalNumber,
  });

  const cchg2 = blockingVsc.consistChanges.createNewItem({
    cchgActivity: 'Attelage',
    cchgOnTripNo: 'T4',
    cchgRelatedBlock: 'B2',
    cchgOntrpBlock: 'B1',
  });

  blockingVsc.blocks.items[1].blockActivities.createNewItem({
    blkactVehicleActivityTypeNo: '12',
    blkactCchgNo: cchg2.cchgInternalNumber,
  });

  oldVsc._nullifyAllCachedValues();
  newVsc._nullifyAllCachedValues();
  blockingVsc._nullifyAllCachedValues();

  return { vscCollection, oldVsc, newVsc, blockingVsc };
}
module.exports = prepareData;
