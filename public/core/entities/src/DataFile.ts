import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
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

export class DataFile extends Item<DataFile> {
  fileInfo: BimoFileInfo;
  fileData: string;
  fileName: string;
  path?: string;
  constructor(props: DataFileProps) {
    super(props);
    this.fileInfo = gavpfp("fileInfo", props);
    this.fileData = gavpfp("fileData", props);
    this.fileName = this.fileInfo.nameOrPath;
    this.path = this.fileInfo.path;
  }
}

export default DataFile;