const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const RoutesCollectionClassFactory = ({ Route }) => {
  /* Serialization utilities dependencies */
  const childClasses = [Route];

  /** @extends {Collection<Route>} */
  class RoutesCollection extends Collection {
    constructor(props = {}) {
      super({ itemName: 'Route', ItemConstructor: Route, items: props.items, parent: props.parent, idPropName: `bimoId` });
    }
  }

  /* Serialization utilities */
  RoutesCollection.allChildClasses = getAllChildClasses(childClasses);
  RoutesCollection.prototype.serializeModel = serializeThis;
  RoutesCollection.parseModel = parseThis;

  return RoutesCollection;
};

module.exports = RoutesCollectionClassFactory;
