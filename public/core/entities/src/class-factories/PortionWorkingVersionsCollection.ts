import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { PortionWorkingVersionsCollection as BimoPortionWorkingVersionsCollection } from "../base-types/rawIndex";
export { PortionWorkingVersionsCollection as BimoPortionWorkingVersionsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  BimoPortionWorkingVersion,
  PortionWorkingVersionProps,
} from "./PortionWorkingVersion";

export interface PortionWorkingVersionsCollectionProps
  extends ExtendedCollectionProps<
    BimoPortionWorkingVersion,
    PortionWorkingVersionProps
  > {}

export function PortionWorkingVersionsCollectionClassFactory({
  PortionWorkingVersion,
}: EntityConstructorByEntityClassKey): typeof BimoPortionWorkingVersionsCollection {
  const childClasses: (typeof Entity)[] = [PortionWorkingVersion];

  class PortionWorkingVersionsCollection extends Collection<
    BimoPortionWorkingVersion,
    PortionWorkingVersionProps
  > {
    constructor(props: PortionWorkingVersionsCollectionProps = {}) {
      super({
        itemName: "PortionWorkingVersion",
        ItemConstructor: PortionWorkingVersion,
        idPropName: "bimoId",
        labelPropName: `pwrkvDescription`,
        associationType: `aggregation`,
        ...props,
      });
    }

    /**
     * @param oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
     */
    static createFromOirStyleData(oirStyleData: any) {
      const rawPortionWorkingVersions = oirStyleData.portion_working_version;

      if (!rawPortionWorkingVersions) {
        throw new Error(`Bad oirStyleData: could not find "portion_working_version" key`);
      }
      const newPortionWorkingVersionsCollection = new PortionWorkingVersionsCollection({
        items: rawPortionWorkingVersions,
      });

      return newPortionWorkingVersionsCollection;
    }

    generateOirStyleData() {
      return {
        portion_working_version: this.map((portionWorkingVersion) => ({
          ...portionWorkingVersion,
          portion_working: portionWorkingVersion.portionWorkings,
        })),
      };
    }
  }

  PortionWorkingVersionsCollection.allChildClasses = getAllChildClasses(childClasses);

  return PortionWorkingVersionsCollection;
}

export default PortionWorkingVersionsCollectionClassFactory;
