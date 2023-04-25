import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface DataFileProps extends ExtendedItemProps {
  fileInfo?: string;
  fileData?: string;
  fileName?: string;
  path?: string;
  links?: string;
}

export class DataFile extends Item<DataFile> {
  fileInfo?: string;
  fileData?: string;
  fileName?: string;
  path?: string;
  links?: string;
  constructor(props: DataFileProps) {
    super(props);
    this.fileInfo = gavpfp(`fileInfo`, props);
    this.fileData = gavpfp('fileData', props);
    this.fileName = this.fileInfo.nameOrPath;
    this.path = this.fileInfo.path;

    this.links = [];
  }
}

export default DataFile;
