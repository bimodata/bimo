import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { LoadTimesCollection as BimoLoadTimesCollection } from "../base-types/rawIndex";
export { LoadTimesCollection as BimoLoadTimesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoLoadTime, LoadTimeProps } from "./LoadTime";
export interface LoadTimesCollectionProps
  extends ExtendedCollectionProps<BimoLoadTime, LoadTimeProps> {}

export function LoadTimesCollectionClassFactory({
  LoadTime,
}: EntityConstructorByEntityClassKey): typeof BimoLoadTimesCollection {
  const childClasses: (typeof Entity)[] = [LoadTime];

  class LoadTimesCollection extends Collection<BimoLoadTime, LoadTimeProps> {
    constructor(props: LoadTimesCollectionProps = {}) {
      super({
        itemName: "LoadTime",
        ItemConstructor: LoadTime,
        idPropName: "bimoId",
        labelPropName: "ltPlaceId",
        ...props,
      });
    }
  }

  LoadTimesCollection.allChildClasses = getAllChildClasses(childClasses);

  return LoadTimesCollection;
}

export default LoadTimesCollectionClassFactory;
