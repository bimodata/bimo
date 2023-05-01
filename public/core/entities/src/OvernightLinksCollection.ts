import { OvernightLink, OvernightLinkProps } from "./OvernightLink";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [OvernightLink];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface OvernightLinksCollectionProps
  extends ExtendedCollectionProps<OvernightLink, OvernightLinkProps> {}

export class OvernightLinksCollection extends Collection<
  OvernightLink,
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

export default OvernightLinksCollection;
