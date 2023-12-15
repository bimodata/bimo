import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import {
  PortionWorkingVersion,
  PortionWorkingVersionProps,
} from "./PortionWorkingVersion";
export interface PortionWorkingVersionsCollectionProps
  extends ExtendedCollectionProps<PortionWorkingVersion, PortionWorkingVersionProps> {}
export declare class PortionWorkingVersionsCollection extends Collection<
  PortionWorkingVersion,
  PortionWorkingVersionProps
> {
  constructor(props?: PortionWorkingVersionsCollectionProps);
  /**
   * @param oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
   */
  static createFromOirStyleData(oirStyleData: any): PortionWorkingVersionsCollection;
  generateOirStyleData(): {
    portion_working_version: any[];
  };
}
