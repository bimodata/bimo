import getAndSetIfRequired from "@bimo/core-utils-get-and-set-if-required";

import computeContentsOfOneVta from "./computeContentsOfOneVta";

import { BimoVehicleSchedule } from "../class-factories/VehicleSchedule";
import { BimoBlocksCollection } from "../class-factories/BlocksCollection";
import { BimoVehicleTasksCollection } from "../class-factories/VehicleTasksCollection";
import { BimoBlock } from "../class-factories/Block";
import { BimoVehicleTask } from "../class-factories/VehicleTask";
import { BimoBlockActivity } from "../class-factories/BlockActivity";
import { BimoBlockActivitiesCollection } from "../class-factories/BlockActivitiesCollection";
import { BimoBlockSection } from "../class-factories/BlockSection";
import { BimoBlockSectionsCollection } from "../class-factories/BlockSectionsCollection";
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
