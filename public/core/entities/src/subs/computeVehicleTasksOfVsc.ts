import getAndSetIfRequired from "@bimo/core-utils-get-and-set-if-required";

import computeContentsOfOneVta from "./computeContentsOfOneVta";

import { VehicleSchedule as BimoVehicleSchedule } from "../base-types/rawIndex";
import { BlocksCollection as BimoBlocksCollection } from "../base-types/rawIndex";
import { VehicleTasksCollection as BimoVehicleTasksCollection } from "../base-types/rawIndex";
import { Block as BimoBlock } from "../base-types/rawIndex";
import { VehicleTask as BimoVehicleTask } from "../base-types/rawIndex";
import { BlockActivity as BimoBlockActivity } from "../base-types/rawIndex";
import { BlockActivitiesCollection as BimoBlockActivitiesCollection } from "../base-types/rawIndex";
import { BlockSection as BimoBlockSection } from "../base-types/rawIndex";
import { BlockSectionsCollection as BimoBlockSectionsCollection } from "../base-types/rawIndex";
import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";

export interface BlocksAndActsAndSections {
  blocks: BimoBlocksCollection;
  blockActivities: BimoBlockActivitiesCollection;
  blockSections: BimoBlockSectionsCollection;
}

function computeVehicleTasksOfVsc(
  vsc: BimoVehicleSchedule,
  entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey
) {
  const { BlocksCollection, VehicleTasksCollection } = entityConstructorByEntityClassKey;
  const blocksCollByVehuUniqueId: { [vehuUniqueId: string]: BimoBlocksCollection } = {};
  const blocksAndActsAndSectionsByVta: Map<BimoVehicleTask, BlocksAndActsAndSections> =
    new Map();
  const setOfVtasByBlock: Map<BimoBlock, Set<BimoVehicleTask>> = new Map();
  const setOfVtasByBlockActivity: Map<
    BimoBlockActivity,
    Set<BimoVehicleTask>
  > = new Map();
  const setOfBlockSectionsByBlockActivity: Map<
    BimoBlockActivity,
    Set<BimoBlockSection>
  > = new Map();

  vsc.blocks.forEach((block) => {
    block.sortBlockActivitiesByTime();
    block.blkvehuoirs.forEach((blkVehu) => {
      const blocksCollOfThisVehu = getAndSetIfRequired(
        blocksCollByVehuUniqueId,
        blkVehu.vehuUniqueId,
        new BlocksCollection({ associationType: "aggregation" })
      );
      blocksCollOfThisVehu.add(block);
    });
  });
  const vehicleTasks: BimoVehicleTasksCollection = new VehicleTasksCollection({
    parent: vsc,
  });
  vsc.vehicleUnits.forEach((vehicleUnit) => {
    const vehicleTask = vehicleTasks.createNewItem({
      vehicleUnit,
      blocksThatStartWithThisVehu:
        blocksCollByVehuUniqueId[vehicleUnit.vehuInternalNumber],
    });
    const blocksAndActsAndSectionsOfThisVta = computeContentsOfOneVta(
      {
        vehicleTask,
        setOfVtasByBlock,
        setOfVtasByBlockActivity,
        setOfBlockSectionsByBlockActivity,
      },
      entityConstructorByEntityClassKey
    );
    blocksAndActsAndSectionsByVta.set(vehicleTask, blocksAndActsAndSectionsOfThisVta);
  });
  return {
    vehicleTasks,
    setOfVtasByBlock,
    setOfVtasByBlockActivity,
    blocksAndActsAndSectionsByVta,
    setOfBlockSectionsByBlockActivity,
  };
}

export type ComputedVehicleTaskObjects = ReturnType<typeof computeVehicleTasksOfVsc>;

export default computeVehicleTasksOfVsc;
