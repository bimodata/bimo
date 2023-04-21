/* Linked Classes */
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');
const Variant = require('./Variant');

const childClasses = [Variant];

/* Class definition */
/** @extends {Collection<Variant>} */
class VariantsCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'Variant',
      ItemConstructor: Variant,
      // idPropName: `bimoId`,
      businessIdPropName: `varIdentifier`,
      labelPropName: `varDescription`,
      ...props,
    });
  }

  /**
     *
     * @param {PlacesCollection} placesCollection PlacesCollection to use to retrieve data about the places
     * @returns {Map<String, Variant[]>} a map of variants arrays, indexed by a string made of `${refPlaceOfTheVariantsOrigin}>>>${refPlaceOfTheVariantsDestination}`
     */
  getVariantsByRefPlaceOD(placesCollection) {
    const variantsByRefPlaceOD = this.groupByCustomKey((variant) => {
      const firstPlace = placesCollection.getByBusinessId(variant.firstPoint.varptPlace);
      const lastPlace = placesCollection.getByBusinessId(variant.lastPoint.varptPlace);

      if (!firstPlace || !lastPlace) {
        return `errors`;
      }

      const firstRefPlaceId = firstPlace.plcReferencePlace || firstPlace.plcIdentifier;
      const lastRefPlaceId = lastPlace.plcReferencePlace || lastPlace.plcIdentifier;

      return `${firstRefPlaceId}>>>${lastRefPlaceId}`;
    });
    return variantsByRefPlaceOD;
  }

  // /** @type {Map<String, Variant[]>} a map of variants arrays, indexed by a string made of `${refPlaceOfTheVariantsOrigin}>>>${refPlaceOfTheVariantsDestination}` */
  // get variantsByRefPlaceOD() {
  //     if (!this._cachedObjectByObjectName._variantsByRefPlaceOD) {
  //         this._cachedObjectByObjectName._variantsByRefPlaceOD = this.groupByCustomKey((variant) => {

  //         });

  //     }
  //     return this._cachedObjectByObjectName._variantsByRefPlaceOD;
  // }

  /**
     * Groups all the variants of the collection by route public id
     * @returns {Map<String, Variant[]>} a map of variants arrays, indexed by rtePubIdSpec
     */
  groupByRoutePublicId() {
    const groupedVariantsByRoutePublicId = new Map();
    this.forEach((variant) => {
      const routePublicId = variant.parent.parent.rtePubIdSpec;
      let groupedVariants = groupedVariantsByRoutePublicId.get(routePublicId);
      if (!groupedVariants) {
        groupedVariants = [];
        groupedVariantsByRoutePublicId.set(routePublicId, groupedVariants);
      }
      groupedVariants.push(variant);
    });
    return groupedVariantsByRoutePublicId;
  }

  /**
     * Groups all the variants of the collection by route id
     * @returns {Map<String, Variant[]>} a map of variants arrays, indexed by route id
     */
  groupByRouteIdentifier() {
    const groupedVariantsByRouteIdentifier = new Map();
    this.forEach((variant) => {
      const routeIdentifier = variant.parent.parent.rteIdentifier;
      let groupedVariants = groupedVariantsByRouteIdentifier.get(routeIdentifier);
      if (!groupedVariants) {
        groupedVariants = [];
        groupedVariantsByRouteIdentifier.set(routeIdentifier, groupedVariants);
      }
      groupedVariants.push(variant);
    });
    return groupedVariantsByRouteIdentifier;
  }

  sortByPriority() {
    this.sort((varA, varB) => parseInt(varA.varPriority, 10) - parseInt(varB.varPriority, 10));
    return this;
  }

  get shortLoggingOutput() {
    return this.parent ? `varColl of ${this.parent.shortLoggingOutput}` : `orphan varColl`;
  }
}

/* Serialization utilities */
VariantsCollection.allChildClasses = getAllChildClasses(childClasses);
VariantsCollection.prototype.serializeModel = serializeThis;
VariantsCollection.parseModel = parseThis;

module.exports = VariantsCollection;
