import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { ConsistChange, ConsistChangeProps } from "./ConsistChange";

const childClasses = [ConsistChange];

export interface ConsistChangesCollectionProps
  extends ExtendedCollectionProps<ConsistChange, ConsistChangeProps> {}

export class ConsistChangesCollection extends Collection<
  ConsistChange,
  ConsistChangeProps
> {
  constructor(props: ConsistChangesCollectionProps = {}) {
    super({
      itemName: "ConsistChange",
      ItemConstructor: ConsistChange,
      idPropName: `cchgInternalNumber`,
      businessIdPropName: `cchgInternalNumber`,
      labelPropName: ``,
      ...props,
    });
  }
}

ConsistChangesCollection.allChildClasses = getAllChildClasses(childClasses);

export default ConsistChangesCollection;
