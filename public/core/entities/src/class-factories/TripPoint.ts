import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TripPoint as BimoTripPoint } from "../base-types/rawIndex";
export { TripPoint as BimoTripPoint } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoTripPointsCollection } from "./TripPointsCollection";
import { BimoTrip } from "./Trip";

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
export function TripPointClassFactory({
  TripOrVariantPoint,
}: EntityConstructorByEntityClassKey): typeof BimoTripPoint {
  const TP_INTERNAL_DISTANCE_FACTOR = 10000;
  const REGULAR_INTERNAL_DISTANCE_FACTOR = 10;

  class TripPoint extends TripOrVariantPoint<TripPoint, TripPointProps> {
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
    trpptInternalOriginalPlaceId: string;
    trpptInternalOriginalNoStopping?: string;
    trpptInternalOriginalAllowLoadTime?: string;
    trpptInternalBackwardHoldTime?: string;
    trpptInternalForwardHoldTime?: string;
    trpptIsRoutingPoint?: string;
    trpptInternalLoadDistrict?: string;
    trpptInternalLoadPlace?: string;
    trpptInternalLoadZone?: string;
    trpptVariantId?: string;
    constructor(props: TripPointProps) {
      super(props, "trip");
      this.trpptPlace = gavpfp("trpptPlace", props);
      this.trpptStop = gavpfp("trpptStop", props);
      this.trpptIsTimingPoint = gavpfp("trpptIsTimingPoint", props, `string`, `1`);
      this.trpptArrivalTimeUnrounded = gavpfp("trpptArrivalTimeUnrounded", props);
      this.trpptDepartureTimeUnrounded = gavpfp("trpptDepartureTimeUnrounded", props);
      this._trpptInternalArrivalTime = gavpfp(
        "trpptInternalArrivalTime",
        props,
        `string`,
        this.trpptArrivalTimeUnrounded
      );
      this._trpptInternalDepartureTime = gavpfp(
        "trpptInternalDepartureTime",
        props,
        `string`,
        this.trpptDepartureTimeUnrounded
      );
      this.trpptNoStopping = gavpfp("trpptNoStopping", props, `string`, `0`);

      /** en décimètres */
      this.trpptInternalTpDistance = gavpfp("trpptInternalTpDistance", props);
      this.trpptTpDistance = gavpfp("trpptTpDistance", props) ?? this.trpptTpDistance;

      /** en décimètres */
      this.trpptInternalDistance = gavpfp("trpptInternalDistance", props);
      this.trpptDistance = gavpfp("trpptDistance", props) ?? this.trpptDistance;
      this.trpptDistrict = gavpfp("trpptDistrict", props);
      this.trpptZone = gavpfp("trpptZone", props);
      this.trpptTpNote = gavpfp("trpptTpNote", props);
      this.trpptTstpNote = gavpfp("trpptTstpNote", props);
      this.trpptInternalAllowLoadTime = gavpfp(
        "trpptInternalAllowLoadTime",
        props,
        `string`,
        `1`
      );
      this.trpptInternalArrivalTimeDiff = gavpfp(
        "trpptInternalArrivalTimeDiff",
        props,
        `string`,
        `0h00`
      );
      this.trpptInternalDepartureTimeDiff = gavpfp(
        "trpptInternalDepartureTimeDiff",
        props,
        `string`,
        `0h00`
      );
      this.trpptDepartureTpNote = gavpfp("trpptDepartureTpNote", props);
      this.trpptInternalTimeFactor = gavpfp(
        "trpptInternalTimeFactor",
        props,
        `string`,
        `1.00`
      );
      this.trpptInternalPublicInfo = gavpfp(
        "trpptInternalPublicInfo",
        props,
        `string`,
        `1`
      );
      this.trpptInternalPathPrevPoint = gavpfp("trpptInternalPathPrevPoint", props);
      this.trpptInternalPassengersMvmtRestrict = gavpfp(
        "trpptInternalPassengersMvmtRestrict",
        props
      );
      this.trpptOriginalStop = gavpfp("trpptOriginalStop", props);
      this.trpptInternalOriginalPlaceId = gavpfp(
        "trpptInternalOriginalPlaceId",
        props,
        `string`,
        this.trpptPlace
      );
      this.trpptInternalOriginalNoStopping = gavpfp(
        "trpptInternalOriginalNoStopping",
        props,
        `string`,
        this.trpptNoStopping
      );
      this.trpptInternalOriginalAllowLoadTime = gavpfp(
        "trpptInternalOriginalAllowLoadTime",
        props,
        `string`,
        this.trpptInternalAllowLoadTime
      );
      this.trpptInternalBackwardHoldTime = gavpfp("trpptInternalBackwardHoldTime", props);
      this.trpptInternalForwardHoldTime = gavpfp("trpptInternalForwardHoldTime", props);
      this.trpptIsRoutingPoint = gavpfp("trpptIsRoutingPoint", props, `string`, `0`);
      this.trpptInternalLoadDistrict = gavpfp("trpptInternalLoadDistrict", props);
      this.trpptInternalLoadPlace = gavpfp("trpptInternalLoadPlace", props);
      this.trpptInternalLoadZone = gavpfp("trpptInternalLoadZone", props);
      this.trpptVariantId = gavpfp("trpptVariantId", props);
    }

    /** en km */
    get trpptTpDistance() {
      const valueAsNumber = parseFloat(this.trpptInternalTpDistance as string);
      return Number.isNaN(valueAsNumber)
        ? null
        : (valueAsNumber / TP_INTERNAL_DISTANCE_FACTOR).toFixed(4);
    }

    /** en km */
    set trpptTpDistance(v) {
      const valueAsNumber = parseFloat(v as string);
      this.trpptInternalTpDistance = Number.isNaN(valueAsNumber)
        ? null
        : (valueAsNumber * TP_INTERNAL_DISTANCE_FACTOR).toFixed(0);
    }

    /** en m */
    get trpptDistance() {
      const valueAsNumber = parseFloat(this.trpptInternalDistance as string);
      return Number.isNaN(valueAsNumber)
        ? null
        : (valueAsNumber / REGULAR_INTERNAL_DISTANCE_FACTOR).toFixed(2);
    }

    /** en m */
    set trpptDistance(v) {
      const valueAsNumber = parseFloat(v as string);
      this.trpptInternalDistance = Number.isNaN(valueAsNumber)
        ? null
        : (valueAsNumber * REGULAR_INTERNAL_DISTANCE_FACTOR).toFixed(0);
    }

    get trpptInternalArrivalTime() {
      return (this._trpptInternalArrivalTime || this.trpptArrivalTimeUnrounded) as string;
    }

    set trpptInternalArrivalTime(v) {
      this._trpptInternalArrivalTime = v;
    }

    get trpptInternalDepartureTime() {
      return (this._trpptInternalDepartureTime ||
        this.trpptDepartureTimeUnrounded) as string;
    }

    set trpptInternalDepartureTime(v) {
      this._trpptInternalDepartureTime = v;
    }

    /** @type {Boolean} */
    get isStopping() {
      return this.trpptNoStopping === "0";
    }

    get trip() {
      return this.parent && (this.parent.parent as unknown as BimoTrip);
    }

    get _indexInSortedParent() {
      if (!this.parent) throw new Error(`No parent !`);
      (this.parent as BimoTripPointsCollection).sortByTime();
      return this.parent.indexOf(this);
    }

    getNthTripPointFromThisOne(n: number) {
      this.getNthPointFromThisOne(n);
    }

    getNthPointFromThisOne(n: number) {
      const indexInSortedParent = this._indexInSortedParent;
      return (this.parent && this.parent.items[indexInSortedParent + n]) ?? null;
    }

    get nextTripPoint() {
      return this.nextPoint;
    }

    get nextPoint() {
      return this.getNthPointFromThisOne(1);
    }

    get previousTripPoint() {
      return this.previousPoint;
    }

    get previousPoint() {
      return this.getNthPointFromThisOne(-1);
    }

    copy() {
      // @ts-ignore
      const copiedItem = new this.constructor(this);
      copiedItem.parent = this.parent;
      return copiedItem;
    }

    removeFromTrip() {
      this.parent?.remove(this);
    }

    get shortLoggingOutput() {
      return (
        `${this.trpptPlace}(A:${this.trpptInternalArrivalTime},` +
        ` D:${this.trpptInternalDepartureTime}, noStopping:${this.trpptNoStopping})`
      );
    }

    get placeId() {
      return this.trpptPlace;
    }

    set placeId(v) {
      if (this === this.trip?.firstTripPoint) this.trip.changeCurrentStartPlace(v);
      else if (this === this.trip?.lastTripPoint) this.trip.changeCurrentEndPlace(v);
      else this.trpptPlace = v;
    }

    get originalPlaceId() {
      return this.trpptInternalOriginalPlaceId;
    }

    set originalPlaceId(v: string) {
      if (this === this.trip?.firstTripPoint) this.trip.changeOriginalStartPlace(v);
      else if (this === this.trip?.lastTripPoint) this.trip.changeOriginalEndPlace(v);
      else this.trpptInternalOriginalPlaceId = v;
    }
  }

  TripPoint.hastusKeywords = ["trip_point"];
  TripPoint.hastusObject = "trip_point";

  TripPoint.allChildClasses = getAllChildClasses(childClasses);

  return TripPoint;
}

export default TripPointClassFactory;
