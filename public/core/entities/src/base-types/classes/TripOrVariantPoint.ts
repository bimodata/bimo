import {
  Item,
  ExtendedItem,
  ExtendedItemProps,
  Collection,
} from "@bimo/core-utils-collection";
import { Place } from "./Place";
import { Duration } from "luxon";
import { TripOrVariantTypeEnum } from "./TripOrVariant";

export declare class TripOrVariantPoint<
  PointType extends ExtendedItem<PointType>,
  PointProps extends ExtendedItemProps
> extends Item<PointType> {
  _abstract?: any;
  parent?: Collection<PointType, PointProps>;
  constructor(props: PointProps, tripOrVariantType: TripOrVariantTypeEnum);
  get isTimingPoint(): string;
  set isTimingPoint(v: string);
  get placeId(): string;
  set placeId(v: string);
  get place(): Place;
  get originalPlaceId(): string | undefined;
  set originalPlaceId(v: string | undefined);
  get variantId(): string | undefined;
  set variantId(v: string | undefined);
  get noStopping(): string;
  set noStopping(v: string);
  get allowLoadTime(): string;
  set allowLoadTime(v: string);
  get tpDistance(): string;
  set tpDistance(v: string);
  get distance(): string;
  set distance(v: string);
  get arrivalTime(): string;
  set arrivalTime(v: string);
  get departureTime(): string;
  set departureTime(v: string);
  get codeCs(): string;
  set codeCs(v: string);
  get rank(): number;
  get isFirst(): boolean;
  get isLast(): boolean;
  get isFirstOrLast(): boolean;
  getTimeAsDuration(
    departureOrArrival?: "departure" | "arrival",
    allowFallback?: boolean
  ): Duration;
  get stopDurationInSeconds(): number;
  timesAreValid(): boolean;
}
