import { Blkvehuoir, BlkvehuoirProps } from "./Blkvehuoir";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
export interface BlkvehuoirsCollectionProps
  extends ExtendedCollectionProps<Blkvehuoir, BlkvehuoirProps> {}
export declare class BlkvehuoirsCollection extends Collection<
  Blkvehuoir,
  BlkvehuoirProps
> {
  constructor(props?: BlkvehuoirsCollectionProps);
}
