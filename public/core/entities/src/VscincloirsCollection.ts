import { Vscincloir, VscincloirProps } from "./Vscincloir";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [Vscincloir];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface VscincloirsCollectionProps
  extends ExtendedCollectionProps<Vscincloir, VscincloirProps> {}

export class VscincloirsCollection extends Collection<Vscincloir, VscincloirProps> {
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

export default VscincloirsCollection;
