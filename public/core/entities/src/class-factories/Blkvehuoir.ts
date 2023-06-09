import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { Blkvehuoir as BimoBlkvehuoir } from "../base-types/rawIndex";
export { Blkvehuoir as BimoBlkvehuoir } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { BimoBlock } from "./Block";
export interface BlkvehuoirProps extends ExtendedItemProps {
  blkvehuoirRank: number;
  vehuUniqueId: string;
  bimoId?: string;
}
export function BlkvehuoirClassFactory({
  Block,
}: EntityConstructorByEntityClassKey): typeof BimoBlkvehuoir {
  class Blkvehuoir extends Item<Blkvehuoir> {
    blkvehuoirRank: number = 1;
    vehuUniqueId: string;
    bimoId?: string;
    constructor(props: BlkvehuoirProps) {
      super(props);
      this.blkvehuoirRank = gavpfp("blkvehuoirRank", props, "number", 0);
      this.vehuUniqueId = gavpfp("vehuUniqueId", props);
      this.bimoId = gavpfp("bimoId", props);
    }

    get block() {
      return this.parent && (this.parent.parent as BimoBlock);
    }

    get vehicleSchedule() {
      return this.block?.vehicleSchedule;
    }

    get vehicleUnit() {
      return this.vehicleSchedule?.vehicleUnits.getById(this.vehuUniqueId);
    }
  }

  Blkvehuoir.hastusKeywords = ["blk_vehicle_unit_at_start"];
  Blkvehuoir.hastusObject = "blkvehuoir";

  Blkvehuoir.allChildClasses = getAllChildClasses(childClasses);

  return Blkvehuoir;
}

export default BlkvehuoirClassFactory;
