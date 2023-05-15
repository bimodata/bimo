import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Variant, VariantProps } from "./Variant";
import { PlacesCollection } from "./PlacesCollection";
export interface VariantsCollectionProps
  extends ExtendedCollectionProps<Variant, VariantProps> {}
export declare class VariantsCollection extends Collection<Variant, VariantProps> {
  constructor(props?: VariantsCollectionProps);
  /**
   *
   * @param placesCollection PlacesCollection to use to retrieve data about the places
   * @returns a map of variants arrays, indexed by a string made of `${refPlaceOfTheVariantsOrigin}>>>${refPlaceOfTheVariantsDestination}`
   */
  getVariantsByRefPlaceOD(placesCollection: PlacesCollection): Map<string, Variant[]>;
  /**
   * Groups all the variants of the collection by route public id
   * @returns a map of variants arrays, indexed by rtePubIdSpec
   */
  groupByRoutePublicId(): Map<string, Variant[]>;
  /**
   * Groups all the variants of the collection by route id
   * @returns a map of variants arrays, indexed by route id
   */
  groupByRouteIdentifier(): Map<string, Variant[]>;
  sortByPriority(): this;
  get shortLoggingOutput(): string;
}
