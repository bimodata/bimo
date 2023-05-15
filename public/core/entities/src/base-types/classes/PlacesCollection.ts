import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Place, PlaceProps } from "./Place";
export interface PlacesCollectionProps
  extends ExtendedCollectionProps<Place, PlaceProps> {}
export declare class PlacesCollection extends Collection<Place, PlaceProps> {
  constructor(props?: PlacesCollectionProps);
  /**
   *
   * @param {Object} oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
   */
  static createFromOirStyleData(oirStyleData: any, libelle: string): PlacesCollection;
  get shortLoggingOutput(): string;
  generateOirStyleData(): {
    place: Place[];
  };
  get placesByReferencePlace(): Map<any, Place[]>;
  invalidatePlacesByReferencePlace(): void;
}
