import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VscincloirsCollection as BimoVscincloirsCollection } from "../base-types/rawIndex";
export { VscincloirsCollection as BimoVscincloirsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { BimoVscincloir, VscincloirProps } from "./Vscincloir";
export function VscincloirsCollectionClassFactory({
  Vscincloir,
}: EntityConstructorByEntityClassKey): typeof BimoVscincloirsCollection{
  
  const childClasses: (typeof Entity)[] = [Vscincloir];
  import { getAllChildClasses } from "@bimo/core-utils-serialization";
  import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
  
  export interface VscincloirsCollectionProps
  extends ExtendedCollectionProps<BimoVscincloir, VscincloirProps> {}
  
 class VscincloirsCollection extends Collection<BimoVscincloir, VscincloirProps> {
    constructor(props: VscincloirsCollectionProps = {}) {
      super({
        itemName: "Vscincloir",
        ItemConstructor: Vscincloir,
        items: props.items,
        idPropName: `bimoId`,
        labelPropName: `vscincloirIntKey`,
        parent: props.parent,
      });
    }
  }
  
  VscincloirsCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return VscincloirsCollection
}

export default VscincloirsCollectionClassFactory