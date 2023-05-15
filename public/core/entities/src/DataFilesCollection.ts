import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { DataFilesCollection as BimoDataFilesCollection } from "../base-types/rawIndex";
export { DataFilesCollection as BimoDataFilesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoDataFile, DataFileProps } from "./DataFile";

export interface DataFilesCollectionProps
  extends ExtendedCollectionProps<BimoDataFile, DataFileProps> {}

export function DataFilesCollectionClassFactory({
  DataFile,
}: EntityConstructorByEntityClassKey): typeof BimoDataFilesCollection {
  const childClasses: (typeof Entity)[] = [DataFile];

  class DataFilesCollection extends Collection<BimoDataFile, DataFileProps> {
    constructor(props: DataFilesCollectionProps = {}) {
      super({
        itemName: "DataFile",
        ItemConstructor: DataFile,
        idPropName: "path",
        businessIdPropName: "path",
        labelPropName: "fileName",
        associationType: "aggregation",
        ...props,
      });
    }
  }

  DataFilesCollection.allChildClasses = getAllChildClasses(childClasses);

  return DataFilesCollection;
}

export default DataFilesCollectionClassFactory;
