const getAndSetIfRequired = require('@bimo/core-utils-get-and-set-if-required');

const computeContentsOfOneVta = require('./computeContentsOfOneVta');

function computeVehicleTasksOfVsc(vsc, entityConstructorByEntityClassKey) {
  const { BlocksCollection, VehicleTasksCollection } = entityConstructorByEntityClassKey;
  const blocksCollByVehuUniqueId = {};
  const blocksAndActsAndSectionsByVta = new Map();
  const setOfVtasByBlock = new Map();
  const setOfVtasByBlockActivity = new Map();
  const setOfBlockSectionsByBlockActivity = new Map();
  vsc.blocks.forEach((block) => {
    block.sortBlockActivitiesByTime();
    block.blkvehuoirs.forEach((blkVehu) => {
      const blocksCollOfThisVehu = getAndSetIfRequired(
        blocksCollByVehuUniqueId,
        blkVehu.VehuUniqueId,
        new BlocksCollection({ associationType: 'aggregation' }),
      );
      blocksCollOfThisVehu.add(block);
    });
  });
  const vehicleTasks = new VehicleTasksCollection({ parent: vsc });
  vsc.vehicleUnits.forEach((vehicleUnit) => {
    const vehicleTask = vehicleTasks.createNewItem({
      vehicleUnit,
      blocksThatStartWithThisVehu: blocksCollByVehuUniqueId[vehicleUnit.vehuInternalNumber],
    });
    const blocksAndActsAndSectionsOfThisVta = computeContentsOfOneVta(
      {
        vehicleTask,
        setOfVtasByBlock,
        setOfVtasByBlockActivity,
        setOfBlockSectionsByBlockActivity,
      },
      entityConstructorByEntityClassKey,
    );
    blocksAndActsAndSectionsByVta.set(vehicleTask, blocksAndActsAndSectionsOfThisVta);
  });
  return { vehicleTasks, setOfVtasByBlock, setOfVtasByBlockActivity, blocksAndActsAndSectionsByVta, setOfBlockSectionsByBlockActivity };
}

module.exports = computeVehicleTasksOfVsc;
