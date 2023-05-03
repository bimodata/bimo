import getAndSetIfRequired from "@bimo/core-utils-get-and-set-if-required";

import computeContentsOfOneVta from "./computeContentsOfOneVta";

import { VehicleSchedule } from "../VehicleSchedule";
import { BlocksCollection } from "../BlocksCollection";
import { VehicleTasksCollection } from "../VehicleTasksCollection";
import { Block } from "../Block";
import { VehicleTask } from "../VehicleTask";
import { BlockActivity } from "../BlockActivity";
import { BlockActivitiesCollection } from "../BlockActivitiesCollection";
import { BlockSection } from "../BlockSection";
import { BlockSectionsCollection } from "../BlockSectionsCollection";

export interface BlocksAndActsAndSections {
  blocks: BlocksCollection;
  blockActivities: BlockActivitiesCollection;
  blockSections: BlockSectionsCollection;
}

function computeVehicleTasksOfVsc(vsc: VehicleSchedule) {
  const blocksCollByVehuUniqueId: { [vehuUniqueId: string]: BlocksCollection } = {};
  const blocksAndActsAndSectionsByVta: Map<VehicleTask, BlocksAndActsAndSections> =
    new Map();
  const setOfVtasByBlock: Map<Block, Set<VehicleTask>> = new Map();
  const setOfVtasByBlockActivity: Map<BlockActivity, Set<VehicleTask>> = new Map();
  const setOfBlockSectionsByBlockActivity: Map<
    BlockActivity,
    Set<BlockSection>
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
  const vehicleTasks: VehicleTasksCollection = new VehicleTasksCollection({
    parent: vsc,
  });
  vsc.vehicleUnits.forEach((vehicleUnit) => {
    const vehicleTask = vehicleTasks.createNewItem({
      vehicleUnit,
      blocksThatStartWithThisVehu:
        blocksCollByVehuUniqueId[vehicleUnit.vehuInternalNumber],
    });
    const blocksAndActsAndSectionsOfThisVta = computeContentsOfOneVta({
      vehicleTask,
      setOfVtasByBlock,
      setOfVtasByBlockActivity,
      setOfBlockSectionsByBlockActivity,
    });
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

export default computeVehicleTasksOfVsc;
