const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const LoadTimesCollectionClassFactory = ({ LoadTime }) => {
  const childClasses = [LoadTime];

  /** @extends {Collection<LoadTime>} */
  class LoadTimesCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'LoadTime',
        ItemConstructor: LoadTime,
        idPropName: 'bimoId',
        labelPropName: 'ltPlaceId',
        ...props,
      });
    }
  }

  /* Serialization utilities */
  LoadTimesCollection.allChildClasses = getAllChildClasses(childClasses);
  LoadTimesCollection.prototype.serializeModel = serializeThis;
  LoadTimesCollection.parseModel = parseThis;

  return LoadTimesCollection;
};

module.exports = LoadTimesCollectionClassFactory;
