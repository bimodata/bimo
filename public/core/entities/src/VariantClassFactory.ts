const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const VariantClassFactory = ({
  TripOrVariant,
  VariantPointsCollection,
}) => {
  const childClasses = [VariantPointsCollection];

  /** @extends {TripOrVariant<VariantPoint>} */
  class Variant extends TripOrVariant {
    constructor(props) {
      super(props, 'variant');
      this.bimoId = getAndValidatePropFromProps('bimoId', props);
      this.varIdentifier = getAndValidatePropFromProps('varIdentifier', props);
      this.varDescription = getAndValidatePropFromProps('varDescription', props);
      this.varDirection = getAndValidatePropFromProps('varDirection', props);
      this.varReversible = getAndValidatePropFromProps('varReversible', props);
      this.varUsualTermin = getAndValidatePropFromProps('varUsualTermin', props);
      this.varDestinationNote = getAndValidatePropFromProps('varDestinationNote', props);
      this.varProductive = getAndValidatePropFromProps('varProductive', props);
      this.varPriority = getAndValidatePropFromProps('varPriority', props);
      this.varAllowDeviationFromTrackNetwork = getAndValidatePropFromProps('varAllowDeviationFromTrackNetwork', props, 'string', '0');

      /* Children */
      /** */ this.variantPoints = getAndValidatePropFromProps(
        'variantPoints', props, VariantPointsCollection, new VariantPointsCollection(), { altPropName: 'variant_point' },
      );
      this.variantPoints.parent = this;

      this._links = {};
    }

    addLink(type, value) {
      this._links[type] = value;
    }

    getLink(type) {
      return this._links[type];
    }

    removeLink(type) {
      delete this._links[type];
    }

    removeFromCurrentRoute() {
      if (!this.route) return;
      this.route.variants.remove(this);
    }

    /**
     * Creates a new instance of a variant. All variantPoints are new instances too.
     * @param {string=} newVarIdentifier
     * @returns {Variant}
     */
    copy(newVarIdentifier = this.varIdentifier) {
      // @ts-ignore // See TripClassFactory.copy
      const copiedVariant = new this.constructor(this);
      copiedVariant.varIdentifier = newVarIdentifier;
      const copiedVariantPoints = this.variantPoints.map((varPt) => varPt.copy());
      copiedVariant.variantPoints = new VariantPointsCollection({ items: copiedVariantPoints });
      copiedVariant.addLink('copiedFrom', this);
      return copiedVariant;
    }

    /** @type {import ('./Route')} */
    get route() {
      return this.parent?.parent;
    }

    get routeId() {
      return this.route?.rteIdentifier;
    }

    /** @type {string} key of the form '${route.rteIdentifier}|${varIdentifier}' or null if either is null    */
    get routeAndVariantKey() {
      if (!this.route || !this.route.rteIdentifier || !this.varIdentifier) return null;
      return `${this.route.rteIdentifier}|${this.varIdentifier}`;
    }

    /** @type {import ('./RouteVersion')} */
    get routeVersion() {
      return this.route?.routeVersion;
    }

    get shortLoggingOutput() {
      return `${this.varIdentifier} (${this.varDescription}) {${this.varDirection}}`;
    }

    get mediumLoggingOutput() {
      return `${this.shortLoggingOutput} [${this.variantPoints.length}] route: ${this.route && this.route.shortLoggingOutput}`;
    }

    get longLoggingOutput() {
      return `${this.mediumLoggingOutput} ${this.variantPoints.mediumLoggingOutput}`;
    }

    get veryLongLoggingOutput() {
      return `${this.mediumLoggingOutput}\n${this.variantPoints.longLoggingOutput}`;
    }

    get varIdRouteIdAndVersionId() {
      return `${this.varIdentifier} / ${this.routeId} / ${this.routeVersion.rtevIdentifier}`;
    }

    get isProductive() {
      return this.varProductive === '1';
    }

    changeStartPlace(newStartPlace) {
      const placeIdentifier = typeof newStartPlace === `string` ? newStartPlace : newStartPlace.plcIdentifier;
      this.firstPoint.varptPlace = placeIdentifier;
    }

    changeEndPlace(newEndPlace) {
      const placeIdentifier = typeof newEndPlace === `string` ? newEndPlace : newEndPlace.plcIdentifier;
      this.lastPoint.varptPlace = placeIdentifier;
    }

    /* eslint-disable no-param-reassign */
    usesOneOfThesePlaces(listOfPlaces) {
      if (!listOfPlaces) {
        return undefined;
      }
      if (listOfPlaces.constructor.name !== 'Set') {
        if (!Array.isArray(listOfPlaces)) {
          listOfPlaces = [listOfPlaces];
        }
        listOfPlaces = new Set(listOfPlaces);
      }
      return this.variantPoints.some((variantPoint) => listOfPlaces.has(variantPoint.varptPlace));
    }

    updatePlacesAndReturnListOfChanges(newPlaceIdByOldPlaceId) {
      if (!newPlaceIdByOldPlaceId || typeof newPlaceIdByOldPlaceId !== 'object') {
        return undefined;
      }
      const listOfChanges = [];
      this.variantPoints.forEach((variantPoint) => {
        const newPlaceId = newPlaceIdByOldPlaceId[variantPoint.varptPlace];
        if (newPlaceId) {
          listOfChanges.push({ old: variantPoint.varptPlace, new: newPlaceId });
          variantPoint.varptPlace = newPlaceId;
        }
      });
      return listOfChanges;
    }
    /* eslint-enable no-param-reassign */
  }

  /* Serialization utilities */
  Variant.allChildClasses = getAllChildClasses(childClasses);
  Variant.prototype.serializeModel = serializeThis;
  Variant.parseModel = parseThis;

  return Variant;
};

module.exports = VariantClassFactory;
