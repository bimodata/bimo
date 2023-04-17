const getAndSetIfRequired = require('@bimo/core-utils-get-and-set-if-required');
const BlocksCollection = require('../BlocksCollection');
const BlockActivitiesCollection = require('../BlockActivitiesCollection');
const BlockSectionsCollection = require('../BlockSectionsCollection');

/**
 * @param {Object} params
 * @param {import ('../VehicleTask')} params.vehicleTask
 * @param {Map} params.setOfVtasByBlock
 * @param {Map} params.setOfVtasByBlockActivity
 * @param {Map} params.setOfBlockSectionsByBlockActivity
 */
function computeContentsOfOneVta({ vehicleTask, setOfVtasByBlock, setOfVtasByBlockActivity, setOfBlockSectionsByBlockActivity }) {
  const { vehicleSchedule, vehicleUnit } = vehicleTask;
  try {
    const blocksCollOfThisVehu = new BlocksCollection({
      associationType: 'aggregation',
      items: vehicleTask.blocksThatStartWithThisVehu ? vehicleTask.blocksThatStartWithThisVehu.items.slice() : [],
    });
    const blockActivitiesCollOfThisVehu = new BlockActivitiesCollection({ associationType: 'aggregation' });
    const blockSectionsOfThisVehu = new BlockSectionsCollection({
      associationType: 'composition',
      parent: vehicleTask,
    });

    blocksCollOfThisVehu.sort(
      (blkA, blkB) => blkA.startTimeAsDuration.as('second') - blkB.startTimeAsDuration.as('second'),
    );
    recursivelyAddBlocksAndBlockActivities({
      remainingBlocksToTreat: blocksCollOfThisVehu.items.slice(),
      indexOfFirstBlkActToTreatInThisBlock: 0,
      vehicleTask,
      blocksCollOfThisVehu,
      blockActivitiesCollOfThisVehu,
      blockSectionsOfThisVehu,
      setOfVtasByBlock,
      setOfVtasByBlockActivity,
      setOfBlockSectionsByBlockActivity,
    });
    return { blocks: blocksCollOfThisVehu, blockActivities: blockActivitiesCollOfThisVehu, blockSections: blockSectionsOfThisVehu };
  }
  catch (error) {
    const err = new Error(
      `Erreur au chargement du vta du vehicleUnit ${vehicleUnit.slo} de ${vehicleSchedule.slo}: ${error.message}`,
    );
    err.stack = `Re-thrown: ${err.stack}\nOriginal:${error.stack}`;
    throw err;
  }
}

module.exports = computeContentsOfOneVta;

/**
 * @param {Object} args
 * @param {import ('../Block')[]} args.remainingBlocksToTreat
 * @param {number} args.indexOfFirstBlkActToTreatInThisBlock
 * @param {import ('../VehicleTask')} args.vehicleTask
 * @param {BlocksCollection} args.blocksCollOfThisVehu
 * @param {BlockActivitiesCollection} args.blockActivitiesCollOfThisVehu
 * @param {BlockSectionsCollection} args.blockSectionsOfThisVehu
 * @param {Map} args.setOfVtasByBlock
 * @param {Map} args.setOfVtasByBlockActivity
 * @param {Map} args.setOfBlockSectionsByBlockActivity
 */
function recursivelyAddBlocksAndBlockActivities({
  remainingBlocksToTreat,
  indexOfFirstBlkActToTreatInThisBlock = 0,
  vehicleTask,
  blocksCollOfThisVehu,
  blockActivitiesCollOfThisVehu,
  blockSectionsOfThisVehu,
  setOfVtasByBlock,
  setOfVtasByBlockActivity,
  setOfBlockSectionsByBlockActivity,
}) {
  const blockToTreat = remainingBlocksToTreat.shift();
  if (!blockToTreat) return;

  const setOfVtasOfBlockToTreat = getAndSetIfRequired(setOfVtasByBlock, blockToTreat, new Set());
  setOfVtasOfBlockToTreat.add(vehicleTask);

  const blockSection = blockSectionsOfThisVehu.createNewItem({ block: blockToTreat });

  let indexOfFirstBlkActToTreatInNextBlock = 0;

  /** We use .some to stop iterating early in case we find a reason to */
  blockToTreat.blockActivities.some(((blockActivity, index) => {
    // Some block activities of this block may be irrelevant for this vta, we skip them
    if (index < indexOfFirstBlkActToTreatInThisBlock) return false;

    blockActivitiesCollOfThisVehu.add(blockActivity);
    const setOfVtasOfBlkAct = getAndSetIfRequired(setOfVtasByBlockActivity, blockActivity, new Set());
    setOfVtasOfBlkAct.add(vehicleTask);

    blockSection.blockActivities.add(blockActivity);
    const setOfBlockSectionsOfBlockActivity = getAndSetIfRequired(setOfBlockSectionsByBlockActivity, blockActivity, new Set());
    setOfBlockSectionsOfBlockActivity.add(blockSection);

    /**
     * Handle Consist Changes
     * 12 = à atteler, 13 = atteler, 14 = Dételer, 15 = d'un dételage
     * - si 12: ce block s'arrête ici, mais on veut poursuivre la vta avec l'autre block - il faut le retrouver
     * - si 13: a priori rien à faire: toutes les vta qui contiennent cette activité se poursuivent avec ce block
     * - si 14: est-ce que cette vta se poursuit avec le block long actuel, ou avec le block court ?
     * - si 15: on est sur la première activité du block, rien de spécial à faire
     */
    if (!['12', '14'].includes(blockActivity.blkactVehicleActivityTypeNo)) {
      return false;
    }

    if (blockActivity.blkactVehicleActivityTypeNo === '14') {
      /** Un dételage génère des blockActivities dans deux blocks
       * - Le block courant contient un "dételer (14)" puis peut se poursuivre
       * - Un autre block commence par un "D'un dételage (15)" correspondant
       * La question est: est-ce que cette vta se poursuit avec le block long actuel, ou avec le
       * block court. Le block court fait assurément déjà partie des blocksCollOfThisVehu grace au vehu_at_start
       * Si on le trouve, c'est que notre vta s'arrête ici et recommencera sur cet autre block. Sinon, on poursuit
       */
      return (blocksCollOfThisVehu.some((blk) => (
        blk.blockActivities.first.blkactVehicleActivityTypeNo === '15'
        && blk.blockActivities.first.blkactCchgNo === blockActivity.blkactCchgNo
      )));
    }

    if (blockActivity.blkactVehicleActivityTypeNo === '12') {
      /** Un dételage génère des blockActivities dans deux blocks
       * - Le block courant contient le "à atteler (12)" puis se termine
       * - L'autre contient un "atteler" et se poursuit
       * Nous sommes actuellement sur le block qui se termine sec et il faut qu'on retrouve
       * l'autre pour l'ajouter dans les blocks à traiter sur cette vehu, et qu'on sache à
       * partir de quel index on ajoute ses activités */
      let foundIndex;
      const newBlockToTreat = vehicleTask.vehicleSchedule.blocks.find((block) => {
        foundIndex = block.blockActivities
          .findIndex((blkAct) => blkAct.blkactVehicleActivityTypeNo === '13' && blkAct.blkactCchgNo === blockActivity.blkactCchgNo);
        return foundIndex !== -1;
      });

      if (newBlockToTreat) {
        if (!blocksCollOfThisVehu.getById(newBlockToTreat)) blocksCollOfThisVehu.add(newBlockToTreat);
        // Mettre comme prochain à traiter
        remainingBlocksToTreat.unshift(newBlockToTreat);
        // Indiquer où commencer à traiter le prochain block
        indexOfFirstBlkActToTreatInNextBlock = foundIndex;
        return true;
      }
    }

    throw new Error(`It's theoretically impossible to get here`);
  }));

  recursivelyAddBlocksAndBlockActivities({
    blockActivitiesCollOfThisVehu,
    blocksCollOfThisVehu,
    indexOfFirstBlkActToTreatInThisBlock: indexOfFirstBlkActToTreatInNextBlock,
    remainingBlocksToTreat,
    vehicleTask,
    blockSectionsOfThisVehu,
    setOfVtasByBlock,
    setOfVtasByBlockActivity,
    setOfBlockSectionsByBlockActivity,
  });
}
