import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { RunTimeVersion, RunTimeVersionProps } from "./RunTimeVersion";
export interface RunTimeVersionsCollectionProps
  extends ExtendedCollectionProps<RunTimeVersion, RunTimeVersionProps> {}
export declare class RunTimeVersionsCollection extends Collection<
  RunTimeVersion,
  RunTimeVersionProps
> {
  constructor(props?: RunTimeVersionsCollectionProps);
  /**
   * @param oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
   */
  static createFromOirStyleData(oirStyleData: any): RunTimeVersionsCollection;
  generateOirStyleData(): {
    runtime_version: any[];
  };
}
