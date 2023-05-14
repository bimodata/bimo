import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { BlkvehuoirsCollection as BimoBlkvehuoirsCollection } from "../base-types/rawIndex";
export { BlkvehuoirsCollection as BimoBlkvehuoirsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { BimoBlkvehuoir, BlkvehuoirProps } from "./Blkvehuoir";
export function BlkvehuoirsCollectionClassFactory({
  Blkvehuoir,
}: EntityConstructorByEntityClassKey): typeof BimoBlkvehuoirsCollection{
  
  const childClasses: (typeof Entity)[] = [Blkvehuoir];
  import { getAllChildClasses } from "@bimo/core-utils-serialization";
  import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
  
  export interface BlkvehuoirsCollectionProps
  extends ExtendedCollectionProps<BimoBlkvehuoir, BlkvehuoirProps> {}
  
 class BlkvehuoirsCollection extends Collection<BimoBlkvehuoir, BlkvehuoirProps> {
    constructor(props: BlkvehuoirsCollectionProps = {}) {
      super({
        itemName: "Blkvehuoir",
        ItemConstructor: Blkvehuoir,
        idPropName: `bimoId`,
        labelPropName: `blkvehuoirRank`,
        ...props,
      });
    }
  }
  
  BlkvehuoirsCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return BlkvehuoirsCollection
}

export default BlkvehuoirsCollectionClassFactory