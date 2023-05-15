import { Vscincloir, VscincloirProps } from "./Vscincloir";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
export interface VscincloirsCollectionProps
  extends ExtendedCollectionProps<Vscincloir, VscincloirProps> {}
export declare class VscincloirsCollection extends Collection<
  Vscincloir,
  VscincloirProps
> {
  constructor(props?: VscincloirsCollectionProps);
}
