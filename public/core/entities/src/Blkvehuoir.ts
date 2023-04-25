const childClasses = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { Block } from "./Block";

export interface BlkvehuoirProps extends ExtendedItemProps {
  blkvehuoirRank?: string;
  VehuUniqueId?: string;
  bimoId?: string;
}

export class Blkvehuoir extends Item<Blkvehuoir> {
  blkvehuoirRank?: string;
  VehuUniqueId?: string;
  bimoId?: string;
  constructor(props: BlkvehuoirProps) {
    super(props);
    this.blkvehuoirRank = gavpfp("blkvehuoirRank", props);
    this.VehuUniqueId = gavpfp("VehuUniqueId", props);
    this.bimoId = gavpfp("bimoId", props);
  }

  get block() {
    return this.parent && (this.parent.parent as Block);
  }

  get vehicleSchedule() {
    return this.block?.vehicleSchedule;
  }

  get vehicleUnit() {
    return this.vehicleSchedule?.vehicleUnits.getById(this.VehuUniqueId);
  }
}

Blkvehuoir.hastusKeywords = ["blk_vehicle_unit_at_start"];
Blkvehuoir.hastusObject = "blkvehuoir";

Blkvehuoir.allChildClasses = getAllChildClasses(childClasses);

export default Blkvehuoir;
