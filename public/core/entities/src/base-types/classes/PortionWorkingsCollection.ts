import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { PortionWorking, PortionWorkingProps } from "./PortionWorking";
export interface PortionWorkingsCollectionProps
  extends ExtendedCollectionProps<PortionWorking, PortionWorkingProps> {}
export declare class PortionWorkingsCollection extends Collection<
  PortionWorking,
  PortionWorkingProps
> {
  constructor(props?: PortionWorkingsCollectionProps);
}
