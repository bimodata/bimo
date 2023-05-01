import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Place, PlaceProps } from "./Place";

const childClasses = [Place];

export interface PlacesCollectionProps
  extends ExtendedCollectionProps<Place, PlaceProps> {}

export class PlacesCollection extends Collection<Place, PlaceProps> {
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
  static createFromOirStyleData(oirStyleData, libelle) {
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

export default PlacesCollection;
