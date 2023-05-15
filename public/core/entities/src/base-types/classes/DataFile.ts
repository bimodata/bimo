import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface BimoFileInfo {
  name?: string;
  path?: string;
  nameOrPath: string;
}
export interface DataFileProps extends ExtendedItemProps {
  fileInfo: BimoFileInfo;
  fileData: string;
}
export declare class DataFile extends Item<DataFile> {
  fileInfo: BimoFileInfo;
  fileData: string;
  fileName: string;
  path?: string;
  constructor(props: DataFileProps);
}
