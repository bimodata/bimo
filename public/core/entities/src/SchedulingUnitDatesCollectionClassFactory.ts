const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const SchedulingUnitDatesCollectionClassFactory = ({ SchedulingUnitDate }) => {
  const childClasses = [SchedulingUnitDate];

  /** @extends {Collection<SchedulingUnitDate>} */
  class SchedulingUnitDatesCollection extends Collection {
    constructor(props) {
      super({
        itemName: 'SchedulingUnitDate',
        ItemConstructor: SchedulingUnitDate,
        associationType: 'aggregation',
        idPropName: 'scudSchedUnitName',
        ...props,
      });
    }
  }

  SchedulingUnitDatesCollection.allChildClasses = getAllChildClasses(childClasses);
  SchedulingUnitDatesCollection.prototype.serializeModel = serializeThis;
  SchedulingUnitDatesCollection.parseModel = parseThis;

  return SchedulingUnitDatesCollection;
};

module.exports = SchedulingUnitDatesCollectionClassFactory;
