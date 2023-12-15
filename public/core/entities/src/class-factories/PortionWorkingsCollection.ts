import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { PortionWorkingsCollection as BimoPortionWorkingsCollection } from "../base-types/rawIndex";
export { PortionWorkingsCollection as BimoPortionWorkingsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoPortionWorking, PortionWorkingProps } from "./PortionWorking";

export interface PortionWorkingsCollectionProps
  extends ExtendedCollectionProps<BimoPortionWorking, PortionWorkingProps> {}

export function PortionWorkingsCollectionClassFactory({
  PortionWorking,
}: EntityConstructorByEntityClassKey): typeof BimoPortionWorkingsCollection {
  const childClasses: (typeof Entity)[] = [PortionWorking];

  class PortionWorkingsCollection extends Collection<
    BimoPortionWorking,
    PortionWorkingProps
  > {
    constructor(props: PortionWorkingsCollectionProps = {}) {
      super({
        itemName: "PortionWorking",
        ItemConstructor: PortionWorking,
        idPropName: `bimoId`,
        labelPropName: `slo`,
        ...props,
      });
    }
  }

  PortionWorkingsCollection.allChildClasses = getAllChildClasses(childClasses);

  return PortionWorkingsCollection;
}

export default PortionWorkingsCollectionClassFactory;
