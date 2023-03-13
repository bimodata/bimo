const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const TripvehgrpspecsCollectionClassFactory = ({ Tripvehgrpspec }) => {
  /* Serialization utilities dependencies */
  const childClasses = [Tripvehgrpspec];

  /** @extends {Collection<Tripvehgrpspec>} */
  class TripvehgrpspecsCollection extends Collection {
    constructor(props = {}) {
      super({ itemName: 'Tripvehgrpspec', ItemConstructor: Tripvehgrpspec, items: props.items, parent: props.parent });
    }
  }

  /* Serialization utilities */
  TripvehgrpspecsCollection.allChildClasses = getAllChildClasses(childClasses);
  TripvehgrpspecsCollection.prototype.serializeModel = serializeThis;
  TripvehgrpspecsCollection.parseModel = parseThis;

  return TripvehgrpspecsCollection;
};

module.exports = TripvehgrpspecsCollectionClassFactory;
