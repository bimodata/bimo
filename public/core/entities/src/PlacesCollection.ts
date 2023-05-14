import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { PlacesCollection as BimoPlacesCollection } from "../base-types/rawIndex";
export { PlacesCollection as BimoPlacesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BimoPlace, PlaceProps } from "./Place";
export function PlacesCollectionClassFactory({
  Place,
}: EntityConstructorByEntityClassKey): typeof BimoPlacesCollection{
  
  const childClasses: (typeof Entity)[] = [Place];
  
  export interface PlacesCollectionProps
  extends ExtendedCollectionProps<BimoPlace, PlaceProps> {}
  
 class PlacesCollection extends Collection<BimoPlace, PlaceProps> {
    constructor(props: PlacesCollectionProps = {}) {
      super({
        itemName: "Place",
        ItemConstructor: Place,
        associationType: "composition",
        businessIdPropName: `plcIdentifier`,
        idPropName: `bimoId`,
        labelPropName: ``,
        ...props,
      });
    }
  
    /**
     *
     * @param {Object} oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
     */
    static createFromOirStyleData(oirStyleData: any, libelle: string) {
      const rawPlaces = oirStyleData.place;
  
      if (!rawPlaces) {
        throw new Error(`Bad oirStyleData: could not find "place" key`);
      }
      const newPlacesCollection = new this({ items: rawPlaces, libelle });
      return newPlacesCollection;
    }
  
    get shortLoggingOutput() {
      return `${this.label} (${super.shortLoggingOutput})`;
    }
  
    generateOirStyleData() {
      return { place: this.items };
    }
  
    get placesByReferencePlace() {
      return this._getAndSetCachedValue("placesByReferencePlace", () =>
        this.groupByProp(`plcReferencePlace`)
      );
    }
  
    invalidatePlacesByReferencePlace() {
      this._nullifyCachedValue("placesByReferencePlace");
    }
  }
  
  PlacesCollection.allChildClasses = getAllChildClasses(childClasses);
  
  /* I/O info */
  PlacesCollection.defaultExportedDataDataName = `output_place`;
  PlacesCollection.defaultImportDataDataName = `input_place`;
  
  return PlacesCollection
}

export default PlacesCollectionClassFactory