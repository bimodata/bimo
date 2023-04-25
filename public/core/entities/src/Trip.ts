import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import timeAndDate from '@bimo/core-utils-time-and-date';


import { TripTpsCollection, TripTpsCollectionProps } from "./TripTpsCollection";
import { TripPointsCollection, TripPointsCollectionProps } from "./TripPointsCollection";
// eslint-disable-next-line no-unused-vars
import { TripPoint, TripPointProps } from "./TripPoint";
import { TripTp, TripTpProps } from "./TripTp";
import { TripvehgrpspecsCollection, TripvehgrpspecsCollectionProps } from "./TripvehgrpspecsCollection";
import { TripOrVariant, TripOrVariantProps } from "./TripOrVariant";
import { BlockActivityItem, BlockActivityItemProps } from "./BlockActivityItem";

const childClasses = [TripTpsCollection, TripPointsCollection, TripvehgrpspecsCollection];

const INTERNAL_DISTANCE_FACTOR = 10000;



export interface TripProps extends ExtendedItemProps {
  _bimoId?: string;
  trpNumber?: string;
  trpIsProtected?: string;
  trpRoute?: string;
  trpViaVariant?: string;
  trpType?: string;
  trpDirection?: string;
  _trpPlaceStart?: string;
  _trpPlaceEnd?: string;
  _trpOriginalStartPlace?: string;
  _trpOriginalEndPlace?: string;
  trpOriginalBuildSpecPlace?: string;
  trpTimeStart?: string;
  trpTimeEnd?: string;
  trpStartLayUser?: string;
  trpEndLayUser?: string;
  trpInternalDistance?: string;
  trpDistance?: string;
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
  _trpIntNumber?: string;
  trpAreVehGroupSpecsFromVehcv?: string;
  trpAreVehSpecCstrFromVehcv?: string;
  trpRecommendedVehGroup?: string;
  trpConsiderLoadAtStart?: string;
  trpConsiderLoadAtEnd?: string;
  BlockNo?: string;
  trpNatureMouvementTechnique?: string;
  trpUniteHoraireCouverture?: string;
  trpTrainEas?: string;
  trpCommentaireVoySncfDi?: string;
  trpNumDeCourseSubstituee?: string;
  trpNumOperation?: string;
  trpACouvrirMr?: string;
  trpCodeTct?: string;
  trpEnginDeCalcul?: string;
  trpMaterielRemorque?: string;
  trpNumeroSecondaire?: string;
  trpProfilDeVitesse?: string;
  trpPrecoAo?: string;
  trpEstEnSnu?: string;
  trpOpReleve?: string;
  trpNePasCommanderSillon?: string;
  trpBesoinVf?: string;
  tripTps?: string;
  tripPoints?: string;
  tripvehgrpspecs?: string;
  _links?: string;
}

export class Trip extends BlockActivityItem(
  TripOrVariant, {
  blkActIdPropName: 'blkactTripNo',
  itemIdPropName: 'trpIntNumber',
  startTimePropName: 'trpTimeStart',
  endTimePropName: 'trpTimeEnd',
  startPlacePropName: 'trpPlaceStart',
  endPlacePropName: 'trpPlaceEnd',
},
) {
  /**
   *
   * @param {Trip} props
   */
  _bimoId?: string;
  trpNumber?: string;
  trpIsProtected?: string;
  trpRoute?: string;
  trpViaVariant?: string;
  trpType?: string;
  trpDirection?: string;
  _trpPlaceStart?: string;
  _trpPlaceEnd?: string;
  _trpOriginalStartPlace?: string;
  _trpOriginalEndPlace?: string;
  trpOriginalBuildSpecPlace?: string;
  trpTimeStart?: string;
  trpTimeEnd?: string;
  trpStartLayUser?: string;
  trpEndLayUser?: string;
  trpInternalDistance?: string;
  trpDistance?: string;
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
  _trpIntNumber?: string;
  trpAreVehGroupSpecsFromVehcv?: string;
  trpAreVehSpecCstrFromVehcv?: string;
  trpRecommendedVehGroup?: string;
  trpConsiderLoadAtStart?: string;
  trpConsiderLoadAtEnd?: string;
  BlockNo?: string;
  trpNatureMouvementTechnique?: string;
  trpUniteHoraireCouverture?: string;
  trpTrainEas?: string;
  trpCommentaireVoySncfDi?: string;
  trpNumDeCourseSubstituee?: string;
  trpNumOperation?: string;
  trpACouvrirMr?: string;
  trpCodeTct?: string;
  trpEnginDeCalcul?: string;
  trpMaterielRemorque?: string;
  trpNumeroSecondaire?: string;
  trpProfilDeVitesse?: string;
  trpPrecoAo?: string;
  trpEstEnSnu?: string;
  trpOpReleve?: string;
  trpNePasCommanderSillon?: string;
  trpBesoinVf?: string;
  tripTps?: string;
  tripPoints?: string;
  tripvehgrpspecs?: string;
  _links?: string;
  constructor(props, tripOrVariantType = 'trip') {
    super(props, tripOrVariantType);
    this._bimoId = gavpfp('bimoId', props);
    this.trpNumber = gavpfp('trpNumber', props);
    this.trpIsProtected = gavpfp('trpIsProtected', props, `string`, `1`);
    this.trpRoute = gavpfp('trpRoute', props, `string`, 'TEMP');
    this.trpViaVariant = gavpfp('trpViaVariant', props);
    /** 0=In-service, 3=Out of service */
    this.trpType = gavpfp('trpType', props, 'string', '0');
    this.trpDirection = gavpfp('trpDirection', props);
    this._trpPlaceStart = gavpfp('trpPlaceStart', props, 'string', '', { altPropName: '_trpPlaceStart' });
    this._trpPlaceEnd = gavpfp('trpPlaceEnd', props, 'string', '', { altPropName: '_trpPlaceEnd' });
    this._trpOriginalStartPlace = gavpfp(
      'trpOriginalStartPlace', props, 'string', '', { altPropName: '_trpOriginalStartPlace' },
    );
    this._trpOriginalEndPlace = gavpfp(
      'trpOriginalEndPlace', props, 'string', '', { altPropName: '_trpOriginalEndPlace' },
    );
    this.trpOriginalBuildSpecPlace = gavpfp('trpOriginalBuildSpecPlace', props);
    this.trpTimeStart = gavpfp('trpTimeStart', props);
    this.trpTimeEnd = gavpfp('trpTimeEnd', props);
    this.trpStartLayUser = gavpfp('trpStartLayUser', props);
    this.trpEndLayUser = gavpfp('trpEndLayUser', props);

    /** en décimètres */
    this.trpInternalDistance = gavpfp('trpInternalDistance', props);
    this.trpDistance = gavpfp('trpDistance', props) ?? this.trpDistance;
    this.trpCreator = gavpfp('trpCreator', props, `string`, `1`);
    this.trpNote = gavpfp('trpNote', props);
    this.trpSecondNote = gavpfp('trpSecondNote', props);
    this._trpIsPublic = gavpfp('trpIsPublic', props);
    this.trpShftMaxEarlier = gavpfp('trpShftMaxEarlier', props, `string`, `0h00`);
    this.trpShftMaxLater = gavpfp('trpShftMaxLater', props, `string`, `0h00`);
    this.trpInternalShftMaxEarlier = gavpfp('trpShftMaxEarlier', props, `string`, `0h00`);
    this.trpInternalShftMaxLater = gavpfp('trpShftMaxLater', props, `string`, `0h00`);
    this.trpIsSpecial = gavpfp('trpIsSpecial', props, `string`, `0`);
    this.trpAvailForTravel = gavpfp('trpAvailForTravel', props, `string`, `1`);
    this.trpOperatesSun = gavpfp('trpOperatesSun', props, `string`, `1`);
    this.trpOperatesMon = gavpfp('trpOperatesMon', props, `string`, `0`);
    this.trpOperatesTue = gavpfp('trpOperatesTue', props, `string`, `0`);
    this.trpOperatesWed = gavpfp('trpOperatesWed', props, `string`, `0`);
    this.trpOperatesThu = gavpfp('trpOperatesThu', props, `string`, `0`);
    this.trpOperatesFri = gavpfp('trpOperatesFri', props, `string`, `0`);
    this.trpOperatesSat = gavpfp('trpOperatesSat', props, `string`, `0`);
    this.trpEventForOir = gavpfp('trpEventForOir', props);
    this.trpEventStatusForOir = gavpfp('trpEventStatusForOir', props);
    this.trpGarage = gavpfp('trpGarage', props);
    this.trpPattern = gavpfp('trpPattern', props);
    this.trpVehicleDisplay = gavpfp('trpVehicleDisplay', props);
    this.trpBuildAt = gavpfp('trpBuildAt', props, `string`, `0`);
    this.trpBuildSpecPlace = gavpfp('trpBuildSpecPlace', props);
    this.trpBuildTime = gavpfp('trpBuildTime', props);
    this.trpBlockingGarage = gavpfp('trpBlockingGarage', props);
    this.trpRunTimePattern = gavpfp('trpRunTimePattern', props);
    this.trpOriginalNumber = gavpfp('trpOriginalNumber', props);
    this._trpIntNumber = gavpfp('trpIntNumber', props);
    this.trpAreVehGroupSpecsFromVehcv = gavpfp('trpAreVehGroupSpecsFromVehcv', props, `string`, `1`);
    this.trpAreVehSpecCstrFromVehcv = gavpfp('trpAreVehSpecCstrFromVehcv', props, `string`, `1`);
    this.trpRecommendedVehGroup = gavpfp('trpRecommendedVehGroup', props);
    this.trpConsiderLoadAtStart = gavpfp('trpConsiderLoadAtStart', props, `string`, `0`);
    this.trpConsiderLoadAtEnd = gavpfp('trpConsiderLoadAtEnd', props, `string`, `0`);
    this.BlockNo = undefined; // Échanges par mail avec Mathieu M et Isabel L: il ne sert à rien, et il bug.

    // site-spec oscar, à déplacer vers une nouvelle classe "OscarTrip"
    this.trpNatureMouvementTechnique = gavpfp('trpNatureMouvementTechnique', props);
    this.trpUniteHoraireCouverture = gavpfp('trpUniteHoraireCouverture', props);
    this.trpTrainEas = gavpfp('trpTrainEas', props, `string`, `0`);
    this.trpCommentaireVoySncfDi = gavpfp('trpCommentaireVoySncfDi', props, `string`, ``);

    // site-spec orion, à déplacer vers une nouvelle classe "OrionTrip"
    this.trpNumDeCourseSubstituee = gavpfp('trpNumDeourseSubstituee', props);
    this.trpNumOperation = gavpfp('trpNumOperation', props);
    this.trpACouvrirMr = gavpfp('trpACouvrirMr', props);
    this.trpCodeTct = gavpfp('trpCodeTct', props);
    this.trpEnginDeCalcul = gavpfp('trpEnginDeCalcul', props);
    this.trpMaterielRemorque = gavpfp('trpMaterielRemorque', props);
    this.trpNumeroSecondaire = gavpfp('trpNumeroSecondaire', props);
    this.trpProfilDeVitesse = gavpfp('trpProfilDeVitesse', props);
    this.trpPrecoAo = gavpfp('trpPrecoAo', props);
    this.trpEstEnSnu = gavpfp('trpEstEnSnu', props);
    this.trpOpReleve = gavpfp('trpOpReleve', props);
    this.trpNePasCommanderSillon = gavpfp('trpNePasCommanderSillon', props, `string`, `0`);
    this.trpBesoinVf = gavpfp('trpBesoinVf', props, `string`, `0`);

    /* Children */
    /** @type {TripTpsCollection} */ this.tripTps = gavpfp(
      'trip_tp', props, TripTpsCollection, new TripTpsCollection(), { altPropName: 'trip_tp', parent: this },
    );
    /** @type {TripPointsCollection} */ this.tripPoints = gavpfp(
      'tripPoints', props, TripPointsCollection, new TripPointsCollection(), { altPropName: 'trip_point', parent: this },
    );
    /** @type {TripvehgrpspecsCollection} */ this.tripvehgrpspecs = gavpfp(
      'tripvehgrpspecs', props, TripvehgrpspecsCollection, new TripvehgrpspecsCollection(), { altPropName: 'tripvehgrpspec', parent: this },
    );

    this._links = {};
  }

  /** en km */
  get trpDistance() {
    const valueAsNumber = parseFloat(this.trpInternalDistance);
    return Number.isNaN(valueAsNumber) ? null : (valueAsNumber / INTERNAL_DISTANCE_FACTOR).toFixed(4);
  }

  /** en km */
  set trpDistance(v) {
    const valueAsNumber = parseFloat(v);
    this.trpInternalDistance = Number.isNaN(valueAsNumber) ? null : (valueAsNumber * INTERNAL_DISTANCE_FACTOR).toFixed(0);
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

  set trpOriginalStartPlace(v) {
    this.changeOriginalStartPlace(v);
  }

  set trpOriginalEndPlace(v) {
    this.changeOriginalEndPlace(v);
  }

  get trpIntNumber() {
    return this._trpIntNumber || this._bimoId || null;
  }

  get productive() {
    return (this.trpType === '0') ? '1' : '0';
  }

  set trpIntNumber(v) {
    if (this.parent && this.parent.invalidateItemByBusinessId) {
      this.parent.invalidateItemByBusinessId();
    }
    this._trpIntNumber = v;
  }

  get trpIsPublic() {
    return this._trpIsPublic ?? ((this.trpType === '0') ? '1' : '0');
  }

  set trpIsPublic(v) {
    this._trpIsPublic = v;
  }

  get bimoId() {
    return this._bimoId || this._trpIntNumber;
  }

  set bimoId(v) {
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

  slice(start, end) {
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
    this.firstTripPoint.trpptInternalAllowLoadTime = '0';
    this.firstTripPoint.trpptInternalOriginalAllowLoadTime = '0';
    this.firstTripPoint.trpptInternalArrivalTime = this.firstTripPoint.trpptInternalDepartureTime;
    this.lastTripPoint.trpptInternalAllowLoadTime = '0';
    this.lastTripPoint.trpptInternalOriginalAllowLoadTime = '0';
    this.lastTripPoint.trpptInternalDepartureTime = this.lastTripPoint.trpptInternalArrivalTime;
    this.setStartAndEndAttributesFromPoints();
  }

  moveToVehicleSchedule(targetVehicleSchedule) {
    if (this.parent) this.parent.remove(this);
    targetVehicleSchedule.addTrip(this);
  }

  delete() {
    this.parent.remove(this);
    Object.keys(this).forEach((key) => {
      delete this[key];
    });
    this._status = `deleted`;
  }

  /**
   * Creates a new instance of a trip. All trips points are new instances too. BimoId is set to undefined
   * @param {string=} newInternalNumber
   * @returns {Trip}
   */
  copy(newInternalNumber) {
    const copiedTripPoints = this.tripPoints.map((tripPoint) => tripPoint.copy());
    const props = { ...this, tripPoints: copiedTripPoints, trpIntNumber: newInternalNumber, parent: undefined, bimoId: undefined };
    const copiedTrip = new Trip(props);
    copiedTrip._links.copiedFrom = this;
    return copiedTrip;
  }

  /** @type {string} key of the form '${trpRoute}|${trpViaVariant}' or null if either is null    */
  get routeAndVariantKey() {
    if (!this.trpRoute || !this.trpViaVariant) return null;
    return `${this.trpRoute}|${this.trpViaVariant}`;
  }

  get shortLoggingOutput() {
    return `${this.trpNumber}-(${this.trpPlaceStart}|${this.trpTimeStart} → ${this.trpTimeEnd}|${this.trpPlaceEnd})`;
  }

  get mediumLoggingOutput() {
    return `${this.trpType}-${this.trpNumber}-${this.trpRoute}-${this.trpViaVariant}-${this.trpDirection}`
      + `(${this.trpPlaceStart}|${this.trpTimeStart} → ${this.trpTimeEnd}|${this.trpPlaceEnd})[${this.tripPoints.length}]`;
  }

  get longLoggingOutput() {
    return `${this.mediumLoggingOutput}\n${this.tripPoints.longLoggingOutput}`;
  }

  /** @type {string} the first 3 digits of the trip number */
  get trancheNum() {
    return this.trpNumber.slice(0, 3);
  }

  /** @type {TripPoint} */
  get firstTripPoint() {
    return this.tripPoints.items[0];
  }

  /** @type {TripPoint} */
  get lastTripPoint() {
    return this.tripPoints.items[this.tripPoints.items.length - 1];
  }

  /** @type {TripTp} */
  get firstTripTimingPoint() {
    return this.tripTps.items[0];
  }

  /** @type {TripTp} */
  get lastTripTimingPoint() {
    return this.tripTps.items[this.tripTps.items.length - 1];
  }

  get durationInSeconds() {
    return timeAndDate.getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings(this.trpTimeStart, this.trpTimeEnd);
  }

  validateTripPointTimes() {
    this.tripPoints.forEach((tripPoint, index) => {
      try {
        if (index > 0) {
          const previousTripPoint = this.tripPoints.items[index - 1];
          if (previousTripPoint.getTimeAsDuration(`departure`, false) > tripPoint.getTimeAsDuration('arrival', false)) {
            throw new Error(`Arrivée avant le départ du précédent (${previousTripPoint.shortLoggingOutput})`);
          }
        }
        if (!tripPoint.tripPointTimesAreValid()) throw new Error(`Départ avant l'arrivée`);
      }
      catch (error) {
        throw new Error(`Problème avec ${tripPoint.shortLoggingOutput}: ${error.message}`);
      }
    });
  }

  getTimeDiffInSecondsBetweenTripPointIndexes(indexOfFirst, indexOfSecond) {
    const firstAsDuration = this.tripPoints.items[indexOfFirst].getTimeAsDuration(`departure`, true);
    const secondAsDuration = this.tripPoints.items[indexOfSecond].getTimeAsDuration(`arrival`, true);
    return secondAsDuration.minus(firstAsDuration).as('second');
  }

  changeCurrentStartPlace(newStartPlace) {
    const placeIdentifier = getPlaceIdFromPlaceOrString(newStartPlace);
    this._trpPlaceStart = placeIdentifier;
    if (this.firstTripPoint) this.firstTripPoint.trpptPlace = placeIdentifier;
    if (this.firstTripTimingPoint) this.firstTripTimingPoint.ttpPlace = placeIdentifier;
  }

  changeOriginalStartPlace(newStartPlace) {
    const placeIdentifier = getPlaceIdFromPlaceOrString(newStartPlace);
    this._trpOriginalStartPlace = placeIdentifier;
    if (this.firstTripPoint) this.firstTripPoint.trpptInternalOriginalPlaceId = placeIdentifier;
  }

  changeStartPlace(newStartPlace) {
    this.changeCurrentStartPlace(newStartPlace);
    this.changeOriginalStartPlace(newStartPlace);
  }

  changeCurrentEndPlace(newEndPlace) {
    const placeIdentifier = getPlaceIdFromPlaceOrString(newEndPlace);
    this._trpPlaceEnd = placeIdentifier;
    if (this.lastTripPoint) this.lastTripPoint.trpptPlace = placeIdentifier;
    if (this.lastTripTimingPoint) this.lastTripTimingPoint.ttpPlace = placeIdentifier;
  }

  changeOriginalEndPlace(newEndPlace) {
    const placeIdentifier = getPlaceIdFromPlaceOrString(newEndPlace);
    this._trpOriginalEndPlace = placeIdentifier;
    if (this.lastTripPoint) this.lastTripPoint.trpptInternalOriginalPlaceId = placeIdentifier;
  }

  changeEndPlace(newEndPlace) {
    this.changeCurrentEndPlace(newEndPlace);
    this.changeOriginalEndPlace(newEndPlace);
  }

  improveStartPlacePrecision(morePreciseStartPlace) {
    this.changeStartPlace(morePreciseStartPlace);
  }

  improveEndPlacePrecision(morePreciseEndPlace) {
    this.changeEndPlace(morePreciseEndPlace);
  }
}

Trip.hastusKeywords = ['trip'];
Trip.hastusObject = 'trip';


Trip.allChildClasses = getAllChildClasses(childClasses);



export default Trip;

function getPlaceIdFromPlaceOrString(placeOrString) {
  return typeof placeOrString === `string` ? placeOrString : placeOrString.plcIdentifier;
}

const activityTypeNoByTripType = {
  0: '6',
  3: '2',
};
