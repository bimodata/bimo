import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { RunTimesCollection as BimoRunTimesCollection } from "../base-types/rawIndex";
export { RunTimesCollection as BimoRunTimesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoRunTime, RunTimeProps } from "./RunTime";

export interface RunTimesCollectionProps
  extends ExtendedCollectionProps<BimoRunTime, RunTimeProps> {}

export function RunTimesCollectionClassFactory({
  RunTime,
}: EntityConstructorByEntityClassKey): typeof BimoRunTimesCollection {
  const childClasses: (typeof Entity)[] = [RunTime];

  class RunTimesCollection extends Collection<BimoRunTime, RunTimeProps> {
    constructor(props: RunTimesCollectionProps = {}) {
      super({
        itemName: "RunTime",
        ItemConstructor: RunTime,
        idPropName: `bimoId`,
        labelPropName: `od`,
        ...props,
      });
    }
  }

  RunTimesCollection.allChildClasses = getAllChildClasses(childClasses);

  return RunTimesCollection;
}

export default RunTimesCollectionClassFactory;
