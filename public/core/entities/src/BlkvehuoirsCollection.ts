
import { Blkvehuoir, BlkvehuoirProps } from "./Blkvehuoir";


const childClasses = [Blkvehuoir];
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";



export interface BlkvehuoirsCollectionProps extends ExtendedCollectionProps<Blkvehuoir, BlkvehuoirProps> {
}

export class BlkvehuoirsCollection extends Collection<Blkvehuoir, BlkvehuoirProps> {
  constructor(props: BlkvehuoirsCollectionProps = {}) {
    Object.assign(props, {
      itemName: 'Blkvehuoir',
      ItemConstructor: Blkvehuoir,
      idPropName: `bimoId`,
      labelPropName: `blkvehuoirRank`,
    });
    super(props);
  }
}


BlkvehuoirsCollection.allChildClasses = getAllChildClasses(childClasses);



export default BlkvehuoirsCollection;
