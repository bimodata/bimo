import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { DataFile, DataFileProps } from "./DataFile";
export interface DataFilesCollectionProps extends ExtendedCollectionProps<DataFile, DataFileProps> {
}
export declare class DataFilesCollection extends Collection<DataFile, DataFileProps> {
    constructor(props?: DataFilesCollectionProps);
}
export default DataFilesCollection;
