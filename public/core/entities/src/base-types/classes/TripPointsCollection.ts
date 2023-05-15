import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { TripPoint, TripPointProps } from "./TripPoint";
export interface TripPointsCollectionProps
  extends ExtendedCollectionProps<TripPoint, TripPointProps> {}
export declare class TripPointsCollection extends Collection<TripPoint, TripPointProps> {
  constructor(props?: TripPointsCollectionProps);
  sortByTime(): void;
  get mediumLoggingOutput(): string;
  get longLoggingOutput(): string;
}
