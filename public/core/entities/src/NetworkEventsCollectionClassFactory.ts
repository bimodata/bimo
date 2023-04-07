const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const NetworkEventsCollectionClassFactory = ({ NetworkEvent }) => {
  /* Serialization utilities dependencies */
  const childClasses = [NetworkEvent];

  /** @extends {Collection<NetworkEvent>} */
  class NetworkEventsCollection extends Collection {
    constructor(props = {}) {
      super({ itemName: 'NetworkEvent', ItemConstructor: NetworkEvent, items: props.items, parent: props.parent });
    }
  }

  /* Serialization utilities */
  NetworkEventsCollection.allChildClasses = getAllChildClasses(childClasses);
  NetworkEventsCollection.prototype.serializeModel = serializeThis;
  NetworkEventsCollection.parseModel = parseThis;

  return NetworkEventsCollection;
};

module.exports = NetworkEventsCollectionClassFactory;
