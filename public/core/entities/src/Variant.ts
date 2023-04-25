import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';

import { TripOrVariant, TripOrVariantProps } from "./TripOrVariant";
import { VariantPointsCollection, VariantPointsCollectionProps } from "./VariantPointsCollection";
import { VariantPoint, VariantPointProps } from "./VariantPoint";

const childClasses = [VariantPointsCollection];


export interface VariantProps extends ExtendedItemProps {
  bimoId?: string;
  varIdentifier?: string;
  varDescription?: string;
  varDirection?: string;
  varReversible?: string;
  varUsualTermin?: string;
  varDestinationNote?: string;
  varProductive?: string;
  varPriority?: string;
  varAllowDeviationFromTrackNetwork?: string;
  varNatureMouvementTechnique?: string;
  varIndiceCompo?: string;
  variantPoints?: string;
  _links?: string;
}

export class Variant extends TripOrVariant {
  bimoId?: string;
  varIdentifier?: string;
  varDescription?: string;
  varDirection?: string;
  varReversible?: string;
  varUsualTermin?: string;
  varDestinationNote?: string;
  varProductive?: string;
  varPriority?: string;
  varAllowDeviationFromTrackNetwork?: string;
  varNatureMouvementTechnique?: string;
  varIndiceCompo?: string;
  variantPoints?: string;
  _links?: string;
  constructor(props: VariantProps) {
    super(props, 'variant');
    this.bimoId = gavpfp('bimoId', props);
    this.varIdentifier = gavpfp('varIdentifier', props);
    this.varDescription = gavpfp('varDescription', props);
    this.varDirection = gavpfp('varDirection', props);
    this.varReversible = gavpfp('varReversible', props);
    this.varUsualTermin = gavpfp('varUsualTermin', props);
    this.varDestinationNote = gavpfp('varDestinationNote', props);
    this.varProductive = gavpfp('varProductive', props);
    this.varPriority = gavpfp('varPriority', props);
    this.varAllowDeviationFromTrackNetwork = gavpfp('varAllowDeviationFromTrackNetwork', props, 'string', '0');

    // Site spec à bouger vers Lauritz un jour
    this.varNatureMouvementTechnique = gavpfp('varNatureMouvementTechnique', props);
    this.varIndiceCompo = gavpfp('varIndiceCompo', props);

    /* Children */
    /** */ this.variantPoints = gavpfp(
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
    const copiedVariant = new Variant(this);
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

Variant.hastusKeywords = ['rvariant'];
Variant.hastusObject = 'variant';


Variant.allChildClasses = getAllChildClasses(childClasses);



export default Variant;
