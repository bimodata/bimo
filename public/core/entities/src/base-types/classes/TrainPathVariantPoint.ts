import { ExtendedItemProps } from "@bimo/core-utils-collection";
import { TripOrVariantPoint } from "./TripOrVariantPoint";

export interface TrainPathVariantPointProps extends ExtendedItemProps {
  trnpvptPlace: string;
  trnpvptArrivalTime?: string;
  trnpvptLoadTime?: string;
  trnpvptNoStopping?: string;
  trnpvptPassMidnight?: string;
}
export declare class TrainPathVariantPoint extends TripOrVariantPoint<
  TrainPathVariantPoint,
  TrainPathVariantPointProps
> {
  trnpvptPlace: string;
  trnpvptArrivalTime: string;
  trnpvptLoadTime?: string;
  trnpvptNoStopping?: string;
  trnpvptPassMidnight?: string;
  constructor(props: TrainPathVariantPointProps);
  get shortLoggingOutput(): string;
  get arrivalTime(): string;
  get departureTime(): string;
  get isTimingPoint(): string;
  get allowLoadTime(): string;
}
