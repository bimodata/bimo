const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const SchedulingUnitRoutesCollectionClassFactory = ({ SchedulingUnitRoute }) => {
  const childClasses = [SchedulingUnitRoute];

  /** @extends {Collection<SchedulingUnitRoute>} */
  class SchedulingUnitRoutesCollection extends Collection {
    constructor(props) {
      super({
        itemName: 'SchedulingUnitRoute',
        ItemConstructor: SchedulingUnitRoute,
        associationType: 'aggregation',
        businessIdPropName: 'rteIdentifier',
        ...props,
      });
    }
  }

  SchedulingUnitRoutesCollection.allChildClasses = getAllChildClasses(childClasses);
  SchedulingUnitRoutesCollection.prototype.serializeModel = serializeThis;
  SchedulingUnitRoutesCollection.parseModel = parseThis;

  return SchedulingUnitRoutesCollection;
};

module.exports = SchedulingUnitRoutesCollectionClassFactory;
