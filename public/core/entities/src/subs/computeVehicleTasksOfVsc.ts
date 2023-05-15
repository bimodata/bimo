import getAndSetIfRequired from "@bimo/core-utils-get-and-set-if-required";

import computeContentsOfOneVta from "./computeContentsOfOneVta";

import { BimoVehicleSchedule } from "../VehicleSchedule";
import { BimoBlocksCollection } from "../BlocksCollection";
import { BimoVehicleTasksCollection } from "../VehicleTasksCollection";
import { BimoBlock } from "../Block";
import { BimoVehicleTask } from "../VehicleTask";
import { BimoBlockActivity } from "../BlockActivity";
import { BimoBlockActivitiesCollection } from "../BlockActivitiesCollection";
import { BimoBlockSection } from "../BlockSection";
import { BimoBlockSectionsCollection } from "../BlockSectionsCollection";
import {
  entityConstructorByEntityClassKey,
  EntityConstructorByEntityClassKey,
} from "../../base-types/entityConstructorByEntityClassKey";

export interface BlocksAndActsAndSections {
  blocks: BimoBlocksCollection;
  blockActivities: BimoBlockActivitiesCollection;
  blockSections: BimoBlockSectionsCollection;
}

function computeVehicleTasksOfVsc(
  vsc: BimoVehicleSchedule,
  { BlocksCollection, VehicleTasksCollection }: EntityConstructorByEntityClassKey
) {
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
