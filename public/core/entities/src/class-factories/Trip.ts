import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { Trip as BimoTrip } from "../base-types/rawIndex";
export { Trip as BimoTrip } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import timeAndDate from "@bimo/core-utils-time-and-date";
import { BimoContext } from "@bimo/core-global-types";

import {
  hastusExtendedHoursToDuration,
  durationToHastusExtendedHoursString,
} from "@bimo/core-utils-time-and-date";

import { ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoTripTpsCollection } from "./TripTpsCollection";
import { BimoTripPointsCollection } from "./TripPointsCollection";
import { BimoTripPoint, TripPointProps } from "./TripPoint";
import { BimoTripvehgrpspecsCollection } from "./TripvehgrpspecsCollection";
import { TripOrVariantTypeEnum } from "./TripOrVariant";
import {
  BlockActivityItem,
  computeSetOfBlockActivitiesHelper,
  getSingleBlockActivityHelper,
} from "./BlockActivityItem";
import { BimoBlockActivity } from "./BlockActivity";
import { BimoTripsCollection } from "./TripsCollection";
import { BimoVehicleSchedule } from "./VehicleSchedule";
import { BimoPlace } from "./Place";

export type TripType = "0" | "3";

export interface TripProps extends ExtendedItemProps {
  bimoId: string | null;
  trpNumber?: string;
  trpIsProtected?: string;
  trpRoute?: string;
  trpViaVariant?: string;
  trpType?: TripType;
  trpDirection?: string;
  trpPlaceStart?: string;
  trpPlaceEnd?: string;
  trpOriginalStartPlace?: string;
  trpOriginalEndPlace?: string;
  trpOriginalBuildSpecPlace?: string;
  trpTimeStart?: string;
  trpTimeEnd?: string;
  trpStartLayUser?: string;
  trpEndLayUser?: string;
  trpInternalDistance: string | null;
  trpDistance: string | null;
  trpCreator?: string;
  trpNote?: string;
  trpSecondNote?: string;
  trpIsPublic?: string;
  trpShftMaxEarlier?: string;
  trpShftMaxLater?: string;
  trpInternalShftMaxEarlier?: string;
  trpInternalShftMaxLater?: string;
  trpIsSpecial?: string;
  trpAvailForTravel?: string;
  trpOperatesSun?: string;
  trpOperatesMon?: string;
  trpOperatesTue?: string;
  trpOperatesWed?: string;
  trpOperatesThu?: string;
  trpOperatesFri?: string;
  trpOperatesSat?: string;
  trpEventForOir?: string;
  trpEventStatusForOir?: string;
  trpGarage?: string;
  trpPattern?: string;
  trpVehicleDisplay?: string;
  trpBuildAt?: string;
  trpBuildSpecPlace?: string;
  trpBuildTime?: string;
  trpBlockingGarage?: string;
  trpRunTimePattern?: string;
  trpOriginalNumber?: string;
  trpIntNumber: string | null;
  trpAreVehGroupSpecsFromVehcv?: string;
  trpAreVehSpecCstrFromVehcv?: string;
  trpRecommendedVehGroup?: string;
  trpConsiderLoadAtStart?: string;
  trpConsiderLoadAtEnd?: string;
  BlockNo?: string;
  trpBesoinVf?: string;
  tripTps?: BimoTripTpsCollection;
  tripPoints?: BimoTripPointsCollection;
  tripvehgrpspecs?: BimoTripvehgrpspecsCollection;
}

export function TripClassFactory({
  TripTpsCollection,
  TripPointsCollection,
  TripvehgrpspecsCollection,
  TripOrVariant,
}: EntityConstructorByEntityClassKey): typeof BimoTrip {
  const childClasses: (typeof Entity)[] = [
    TripTpsCollection,
    TripPointsCollection,
    TripvehgrpspecsCollection,
  ];

  const INTERNAL_DISTANCE_FACTOR = 10000;

  class Trip
    extends TripOrVariant<Trip, TripProps, BimoTripPoint, TripPointProps>
    implements BlockActivityItem<Trip>
  {
    _bimoId: string | null;
    trpNumber: string = "";
    trpIsProtected?: string;
    trpRoute?: string;
    trpViaVariant?: string;
    trpType: TripType = "0";
    trpDirection?: string;
    _trpPlaceStart: string;
    _trpPlaceEnd: string;
    _trpOriginalStartPlace: string;
    _trpOriginalEndPlace: string;
    trpOriginalBuildSpecPlace?: string;
    trpTimeStart: string;
    trpTimeEnd: string;
    trpStartLayUser?: string;
    trpEndLayUser?: string;
    trpInternalDistance: string | null;
    trpCreator?: string;
    trpNote?: string;
    trpSecondNote?: string;
    _trpIsPublic?: string;
    trpShftMaxEarlier?: string;
    trpShftMaxLater?: string;
    trpInternalShftMaxEarlier?: string;
    trpInternalShftMaxLater?: string;
    trpIsSpecial?: string;
    trpAvailForTravel?: string;
    trpOperatesSun?: string;
    trpOperatesMon?: string;
    trpOperatesTue?: string;
    trpOperatesWed?: string;
    trpOperatesThu?: string;
    trpOperatesFri?: string;
    trpOperatesSat?: string;
    trpEventForOir?: string;
    trpEventStatusForOir?: string;
    trpGarage?: string;
    trpPattern?: string;
    trpVehicleDisplay?: string;
    trpBuildAt?: string;
    trpBuildSpecPlace?: string;
    trpBuildTime?: string;
    trpBlockingGarage?: string;
    trpRunTimePattern?: string;
    trpOriginalNumber?: string;
    _trpIntNumber: string | null;
    trpAreVehGroupSpecsFromVehcv?: string;
    trpAreVehSpecCstrFromVehcv?: string;
    trpRecommendedVehGroup?: string;
    trpConsiderLoadAtStart?: string;
    trpConsiderLoadAtEnd?: string;
    BlockNo?: string;
    tripTps: BimoTripTpsCollection;
    tripPoints: BimoTripPointsCollection;
    tripvehgrpspecs: BimoTripvehgrpspecsCollection;
    declare parent?: BimoTripsCollection;
    _status: string;
    _links: { [linkType: string]: any } = {};
    static itemIdPropName = "trpIntNumber";
    static blkActIdPropName = "blkactTripNo";
    constructor(
      props: TripProps,
      context: BimoContext,
      tripOrVariantType: TripOrVariantTypeEnum = "trip"
    ) {
      super(props, context, tripOrVariantType);
      this._bimoId = gavpfp("bimoId", props);
      this.trpNumber = gavpfp("trpNumber", props);
      this.trpIsProtected = gavpfp("trpIsProtected", props, `string`, `1`);
      this.trpRoute = gavpfp("trpRoute", props, `string`, "TEMP");
      this.trpViaVariant = gavpfp("trpViaVariant", props);
      /** 0=In-service, 3=Out of service */
      this.trpType = gavpfp("trpType", props, "string", "0");
      this.trpDirection = gavpfp("trpDirection", props);
      this._trpPlaceStart = gavpfp("trpPlaceStart", props, "string", "", {
        altPropName: "_trpPlaceStart",
      });
      this._trpPlaceEnd = gavpfp("trpPlaceEnd", props, "string", "", {
        altPropName: "_trpPlaceEnd",
      });
      this._trpOriginalStartPlace = gavpfp("trpOriginalStartPlace", props, "string", "", {
        altPropName: "_trpOriginalStartPlace",
      });
      this._trpOriginalEndPlace = gavpfp("trpOriginalEndPlace", props, "string", "", {
        altPropName: "_trpOriginalEndPlace",
      });
      this.trpOriginalBuildSpecPlace = gavpfp("trpOriginalBuildSpecPlace", props);
      this.trpTimeStart = gavpfp("trpTimeStart", props);
      this.trpTimeEnd = gavpfp("trpTimeEnd", props);
      this.trpStartLayUser = gavpfp("trpStartLayUser", props);
      this.trpEndLayUser = gavpfp("trpEndLayUser", props);

      /** en décimètres */
      this.trpInternalDistance = gavpfp("trpInternalDistance", props);
      this.trpDistance = gavpfp("trpDistance", props) ?? this.trpDistance;
      this.trpCreator = gavpfp("trpCreator", props, `string`, `1`);
      this.trpNote = gavpfp("trpNote", props);
      this.trpSecondNote = gavpfp("trpSecondNote", props);
      this._trpIsPublic = gavpfp("trpIsPublic", props);
      this.trpShftMaxEarlier = gavpfp("trpShftMaxEarlier", props, `string`, `0h00`);
      this.trpShftMaxLater = gavpfp("trpShftMaxLater", props, `string`, `0h00`);
      this.trpInternalShftMaxEarlier = gavpfp(
        "trpShftMaxEarlier",
        props,
        `string`,
        `0h00`
      );
      this.trpInternalShftMaxLater = gavpfp("trpShftMaxLater", props, `string`, `0h00`);
      this.trpIsSpecial = gavpfp("trpIsSpecial", props, `string`, `0`);
      this.trpAvailForTravel = gavpfp("trpAvailForTravel", props, `string`, `1`);
      this.trpOperatesSun = gavpfp("trpOperatesSun", props, `string`, `1`);
      this.trpOperatesMon = gavpfp("trpOperatesMon", props, `string`, `0`);
      this.trpOperatesTue = gavpfp("trpOperatesTue", props, `string`, `0`);
      this.trpOperatesWed = gavpfp("trpOperatesWed", props, `string`, `0`);
      this.trpOperatesThu = gavpfp("trpOperatesThu", props, `string`, `0`);
      this.trpOperatesFri = gavpfp("trpOperatesFri", props, `string`, `0`);
      this.trpOperatesSat = gavpfp("trpOperatesSat", props, `string`, `0`);
      this.trpEventForOir = gavpfp("trpEventForOir", props);
      this.trpEventStatusForOir = gavpfp("trpEventStatusForOir", props);
      this.trpGarage = gavpfp("trpGarage", props);
      this.trpPattern = gavpfp("trpPattern", props);
      this.trpVehicleDisplay = gavpfp("trpVehicleDisplay", props);
      this.trpBuildAt = gavpfp("trpBuildAt", props, `string`, `0`);
      this.trpBuildSpecPlace = gavpfp("trpBuildSpecPlace", props);
      this.trpBuildTime = gavpfp("trpBuildTime", props);
      this.trpBlockingGarage = gavpfp("trpBlockingGarage", props);
      this.trpRunTimePattern = gavpfp("trpRunTimePattern", props);
      this.trpOriginalNumber = gavpfp("trpOriginalNumber", props);
      this._trpIntNumber = gavpfp("trpIntNumber", props);
      this.trpAreVehGroupSpecsFromVehcv = gavpfp(
        "trpAreVehGroupSpecsFromVehcv",
        props,
        `string`,
        `1`
      );
      this.trpAreVehSpecCstrFromVehcv = gavpfp(
        "trpAreVehSpecCstrFromVehcv",
        props,
        `string`,
        `1`
      );
      this.trpRecommendedVehGroup = gavpfp("trpRecommendedVehGroup", props);
      this.trpConsiderLoadAtStart = gavpfp(
        "trpConsiderLoadAtStart",
        props,
        `string`,
        `0`
      );
      this.trpConsiderLoadAtEnd = gavpfp("trpConsiderLoadAtEnd", props, `string`, `0`);
      this.BlockNo = undefined; // Échanges par mail avec Mathieu M et Isabel L: il ne sert à rien, et il bug.

      /* Children */
      /** @type {TripTpsCollection} */ this.tripTps = gavpfp(
        "trip_tp",
        props,
        TripTpsCollection,
        new TripTpsCollection(),
        { altPropName: "trip_tp", parent: this }
      );
      /** @type {TripPointsCollection} */ this.tripPoints = gavpfp(
        "tripPoints",
        props,
        TripPointsCollection,
        new TripPointsCollection(),
        { altPropName: "trip_point", parent: this }
      );
      /** @type {TripvehgrpspecsCollection} */ this.tripvehgrpspecs = gavpfp(
        "tripvehgrpspecs",
        props,
        TripvehgrpspecsCollection,
        new TripvehgrpspecsCollection(),
        { altPropName: "tripvehgrpspec", parent: this }
      );
    }

    /** en km */
    get trpDistance(): string | null {
      if (!this.trpInternalDistance) return null;
      const valueAsNumber = parseFloat(this.trpInternalDistance);
      return Number.isNaN(valueAsNumber)
        ? null
        : (valueAsNumber / INTERNAL_DISTANCE_FACTOR).toFixed(4);
    }

    /** en km */
    set trpDistance(v: string | number | null) {
      const valueAsNumberOrNull = typeof v === "string" ? parseFloat(v) : v;
      this.trpInternalDistance =
        valueAsNumberOrNull === null || Number.isNaN(valueAsNumberOrNull)
          ? null
          : (valueAsNumberOrNull * INTERNAL_DISTANCE_FACTOR).toFixed(0);
    }

    get trpPlaceStart() {
      return this._trpPlaceStart;
    }

    get trpPlaceEnd() {
      return this._trpPlaceEnd;
    }

    set trpPlaceStart(v) {
      this.changeCurrentStartPlace(v);
    }

    set trpPlaceEnd(v) {
      this.changeCurrentEndPlace(v);
    }

    get trpOriginalStartPlace() {
      return this._trpOriginalStartPlace;
    }

    get trpOriginalEndPlace() {
      return this._trpOriginalEndPlace;
    }

    set trpOriginalStartPlace(v: string) {
      this.changeOriginalStartPlace(v);
    }

    set trpOriginalEndPlace(v: string) {
      this.changeOriginalEndPlace(v);
    }

    get trpIntNumber() {
      return this._trpIntNumber || this._bimoId || null;
    }

    get productive() {
      return this.trpType === "0" ? "1" : "0";
    }

    set trpIntNumber(v: string | null) {
      if (this.parent && this.parent.invalidateItemByBusinessId) {
        this.parent.invalidateItemByBusinessId();
      }
      this._trpIntNumber = v;
    }

    get trpIsPublic() {
      return this._trpIsPublic ?? (this.trpType === "0" ? "1" : "0");
    }

    set trpIsPublic(v) {
      this._trpIsPublic = v;
    }

    get bimoId() {
      return this._bimoId || this._trpIntNumber;
    }

    set bimoId(v: string | null) {
      if (this.parent && this.parent.invalidateItemById) {
        this.parent.invalidateItemById();
      }
      this._bimoId = v;
    }

    /**
     * For trip, we should override this and make it handle more complex cases
     * For example, a trip from a "weekday" schedule
     * could be used in many different blocking schedules: a monday, a tuesday, ...
     * We currently only support:
     *  - cases where some other method explicitly sets the blockActivity on a trip
     *  - cases where the trip and the block are in the same vsc (blocking and scheduling)
    get blockActivity() {}
    set blockActivity(v) {}
     */

    get blkactVehicleActivityTypeNo() {
      return activityTypeNoByTripType[this.trpType];
    }

    slice(start: any, end: any) {
      this.tripPoints.items = this.tripPoints.items.slice(start, end);
    }

    setStartAndEndAttributesFromPoints() {
      this.trpPlaceStart = this.firstTripPoint.trpptPlace;
      this.trpOriginalStartPlace = this.trpPlaceStart;
      this.trpPlaceEnd = this.lastTripPoint.trpptPlace;
      this.trpOriginalEndPlace = this.trpPlaceEnd;
      this.trpTimeStart = this.firstTripPoint.trpptInternalDepartureTime;
      this.trpTimeEnd = this.lastTripPoint.trpptInternalArrivalTime;
    }

    removeLoadTimeAtStartAndEnd() {
      this.firstTripPoint.trpptInternalAllowLoadTime = "0";
      this.firstTripPoint.trpptInternalOriginalAllowLoadTime = "0";
      this.firstTripPoint.trpptInternalArrivalTime =
        this.firstTripPoint.trpptInternalDepartureTime;
      this.lastTripPoint.trpptInternalAllowLoadTime = "0";
      this.lastTripPoint.trpptInternalOriginalAllowLoadTime = "0";
      this.lastTripPoint.trpptInternalDepartureTime =
        this.lastTripPoint.trpptInternalArrivalTime;
      this.setStartAndEndAttributesFromPoints();
    }

    moveToVehicleSchedule(targetVehicleSchedule: BimoVehicleSchedule) {
      if (this.parent) this.parent.remove(this);
      targetVehicleSchedule.addTrip(this);
    }

    delete() {
      this.parent?.remove(this);
      Object.keys(this).forEach((key) => {
        // @ts-ignore
        delete this[key];
      });
      this._status = `deleted`;
    }

    /** Creates a new instance of a trip. All trips points are new instances too. BimoId is set to undefined */
    copy(newInternalNumber?: string) {
      const copiedTripPoints = this.tripPoints.map((tripPoint) => tripPoint.copy());
      const props: TripProps = {
        ...this,
        tripPoints: copiedTripPoints,
        trpIntNumber: newInternalNumber,
        parent: undefined,
        bimoId: undefined,
      };

      /**
       * Make sure the copy is created using the same constructor  as this instance, which is not necessarily
       * the plain Trip constructor
       */
      // @ts-ignore
      const copiedTrip = new this.constructor(
        props,
        this.context,
        this.tripOrVariantType
      );
      copiedTrip._links.copiedFrom = this;
      return copiedTrip;
    }

    /** key of the form '${trpRoute}|${trpViaVariant}' or null if either is null    */
    get routeAndVariantKey() {
      if (!this.trpRoute || !this.trpViaVariant) return null;
      return `${this.trpRoute}|${this.trpViaVariant}`;
    }

    get shortLoggingOutput() {
      return `${this.trpNumber}-(${this.trpPlaceStart}|${this.trpTimeStart} → ${this.trpTimeEnd}|${this.trpPlaceEnd})`;
    }

    get mediumLoggingOutput() {
      return (
        `${this.trpType}-${this.trpNumber}-${this.trpRoute}-${this.trpViaVariant}-${this.trpDirection}` +
        `(${this.trpPlaceStart}|${this.trpTimeStart} → ${this.trpTimeEnd}|${this.trpPlaceEnd})[${this.tripPoints.length}]`
      );
    }

    get longLoggingOutput() {
      return `${this.mediumLoggingOutput} ${this.tripPoints.mediumLoggingOutput}`;
    }

    get veryLongLoggingOutput() {
      return `${this.mediumLoggingOutput}\n${this.tripPoints.longLoggingOutput}`;
    }

    /** the first 3 digits of the trip number */
    get trancheNum() {
      return this.trpNumber.slice(0, 3);
    }

    get firstTripPoint() {
      return this.tripPoints.items[0];
    }

    get lastTripPoint() {
      return this.tripPoints.items[this.tripPoints.items.length - 1];
    }

    get firstTripTimingPoint() {
      return this.tripTps.items[0];
    }

    get lastTripTimingPoint() {
      return this.tripTps.items[this.tripTps.items.length - 1];
    }

    get durationInSeconds() {
      return timeAndDate.getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings(
        this.trpTimeStart,
        this.trpTimeEnd
      );
    }

    validateTripPointTimes() {
      this.tripPoints.forEach((tripPoint, index) => {
        try {
          if (index > 0) {
            const previousTripPoint = this.tripPoints.items[index - 1];
            if (
              previousTripPoint.getTimeAsDuration(`departure`, false) >
              tripPoint.getTimeAsDuration("arrival", false)
            ) {
              throw new Error(
                `Arrivée avant le départ du précédent (${previousTripPoint.shortLoggingOutput})`
              );
            }
          }
          if (!tripPoint.timesAreValid()) throw new Error(`Départ avant l'arrivée`);
        } catch (error) {
          throw new Error(
            `Problème avec ${tripPoint.shortLoggingOutput}: ${error.message}`
          );
        }
      });
    }

    getTimeDiffInSecondsBetweenTripPointIndexes(
      indexOfFirst: number,
      indexOfSecond: number
    ) {
      const firstAsDuration = this.tripPoints.items[indexOfFirst].getTimeAsDuration(
        `departure`,
        true
      );
      const secondAsDuration = this.tripPoints.items[indexOfSecond].getTimeAsDuration(
        `arrival`,
        true
      );
      return secondAsDuration.minus(firstAsDuration).as("second");
    }

    changeCurrentStartPlace(newStartPlace: BimoPlace | string) {
      const placeIdentifier = getPlaceIdFromPlaceOrString(newStartPlace);
      this._trpPlaceStart = placeIdentifier;
      if (this.firstTripPoint) this.firstTripPoint.trpptPlace = placeIdentifier;
      if (this.firstTripTimingPoint) this.firstTripTimingPoint.ttpPlace = placeIdentifier;
    }

    changeOriginalStartPlace(newStartPlace: BimoPlace | string) {
      const placeIdentifier = getPlaceIdFromPlaceOrString(newStartPlace);
      this._trpOriginalStartPlace = placeIdentifier;
      if (this.firstTripPoint)
        this.firstTripPoint.trpptInternalOriginalPlaceId = placeIdentifier;
    }

    changeStartPlace(newStartPlace: BimoPlace | string) {
      this.changeCurrentStartPlace(newStartPlace);
      this.changeOriginalStartPlace(newStartPlace);
    }

    changeCurrentEndPlace(newEndPlace: BimoPlace | string) {
      const placeIdentifier = getPlaceIdFromPlaceOrString(newEndPlace);
      this._trpPlaceEnd = placeIdentifier;
      if (this.lastTripPoint) this.lastTripPoint.trpptPlace = placeIdentifier;
      if (this.lastTripTimingPoint) this.lastTripTimingPoint.ttpPlace = placeIdentifier;
    }

    changeOriginalEndPlace(newEndPlace: BimoPlace | string) {
      const placeIdentifier = getPlaceIdFromPlaceOrString(newEndPlace);
      this._trpOriginalEndPlace = placeIdentifier;
      if (this.lastTripPoint)
        this.lastTripPoint.trpptInternalOriginalPlaceId = placeIdentifier;
    }

    changeEndPlace(newEndPlace: BimoPlace | string) {
      this.changeCurrentEndPlace(newEndPlace);
      this.changeOriginalEndPlace(newEndPlace);
    }

    improveStartPlacePrecision(morePreciseStartPlace: BimoPlace | string) {
      this.changeStartPlace(morePreciseStartPlace);
    }

    improveEndPlacePrecision(morePreciseEndPlace: BimoPlace | string) {
      this.changeEndPlace(morePreciseEndPlace);
    }

    get setOfBlockActivities() {
      return computeSetOfBlockActivitiesHelper<Trip>(this);
    }

    get blockActivities(): BimoBlockActivity[] {
      const setOfBlockActivities = this.setOfBlockActivities;
      return setOfBlockActivities && Array.from(setOfBlockActivities);
    }

    addBlockActivity(newBlockActivity: BimoBlockActivity) {
      this.setOfBlockActivities.add(newBlockActivity);
    }

    removeBlockActivity(blockActivity: BimoBlockActivity) {
      this.setOfBlockActivities.delete(blockActivity);
    }

    get blockActivity(): BimoBlockActivity {
      return getSingleBlockActivityHelper<Trip>(this);
    }

    get block() {
      return this.blockActivity?.block ?? null;
    }

    get vehicleTasks() {
      return this.blockActivity?.vehicleTasks ?? null;
    }

    get vehicleSchedule() {
      return (this.parent?.parent as BimoVehicleSchedule) ?? null;
    }

    get startTime() {
      return this.trpTimeStart;
    }

    get startTimeAsDuration() {
      return this._getAndSetCachedValue("startTimeAsDuration", () =>
        hastusExtendedHoursToDuration(this.startTime)
      );
    }

    get endTime() {
      return this.trpTimeEnd;
    }

    get endTimeAsDuration() {
      return this._getAndSetCachedValue("endTimeAsDuration", () =>
        hastusExtendedHoursToDuration(this.endTime)
      );
    }

    get startPlaceId() {
      return this.trpPlaceStart;
    }

    get endPlaceId() {
      return this.trpPlaceEnd;
    }

    shiftTimes(shiftInSeconds: number) {
      // TODO: also shift trip points and timing points
      this.trpTimeStart = durationToHastusExtendedHoursString(
        this.startTimeAsDuration.plus({ second: shiftInSeconds })
      );
      this.trpTimeEnd = durationToHastusExtendedHoursString(
        this.endTimeAsDuration.plus({ second: shiftInSeconds })
      );
      this._nullifyCachedValue("startTimeAsDuration");
      this._nullifyCachedValue("endTimeAsDuration");
    }
  }

  Trip.hastusKeywords = ["trip"];
  Trip.hastusObject = "trip";
  Trip.allChildClasses = getAllChildClasses(childClasses);

  return Trip;
}

function getPlaceIdFromPlaceOrString(placeOrString: BimoPlace | string) {
  return typeof placeOrString === `string` ? placeOrString : placeOrString.plcIdentifier;
}

const activityTypeNoByTripType: { [tripType in TripType]: string } = {
  "0": "6",
  "3": "2",
};

export default TripClassFactory;
