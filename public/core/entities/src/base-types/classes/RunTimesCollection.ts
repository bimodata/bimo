import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { RunTime, RunTimeProps } from "./RunTime";
export interface RunTimesCollectionProps
  extends ExtendedCollectionProps<RunTime, RunTimeProps> {}
export declare class RunTimesCollection extends Collection<RunTime, RunTimeProps> {
  constructor(props?: RunTimesCollectionProps);
}
