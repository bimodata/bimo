import { ExtendedItemProps } from "@bimo/core-utils-collection";
import { TripOrVariantPoint } from "./TripOrVariantPoint";
import { Trip } from "./Trip";
export interface TripPointProps extends ExtendedItemProps {
  trpptPlace?: string;
  trpptStop?: string;
  trpptIsTimingPoint?: string;
  trpptArrivalTimeUnrounded?: string;
  trpptDepartureTimeUnrounded?: string;
  trpptInternalArrivalTime?: string;
  trpptInternalDepartureTime?: string;
  trpptNoStopping?: string;
  trpptInternalTpDistance?: string | null;
  trpptInternalDistance?: string | null;
  trpptTpDistance?: string | null;
  trpptDistance?: string | null;
  trpptDistrict?: string;
  trpptZone?: string;
  trpptTpNote?: string;
  trpptTstpNote?: string;
  trpptInternalAllowLoadTime?: string;
  trpptInternalArrivalTimeDiff?: string;
  trpptInternalDepartureTimeDiff?: string;
  trpptDepartureTpNote?: string;
  trpptInternalTimeFactor?: string;
  trpptInternalPublicInfo?: string;
  trpptInternalPathPrevPoint?: string;
  trpptInternalPassengersMvmtRestrict?: string;
  trpptOriginalStop?: string;
  trpptInternalOriginalPlaceId?: string;
  trpptInternalOriginalNoStopping?: string;
  trpptInternalOriginalAllowLoadTime?: string;
  trpptInternalBackwardHoldTime?: string;
  trpptInternalForwardHoldTime?: string;
  trpptIsRoutingPoint?: string;
  trpptInternalLoadDistrict?: string;
  trpptInternalLoadPlace?: string;
  trpptInternalLoadZone?: string;
  trpptVariantId?: string;
}
export declare class TripPoint extends TripOrVariantPoint<TripPoint, TripPointProps> {
  trpptPlace: string;
  trpptStop?: string;
  trpptIsTimingPoint?: string;
  trpptArrivalTimeUnrounded?: string;
  trpptDepartureTimeUnrounded?: string;
  _trpptInternalArrivalTime?: string;
  _trpptInternalDepartureTime?: string;
  trpptNoStopping?: string;
  trpptInternalTpDistance?: string | null;
  trpptInternalDistance?: string | null;
  trpptDistrict?: string;
  trpptZone?: string;
  trpptTpNote?: string;
  trpptTstpNote?: string;
  trpptInternalAllowLoadTime?: string;
  trpptInternalArrivalTimeDiff?: string;
  trpptInternalDepartureTimeDiff?: string;
  trpptDepartureTpNote?: string;
  trpptInternalTimeFactor?: string;
  trpptInternalPublicInfo?: string;
  trpptInternalPathPrevPoint?: string;
  trpptInternalPassengersMvmtRestrict?: string;
  trpptOriginalStop?: string;
  trpptInternalOriginalPlaceId?: string;
  trpptInternalOriginalNoStopping?: string;
  trpptInternalOriginalAllowLoadTime?: string;
  trpptInternalBackwardHoldTime?: string;
  trpptInternalForwardHoldTime?: string;
  trpptIsRoutingPoint?: string;
  trpptInternalLoadDistrict?: string;
  trpptInternalLoadPlace?: string;
  trpptInternalLoadZone?: string;
  trpptVariantId?: string;
  trpptCodeCs?: string;
  trpptTypeArret?: string;
  constructor(props: TripPointProps);
  /** en km */
  get trpptTpDistance(): string | null;
  /** en km */
  set trpptTpDistance(v: string | null);
  /** en m */
  get trpptDistance(): string | null;
  /** en m */
  set trpptDistance(v: string | null);
  get trpptInternalArrivalTime(): string;
  set trpptInternalArrivalTime(v: string);
  get trpptInternalDepartureTime(): string;
  set trpptInternalDepartureTime(v: string);
  /** @type {Boolean} */
  get isStopping(): boolean;
  get trip(): Trip | undefined;
  get _indexInSortedParent(): number | null;
  getNthTripPointFromThisOne(n: number): void;
  getNthPointFromThisOne(n: number): TripPoint;
  get nextTripPoint(): TripPoint;
  get nextPoint(): TripPoint;
  get previousTripPoint(): TripPoint;
  get previousPoint(): TripPoint;
  copy(): TripPoint;
  removeFromTrip(): void;
  /**
   *
   * @param {'departure'|'arrival'} [departureOrArrival='departure']
   * @param {Boolean} [allowFallback=true]
   */
  getTimeAsDuration(departureOrArrival?: string, allowFallback?: boolean): any;
  get stopDurationInSeconds(): any;
  tripPointTimesAreValid(): boolean;
  get shortLoggingOutput(): string;
  get placeId(): string;
  set placeId(v: string);
  get originalPlaceId(): string | undefined;
  set originalPlaceId(v: string | undefined);
}