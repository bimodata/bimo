/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const timeAndDate = require('@bimo/core-utils-time-and-date');

const TripPointClassFactory = ({ TripOrVariantPoint }) => {
  /**
   * Propriétés de point de voyage
   * @typedef {Object} TripPointProps
   * @property {string} trpptPlace - place identifier
   * @property {Object=} parent - tripPointsCollection that contains this trip point
   * @see TripPoint
   */

  const TP_INTERNAL_DISTANCE_FACTOR = 10000;
  const REGULAR_INTERNAL_DISTANCE_FACTOR = 10;

  class TripPoint extends TripOrVariantPoint {
    /**
     *
     * @param {TripPointProps} props - props
     */
    constructor(props) {
      super(props, 'trip');
      this.trpptPlace = getAndValidatePropFromProps('trpptPlace', props);
      this.trpptStop = getAndValidatePropFromProps('trpptStop', props);
      this.trpptIsTimingPoint = getAndValidatePropFromProps('trpptIsTimingPoint', props, `string`, `1`);
      this.trpptArrivalTimeUnrounded = getAndValidatePropFromProps('trpptArrivalTimeUnrounded', props);
      this.trpptDepartureTimeUnrounded = getAndValidatePropFromProps('trpptDepartureTimeUnrounded', props);
      this._trpptInternalArrivalTime = getAndValidatePropFromProps(
        'trpptInternalArrivalTime', props, `string`, this.trpptArrivalTimeUnrounded,
      );
      this._trpptInternalDepartureTime = getAndValidatePropFromProps(
        'trpptInternalDepartureTime', props, `string`, this.trpptDepartureTimeUnrounded,
      );
      this.trpptNoStopping = getAndValidatePropFromProps('trpptNoStopping', props, `string`, `0`);

      /** en décimètres */
      this.trpptInternalTpDistance = getAndValidatePropFromProps('trpptInternalTpDistance', props);
      this.trpptTpDistance = getAndValidatePropFromProps('trpptTpDistance', props) ?? this.trpptTpDistance;

      /** en décimètres */
      this.trpptInternalDistance = getAndValidatePropFromProps('trpptInternalDistance', props);
      this.trpptDistance = getAndValidatePropFromProps('trpptDistance', props) ?? this.trpptDistance;
      this.trpptDistrict = getAndValidatePropFromProps('trpptDistrict', props);
      this.trpptZone = getAndValidatePropFromProps('trpptZone', props);
      this.trpptTpNote = getAndValidatePropFromProps('trpptTpNote', props);
      this.trpptTstpNote = getAndValidatePropFromProps('trpptTstpNote', props);
      this.trpptInternalAllowLoadTime = getAndValidatePropFromProps('trpptInternalAllowLoadTime', props, `string`, `1`);
      this.trpptInternalArrivalTimeDiff = getAndValidatePropFromProps('trpptInternalArrivalTimeDiff', props, `string`, `0h00`);
      this.trpptInternalDepartureTimeDiff = getAndValidatePropFromProps('trpptInternalDepartureTimeDiff', props, `string`, `0h00`);
      this.trpptDepartureTpNote = getAndValidatePropFromProps('trpptDepartureTpNote', props);
      this.trpptInternalTimeFactor = getAndValidatePropFromProps('trpptInternalTimeFactor', props, `string`, `1.00`);
      this.trpptInternalPublicInfo = getAndValidatePropFromProps('trpptInternalPublicInfo', props, `string`, `1`);
      this.trpptInternalPathPrevPoint = getAndValidatePropFromProps('trpptInternalPathPrevPoint', props);
      this.trpptInternalPassengersMvmtRestrict = getAndValidatePropFromProps('trpptInternalPassengersMvmtRestrict', props);
      this.trpptOriginalStop = getAndValidatePropFromProps('trpptOriginalStop', props);
      this.trpptInternalOriginalPlaceId = getAndValidatePropFromProps('trpptInternalOriginalPlaceId', props, `string`, this.trpptPlace);
      this.trpptInternalOriginalNoStopping = getAndValidatePropFromProps(
        'trpptInternalOriginalNoStopping', props, `string`, this.trpptNoStopping,
      );
      this.trpptInternalOriginalAllowLoadTime = getAndValidatePropFromProps(
        'trpptInternalOriginalAllowLoadTime', props, `string`, this.trpptInternalAllowLoadTime,
      );
      this.trpptInternalBackwardHoldTime = getAndValidatePropFromProps('trpptInternalBackwardHoldTime', props);
      this.trpptInternalForwardHoldTime = getAndValidatePropFromProps('trpptInternalForwardHoldTime', props);
      this.trpptIsRoutingPoint = getAndValidatePropFromProps('trpptIsRoutingPoint', props, `string`, `0`);
      this.trpptInternalLoadDistrict = getAndValidatePropFromProps('trpptInternalLoadDistrict', props);
      this.trpptInternalLoadPlace = getAndValidatePropFromProps('trpptInternalLoadPlace', props);
      this.trpptInternalLoadZone = getAndValidatePropFromProps('trpptInternalLoadZone', props);
      this.trpptVariantId = getAndValidatePropFromProps('trpptVariantId', props);
    }

    /** en km */
    get trpptTpDistance() {
      const valueAsNumber = parseFloat(this.trpptInternalTpDistance);
      return Number.isNaN(valueAsNumber) ? null : (valueAsNumber / TP_INTERNAL_DISTANCE_FACTOR).toFixed(4);
    }

    /** en km */
    set trpptTpDistance(v) {
      const valueAsNumber = parseFloat(v);
      this.trpptInternalTpDistance = Number.isNaN(valueAsNumber) ? null : (valueAsNumber * TP_INTERNAL_DISTANCE_FACTOR).toFixed(0);
    }

    /** en m */
    get trpptDistance() {
      const valueAsNumber = parseFloat(this.trpptInternalDistance);
      return Number.isNaN(valueAsNumber) ? null : (valueAsNumber / REGULAR_INTERNAL_DISTANCE_FACTOR).toFixed(2);
    }

    /** en m */
    set trpptDistance(v) {
      const valueAsNumber = parseFloat(v);
      this.trpptInternalDistance = Number.isNaN(valueAsNumber) ? null : (valueAsNumber * REGULAR_INTERNAL_DISTANCE_FACTOR).toFixed(0);
    }

    get trpptInternalArrivalTime() {
      return this._trpptInternalArrivalTime || this.trpptArrivalTimeUnrounded;
    }

    set trpptInternalArrivalTime(v) {
      this._trpptInternalArrivalTime = v;
    }

    get trpptInternalDepartureTime() {
      return this._trpptInternalDepartureTime || this.trpptDepartureTimeUnrounded;
    }

    set trpptInternalDepartureTime(v) {
      this._trpptInternalDepartureTime = v;
    }

    /** @type {Boolean} */
    get isStopping() {
      return this.trpptNoStopping === '0';
    }

    /** @type {import ('./Trip')} */
    get trip() {
      return this.parent && this.parent.parent;
    }

    get _indexInSortedParent() {
      if (!this.parent) return null;
      this.parent.sortByTime();
      return this.parent.indexOf(this);
    }

    getNthTripPointFromThisOne(n) {
      this.getNthPointFromThisOne(n);
    }

    getNthPointFromThisOne(n) {
      return (this.parent && this.parent.items[this._indexInSortedParent + n]) ?? null;
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
      // @ts-ignore // See TripClassFactory.copy
      const copiedItem = new this.constructor(this);
      copiedItem.parent = this.parent;
      return copiedItem;
    }

    removeFromTrip() {
      this.parent.remove(this);
    }

    /**
     *
     * @param {'departure'|'arrival'} [departureOrArrival='departure']
     * @param {Boolean} [allowFallback=true]
     */
    getTimeAsDuration(departureOrArrival = `departure`, allowFallback = true) {
      let mainValue;
      let fallBackValue;
      if (departureOrArrival === `departure`) {
        mainValue = this.trpptInternalDepartureTime;
        fallBackValue = this.trpptInternalArrivalTime;
      }
      else if (departureOrArrival === `arrival`) {
        mainValue = this.trpptInternalArrivalTime;
        fallBackValue = this.trpptInternalDepartureTime;
      }
      else {
        throw new Error(`departureOrArrival should equal "departure" or "arrival". Got ${departureOrArrival}`);
      }
      const finalValue = allowFallback ? (mainValue || fallBackValue) : mainValue;
      return timeAndDate.hastusExtendedHoursToDuration(finalValue);
    }

    get stopDurationInSeconds() {
      return this.getTimeAsDuration('departure').minus(this.getTimeAsDuration('arrival')).as('second');
    }

    tripPointTimesAreValid() {
      const isValid = this.getTimeAsDuration(`departure`, false) >= this.getTimeAsDuration(`arrival`, false);
      return isValid;
    }

    get shortLoggingOutput() {
      return `${this.trpptPlace}(A:${this.trpptInternalArrivalTime},`
        + ` D:${this.trpptInternalDepartureTime}, noStopping:${this.trpptNoStopping})`;
    }

    get placeId() {
      return this.trpptPlace;
    }

    set placeId(v) {
      if (this === this.trip.firstTripPoint) this.trip.changeCurrentStartPlace(v);
      else if (this === this.trip.lastTripPoint) this.trip.changeCurrentEndPlace(v);
      else this.trpptPlace = v;
    }

    get originalPlaceId() {
      return this.trpptInternalOriginalPlaceId;
    }

    set originalPlaceId(v) {
      if (this === this.trip.firstTripPoint) this.trip.changeOriginalStartPlace(v);
      else if (this === this.trip.lastTripPoint) this.trip.changeOriginalEndPlace(v);
      else this.trpptInternalOriginalPlaceId = v;
    }
  }

  /* Serialization utilities */
  TripPoint.allChildClasses = getAllChildClasses(childClasses);
  TripPoint.prototype.serializeModel = serializeThis;
  TripPoint.parseModel = parseThis;

  return TripPoint;
};

module.exports = TripPointClassFactory;
