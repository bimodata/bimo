const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const PlacesCollectionClassFactory = ({ Place }) => {
  const childClasses = [Place];

  /** @extends {Collection<Place>} */
  class PlacesCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'Place',
        ItemConstructor: Place,
        associationType: 'composition',
        businessIdPropName: `plcIdentifier`,
        idPropName: `bimoId`,
        labelPropName: ``,
        ...props,
      });
      this.libelle = props.libelle || props.label;
      this.label = this.label ?? this.libelle;
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
      return this._getAndSetCachedValue('placesByReferencePlace', () => this.groupByProp(`plcReferencePlace`));
    }

    invalidatePlacesByReferencePlace() {
      this._nullifyCachedValue('placesByReferencePlace');
    }
  }

  PlacesCollection.ItemConstructor = Place;

  /* Serialization utilities */
  PlacesCollection.allChildClasses = getAllChildClasses(childClasses);
  PlacesCollection.prototype.serializeModel = serializeThis;
  PlacesCollection.parseModel = parseThis;

  /* I/O info */
  PlacesCollection.defaultExportedDataDataName = `output_place`;
  PlacesCollection.defaultImportDataDataName = `input_place`;

  return PlacesCollection;
};

module.exports = PlacesCollectionClassFactory;
