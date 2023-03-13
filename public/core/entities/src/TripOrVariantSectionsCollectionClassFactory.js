const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const TripOrVariantSectionsCollectionClassFactory = ({ TripOrVariantSection }) => {
  const childClasses = [TripOrVariantSection];

  /** @extends {Collection<TripOrVariantSection>} */
  class TripOrVariantSectionsCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'TripOrVariantSection',
        ItemConstructor: TripOrVariantSection,
        ...props,
      });
    }
  }

  /* Serialization utilities */
  TripOrVariantSectionsCollection.allChildClasses = getAllChildClasses(childClasses);
  TripOrVariantSectionsCollection.prototype.serializeModel = serializeThis;
  TripOrVariantSectionsCollection.parseModel = parseThis;

  return TripOrVariantSectionsCollection;
};

module.exports = TripOrVariantSectionsCollectionClassFactory;
