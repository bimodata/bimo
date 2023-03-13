const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const OvernightLinksCollectionClassFactory = ({ OvernightLink }) => {
  /* Serialization utilities dependencies */
  const childClasses = [OvernightLink];

  /** @extends {Collection<OvernightLink>} */
  class OvernightLinksCollection extends Collection {
    constructor(props = {}) {
      super({ itemName: 'OvernightLink', ItemConstructor: OvernightLink, items: props.items, parent: props.parent });
    }
  }

  /* Serialization utilities */
  OvernightLinksCollection.allChildClasses = getAllChildClasses(childClasses);
  OvernightLinksCollection.prototype.serializeModel = serializeThis;
  OvernightLinksCollection.parseModel = parseThis;

  return OvernightLinksCollection;
};

module.exports = OvernightLinksCollectionClassFactory;
