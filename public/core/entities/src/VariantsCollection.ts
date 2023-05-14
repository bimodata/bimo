import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VariantsCollection as BimoVariantsCollection } from "../base-types/rawIndex";
export { VariantsCollection as BimoVariantsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BimoVariant, VariantProps } from "./Variant";
import { BimoPlacesCollection, PlacesCollectionProps } from "./PlacesCollection";
export function VariantsCollectionClassFactory({
  Variant,
  PlacesCollection,
}: EntityConstructorByEntityClassKey): typeof BimoVariantsCollection{
  
  const childClasses: (typeof Entity)[] = [Variant];
  
  export interface VariantsCollectionProps
  extends ExtendedCollectionProps<BimoVariant, VariantProps> {}
  
 class VariantsCollection extends Collection<BimoVariant, VariantProps> {
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
     * @param placesCollection PlacesCollection to use to retrieve data about the places
     * @returns a map of variants arrays, indexed by a string made of `${refPlaceOfTheVariantsOrigin}>>>${refPlaceOfTheVariantsDestination}`
     */
    getVariantsByRefPlaceOD(placesCollection: PlacesCollection): Map<string, Variant[]> {
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
     * @returns a map of variants arrays, indexed by rtePubIdSpec
     */
    groupByRoutePublicId(): Map<string, Variant[]> {
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
     * @returns a map of variants arrays, indexed by route id
     */
    groupByRouteIdentifier(): Map<string, Variant[]> {
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
  
  return VariantsCollection
}

export default VariantsCollectionClassFactory