import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Variant, VariantProps } from "./Variant";

const childClasses = [Variant];

export interface VariantsCollectionProps
  extends ExtendedCollectionProps<Variant, VariantProps> {}

export class VariantsCollection extends Collection<Variant, VariantProps> {
  constructor(props: VariantsCollectionProps = {}) {
    super({
      itemName: "Variant",
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
      const routePublicId = variant.route?.rtePubIdSpec;
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
      const routeIdentifier = variant.route?.rteIdentifier;
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
    this.sort(
      (varA, varB) => parseInt(varA.varPriority, 10) - parseInt(varB.varPriority, 10)
    );
    return this;
  }

  get shortLoggingOutput() {
    return this.parent
      ? `varColl of ${this.parent.shortLoggingOutput}`
      : `orphan varColl`;
  }
}

VariantsCollection.allChildClasses = getAllChildClasses(childClasses);

export default VariantsCollection;
