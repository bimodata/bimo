import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { LoadTime, LoadTimeProps } from "./LoadTime";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [LoadTime];

export interface LoadTimesCollectionProps
  extends ExtendedCollectionProps<LoadTime, LoadTimeProps> {}

export class LoadTimesCollection extends Collection<LoadTime, LoadTimeProps> {
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

export default LoadTimesCollection;
