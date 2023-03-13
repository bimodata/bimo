const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const TripShiftsCollectionClassFactory = ({ TripShift }) => {
  /* Serialization utilities dependencies */
  const childClasses = [TripShift];

  /** @extends {Collection<TripShift>} */
  class TripShiftsCollection extends Collection {
    constructor(props = {}) {
      super({ itemName: 'TripShift', ItemConstructor: TripShift, items: props.items, parent: props.parent });
    }
  }

  /* Serialization utilities */
  TripShiftsCollection.allChildClasses = getAllChildClasses(childClasses);
  TripShiftsCollection.prototype.serializeModel = serializeThis;
  TripShiftsCollection.parseModel = parseThis;

  return TripShiftsCollection;
};

module.exports = TripShiftsCollectionClassFactory;
