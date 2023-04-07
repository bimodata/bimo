const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const NetworkSectionsCollectionClassFactory = ({ NetworkSection }) => {
  const childClasses = [NetworkSection];

  /** @extends {Collection<NetworkSection>} */
  class NetworkSectionsCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'NetworkSection',
        ItemConstructor: NetworkSection,
        idPropName: 'bimoId',
        businessIdPropName: 'businessId',
        labelPropName: 'label',
        associationType: 'aggregation',
        ...props,
      });
    }
  }

  NetworkSectionsCollection.allChildClasses = getAllChildClasses(childClasses);
  NetworkSectionsCollection.prototype.serializeModel = serializeThis;
  NetworkSectionsCollection.parseModel = parseThis;

  return NetworkSectionsCollection;
};

module.exports = NetworkSectionsCollectionClassFactory;
