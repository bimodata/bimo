const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const timeAndDate = require('@bimo/core-utils-time-and-date');

/* Linked Classes */
const TripTpsCollection = require('./TripTpsCollection');
const TripPointsCollection = require('./TripPointsCollection');
// eslint-disable-next-line no-unused-vars
const TripPoint = require('./TripPoint');
const TripTp = require('./TripTp');
const TripvehgrpspecsCollection = require('./TripvehgrpspecsCollection');
const TripOrVariant = require('./TripOrVariant');
const BlockActivityItem = require('./BlockActivityItem');

const childClasses = [TripTpsCollection, TripPointsCollection, TripvehgrpspecsCollection];

const INTERNAL_DISTANCE_FACTOR = 10000;

/* Class definition */
/** @extends {TripOrVariant<TripPoint>} */
class Trip extends BlockActivityItem(
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
  constructor(props, tripOrVariantType = 'trip') {
    super(props, tripOrVariantType);
    this._bimoId = getAndValidatePropFromProps('bimoId', props);
    this.trpNumber = getAndValidatePropFromProps('trpNumber', props);
    this.trpIsProtected = getAndValidatePropFromProps('trpIsProtected', props, `string`, `1`);
    this.trpRoute = getAndValidatePropFromProps('trpRoute', props, `string`, 'TEMP');
    this.trpViaVariant = getAndValidatePropFromProps('trpViaVariant', props);
    /** 0=In-service, 3=Out of service */
    this.trpType = getAndValidatePropFromProps('trpType', props, 'string', '0');
    this.trpDirection = getAndValidatePropFromProps('trpDirection', props);
    this._trpPlaceStart = getAndValidatePropFromProps('trpPlaceStart', props, 'string', '', { altPropName: '_trpPlaceStart' });
    this._trpPlaceEnd = getAndValidatePropFromProps('trpPlaceEnd', props, 'string', '', { altPropName: '_trpPlaceEnd' });
    this._trpOriginalStartPlace = getAndValidatePropFromProps(
      'trpOriginalStartPlace', props, 'string', '', { altPropName: '_trpOriginalStartPlace' },
    );
    this._trpOriginalEndPlace = getAndValidatePropFromProps(
      'trpOriginalEndPlace', props, 'string', '', { altPropName: '_trpOriginalEndPlace' },
    );
    this.trpOriginalBuildSpecPlace = getAndValidatePropFromProps('trpOriginalBuildSpecPlace', props);
    this.trpTimeStart = getAndValidatePropFromProps('trpTimeStart', props);
    this.trpTimeEnd = getAndValidatePropFromProps('trpTimeEnd', props);
    this.trpStartLayUser = getAndValidatePropFromProps('trpStartLayUser', props);
    this.trpEndLayUser = getAndValidatePropFromProps('trpEndLayUser', props);

    /** en décimètres */
    this.trpInternalDistance = getAndValidatePropFromProps('trpInternalDistance', props);
    this.trpDistance = getAndValidatePropFromProps('trpDistance', props) ?? this.trpDistance;
    this.trpCreator = getAndValidatePropFromProps('trpCreator', props, `string`, `1`);
    this.trpNote = getAndValidatePropFromProps('trpNote', props);
    this.trpSecondNote = getAndValidatePropFromProps('trpSecondNote', props);
    this._trpIsPublic = getAndValidatePropFromProps('trpIsPublic', props);
    this.trpShftMaxEarlier = getAndValidatePropFromProps('trpShftMaxEarlier', props, `string`, `0h00`);
    this.trpShftMaxLater = getAndValidatePropFromProps('trpShftMaxLater', props, `string`, `0h00`);
    this.trpInternalShftMaxEarlier = getAndValidatePropFromProps('trpShftMaxEarlier', props, `string`, `0h00`);
    this.trpInternalShftMaxLater = getAndValidatePropFromProps('trpShftMaxLater', props, `string`, `0h00`);
    this.trpIsSpecial = getAndValidatePropFromProps('trpIsSpecial', props, `string`, `0`);
    this.trpAvailForTravel = getAndValidatePropFromProps('trpAvailForTravel', props, `string`, `1`);
    this.trpOperatesSun = getAndValidatePropFromProps('trpOperatesSun', props, `string`, `1`);
    this.trpOperatesMon = getAndValidatePropFromProps('trpOperatesMon', props, `string`, `0`);
    this.trpOperatesTue = getAndValidatePropFromProps('trpOperatesTue', props, `string`, `0`);
    this.trpOperatesWed = getAndValidatePropFromProps('trpOperatesWed', props, `string`, `0`);
    this.trpOperatesThu = getAndValidatePropFromProps('trpOperatesThu', props, `string`, `0`);
    this.trpOperatesFri = getAndValidatePropFromProps('trpOperatesFri', props, `string`, `0`);
    this.trpOperatesSat = getAndValidatePropFromProps('trpOperatesSat', props, `string`, `0`);
    this.trpEventForOir = getAndValidatePropFromProps('trpEventForOir', props);
    this.trpEventStatusForOir = getAndValidatePropFromProps('trpEventStatusForOir', props);
    this.trpGarage = getAndValidatePropFromProps('trpGarage', props);
    this.trpPattern = getAndValidatePropFromProps('trpPattern', props);
    this.trpVehicleDisplay = getAndValidatePropFromProps('trpVehicleDisplay', props);
    this.trpBuildAt = getAndValidatePropFromProps('trpBuildAt', props, `string`, `0`);
    this.trpBuildSpecPlace = getAndValidatePropFromProps('trpBuildSpecPlace', props);
    this.trpBuildTime = getAndValidatePropFromProps('trpBuildTime', props);
    this.trpBlockingGarage = getAndValidatePropFromProps('trpBlockingGarage', props);
    this.trpRunTimePattern = getAndValidatePropFromProps('trpRunTimePattern', props);
    this.trpOriginalNumber = getAndValidatePropFromProps('trpOriginalNumber', props);
    this._trpIntNumber = getAndValidatePropFromProps('trpIntNumber', props);
    this.trpAreVehGroupSpecsFromVehcv = getAndValidatePropFromProps('trpAreVehGroupSpecsFromVehcv', props, `string`, `1`);
    this.trpAreVehSpecCstrFromVehcv = getAndValidatePropFromProps('trpAreVehSpecCstrFromVehcv', props, `string`, `1`);
    this.trpRecommendedVehGroup = getAndValidatePropFromProps('trpRecommendedVehGroup', props);
    this.trpConsiderLoadAtStart = getAndValidatePropFromProps('trpConsiderLoadAtStart', props, `string`, `0`);
    this.trpConsiderLoadAtEnd = getAndValidatePropFromProps('trpConsiderLoadAtEnd', props, `string`, `0`);
    this.BlockNo = undefined; // Échanges par mail avec Mathieu M et Isabel L: il ne sert à rien, et il bug.

    // site-spec oscar, à déplacer vers une nouvelle classe "OscarTrip"
    this.trpNatureMouvementTechnique = getAndValidatePropFromProps('trpNatureMouvementTechnique', props);
    this.trpUniteHoraireCouverture = getAndValidatePropFromProps('trpUniteHoraireCouverture', props);
    this.trpTrainEas = getAndValidatePropFromProps('trpTrainEas', props, `string`, `0`);
    this.trpCommentaireVoySncfDi = getAndValidatePropFromProps('trpCommentaireVoySncfDi', props, `string`, ``);

    // site-spec orion, à déplacer vers une nouvelle classe "OrionTrip"
    this.trpNumDeCourseSubstituee = getAndValidatePropFromProps('trpNumDeourseSubstituee', props);
    this.trpNumOperation = getAndValidatePropFromProps('trpNumOperation', props);
    this.trpACouvrirMr = getAndValidatePropFromProps('trpACouvrirMr', props);
    this.trpCodeTct = getAndValidatePropFromProps('trpCodeTct', props);
    this.trpEnginDeCalcul = getAndValidatePropFromProps('trpEnginDeCalcul', props);
    this.trpMaterielRemorque = getAndValidatePropFromProps('trpMaterielRemorque', props);
    this.trpNumeroSecondaire = getAndValidatePropFromProps('trpNumeroSecondaire', props);
    this.trpProfilDeVitesse = getAndValidatePropFromProps('trpProfilDeVitesse', props);
    this.trpPrecoAo = getAndValidatePropFromProps('trpPrecoAo', props);
    this.trpEstEnSnu = getAndValidatePropFromProps('trpEstEnSnu', props);
    this.trpOpReleve = getAndValidatePropFromProps('trpOpReleve', props);
    this.trpNePasCommanderSillon = getAndValidatePropFromProps('trpNePasCommanderSillon', props, `string`, `0`);
    this.trpBesoinVf = getAndValidatePropFromProps('trpBesoinVf', props, `string`, `0`);

    /* Children */
    /** @type {TripTpsCollection} */ this.tripTps = getAndValidatePropFromProps(
      'trip_tp', props, TripTpsCollection, new TripTpsCollection(), { altPropName: 'trip_tp', parent: this },
    );
    /** @type {TripPointsCollection} */ this.tripPoints = getAndValidatePropFromProps(
      'tripPoints', props, TripPointsCollection, new TripPointsCollection(), { altPropName: 'trip_point', parent: this },
    );
    /** @type {TripvehgrpspecsCollection} */ this.tripvehgrpspecs = getAndValidatePropFromProps(
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

/* Serialization utilities */
Trip.allChildClasses = getAllChildClasses(childClasses);
Trip.prototype.serializeModel = serializeThis;
Trip.parseModel = parseThis;

module.exports = Trip;

function getPlaceIdFromPlaceOrString(placeOrString) {
  return typeof placeOrString === `string` ? placeOrString : placeOrString.plcIdentifier;
}

const activityTypeNoByTripType = {
  0: '6',
  3: '2',
};
