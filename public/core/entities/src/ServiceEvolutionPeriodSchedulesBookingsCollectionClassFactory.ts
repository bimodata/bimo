const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const ServiceEvolutionPeriodSchedulesBookingsCollectionClassFactory = ({ ServiceEvolutionPeriodSchedulesBooking }) => {
  const childClasses = [ServiceEvolutionPeriodSchedulesBooking];

  /** @extends {Collection<ServiceEvolutionPeriodSchedulesBooking>} */
  class ServiceEvolutionPeriodSchedulesBookingsCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'ServiceEvolutionPeriodSchedulesBooking',
        ItemConstructor: ServiceEvolutionPeriodSchedulesBooking,
        associationType: 'aggregation',
        ...props,
      });
    }
  }

  ServiceEvolutionPeriodSchedulesBookingsCollection.allChildClasses = getAllChildClasses(childClasses);
  ServiceEvolutionPeriodSchedulesBookingsCollection.prototype.serializeModel = serializeThis;
  ServiceEvolutionPeriodSchedulesBookingsCollection.parseModel = parseThis;

  return ServiceEvolutionPeriodSchedulesBookingsCollection;
};

module.exports = ServiceEvolutionPeriodSchedulesBookingsCollectionClassFactory;
