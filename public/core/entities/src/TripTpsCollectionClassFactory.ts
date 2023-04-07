const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const TripTpsCollectionClassFactory = ({ TripTp }) => {
  /* Serialization utilities dependencies */
  const childClasses = [TripTp];

  /** @extends {Collection<TripTp>} */
  class TripTpsCollection extends Collection {
    constructor(props = {}) {
      super({ itemName: 'TripTp', ItemConstructor: TripTp, items: props.items, parent: props.parent });
    }
  }

  /* Serialization utilities */
  TripTpsCollection.allChildClasses = getAllChildClasses(childClasses);
  TripTpsCollection.prototype.serializeModel = serializeThis;
  TripTpsCollection.parseModel = parseThis;

  return TripTpsCollection;
};

module.exports = TripTpsCollectionClassFactory;
