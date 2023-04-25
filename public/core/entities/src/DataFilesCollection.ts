import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { DataFile, DataFileProps } from "./DataFile";

const childClasses = [DataFile];


export interface DataFilesCollectionProps extends ExtendedCollectionProps<DataFile, DataFileProps> {
}

export class DataFilesCollection extends Collection<DataFile, DataFileProps> {
  constructor(props: DataFilesCollectionProps = {}) {
    super({
      itemName: 'DataFile',
      ItemConstructor: DataFile,
      idPropName: 'path',
      businessIdPropName: 'path',
      labelPropName: 'fileName',
      associationType: 'aggregation',
      ...props,
    });
  }
}

DataFilesCollection.allChildClasses = getAllChildClasses(childClasses);



export default DataFilesCollection;
