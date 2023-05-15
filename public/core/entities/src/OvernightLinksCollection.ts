import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { OvernightLinksCollection as BimoOvernightLinksCollection } from "../base-types/rawIndex";
export { OvernightLinksCollection as BimoOvernightLinksCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { BimoOvernightLink, OvernightLinkProps } from "./OvernightLink";

import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface OvernightLinksCollectionProps
  extends ExtendedCollectionProps<BimoOvernightLink, OvernightLinkProps> {}

export function OvernightLinksCollectionClassFactory({
  OvernightLink,
}: EntityConstructorByEntityClassKey): typeof BimoOvernightLinksCollection {
  const childClasses: (typeof Entity)[] = [OvernightLink];

  class OvernightLinksCollection extends Collection<
    BimoOvernightLink,
    OvernightLinkProps
  > {
    constructor(props: OvernightLinksCollectionProps = {}) {
      super({
        itemName: "OvernightLink",
        ItemConstructor: OvernightLink,
        items: props.items,
        parent: props.parent,
      });
    }
  }

  OvernightLinksCollection.allChildClasses = getAllChildClasses(childClasses);

  return OvernightLinksCollection;
}

export default OvernightLinksCollectionClassFactory;
